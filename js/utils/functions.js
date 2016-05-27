export function countArray (pins) {
    return pins.reduce(function (acc, score) {
        acc += score;
        return acc;
    }, 0);
}
