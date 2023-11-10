/// <reference types="cypress" />


/** 
 * I plan to separate the registering, the logging in, and adding to cart
 * but it seems the site does not remember the accounts made when the broswer is closed per test file
 * so I combined all of the in one for now.
*/ 

describe('register and buy @ https://practicesoftwaretesting.com/', () => {
  before(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.generateFixture()
  })

  it('register valid account', () => {
    cy.get('[data-test="nav-sign-in"]').click()
    cy.get('[data-test="register-link"]').click()
   cy.fixture('credentials').then((creds) => {
      var birthdate = new Date(creds.bdate)
      cy.get('[data-test="first-name"]').type(creds.firstName)
      cy.get('[data-test="last-name"]').type(creds.lastName)
      cy.get('[data-test="dob"]').type(`${birthdate.getFullYear()}-${('0' + (birthdate.getMonth()+1)).slice(-2)}-${('0' + birthdate.getDate()).slice(-2)}`)
      cy.get('[data-test="address"]').type(creds.streetAddress)
      cy.get('[data-test="postcode"]').type(creds.zipCode)
      cy.get('[data-test="city"]').type(creds.city)
      cy.get('[data-test="state"]').type(creds.state)
      //cy.get('[data-test="country"]').select(creds.country)
      cy.get('[data-test="country"]').select("Belgium") // There are countries not listed on the site so I hardcoded this one for now
      cy.get('[data-test="phone"]').type(creds.phone.replace(/\D/g,''))
      cy.get('[data-test="email"]').type(creds.email)
      cy.get('[data-test="password"]').type(creds.password)
    })
    cy.get('[data-test="register-submit"]').click()
    cy.get('[data-test="login-submit"]').should('be.visible')
  })
  it('login valid account', () => {
    //cy.get('[data-test="nav-sign-in"]').click()
    cy.fixture('credentials').then((creds) => {
      cy.get('[data-test="email"]').type(creds.email)
      cy.get('[data-test="password"]').type(creds.password)
    })
    cy.get('[data-test="login-submit"]').click()
    cy.get('[data-test="page-title"]').should('be.visible')
  })

  it('add to cart', () => {
    cy.get('[data-test="nav-categories"]').click()
    cy.get('[data-test="nav-hand-tools"]').should('be.visible').click()
    cy.fixture('items.json').then((itemFixture) => {
      cy.get('.col-md-9 > .container').within(() => {
          cy.get('[data-test="product-name"]').first().click()
        })
      cy.get('[data-test="add-to-cart"]').should('be.visible').click()
      cy.get('[data-test=cart-quantity]', { timeout: 10000 }).should('have.text','1').click()
      //cy.get('.product-title').should('eq',itemFixture.item)
    })

    cy.get('[data-test="proceed-1"]', { timeout: 10000 }).should('be.enabled').click()
    cy.get('[data-test="proceed-2"]', { timeout: 10000 }).should('be.enabled').click()
    cy.get('[data-test="proceed-3"]', { timeout: 10000 }).should('be.enabled').click()
    cy.get('[data-test="payment-method"]').select("Credit Card")
    cy.fixture('credentials').then((creds) => {
      cy.get('[data-test="account-name"]').type(`${creds.firstName} ${creds.lastName}`)
      cy.get('[data-test="account-number"]').type(creds.accountNumber)
    })
    cy.get('[data-test="finish"]', { timeout: 10000 }).should('be.enabled').click()

  })

})
