const delay = ms => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
            reject('sorry there was an error');
        }, ms);
    });
};

const logger = time => console.log(`Fulfilled after ${time}ms`);

// Tests
delay(2000).then(logger); // Fulfilled after 2000ms
delay(1000).then(logger); // Fulfilled after 1000ms
delay(1500).then(logger); // Fulfilled after 1500ms
