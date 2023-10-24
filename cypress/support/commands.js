Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john_doe@test.com')
    cy.get('#open-text-area').type('Teste')

    cy.get('button[type="submit"]').click()
})