describe('Frontend', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('user login and register journey', () => {
        const uuid = () => Cypress._.random(0, 1e10)
        const unique_username = uuid();

        /// Register and Login Buttons do exist and have the correct content.
        cy.get('[data-testid="login-button"]').should($p => {
            expect($p.first()).to.contain('Login');
        });
        cy.get('[data-testid="register-button"]').should($p => {
            expect($p.first()).to.contain('Registrieren');
        });

        /// Register workflow is successful for new user
        cy.get('[data-testid="register-button"]').click();
        cy.url().should('include', '/register');
        cy.get('[data-testid="username-input"]').type(unique_username.toString());
        cy.get('[data-testid="password-input"]').type(unique_username.toString());

        cy.get('[data-testid="submit-form-button"]').click();

        /// Login workflow is successful
        cy.url().should('include', '/login');

        cy.get('[data-testid="username-input"]').type(unique_username.toString());
        cy.get('[data-testid="password-input"]').type(unique_username.toString());

        cy.get('[data-testid="submit-login-button"]').click();
        cy.url().should('include', '/main-menu');

        /// Logout
        cy.get('[data-testid="logout-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl+'/');
    });

    it('full game yourney', () => {
        const uuid = () => Cypress._.random(0, 1e10)
        const unique_username = uuid();

        /// Register and Login Buttons do exist and have the correct content.
        cy.get('[data-testid="login-button"]').should($p => {
            expect($p.first()).to.contain('Login');
        });
        cy.get('[data-testid="register-button"]').should($p => {
            expect($p.first()).to.contain('Registrieren');
        });

        /// Register workflow is successful for new user
        cy.get('[data-testid="register-button"]').click();
        cy.url().should('include', '/register');
        cy.get('[data-testid="username-input"]').type(unique_username.toString());
        cy.get('[data-testid="password-input"]').type(unique_username.toString());

        cy.get('[data-testid="submit-form-button"]').click();

        /// Login workflow is successful
        cy.url().should('include', '/login');

        cy.get('[data-testid="username-input"]').type(unique_username.toString());
        cy.get('[data-testid="password-input"]').type(unique_username.toString());

        cy.get('[data-testid="submit-login-button"]').click();
        cy.url().should('include', '/main-menu');
        cy.get('[data-testid="play-button"]').click();

        /// Play Settings Screen
        cy.get('[data-testid="player-names_form"]').type('nicolas');
        cy.get('[data-testid="start-button"]').click();

        /// Game Screeen
        cy.get('[data-testid="name_header"]').should(
            "to.contain",
            "nicolas"
        );
        cy.get('[data-testid="next-card_button"]').click();
        cy.get('[data-testid="cancel_button"]').click();

        /// Logout
        cy.get('[data-testid="logout-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl+'/');
    });
});
