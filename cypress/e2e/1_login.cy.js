/// <reference types="cypress" />

describe('Visit saucedemo.com', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  it('login valid account', () => {
    cy.get('#user-name').type(Cypress.env('users').valid.username)
    cy.get('#password').type(Cypress.env('users').valid.password)
    cy.get('#login-button').click()
    cy.get('#inventory_container').should('be.visible')
  })

})
