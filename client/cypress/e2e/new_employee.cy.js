

describe('new employee', () => {
  it('admin can add new employee', () => {
      //login with admin acc
      cy.visit('http://localhost:3000/login');
      cy.findByRole('textbox', {  name: /email:/i}).type('admin@gmail.com');
      cy.findByLabelText(/password:/i).type('admin');
      cy.findByRole('checkbox', {  name: /remember me/i}).check();
      cy.findByRole('button', {  name: /log in/i}).click();

      //is able to log out?
      cy.get('[data-testid="employeeBtn"]').should('be.visible')
      //is not be able to log in
      cy.findByRole('button', {  name: /log in/i}).should('not.exist');


      //is be able to see his information
      //admin status should exist
      cy.get('[data-testid="admintestid"]').should('be.visible')
      //manager and employee status shouldnt exist
      cy.get('[data-testid="managertestid"]').should('not.exist')
      cy.get('[data-testid="employeetestid"]').should('not.exist')

      //will check if he has budget 'rendered'
      cy.findByText(/budget: /i).should('be.visible')
      cy.get('[data-testid="budgetvisible"]').should('be.visible')

      //will click on employees
      cy.get('[data-testid="employeeBtn"]').click();

      //will look for add employee btn, and click it
      //will be redirected to the add employee form
      cy.get('[data-testid="addemployeebtn"]').click();

      //is not able to create employee until all fields are populated
      //create btn should not be clickable until form is filled
      cy.findByRole('button', {  name: /create/i}).should('have.class', 'bg-invisible-gray')
      cy.findByRole('button', {  name: /create/i}).should('not.have.class', 'bg-primary')

      //will fill up form
      cy.get('#name').type('Mark')
      cy.get('#employeeSurname').type('Wellington')
      cy.get('#password').type('password')
      cy.get('#email').type('markwellington@gmail.com')
      cy.get('#departments').select('Frontend');
      cy.get('#roles').select('Employee');
      cy.get('#employeeFund').type(500)
      cy.get('#employeeSpent').type(400)
      cy.get('#employeeBudget').type(100)

      //create button clickable now
      cy.findByRole('button', {  name: /create/i}).should('have.class', 'bg-primary')
      cy.findByRole('button', {  name: /create/i}).should('not.have.class', 'bg-invisible-gray')
      
      cy.findByRole('button', {  name: /create/i}).click();

      //will be redirected to the page with list of employees
      cy.url().should('eq', 'http://localhost:3000/dash/employees')

      //should see employee that was just created
      cy.findByText(/mark wellington/i).should('be.visible')

      //should be able to go on that employees profile
      cy.findByText(/mark wellington/i).click()
      
      //employees profile should match the info that admin just entered
      
      
      
      //create btn is enabled after fields are populated
      //after creating user, admin should be redirected to the employee list page
      //user should be added and visible on the employee list
      //logout
  })

//   it('employees cant add new employee', () => {
//     //login with employee acc
//     //will see if he has employees button in nav
//     //will click on employees list from nav
//     //add employee btn shouldnt be visible, but only list
//     //will try to go to link where they can add employees
//     //they will be restricted to that page
//     //logout
// })

//login with non existing mark acc, fail
//login with admin acc and create mark acc
//login with mark acc - check features 
//logout
//login with admin and delete mark
//check if mark is on list
//try to log in with mark
})

