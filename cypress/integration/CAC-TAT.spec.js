/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('John')

        cy.get('#lastName').type('Doe')

        cy.get('#email').type('john_doe@test.com')

        cy.get('#open-text-area').type('Lorem ipsum')

        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    })
})