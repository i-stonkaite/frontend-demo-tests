const helper = require('../helpers/helper.js');
const timeouts = require('../constants/constants.json');

const labels = {

    btnFolderLabel: element(by.id('tour-label-settings')),
    titleFolderLabel: element(by.css('[class="sticky-title sticky-title--onTop"]')),
    btnAddFolder: element(by.xpath('//button[text()="Add folder"]')),
    inputFolderName: element(by.id('accountName')),
    btnSave: element(by.xpath('//button[text()="Save"]')),
    btnEditLastElement: element.all(by.css('[class="pm-button pm-group-button pm-button--small"]')).last(),
    btnOpenDropdown: element.all(by.css('[class="flex-item-noshrink pm-button pm-group-button pm-button--for-icon pm-button--small"]')).last(),
    btnDelete: element(by.css('[class="dropDown-item-button w100 pr1 pl1 pt0-5 pb0-5 alignleft"]')),
    lastElementListFolderLabel: element.all(by.css('[class="ellipsis"]')).last(),
    firstElementListFolderLabel: element.all(by.css('[class="ellipsis"]')).first(),

    navigateToFolderLabel() {
        helper.waitPresence(this.btnFolderLabel, timeouts.loadingTimeout);
        this.btnFolderLabel.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Folder/Label button is missing from the sidebar'
            );
            if (status) {
                helper.clickElement(this.btnFolderLabel, 'Folder/Label button in the sidebar');
                helper.waitVisibility(this.titleFolderLabel, timeouts.loadingTimeout);
                this.titleFolderLabel.isPresent().then(status => {
                    helper.expectCondition(
                        true,
                        status,
                        'Folder/Label title is missing'
                    );
                });
            }
        });
    },

    createFolder(folderName) {
        helper.waitPresence(this.btnAddFolder, timeouts.loadingTimeout);
        this.btnAddFolder.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Add folder button is missing'
            );
            if (status) {
                helper.clickElement(this.btnAddFolder, 'Add folder button');
                helper.waitPresence(this.inputFolderName, timeouts.loadingTimeout);
                this.inputFolderName.isPresent().then(status => {
                    helper.expectCondition(
                        true,
                        status,
                        'Folder name input field is missing'
                    );
                    if (status) {
                        helper.enterInput(this.inputFolderName, folderName);
                        helper.waitPresence(this.btnSave, timeouts.loadingTimeout);
                        this.btnSave.isPresent().then(status => {
                            helper.expectCondition(
                                true,
                                status,
                                'Save button is missing from create a folder modal'
                            );
                            if (status) {
                                helper.clickElement(this.btnSave, 'Save button');
                            }
                        });
                    }
                });
            }
        });
    },

    verifyNewlyCreatedFolder(folderName) {
        helper.waitVisibility(this.lastElementListFolderLabel, timeouts.loadingTimeout);
        this.lastElementListFolderLabel.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Last created folder/label is missing'
            );
            this.lastElementListFolderLabel.getText().then(text => {
                helper.expectEqual(
                    folderName,
                    text,
                    'Newly created folder name doesn\'t match the last created folder name in folder\'s list'
                );
            });
        });
    },

    editFolderName(changedName) {
        helper.waitPresence(this.btnEditLastElement, timeouts.loadingTimeout);
        this.btnEditLastElement.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Edit button of the newest created folder/label is missing'
            );
            if (status) {
                helper.clickElement(this.btnEditLastElement, 'Edit button of the newest created folder/label');
                helper.waitPresence(this.inputFolderName, timeouts.loadingTimeout);
                this.inputFolderName.isPresent().then(status => {
                    helper.expectCondition(
                        true,
                        status,
                        'Edit folder name input field is missing'
                    );
                    if (status) {
                        helper.enterInput(this.inputFolderName, changedName);
                        helper.waitPresence(this.btnSave, timeouts.loadingTimeout);
                        this.btnSave.isPresent().then(status => {
                            helper.expectCondition(
                                true,
                                status,
                                'Save button is missing from edit folder name modal'
                            );
                            if (status) {
                                helper.clickElement(this.btnSave, 'Save button');
                            }
                        });
                    }
                })
            }
        });
    },

    verifyChangedFolderName(changedName) {
        helper.waitVisibility(this.lastElementListFolderLabel, timeouts.loadingTimeout);
        this.lastElementListFolderLabel.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Last created folder/label is missing'
            );
            this.lastElementListFolderLabel.getText().then(text => {
                helper.expectEqual(
                    changedName,
                    text,
                    'Edited name is not displayed in folder/label list'
                );
            });
        });
    },

    changeFolderOrder() {
        // browser.actions().
        // mouseMove(startPoint.getWebElement(), {x: 0, y: 0}).
        // mouseDown().
        // mouseMove(endPoint.getWebElement()).
        // mouseUp().
        // perform(); 
        // browser.actions().dragAndDrop(
        // 	element(by.xpath("/html/body/div/div[2]/div/div/div[2]/div/main/div/section[1]/ul/li[3]/div")),
        // 	element(by.xpath("/html/body/div/div[2]/div/div/div[2]/div/main/div/section[1]/div[3]"))
        // ).perform();       

        /* browser
    .actions()
    .dragAndDrop(element1, element2)
    .perform();
browser.sleep(5000); */

        browser.actions().
            mouseDown(element(by.xpath("/html/body/div/div[2]/div/div/div[2]/div/main/div/section[1]/ul/li[3]/div"))).
            mouseMove(element(by.xpath("/html/body/div/div[2]/div/div/div[2]/div/main/div/section[1]/div[3]"))).
            mouseDown().
            perform();

        browser.sleep(5000);


    },

    deleteFolderLabel() {
        helper.waitPresence(this.btnOpenDropdown, timeouts.loadingTimeout);
        this.btnOpenDropdown.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Button to open folder\'s dropdown menu is missing'
            );
            if (status) {
                helper.clickElement(this.btnOpenDropdown, 'Folder\'s dropdown menu button');
                helper.waitPresence(this.btnDelete, timeouts.loadingTimeout);
                this.btnDelete.isPresent().then(status => {
                    helper.expectCondition(
                        true,
                        status,
                        'Delete folder button is missing'
                    );
                    if (status) {
                        helper.clickElement(this.btnDelete, 'Folder\'s dropdown menu button');
                    }
                });
            }
        });
    },

    verifyFolderLabelDetele(changedName) {
        helper.waitVisibility(this.lastElementListFolderLabel, timeouts.loadingTimeout);
        this.lastElementListFolderLabel.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Last created folder is missing'
            );
            this.lastElementListFolderLabel.getText().then(text => {
                helper.expectNotEqual(
                    changedName,
                    text,
                    'Deleted folder is still visible in folder\'s list'
                );
            });
        });
    },
};
module.exports = labels;
