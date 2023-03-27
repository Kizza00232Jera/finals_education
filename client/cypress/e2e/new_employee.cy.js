describe('new employee', () => {
  it('admin can add new employee', () => {
      //login with admin acc
      cy.visit('http://localhost:3000/login');
      cy.findByRole('textbox', {  name: /email:/i}).type('admin@gmail.com');
      cy.findByLabelText(/password:/i).type('admin');
      cy.findByRole('checkbox', {  name: /remember me/i}).check();
      cy.findByRole('button', {  name: /log in/i}).click();
      //will see if he has employees button in nav
      //will click on add employee on top right if visible
      //will get to new page and form for adding user
      //is not able to create it until all fields are populated
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
})

