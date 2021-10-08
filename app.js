const inquirer = require('inquirer')


const fs = require('fs');
const generatePage = require('./src/page-template');
const { writeFile, copyFile } = require('./utils/generate-site');
/*
const pageHTML = generatePage(name, github);

fs.writeFile('./index.html', pageHTML, err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});
*/

const mockData = {
    name: "Cabral Williams",
    github: "cabralwilliams",
    confirmAbout: true,
    about: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus minima debitis ullam tempore nostrum quas totam qui fugiat nam asperiores et nulla veniam accusamus, dolor aspernatur voluptas provident voluptatibus placeat.",
    projects: [
        {
            name: 'Run Buddy',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['HTML', 'CSS'],
            link: 'https://github.com/cabralwilliams/run-buddy',
            feature: true,
            confirmAddProject: true
          },
          {
            name: 'A Task Creator',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/cabralwilliams/a-task-creator',
            feature: true,
            confirmAddProject: true
          },
          {
            name: 'Taskmaster Pro',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
            link: 'https://github.com/cabralwilliams/taskmaster-pro-max',
            feature: false,
            confirmAddProject: true
          },
          {
            name: 'Robot Gladiators',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
            languages: ['JavaScript'],
            link: 'https://github.com/cabralwilliams/robot-gladiators',
            feature: false,
            confirmAddProject: false
          }
    ]
};

const promptProject = portfolioData => {
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('Please enter the name of the project.');
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: description => {
            if(description) {
                return true;
            } else {
                console.log('Please enter a description of the project.');
                return false;
            }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: pageLink => {
            if(pageLink) {
                return true;
            } else {
                console.log('Please enter the GitHub link to the project.');
                return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData)
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

const promptUser = () => {
    return inquirer.prompt(
        [
            {
                type: "input",
                name: "name",
                message: "What is your name?",
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    } else {
                        console.log('Please enter your name.');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "github",
                message: "What is your username for your GitHub account?",
                validate: githubInput => {
                    if(githubInput) {
                      return true;
                    } else {
                        console.log('Please enter the username for your GitHub account.');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
            },
            {
                type: "input",
                name: "about",
                message: "Please provide some information about yourself:",
                when: ({ confirmAbout }) => {
                    if(confirmAbout) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ]
    );
};
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
        //const pageHTML = generatePage(mockData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });
});