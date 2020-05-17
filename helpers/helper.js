const EC = protractor.ExpectedConditions;
const timeouts = require('../constants/constants.json');

module.exports = {

    teardown() {
        return Promise.all([
            browser.manage().deleteAllCookies(),
            browser.executeScript('window.localStorage.clear();'),
        ]);
    },

    expectCondition(expected, actual, errorMessage) {
        expect(actual).toBe(expected, `ERROR: ${errorMessage}`);
    },

    waitPresence(pageElement, customTimeout) {
        return browser
            .wait(EC.presenceOf(pageElement), customTimeout)
            .then(() => true)
            .catch(() => false);
    },

    waitVisibility(pageElement, customTimeout) {
        return browser
            .wait(EC.visibilityOf(pageElement), customTimeout)
            .then(() => true)
            .catch(() => false);
    },

    waitClickable(pageElement, customTimeout) {
        return browser
            .wait(EC.elementToBeClickable(pageElement), customTimeout)
            .then(() => true)
            .catch(() => false);
    },

    clickElement(pageElement) {
        pageElement.click();
        browser.sleep(timeouts.shortTimeout);
    },

    enterInput(inputElement, value) {
        inputElement
            .click()
            .clear()
            .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a')) 
            .sendKeys(value);
        browser.sleep(timeouts.shortTimeout);
    },

    expectContains(expectedPart, actual, errorMessage) {
        expect(actual).toContain(expectedPart, `ERROR: ${errorMessage}`);
    },

    expectEqual(expectedPart, actual, errorMessage) {
        expect(actual).toEqual(expectedPart, `ERROR: ${errorMessage}`);
    },

    expectNotEqual(expectedPart, actual, errorMessage) {
        expect(actual).not.toEqual(expectedPart, `ERROR: ${errorMessage}`);
    },
};
