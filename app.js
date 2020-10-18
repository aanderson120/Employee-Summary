const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function app(){
  function inputAnswers() {
      return inquirer.prompt([
        {
          type: "list",
          name: "employeeType",
          message: ["Manager", "Engineer", "Intern"]
        },
        {
          type: "input",
          name: "name",
          message: "Please enter name:"
        },
        {
          type: "input",
          name: "Id",
          message: "Please enter ID:"
        },
        {
          type: "input",
          name: "email",
          message: "Please enter email address:"
        },
        {
          type: "input",
          name: "office",
          message: "Please enter office number:",
          when: function(answers) {
            const value = answers.employeeType == "Manager" ? true : false;
            return value;
          }
        },
        {
          type: "input",
          name: "username",
          message: "Please enter GitHub username:",
          when: function(answers) {
            const value = answers.employeeType == "Engineer" ? true : false;
            return value;
          }
        },
        {
          type: "input",
          name: "school",
          message: "Please enter school attended:",
          when: function(answers) {
            const value = answers.employeeType == "Intern" ? true : false;
            return value;
          }
        }
      ]);
  }

      // After the user has input all employees desired, call the `render` function (required
      // above) and pass in an array containing all employee objects; the `render` function will
      // generate and return a block of HTML including templated divs for each employee!

  function team() {
    if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(answers), "utf-8");
  }
      
  inputAnswers();
}
    app();


    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.

    // HINT: each employee type (manager, engineer, or intern) has slightly different
    // information; write your code to ask different questions via inquirer depending on
    // employee type.

    // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
    // and Intern classes should all extend from a class named Employee; see the directions
    // for further information. Be sure to test out each class and verify it generates an
    // object with the correct structure and methods. This structure will be crucial in order
    // for the provided `render` function to work! ```