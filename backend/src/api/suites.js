const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const TEST_DIR = process.env.TEST_DIR || "/tests";

let suites = [];

function getSuites(req, res) {
  fetchSuites();
  res.send(suites);
}

function getSuite(suiteId) {
  return fetchSuites().find(s => s.id === suiteId);
}

function fetchSuites() {
  suites = fs.readdirSync(TEST_DIR)
    .filter(file => fs.statSync(path.join(TEST_DIR, file)).isDirectory())
    .filter(folderName => {
      if (!fs.existsSync(path.join(TEST_DIR, folderName, "suite.yaml"))) {
        console.error(`No suite.yaml file found in '${folderName}'`);
        return false;
      }
      return true;
    })
    .map(folderName => ({
      id: folderName,
      ...yaml.parse(fs.readFileSync(path.join(TEST_DIR, folderName, "suite.yaml"), "utf8"))
    }));
  return suites;
}

module.exports = {
  getSuite,
  getSuites,
  fetchSuites,
};