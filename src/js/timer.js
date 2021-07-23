import '../scss/timer.scss';
import Swal from 'sweetalert2';

const refs = {
    startBtn: document.querySelector('[data-value="start"]'),
    days: document.querySelector('[data-value="days"]'),

    hours: document.querySelector('[data-value="hours"]'),

    minutes: document.querySelector('[data-value="minutes"]'),

    seconds: document.querySelector('[data-value="seconds"]'),

    input: document.querySelector('#date-selector'),
};

refs.startBtn.disabled = true;
refs.input.addEventListener('change', onSelectedDate);

function onSelectedDate(evt) {
    const selDate = new Date(this.value).getTime();

    if (selDate <= Date.now()) {
        return Swal.fire('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
}

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;

        this.init();
    }
    init() {
        const time = this.convertMs(0);
        this.onTick(time);
    }

    start() {
        if (this.isActive) {
            return;
        }

        const startTime = new Date(refs.input.value).getTime();

        const msInThreeHours = 10800000;

        this.isActive = true;
        refs.input.disabled = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const time = this.convertMs(deltaTime);

            this.onTick(time);

            if (deltaTime === 0) {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        this.init();
    }
    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor(
            (((ms % day) % hour) % minute) / second,
        );

        return { days, hours, minutes, seconds };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({ onTick: updateTimerInterface });

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateTimerInterface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}
// function convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor(
//         (((ms % day) % hour) % minute) / second,
//     );

//     return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
