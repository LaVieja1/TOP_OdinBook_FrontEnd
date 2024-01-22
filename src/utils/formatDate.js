function formatTimeDifference(inputDate) {
    const currentDate = new Date();
    const inputTime = new Date(inputDate);
    const timeDifference = currentDate - inputTime;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44)); // Average number of days in a month
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25)); // Average number of days in a year

    if (minutes < 60) {
        return `${minutes}m`;
    } else if (hours < 24) {
        return `${hours}h`;
    } else if (days < 7) {
        return `${days}d`;
    } else if (weeks < 4) {
        return `${weeks}s`
    } else if (months < 12) {
        return `${months}m`;
    } else {
        return `${years}a`;
    }
}

export default formatTimeDifference;