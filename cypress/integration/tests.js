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

        cy.get('#goToToppings').click()

        cy.get('.topping')
            .each((item)=>{
                item.click()
            })
            .should('have.checked')
    })

    it('Special Instructions', ()=>{
        cy.get('[name="specialInstructions"]')
        .type('Adding Special Instructions')
    })

    it('Select Size', ()=>{
        cy.get('#goToToppings').click()
        cy.get('[name="size"]').select("large")
    })

    it('Can submit', ()=>{
        cy.get('[name="name"]')
        .type("Rhea")

        cy.get('#goToToppings').click()

        cy.get('[name="size"]')
        .select("small")

        cy.get('#goBack').click()

        cy.get('button')
        .not('disabled')
        .click()
    })

    
})