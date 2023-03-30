describe("showcase", () => {
  it("will try to log in with not existing acc, and fail", () => {
    //login using Mark Wellington credentials
    cy.visit("http://localhost:3000/login");
    cy.findByRole("textbox", { name: /email:/i }).type(
      "markwellington@gmail.com"
    );
    cy.findByLabelText(/password:/i).type("password");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /log in/i }).click();

    //should throw unauthorized error
    cy.findByText(/unauthorized/i).should("be.visible");
  }),
    it("admin will login, and check his info", () => {
      //login with admin acc
      cy.visit("http://localhost:3000/login");
      cy.findByRole("textbox", { name: /email:/i }).type("admin@gmail.com");
      cy.findByLabelText(/password:/i).type("admin");
      cy.findByRole("checkbox", { name: /remember me/i }).check();
      cy.findByRole("button", { name: /log in/i }).click();

      //is able to log out?
      cy.get('[data-testid="employeeBtn"]').should("be.visible");
      //is not be able to log in
      cy.findByRole("button", { name: /log in/i }).should("not.exist");

      //is be able to see his information
      //admin status should exist
      cy.get('[data-testid="admintestid"]').should("be.visible");
      //manager and employee status shouldnt exist
      cy.get('[data-testid="managertestid"]').should("not.exist");
      cy.get('[data-testid="employeetestid"]').should("not.exist");

      //will check if he has budget 'rendered'
      cy.findByText(/budget: /i).should("be.visible");
      cy.get('[data-testid="budgetvisible"]').should("be.visible");


      //will click on employees

      cy.get('[data-testid="employeeBtn"]').click();

      //will look for add employee btn, and click it
      //will be redirected to the add employee form
      cy.get('[data-testid="addemployeebtn"]').click();

      //is not able to create employee until all fields are populated
      //create btn should not be clickable until form is filled
      cy.findByRole("button", { name: /create/i }).should(
        "have.class",
        "bg-invisible-gray"
      );
      cy.findByRole("button", { name: /create/i }).should(
        "not.have.class",
        "bg-primary"
      );

      //will fill up form
      cy.get("#name").type("Mark");
      cy.get("#employeeSurname").type("Wellington");
      cy.get("#password").type("password");
      cy.get("#email").type("markwellington@gmail.com");
      cy.get("#departments").select("Frontend");
      cy.get("#roles").select("Employee");
      cy.get("#employeeFund").type(500);
      cy.get("#employeeSpent").type(400);
      cy.get("#employeeBudget").type(100);

      //create button clickable now
      cy.findByRole("button", { name: /create/i }).should(
        "have.class",
        "bg-primary"
      );
      cy.findByRole("button", { name: /create/i }).should(
        "not.have.class",
        "bg-invisible-gray"
      );

      cy.findByRole("button", { name: /create/i }).click();

      //after creating user, will be redirected to the page with list of employees
      cy.url().should("eq", "http://localhost:3000/dash/employees");

      //should see employee that was just created in the list
      cy.findByText(/mark wellington/i).should("be.visible");

      //should be able to go on that employees profile
      cy.findByText(/mark wellington/i).click();

      //employees profile should match the info that admin just entered
      cy.get('[data-testid="markwellington@gmail.com"]').should("be.visible");

      //will go back and try to create same user again (will fail)
      cy.get('[data-testid="employeeBtn"]').click();
      cy.get('[data-testid="addemployeebtn"]').click();

      //fill up form again w same data
      cy.get("#name").type("Mark");
      cy.get("#employeeSurname").type("Wellington");
      cy.get("#password").type("password");
      cy.get("#email").type("markwellington@gmail.com");
      cy.get("#departments").select("Frontend");
      cy.get("#roles").select("Employee");
      cy.get("#employeeFund").type(500);
      cy.get("#employeeSpent").type(400);
      cy.get("#employeeBudget").type(100);

      cy.findByRole("button", { name: /create/i }).click();

      //will fail because same user is already created
      cy.get(".errmsg").should("be.visible");

      //logout
      cy.get('[data-testid="logoutbtn"]').click();
    });

  it("Now, Mark will try to log in again, this time successfully", () => {
    //login
    cy.visit("http://localhost:3000/login");
    cy.findByRole("textbox", { name: /email:/i }).type(
      "markwellington@gmail.com"
    );
    cy.findByLabelText(/password:/i).type("password");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /log in/i }).click();

    //is able to log out?
    cy.get('[data-testid="employeeBtn"]').should("be.visible");
    //is not be able to log in
    cy.findByRole("button", { name: /log in/i }).should("not.exist");

    //will see employees btn in nav and click on it
    cy.get('[data-testid="employeeBtn"]').click();

    //will see employee list, but add new employee shouldnt be visible
    cy.get('[data-testid="addemployeebtn"]').should("not.exist");
    cy.findByText(/mark wellington/i).should("be.visible");

    //will check if he has budget 'rendered', is not empty
    cy.findByText(/budget: /i).should("be.visible");
    cy.get('[data-testid="budgetvisible"]').should("be.visible");

    //employees navigation should have myprofile, educations, employees
    //but it shouldnt have add employee in nav
    cy.get('[data-testid="employeeBtn"]').should("be.visible");
    cy.get('[data-testid="myEduBtn"]').should("be.visible");
    cy.get('[data-testid="edulistbtn"]').should("be.visible");
    cy.get('[data-testid="logoutbtn"]').should("be.visible");
    cy.get('[data-testid="addemployeebtnnav"]').should("not.exist");

    //will check employees list
    cy.get('[data-testid="employeeBtn"]').click();
    //wont be able to edit
    cy.findByText(/edit/i).should("not.exist");

    //will go to employee page
    cy.findByText(/marko surlic/i).click();
    //should be on markos url
    cy.url().should(
      "eq",
      "http://localhost:3000/dash/employees/employee/6422f02f9e50fc171e26a0e4"
    );
    //markos details should be rendered
    cy.findByText(/marko surlic/i).should("be.visible");
    cy.findByText(/marko@gmail\.com/i).should("be.visible");

    //will go to my profile
    cy.get('[data-testid="myEduBtn"]').click();

    //will see his information
    cy.findByText(/mark wellington/i).should("be.visible");
    //will not see any event created by him yet
    cy.findByText(/event newly created by mark/i).should("not.exist");

    //will go to list of educations
    cy.get('[data-testid="edulistbtn"]').click();

    //is not able to edit any education
    cy.findByText(/edit/i).should("not.exist");

    //is able to see list of educations
    cy.findByText(/education for testing/i).should("be.visible");
    //is able to see details of one education
    cy.findByText(/education for testing/i).click();
    cy.url().should(
      "eq",
      "http://localhost:3000/dash/events/event/6422f1ba9e50fc171e26a0f9"
    );
    cy.findByRole("heading", { name: /education for testing/i });

    //is able to create education
    cy.get('[data-testid="edulistbtn"]').click();
    cy.findByRole("link", { name: /add event/i }).click();

    //before creating the event, this event should not be there
    cy.findByText(/event newly created by mark/i).should("not.exist");

    //filling form
    cy.get("#event-title").type("Event newly created by Mark");
    cy.get("#event-deadline").type("04.04.2023");
    cy.get("#event-city").type("Copenhagen");
    cy.get("#event-venue").type("Copenhagen 20");
    cy.get("#event-startdate").type("10.04.2023.");
    cy.get("#event-enddate").type("20.04.2023.");
    cy.get("#event-lenght").type(10);
    cy.get("#event-price").type(100);
    cy.get("#event-weblink").type("http://eventnewlycreatedbymark.com");
    cy.get("#event-description").type(
      "Lorem ipsum velikiprimjertest dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doflore magna asliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum velikiprimjertest dolor sit amet. Labore et dolore magna aliqua. Consectetur adipscing elit. Quis nostrud exercitation. Lorem ipsum velikiprimjertest dolor sit amet."
    );
    cy.get("#event-usercreated").type("markwellington@gmail.com");

    cy.findByRole("button", { name: /create/i }).click();

    //should be redirected to the events list page
    cy.url().should("eq", "http://localhost:3000/dash/events");
    //is able to see his education after its created
    cy.findByText(/event newly created by mark/i).should("be.visible");
    cy.findByText(/event newly created by mark/i).click();

    //now that event should also be under his profile
    cy.findByText(/event newly created by mark/i).should("be.visible");
    //clicks on his event
    cy.findByText(/event newly created by mark/i).click();
    //can see same information about the event as he typed himself
    cy.findByRole("heading", { name: /event newly created by mark/i }).should(
      "be.visible"
    );
    cy.findByText(/20\.04\.2023\./i).should("be.visible");
    cy.findByText(/copenhagen 20/i).should("be.visible");

    //after looking info about the event
    //he logs out
    cy.get('[data-testid="logoutbtn"]').click();
  });

  it("admin should see newly created event, admin should be able to edit event and user, and admin should be able to delete that user and that event", () => {
    //logs in
    //login with admin acc
    cy.visit("http://localhost:3000/login");
    cy.findByRole("textbox", { name: /email:/i }).type("admin@gmail.com");
    cy.findByLabelText(/password:/i).type("admin");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /log in/i }).click();

    //is able to log out?
    cy.get('[data-testid="employeeBtn"]').should("be.visible");
    //is not be able to log in
    cy.findByRole("button", { name: /log in/i }).should("not.exist");
    //goes to the events
    cy.get('[data-testid="edulistbtn"]').click();
    //finds newly created event
    cy.findByText(/event newly created by mark/i).should("be.visible");
    //clicks on edit
    cy.get('[data-testid="Event newly created by Mark"]').click();
    //edits it
    cy.get("#event-title").type("Edited");
    cy.findByRole("button", { name: /save/i }).click();
    //gets redirected to the events list page, and finds updated event
    cy.url().should("eq", "http://localhost:3000/dash/events");
    cy.findByText(/event newly created by markedited/i).should("be.visible");
    cy.get('[data-testid="Event newly created by MarkEdited"]').click();
    cy.findByRole('button', {  name: /delete/i}).click()
    //after deleting event he should be redirected to event list page
    cy.url().should("eq", "http://localhost:3000/dash/events");
    //event shouldnt exist anymore
    cy.findByText(/event newly created by markedited/i).should("not.exist");
    //goes to employee list and looks for mark
    cy.get('[data-testid="employeeBtn"]').click();
    cy.findByText(/mark wellington/i).should("be.visible");

    //clicks on edit
    cy.get('[data-testid="markwellington@gmail.com"]').click();
    //updates some info
    cy.get("#name").type("Will");
    cy.findByRole("button", { name: /save/i }).click();
    //check if its updated
    cy.url().should("eq", "http://localhost:3000/dash/employees");
    cy.findByText(/markwill wellington/i).should("be.visible");

    //deletes him
    cy.get('[data-testid="markwellington@gmail.com"]').click();
    cy.findByRole('button', {  name: /delete/i}).click()

    //check the list to find out if mark still exists
    cy.findByText(/markwill wellington/i).should("not.exist");

    //log out
    cy.get('[data-testid="logoutbtn"]').click();


  });

  it("will try to log in with  deleted acc mark and will fail", () => {
    //login using Mark Wellington credentials
    cy.visit("http://localhost:3000/login");
    cy.findByRole("textbox", { name: /email:/i }).type(
      "markwellington@gmail.com"
    );
    cy.findByLabelText(/password:/i).type("password");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /log in/i }).click();

    //should throw unauthorized error
    cy.findByText(/unauthorized/i).should("be.visible");
  })

});
