const fs = require("fs");
const path = process.argv[2]; //Index 2 is used because the first 2 indices are always node then the script name!
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      // handle possible error
      console.error(`There is an error:`, err);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    console.log(`${data}`);
  });
}

async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`Error fetcing ${url}: ${err}`);
    process.exit(1);
  }
}

if (path.startsWith("http")) {
  webCat(path);
} else {
  cat(path);
}
