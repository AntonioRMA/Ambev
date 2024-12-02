import { faker } from '@faker-js/faker';

//--> faker data
Cypress.env('userName', faker.person.firstName());
Cypress.env('userEmail', faker.internet.email());
Cypress.env('userPassword', faker.internet.password());
Cypress.env('productName', faker.commerce.productName());
Cypress.env('productPrice', faker.number.int({ min: 50, max: 2000 }));
Cypress.env('productDescription', faker.lorem.sentence());
Cypress.env('productQuantity', faker.number.int({ min: 1, max: 120 }));

//--> Scenarios

describe('API Test - Login', () => {
    beforeEach(function () {
        //--> Loading fixture data
        cy.fixture('dataTest').then(function (data) {
            this.data = data
        });
    })

    it('should log in successfully', function () {
        cy.request('POST', 'https://serverest.dev/Login', {
            email: this.data.userLogin,
            password: this.data.userPassword
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('authorization');
            // Store the token for later use 
            Cypress.env('authorization', response.body.authorization);
        });
    })
})

describe('API Test - Users', () => {
    it('should register a new user', () => {
        cy.request('POST', 'https://serverest.dev/usuarios', {
            nome: Cypress.env('userName'),
            email: Cypress.env('userEmail'),
            password: Cypress.env('userPassword'),
            administrador: 'false'
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            Cypress.env('userId', response.body._id);
        })
    })

    it('should find new user', () => {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/usuarios/',
            qs: { _id: Cypress.env('userId') }
        }).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body.usuarios).to.be.an('array');
            expect(response.body.usuarios.length).to.be.greaterThan(0);
            expect(response.body.usuarios[0].nome).eq(Cypress.env('userName'));
            expect(response.body.usuarios[0].email).eq(Cypress.env('userEmail'));
            expect(response.body.usuarios[0].password).eq(Cypress.env('userPassword'));
            expect(response.body.usuarios[0].administrador).eq('false');
            expect(response.body.usuarios[0]._id).eq(Cypress.env('userId'));
        });
    })
})
 
describe('API Test - Products', () => {
    it('should register a new product', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos/',
            headers: {
                Authorization: Cypress.env('authorization')
            },
            body: {
                nome: Cypress.env('productName'),
                preco: Cypress.env('productPrice'),
                descricao: Cypress.env('productDescription'),
                quantidade: Cypress.env('productQuantity')
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            Cypress.env('productId', response.body._id)
        })
    })

    it('should get the product by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/produtos/',
            qs: { _id: Cypress.env('productId') }
        }).then((response) => {
            //--> validating that all product parameters have been correctly registered
            expect(response.status).to.eq(200)
            expect(response.body.produtos.length).to.be.greaterThan(0);
            expect(response.body.produtos[0].nome).eq(Cypress.env('productName'));
            expect(response.body.produtos[0].preco).eq(Cypress.env('productPrice'));
            expect(response.body.produtos[0].descricao).eq(Cypress.env('productDescription'));
            expect(response.body.produtos[0].quantidade).eq(Cypress.env('productQuantity'));
        })
    })
})