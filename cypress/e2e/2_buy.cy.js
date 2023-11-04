/// <reference types="cypress" />
import {faker} from '@faker-js/faker';

describe('Visit saucedemo.com', () => {
    before(() => {
      cy.visit(Cypress.env('baseUrl'))
      cy.get('#user-name').type(Cypress.env('users').valid.username)
      cy.get('#password').type(Cypress.env('users').valid.password)
      cy.get('#login-button').click()
      cy.get('#inventory_container').should('be.visible')
    })
  
    it('add to cart', () => {
      cy.fixture('items.json').then((itemFixture) => {
        cy.contains('.inventory_item_description',itemFixture.item)
        .within(() => {
          cy.get('button').contains('Add to cart').click()
        })
      })
      cy.get('.shopping_cart_link').click()
      cy.get('.title').should('contain.text','Your Cart')
      cy.get('#checkout').click()
      cy.get('#first-name').type(faker.person.firstName())
      cy.get('#last-name').type(faker.person.lastName())
      cy.get('#postal-code').type(faker.location.zipCode())
      cy.get('#continue').click()
      cy.get('.title').should('contain.text','Checkout: Overview')
      cy.get('#finish').click()
      cy.get('.complete-header').should('contain.text','Thank you for your order!')
    })
  })
  