describe('Terminal portfolio suite', () => {
  beforeEach(() => {
    cy.visit('https://juanmanuelsanjurjodev.netlify.app/terminal-portfolio/')
    cy.title().should('equal', 'Terminal resume')

  })
 
  it("should send me to web cv tab", () => {
    cy.get('.terminal-input').type("cd cv{enter}")
    cy.url().should('include', '/web-curriculum/')
    cy.title().should('equal', 'Curriculum')
    cy.get(".portrait")

  })
  it("should open the menu", () => {
    cy.get('.navbtn').should("be.visible").click()
    cy.contains(':nth-child(2) > a > .nav-Abtn', /online cv/i).and("be.visible")
  })

  it("should show about details in console", () => {
    cy.get('.terminal-input').type("about{enter}")
     cy.contains(".terminal-output", /experience/i)
  })

  it("should redirect to homepage", () => {
    cy.get('.terminal-input').type("cd home{enter}")
    cy.url().should('include', '/#hero')
    cy.title().should('match', /juan manuel/i)

  })

})