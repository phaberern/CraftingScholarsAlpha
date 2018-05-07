// functions to create a timer and convert ugly values into pretty values 
function convertSeconds(inputSeconds) {
    var minutes = Math.floor(inputSeconds / 60);
    var seconds = inputSeconds - (minutes * 60);
    // return calculation
    return (prettifyRemainingTime(minutes, '0', 2) + ':' + prettifyRemainingTime(seconds, '0', 2));
};

function prettifyRemainingTime(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
};

function calculateTestTime(testTime, counter) {
    var timeUsed = convertSeconds(testTime - counter);
    return ("Student took " + timeUsed + " to complete this section");
};

exports.convertSeconds = convertSeconds;
exports.prettifyRemainingTime = prettifyRemainingTime;
exports.calculateTestTime = calculateTestTime;