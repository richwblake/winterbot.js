const fs = require('node:fs');

module.exports = {
    writeInteractionToFile(content) {
        fs.appendFileSync('./interactions.json', (content + ",\n\n"), err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Wrote ' + JSON.stringify(content) + ' to interactions.json');
            }
        });
    }
};
