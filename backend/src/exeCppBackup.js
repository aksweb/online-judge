const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid")
const { exec } = require("child_process")

const currDir = __dirname;
const outputPath = path.join(currDir, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}
const executeCpp = (filePath) => {
    console.log(filePath);
    const jobId = path.basename(filePath).split(".")[0];
    const fileName = `${jobId}.exe`;
    const outFilePath = path.join(outputPath, fileName);
    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outFilePath} && cd ${outputPath} && .\\${fileName}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);
        })
    })
};
module.exports = executeCpp;