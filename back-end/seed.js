const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
dotenv.config();

const collectionspath = path.resolve(__dirname, "collections");
const collections = fs.readdirSync(collectionspath);

function readFileContent(filename) {
  const fileContent = fs.readFileSync(path.join(collectionspath, filename));

  console.log(fileContent.toString());
}

function seed() {
  cosnt;
  for (const collectionFile of collections) {
    readFileContent(collectionFile);
  }
}

seed();
