const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const currDir = __dirname;
const outputPath = path.join(currDir, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCppForRun = (filePath, pretestInput) => {
    console.log(filePath);
    const jobId = path.basename(filePath).split(".")[0];
    const fileName = `${jobId}.exe`;
    const outFilePath = path.join(outputPath, fileName);
    const tempInputFilePath = path.join(outputPath, `${jobId}_input.txt`);

    return new Promise((resolve, reject) => {
        // Compile the code
        exec(`g++ ${filePath} -o ${outFilePath}`, (compileError, stdout, stderr) => {
            if (compileError) {
                return reject(compileError);
            }
            if (stderr) {
                return reject(stderr);
            }

            // Write pretest input data to a temporary file
            fs.writeFile(tempInputFilePath, pretestInput, (writeError) => {
                if (writeError) {
                    return reject(writeError);
                }

                // Execute the compiled code with pretest input
                const command = `cd ${outputPath} && .\\${fileName} < ${tempInputFilePath}`;
                console.log("command: ", command);
                exec(command, (runError, runStdout, runStderr) => {
                    // Cleanup temporary input file
                    fs.unlink(tempInputFilePath, (unlinkError) => {
                        if (unlinkError) {
                            console.error("Error cleaning up temp input file:", unlinkError);
                        }
                    });

                    if (runError) {
                        return reject(runError);
                    }
                    if (runStderr) {
                        return reject(runStderr);
                    }
                    resolve(runStdout);
                });
            });
        });
    });
};

module.exports = executeCppForRun;
