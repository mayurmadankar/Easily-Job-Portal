// Please don't change the pre-written code
// Import the necessary modules here
import fs from "fs";

const fsPromises = fs.promises;
// Write your code here
async function log(logData) {
  try {
    logData = `\n\n${new Date().toString()}\n${logData}`;
    await fsPromises.appendFile("log.txt", logData);
  } catch (err) {
    console.log(err);
  }
}

export const loggerMiddleware = async (req, res, next) => {
  // Write your code here
  const logData = `req URL : ${req.url}\nreqBody : ${JSON.stringify(req.body)}`;
  await log(logData);
  next();
};
export default loggerMiddleware;
