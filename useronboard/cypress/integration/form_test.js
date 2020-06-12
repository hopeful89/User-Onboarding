describe("Test form", () => {
    it("first test", () => {
        cy.visit("http://localhost:3000/")

        cy.get("[data-cy=name]").type("Brandon").should("have.value", "Brandon")

        cy.get("[data-cy=email").type("test.email@gmail.com").should("have.value", "test.email@gmail.com")

        cy.get("[data-cy=password").type("asdfasdf").should("have.value", "asdfasdf")

        cy.get("[data-cy=checkbox").check().should("be.checked")

        cy.get("[data-cy=submit").click()

    })
})