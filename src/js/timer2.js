import '../scss/timer.scss';

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.refs = {
            days: document.querySelector('[data-value="days"]'),
            hours: document.querySelector('[data-value="hours"]'),
            mins: document.querySelector('[data-value="mins"]'),
            secs: document.querySelector('[data-value="secs"]'),
        };

        setInterval(() => {
            const startDate = Date.now();
            const time = this.targetDate - startDate;
            console.log(time);
            if (time > 0) {
                const { days, hours, mins, secs } =
                    this.getTimeComponents(time);
                this.updateClockface({ days, hours, mins, secs });
            } else {
                clearInterval();
                document.getElementById('timer-1').innerHTML =
                    'EXPIRED!';
            }
        }, 1000);
    }

    getTimeComponents(time) {
        const days = this.pad(
            Math.floor(time / (1000 * 60 * 60 * 24)),
        );
        const hours = this.pad(
            Math.floor(
                (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            ),
        );
        const mins = this.pad(
            Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        );
        const secs = this.pad(
            Math.floor((time % (1000 * 60)) / 1000),
        );

        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    updateClockface({ days, hours, mins, secs }) {
        this.refs.days.textContent = `${days}`;
        this.refs.hours.textContent = `${hours}`;
        this.refs.mins.textContent = `${mins}`;
        this.refs.secs.textContent = `${secs}`;
    }
}

new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 15, 2021'),
});
