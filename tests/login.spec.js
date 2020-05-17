const login = require('../pages/login.po');
const helper = require('../helpers/helper.js');
const testData = require('../constants/scenarioData.json').login;

describe('Login page ', () => {
  beforeAll(async () => {
    browser.waitForAngularEnabled(false);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterAll(done => {
    helper
      .teardown(browser)
      .then(done)
      .catch(done);
  });

  it('Expect successful navigation to a /login page', () => {
    login.goToLogin();
  });

  it('Expect organization\'s logo to be displayed in /login page', () => {
    login.verifyLogo();
  });

  it('Expect organization\'s title to be displayed in /login page', () => {
    login.verifyTitle();
  });

  it('Expect successful login', () => {
    login.logIn(testData.username, testData.password);
  });

  it('Expect a welcome modal title to be visible after a successful login', () => {
    login.verifyWelcomeModalTitle();
  });

  it('Expect a welcome modal to close when a close button is clicked', () => {
    login.closeWelcomeModal();
  });

  it('Expect a sidebar to be visible after a successful login', () => {
    login.verifySidebarArea();
  });

  it('Expect a successful log out', () => {
    login.logOut();
  });  
});
