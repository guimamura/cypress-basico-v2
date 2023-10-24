/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('#email').type('john_doe@test.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('#email').type('john_doe@test,com')
        cy.get('#open-text-area').type('Teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('#email').type('john_doe@test.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('John')
            .should('have.value', 'John')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Doe')
            .should('have.value', 'Doe')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('john_doe@test.com')
            .should('have.value', 'john_doe@test.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11987654321')
            .should('have.value', '11987654321')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
})