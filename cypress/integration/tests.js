context('Lambda Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    it('Add text', () => {
        cy.get('[name="name"]')
            .type('Rhea')
            .should('have.value', 'Rhea')
    })

    it('Select toppings', () => {
        cy.get('.topping')
            .each((item)=>{
                item.click()
            })
            .should('have.checked')
    })

    it('Can submit', ()=>{
        cy.get('[name="name"]')
        .type("Rhea")

        cy.get('[name="size"]')
        .select("small")

        cy.get('button')
        .not('disabled')
        .click()
    })
})