export function debouncedFunction(fn, time) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            return fn(...args);
        }, time);
    };
}
export function formatDate(isoString) {
    const date = new Date(isoString);
    // Options for formatting
    const options = {
        year: "numeric",
        month: "long", // full month name
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC", // since your input ends with Z (UTC time)
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}
