

// Cypress.Commands.add('generateFixture', () => {
//     const { faker } = require('@faker-js/faker');
    
//     cy.writeFile('cypress/fixtures/credentials.json', {
//       'person':Cypress._.times(1, () => {
//         return {
//             'firstName' : `${faker.person.firstName()}`,
//             'lastName' : `${faker.person.lastName()}`,
//             'bdate' : `${faker.date.birthdate()}`,
//             'email' : `${faker.internet.email()}`,
//             'password' : `${faker.internet.password()}`,
//             'streetAddress' : `${faker.location.streetAddress()}`,
//             'zipCode' : `${faker.location.zipCode()}`,
//             'city' : `${faker.location.city()}`,
//             'state' : `${faker.location.state()}`,
//             'country': `${faker.location.country()}`,
//             'phone': `${faker.phone.number()}`,
//             'email': `${faker.internet.email()}`,
//             'password': `${faker.internet.password()}`,
//         }
//       })
//     })
//   })

  Cypress.Commands.add('generateFixture', () => {
    const { faker } = require('@faker-js/faker');
    
    cy.writeFile('cypress/fixtures/credentials.json', {
            firstName : `${faker.person.firstName()}`,
            lastName : `${faker.person.lastName()}`,
            bdate : `${faker.date.birthdate()}`,
            email : `${faker.internet.email()}`,
            password : `${faker.internet.password()}`,
            streetAddress : `${faker.location.streetAddress()}`,
            zipCode : `${faker.location.zipCode()}`,
            city : `${faker.location.city()}`,
            state : `${faker.location.state()}`,
            country: `${faker.location.country()}`,
            phone: `${faker.phone.number()}`,
            email: `${faker.internet.email()}`,
            password: `${faker.internet.password()}`,
            accountNumber: `${faker.finance.accountNumber()}`,
    })
  })