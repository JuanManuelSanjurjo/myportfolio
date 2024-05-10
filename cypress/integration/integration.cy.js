describe('Terminal portfolio suite', () => {
    it(() => {
      cy.visit('https://juanmanuelsanjurjodev.netlify.app/terminal-portfolio/')
      cy.title().should('equal', 'Terminal resume')
    })
})