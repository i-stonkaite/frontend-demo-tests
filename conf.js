const DEFAULT_BASE_URL = 'https://beta.protonmail.com';

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,

  onPrepare() {
    browser.driver
      .manage()
      .window()
      .setSize(1600, 960);
  },

  suites: {
    // loginPage: './tests/login.spec.js',
    foldersPage: './tests/folders.spec.js'
  },

  capabilities: {
    browserName: 'firefox'
  },

  params: {
    baseUrl: process.env.BASE_URL || DEFAULT_BASE_URL,
  },
};