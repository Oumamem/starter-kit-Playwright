import { generate } from 'cucumber-html-reporter';


const currentDate = new Date().toLocaleDateString();

var options: any = {
    theme: 'hierarchy',
    jsonDir: 'outputs/reports/json/',
    output: 'outputs/reports/cucumber-report.html',
    screenshotsDirectory: 'test-results/screenshots/',
    storeScreenshots: false,
    reportSuiteAsScenarios: true,
    launchReport: true,
    scenarioTimestamp: true,
    metadata: {
        "Test Environment": 'Qualif',
        "Date": currentDate
    }
};

generate(options);