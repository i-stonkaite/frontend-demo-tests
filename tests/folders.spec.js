const login = require('../pages/login.po');
const folders = require('../pages/folders.po');
const helper = require('../helpers/helper.js');
const testData = require('../constants/scenarioData.json');

let randomizedFolderName = testData.folders.folderName + Math.floor((Math.random() * 1000) + 1);

describe('Folders page ', () => {
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

    it('Expect a successful succesfull login', () => {
        login.goToLogin();
        login.logIn(testData.login.username, testData.login.password);
        login.closeWelcomeModal();
    });

    it('Expect successful navigation to "Folders/labels" menu item', () => {
        folders.navigateToFolderLabel();
    });

    it('Expect successful folder creation', () => {
        folders.createFolder(randomizedFolderName);
    });

    it('Expect a newly created folder to appear in folder\'s list', () => {
        folders.verifyNewlyCreatedFolder(randomizedFolderName);
    });

    it('Expect to edit folder\'s name', () => {
        folders.editFolderName(testData.folders.changedName)
    });

    it('Expect edited folder\'s name to be visible', () => {
        folders.verifyChangedFolderName(testData.folders.changedName)
    });

    it('Expect to delete a folder from a list', () => {
        folders.deleteFolderLabel();
    });

    it('Expect deleted folder to be no longer visibe in the folders/labels list', () => {
        folders.verifyFolderLabelDetele(testData.folders.changedName);
    });
});
