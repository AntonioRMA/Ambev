// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- This is a parent command --

function visitLoginPage() {
    cy.fixture('dataTest').then((data) => { //--> using stored url data in fixtures
        cy.log(`URL target: ${data.urlSystemTarget}`);
        cy.visit(data.urlSystemTarget);
    });
}

Cypress.Commands.add('visitLoginPage', () => {
    visitLoginPage();
})

Cypress.Commands.add('loginAdmin', (email, password) => {
    visitLoginPage()
    cy.get('[data-testid="email"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="email"]').type(Cypress.env('adminEmail'));
    cy.get('[data-testid="senha"]').type(Cypress.env('adminPassword'));
    cy.get('[data-testid="entrar"]').click();
})

Cypress.Commands.add('loginAdminByAPI', (email, password) => {
    cy.log(`Admin e-mail: ${email}`);
    cy.log(`Admin password: ${password}`);

    cy.request("POST", "https://serverest.dev/Login", {
        email: email,
        password: password
    }).then((response) => {
        window.localStorage.setItem('serverest/userToken', response.body.authorization);
    });

    cy.visit("https://front.serverest.dev/admin/home");
})

Cypress.Commands.add('loginUser', (email, password) => {
    visitLoginPage()

    cy.log(`User e-mail: ${email}`);
    cy.log(`User password: $(password)`);

    cy.get('[data-testid="email"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="senha"]').type(password);
    cy.get('[data-testid="entrar"]').click();
})

Cypress.Commands.add('loginUserByAPI', (email, password) => {
    cy.log(`User e-mail: ${email}`);
    cy.log('User password: ${password}');

    cy.request('POST', 'https://serverest.dev/Login', {
        email: email,
        password: password
    }).then((response) => {
        window.localStorage.setItem('serverest/userToken', response.body.authorization);
    });

    cy.visit("https://front.serverest.dev/home");
})