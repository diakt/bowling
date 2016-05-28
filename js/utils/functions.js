export function countArray (pins) {
    return pins.reduce(function (acc, score) {
        acc += score;
        return acc;
    }, 0);
}

export function createNode(html) {
    var node = document.createElement('div');
    node.innerHTML = html.trim();
    return node.firstChild;
}

