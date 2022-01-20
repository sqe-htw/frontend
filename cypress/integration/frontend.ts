describe('Frontend', () => {
    beforeEach(() => {

        /// Backend starten

        /// Spawn, in Hintergrund Thread backend startenng test --no-watch --code-coverage

        cy.visit('/');
    });

    it('has the correct title', () => {
        cy.title().should('equal', 'Drinking Game');
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
});
