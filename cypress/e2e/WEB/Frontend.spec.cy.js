import { faker } from '@faker-js/faker';

//--> faker data
Cypress.env('userName', faker.person.firstName());
Cypress.env('userEmail', faker.internet.email());
Cypress.env('userPassword', faker.internet.password());
Cypress.env('adminName', faker.person.firstName());
Cypress.env('adminEmail', faker.internet.email());
Cypress.env('adminPassword', faker.internet.password());
Cypress.env('productName', faker.commerce.productName());
Cypress.env('productPrice', faker.number.int({ min: 50, max: 2000 }));
Cypress.env('productDescription', faker.lorem.sentence());
Cypress.env('productQuantity', faker.number.int({ min: 1, max: 120 }));

//--> Scenarios

describe('User management', () => {
  it('Create new Admin', () => {
    cy.visitLoginPage();

    createAdmin();
  });

  it('Create new User', () => {
    cy.loginAdminByAPI(Cypress.env('adminEmail'), Cypress.env('adminPassword'));

    createUser();
  });
})

describe('Admin - Product Management', () => {
  before(() => {
    cy.loginAdminByAPI(Cypress.env('adminEmail'), Cypress.env('adminPassword'));
  })

  it('Register product', () => {
    registerNewProduct();
  });
})

describe('User - Products view', () => {
  before(() => {
    cy.loginUserByAPI(Cypress.env('userEmail'), Cypress.env('userPassword'));
  })

  it('Product details', () => {
    productValidation();
  })
})

//--> Functions

function createAdmin() {
  cy.log(`Admin name: $(Cypress.env('adminName'))`);
  cy.log(`Admin e-mail: $(Cypress.env('adminEmail'))`);
  cy.log(`Admin password: $(Cypress.env('adminPassword'))`);

  cy.get('[data-testid="cadastrar"]').click();
  cy.get('[data-testid="nome"]').type(Cypress.env('adminName'));
  cy.get('[data-testid="email"]').type(Cypress.env('adminEmail'));
  cy.get('[data-testid="password"]').type(Cypress.env('adminPassword'));
  cy.get('[data-testid="checkbox"]').click();
  cy.get('[data-testid="cadastrar"]').click();

  //--> verifying that the registration information has been displayed
  cy.get('.alert').should('be.visible');
}

function createUser() {
  //--> verifying that the Home screen is being displayed
  cy.get('h1', { timeout: 10000 }).should('contain', 'Bem Vindo');

  //--> accessing the user registration form
  cy.get('[data-testid="cadastrar-usuarios"]').click();

  cy.log(`User name: $(Cypress.env('userName'))`);
  cy.log(`User e-mail: $(Cypress.env('userEmail'))`);
  cy.log(`User password: $(Cypress.env('userPassword'))`);

  cy.get('[data-testid="nome"]', { timeout: 10000 }).should('be.visible');
  cy.get('[data-testid="nome"]').type(Cypress.env('userName'));
  cy.get('[data-testid="email"]').type(Cypress.env('userEmail'));
  cy.get('[data-testid="password"]').type(Cypress.env('userPassword'));
  cy.get('[data-testid="cadastrarUsuario"]').click();

  //--> validating if the User List screen has been loaded
  cy.get('h1', { timeout: 10000 }).should('contain', 'Lista dos usuários');

  //--> validating that the name, email and password data were correctly registered
  cy.get('tbody > tr').each(($row) => { }).then(($rows) => {
    // check if all registered data appears on the same line
    const founds = Array.from($rows, row => {
      const tds = row.querySelectorAll('td')
      return (
        tds[0].textContent.includes(Cypress.env('userName')) &&
        tds[1].textContent.includes(Cypress.env('userEmail')) &&
        tds[2].textContent.includes(Cypress.env('userPassword')) &&
        tds[3].textContent.includes('false')
      )
    })
    expect(founds.some(found => found === true)).to.be.true;
  })
}

function registerNewProduct() {
  cy.log(`Product name: $(Cypress.env('productName'))`);
  cy.log(`ProductPrice: $(Cypress.env('productPrice'))`);
  cy.log(`Product Description: $(Cypress.env('productDescription'))`);
  cy.log(`Product Quantityy: $(Cypress.env('productQuantity'))`);

  cy.get('[data-testid="cadastrarProdutos"]', { timeout: 10000 }).should('be.visible').click();
  cy.get('[data-testid="nome"]', { timeout: 10000 }).should('be.visible').type(Cypress.env('productName'));
  cy.get('[data-testid="preco"]').type(Cypress.env('productPrice'));
  cy.get('[data-testid="descricao"]').type(Cypress.env('productDescription'));
  cy.get('[data-testid="quantity"]').type(Cypress.env('productQuantity'));
  cy.get('[data-testid="cadastarProdutos"]').click();

  //--> validating if the Product List screen has been loaded
  cy.get('h1', { timeout: 10000 }).should('contain', 'Lista dos Produtos');

  //--> validating that the name, price, description and quantity data were correctly registered
  cy.get('tbody > tr').each(($row) => { }).then(($rows) => {
    // check if all registered data appears on the same line
    const founds = Array.from($rows, row => {
      const tds = row.querySelectorAll('td')
      return (
        tds[0].textContent.includes(Cypress.env('productName')) &&
        tds[1].textContent.includes(Cypress.env('productPrice')) &&
        tds[2].textContent.includes(Cypress.env('productDescription')) &&
        tds[3].textContent.includes(Cypress.env('productQuantity'))
      )
    })
    expect(founds.some(found => found === true)).to.be.true;
  })
}

function productValidation() {
  cy.get('[data-testid="pesquisar"]', { timeout: 10000 }).should('be.visible');

  cy.log(`Product search criteria: $(Cypress.env('productName'))`);

  //--> performing product search
  cy.get('[data-testid="pesquisar"]').type(Cypress.env('productName'));
  cy.get('[data-testid="botaoPesquisar"]').click();

  //--> validating product card view
  cy.get('.card-title', { timeout: 10000 }).should('contain', Cypress.env('productName'));
  cy.get('.card-body > :nth-child(5)').should('contain', Cypress.env('productPrice'));

  cy.get('.card-link').click(); //--> accessing product details

  //--> validation product details
  cy.get('[data-testid="product-detail-name"]', { timeout: 10000 }).should('contain', Cypress.env('productName'));
  cy.get('.especificacoes > :nth-child(2)').should('contain', Cypress.env('productPrice'));
  cy.get('.especificacoes > :nth-child(3)').should('contain', Cypress.env('productQuantity'));
  cy.get('.especificacoes > :nth-child(4)').should('contain', Cypress.env('productDescription'));
}