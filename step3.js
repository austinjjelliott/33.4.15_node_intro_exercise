const fs = require("fs");
// const path = process.argv[2]; //Index 2 is used because the first 2 indices are always node then the script name!
const axios = require("axios");
const process = require("process");

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", (err) => {
      if (err) {
        console.log(`${err} Could not write ${out}`);
        process.exit(1);
      }
      console.log(`Success - Data written to ${out}`);
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      // handle possible error
      console.error(`There is an error:`, err);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    handleOutput(data, out);
  });
}

async function webCat(url, out) {
  try {
    let res = await axios.get(url);
    handleOutput(res.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

// Make sure path/url provided
if (!path) {
  console.error("Must provide a path or URL");
  process.exit(1);
}

if (path.startsWith("http")) {
  webCat(path, out);
} else {
  cat(path, out);
}
