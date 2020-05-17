const helper = require('../helpers/helper.js');
const timeouts = require('../constants/constants.json');

const login = {

    loginURL: '/login',
    logoProton: element(by.xpath('//*[@id="pm_login"]//img')),
    titleUserLogin: element(by.css('[class="mrauto mtauto mbauto"]')),
    inputUsername: element(by.id('username')),
    inputPassword: element(by.id('password')),
    btnLogin: element(by.id('login_btn')),
    modalTitle: element(by.id('modalTitle')),
    btnCloseModal: element(by.css('[class="pm-modalClose-icon icon-16p fill-global-grey"]')),
    sidebar: element(by.id('ptSidebar')),
    btnUserNavigation: element(by.xpath('//*[@id="tour-support"]/div/button')),
    btnLogOut: element(by.xpath('//*[@href="/login"]')),

    goToLogin() {
        browser.get(`${browser.params.baseUrl}${this.loginURL}`);
    },

    verifyLogo() {
        helper.waitVisibility(this.logoProton, timeouts.loginTimeout);
        this.logoProton.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Organization\'s logo is not displayed in /login page',
            );
        });
    },

    verifyTitle() {
        helper.waitVisibility(this.titleUserLogin, timeouts.loadingTimeout);
        this.titleUserLogin.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                '"User login" title is not displayed in /login page',
            );
        });
    },

    logIn(username, password) {
        helper.waitPresence(this.inputUsername, timeouts.loadingTimeout);
        this.inputUsername.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Username input field is missing from /login page',
            );
            if (status) {
                helper.enterInput(this.inputUsername, username);
                helper.waitPresence(this.inputPassword, timeouts.loadingTimeout);
                this.inputPassword.isPresent().then(status => {
                    helper.expectCondition(
                        true,
                        status,
                        'Password input field is missing from /login page',
                    );
                    if (status) {
                        helper.enterInput(this.inputPassword, password);
                        helper.waitPresence(this.btnLogin, timeouts.loadingTimeout);
                        this.btnLogin.isPresent().then(status => {
                            helper.expectCondition(
                                true,
                                status,
                                'Login button is missing from /login page'
                            );
                            if (status) {
                                helper.clickElement(this.btnLogin, 'Login button');
                            }
                        });
                    }
                });
            }
        });
    },

    verifyWelcomeModalTitle() {
        helper.waitVisibility(this.modalTitle, timeouts.loginTimeout);
        this.modalTitle.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Welcome modal title is missing after a log in attempt'
            );
        });
    },

    closeWelcomeModal() {
        helper.waitClickable(this.btnCloseModal, timeouts.loginTimeout);
        this.btnCloseModal.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Close welcome modal button is missing'
            );
            if (status) {
                helper.clickElement(this.btnCloseModal, 'Close welcome modal button');
            }
        });
    },

    verifySidebarArea() {
        helper.waitVisibility(this.sidebar, timeouts.loginTimeout);
        this.sidebar.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'Sidebar is not visible after a login attempt'
            );
        })
    },

    logOut() {
        helper.waitPresence(this.btnUserNavigation, timeouts.loadingTimeout);
        this.btnUserNavigation.isPresent().then(status => {
            helper.expectCondition(
                true,
                status,
                'User navigation button is missing from /inbox page'
            );
            if (status) {
                helper.clickElement(this.btnUserNavigation, 'User navigation button');
                helper.waitPresence(this.btnLogOut, timeouts.loadingTimeout);
                this.btnLogOut.isPresent().then(status => {
                    helper.expectCondition(
                        true,
                        status,
                        'Log out button is missing from user navigation dropdown'
                    );
                    if (status) {
                        helper.clickElement(this.btnLogOut, 'Logout button');
                        helper.waitPresence(this.titleUserLogin, timeouts.loginTimeout);
                        this.titleUserLogin.isPresent().then(status => {
                            helper.expectCondition(
                                true,
                                status,
                                'User login title is missing from /login page'
                            );
                        })
                    }
                });
            }
        });
    },
};
module.exports = login;
