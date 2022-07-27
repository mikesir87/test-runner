const jest = require("jest");
const tmp = require("tmp");
const { publishEvent } = require("../eventBus");
const { getSuite, fetchSuites } = require("./suites");

let runData = null;

const getRuns = (req, res) => {
  res.send(getRunData());
};

function getRunData() {
  if (runData === null) {
    runData = fetchSuites().map(s => ({ id: s.id, state: "unknown" }));
  }
  return runData;
}

const startRun = (req, res) => {
  const { suiteId } = req.body;

  const suite = getSuite(suiteId);
  if (!suite)
    return res.status(404).send({ message: "No matching suite found" });

  if (suite.runner === "jest") {
    updateResults(suiteId, "running", null);

    const tmpFile = tmp.fileSync();
    jest.run(["--detectOpenHandles", "--no-colors", "--json", `--outputFile=${tmpFile.name}.json`, `--rootDir=/tests/${suite.id}`]).then((d) => {
      const results = require(`${tmpFile.name}.json`);
      tmpFile.removeCallback();
      const success = results.numFailedTests === 0;

      if (success) {
        updateResults(suiteId, "success", results.testResults);
        return res.send({
          success, results: results.testResults,
        });
      }

      const failedTests = results.testResults.map(r => {
        return r.assertionResults.filter(ar => ar.status !== "passed")
          .map(ar => ar.fullName);
      }).flat();

      updateResults(suiteId, "failure", results.testResults);
      res.send({
        success,
        failedTests,
        results: results.testResults,
      });
    }).catch((e) => {
      console.error(e);
      updateResults(suiteId, "error");
      res.send({ success: false, message: "Unknown error occurred" });
    });
  }
};

function updateResults(suiteId, newState, results) {
  runData = getRunData().filter(d => d.id !== suiteId)
    .concat([ { id: suiteId, state: newState, results }]);
  publishEvent({ type: "runs", runs: runData });
}

module.exports = {
  getRuns,
  startRun,
};