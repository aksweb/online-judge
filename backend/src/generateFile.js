const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid")

const currDir = __dirname;
const codeDir = path.join(currDir, "codes");

if (!fs.existsSync(codeDir)) {
    fs.mkdirSync(codeDir, { recursive: true });
}
const generateFile = (language, code) => {
    const jobID = uuid();
    const fileName = `${jobID}.${language}`
    const filePath = path.join(codeDir, fileName)
    console.log(jobID);
    fs.writeFileSync(filePath, code);
    console.log("writtem");
    return filePath;
};
module.exports = generateFile;