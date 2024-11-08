/**
 * Calculate the time remaining until the given end time.
 *
 * @param {Date} endTime Date object representing the end time.
 * @returns {Object} Object with the total time remaining as well as the days, hours, minutes and seconds remaining.
 */
function getTimeRemaining(endTime) {
    if (!endTime) {
        throw new Error("Unable to calculate time remaining as no end time was provided.");
    }

    let t = Date.parse(endTime) - Date.parse(new Date());
    if (isNaN(t)) {
        throw new Error("Unable to calculate time remaining: invalid end time.");
    }

    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
function initializeClock(id, endTime){
    let clock = document.getElementById(id);
    if (!clock) {
        throw new Error("Unable to find clock element with id: " + id);
    }
    let daysSpan = clock.querySelector('.days');
    let hoursSpan = clock.querySelector('.hours');
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');

    if (!(daysSpan && hoursSpan && minutesSpan && secondsSpan)) {
        throw new Error("Unable to find required elements in clock");
    }

    function updateClock() {
        try {
            let t = getTimeRemaining(endTime);
            if (!t) throw new Error("Failed to calculate time remaining");

            if (daysSpan && hoursSpan && minutesSpan && secondsSpan) {
                daysSpan.innerHTML = t.days;
                hoursSpan.innerHTML = t.hours.toString().padStart(2, '0');
                minutesSpan.innerHTML = t.minutes.toString().padStart(2, '0');
                secondsSpan.innerHTML = t.seconds.toString().padStart(2, '0');
            } else {
                throw new Error("Clock elements are not properly initialized");
            }

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        } catch (error) {
            console.error("Error in updateClock: ", error);
        }
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
}

let deadline = new Date(Date.parse(new Date()) + 7 * 24 * 60 * 60 * 1000);
initializeClock('clock', deadline);
