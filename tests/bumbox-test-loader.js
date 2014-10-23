/* globals requirejs, require */

function testShouldBeLoaded(name) {
  return isTestFile(name) && testStepIsBeforeUrlParam(name);
}

function jshintFileShouldBeLoaded(name) {
  return !QUnit.urlParams.nojshint && name.match(/\.jshint$/);
}

function isTestFile(name) {
  return name.match(/[-_]test$/);
}

function paddedStepNumber(name) {
  return name.match(/step-(\d+)-test$/)[1];
}

function testStepIsBeforeUrlParam(name) {
  var param = QUnit.urlParams['up-to-step'];
  // If nothing is selected include all steps
  if (!param) { return true; }

  var stepNumber = Number(paddedStepNumber(name));
  var upToStepNumber = Number(param);
  return stepNumber <= upToStepNumber;
}

// Collect all the files that match the test file pattern.
var availableTestFiles = Object.keys(requirejs.entries).filter(isTestFile);

// Collect a list of steps from all the test files
var availableStepValues = availableTestFiles.map(paddedStepNumber);

// Add config option to select what step a student is at in the course.
QUnit.config.urlConfig.push({
  id: "up-to-step",
  label: "Up to step",
  value: availableStepValues,
  tooltip: "Pick the step that you are curently working on"
});

// Add config option to disable jshint
QUnit.config.urlConfig.push({ id: 'nojshint', label: 'Disable JSHint'});

// Load correct modules for testing
availableTestFiles.forEach(function(moduleName) {
  if (testShouldBeLoaded(moduleName) || jshintFileShouldBeLoaded(moduleName)) {
    require(moduleName);
  }
});

if (QUnit.notifications) {
  QUnit.notifications({
    icons: {
      passed: '/assets/passed.png',
      failed: '/assets/failed.png'
    }
  });
}
