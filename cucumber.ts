let options = [
    '--parallel 3',
    '--publish-quiet',
    '--require ./src/**/*.ts', // Load step definitions
    '--require-module ts-node/register', // fix problem import output module 
    '--format json:./outputs/reports/json/cucumber-report.json', //  Path for cucumber report json format
    '--exit'
].join(' ');

let run_features = [
    './features/', // Specify our feature files
    options,
].join(' ');

//export { run_features as test_runner };
module.exports = {
    test_runner: run_features
};