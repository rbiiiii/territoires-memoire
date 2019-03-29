export function getCurrentTime() {
    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    let hours = new Date().getHours() + 1
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let currentTime = pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)

    return currentTime
}