'use strict';

const Buffer = require('buffer');

export const sortScores = (scores) => {
    return quickSortScores(scores, 0, scores.length - 1);
}

export const base64Encode = (str) => {
    return base64Enc(str);
}

const partition = (scores, p, q) => {
    const x = new Date(scores[q].date);
    let i = p - 1;
    for (let j = p; j < q; ++j) {
        if (new Date(scores[j].date).getTime() <= x.getTime()) {
            i += 1;
            [scores[j], scores[i]] = [scores[i], scores[j]];
        }
    }
    [scores[i + 1], scores[q]] = [scores[q], scores[i + 1]];
    return i + 1;
}

const quickSortScores = (scores, p, q) => {
    if (p >= q) return scores;
    const i = partition(scores, p, q);
    scores = quickSortScores(scores, p, i - 1);
    scores = quickSortScores(scores, i + 1, q);
    return scores;
}

const base64Enc = (str) => {
    const buff = Buffer.Buffer.from(str);
    return buff.toString('base64');
}
