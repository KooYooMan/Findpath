const mapChecking = (table, word) => {
    if (word[0] === "1") {
        const data = table.map(value => parseInt(value));

        let noOne = 0, noTwenty = 0;

        for (let i = 0; i < 64; ++i) {
            if (data[i] <= 0 || data[i] > 20) {
                return "All number must be between 1 and 20";
            }
        }

        for (let i = 0; i < 64; i += 8) {
            if (data[i] === 1) noOne++;
            if (data[i + 7] === 20) noTwenty++;
        }

        if (noOne !== 1 || noTwenty !== 1) {
            return "The table must have exactly 1 number 1 in the first column and 1 number 20 in the last column";
        }

        const dx = [0, 0, -1, 1];
        const dy = [-1, 1, 0, 0];
        let queue = [];
        for (let i = 0; i < 64; i += 8) {
            if (data[i] === 1) {
                queue.push(i);
                break;
            }
        }
        for (let i = 0; ; ++i) {
            if (i >= queue.length) break;
            const cell = queue[i];
            const row = (cell - cell % 8) / 8;
            const column = cell % 8;
            for (let j = 0; j < 4; ++j) {
                const newRow = row + dx[j];
                const newColumn = column + dy[j];
                if (newRow < 0 || newRow >= 8 || newColumn < 0 || newColumn >= 8) continue;
                const newCell = newRow * 8 + newColumn;
                if (data[newCell] !== data[cell] + 1) continue;
                if (queue.includes(newCell)) continue;
                queue.push(newCell);
            }
        }

        for (let i = 0; i < 64; i += 8) {
            if (data[i + 7] === 20) {
                if (queue.includes(i + 7)) return true;
                return "Not existed a valid path";
            }
        }
        return true;
    }

    let noFirst = 0, noLast = 0;

    for (let i = 0; i < 64; ++i) {
        if (table[i].length !== 1 || table[i] < 'A' || table[i] > 'Z') {
            return "Each cell must contain exactly 1 letter";
        }
    }

    for (let i = 0; i < 64; i += 8) {
        if (table[i] === word[0]) noFirst++;
        if (table[i + 7] === word[word.length - 1]) noLast++;
    }

    if (noFirst !== 1 || noLast !== 1) {
        return "The table must have exactly 1 first letter in the first column and 1 last letter in the last column";
    }

    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];
    let queue = [];
    for (let i = 0; i < 64; i += 8) {
        if (table[i] === word[0]) {
            queue.push([i, 0]);
            break;
        }
    }
    for (let i = 0;; ++i) {
        if (i >= queue.length) break;
        const cell = queue[i][0];
        const step = queue[i][1];
        const row = (cell - cell % 8) / 8;
        const column = cell % 8;
        for (let j = 0; j < 4; ++ j) {
            const newRow = row + dx[j];
            const newColumn = column + dy[j];
            if (newRow < 0 || newRow >= 8 || newColumn < 0 || newColumn >= 8) continue;
            const newCell = newRow * 8 + newColumn;
            if (step === word.length - 1 || table[newCell] !== word[step + 1]) continue;
            let inQueue = false;
            for (let k = 0; k < queue.length; ++ k) {
                if (queue[k][0] === newCell) inQueue = true;
            }
            if (inQueue) continue;
            queue.push([newCell, step + 1]);
        }
    }

    for (let i = 0; i < 64; i += 8) {
        if (table[i + 7] === word[word.length - 1]) {
            let inQueue = false;
            for (let k = 0; k < queue.length; ++ k) {
                if (queue[k][0] === i + 7) {
                    inQueue = true;
                    break;
                }
            }
            if (inQueue) return true;
            return "Not existed a valid path";
        }
    }
    return true;
}

export default mapChecking;