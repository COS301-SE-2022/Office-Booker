const glob = require('glob');
const fs = require('fs');
const path = require('path');

const getLcovFiles = function(src) {
    return new Promise((resolve, reject) => {
        glob(`${src}/**/lcov.info`, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    })
};

(async function() {
    var files = await getLcovFiles('coverage');

    const mergedReport = files.reduce((mergedReport, currFile) => mergedReport += fs.readFileSync(currFile), '');
    const mergedFile = path.resolve('./coverage/lcov.info');

    // remove old merged file
    if (fs.existsSync(mergedFile)) {
        fs.unlinkSync(mergedFile);
    }

    await fs.writeFile(mergedFile, mergedReport, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
})();