const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

const employee = [];

  function inputAnswers() {
    inquirer.prompt([
      {
        type: "list",
        name: "employeeType",
        message: "What type of employee are you adding?",
        choices: ["Manager", "Engineer", "Intern"]
      },
    ]).then(chooseRole => {
      switch(chooseRole.employeeType) {
        case "Manager":
          addManager();
          break;
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          inputAnswers();
        }
      });

    function addManager() {
      inquirer.prompt([
        {
          type: "input",
          name: "managerName",
          message: "Please enter the employee's name:",
        },
        {
          type: "input",
          name: "managerId",
          message: "Please enter the employee's ID:",
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Please enter the employee's email address:",
        },
        {
          type: "input",
          name: "managerOffice",
          message: "Please enter the office number:",
        },
        {
          type: "list",
          name: "addAdditional",
          message: "Do you need to add any additional employees?",
          choices: ["All done!", "Add another"]
        }
        ]).then(answers => {
          if (answers.addAdditional === "All done!") {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
            // console.log(manager)
            employee.push(manager);
            createSummary();
          }
          else if (answers.addAdditional === "Add another") {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
            // console.log(manager)
            employee.push(manager);
            inputAnswers();
          }
        }) 
      }

    function addEngineer() {
      inquirer.prompt([
        {
          type: "input",
          name: "engineerName",
          message: "Please enter the employee's name:",
        },
        {
          type: "input",
          name: "engineerId",
          message: "Please enter the employee's ID:",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "Please enter the employee's email address:",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "Wlease enter GitHub username:",
        },
        {
          type: "list",
          name: "addAdditional",
          message: "Do you need to add any additional employees?",
          choices: ["All done!", "Add another"]
        }
        ]).then(answers => {
          if (answers.addAdditional === "All done!") {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            // console.log(engineer)
            employee.push(engineer);
            createSummary();
          }
          else if (answers.addAdditional === "Add another") {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            // console.log(engineer)
            employee.push(engineer);
            inputAnswers();
          }
        })           
      }
    
    function addIntern() {
      inquirer.prompt([
        {
          type: "input",
          name: "internName",
          message: "Please enter the employee's name:",
        },
        {
          type: "input",
          name: "internId",
          message: "Please enter the employee's ID:",
        },
        {
          type: "input",
          name: "internEmail",
          message: "Please enter the employee's email address:",
        },
        {
          type: "input",
          name: "internSchool",
          message: "Please enter school attended:",
        },
        {
          type: "list",
          name: "addAdditional",
          message: "Do you need to add any additional employees?",
          choices: ["All done!", "Add another"]
        }
        ]).then(answers => {
          if (answers.addAdditional === "All done!") {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            // console.log(intern)
            employee.push(intern);
            createSummary();
          }
          else if (answers.addAdditional === "Add another") {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            // console.log(intern)
            employee.push(intern);
            inputAnswers();
          }
        })
      }
  }

  function createSummary() {
    fs.existsSync("output") || fs.mkdirSync("output");
    fs.writeFile(outputPath, render(employee), function (err) {
      if (err){
        console.log(err)
        } else {
          console.log("Success!")
        }
      })
  }

  inputAnswers()