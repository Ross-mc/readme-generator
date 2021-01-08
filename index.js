const inquirer = require('inquirer');
const generateReadme = require('./generate-readme')

//Available license. More licenses can simply be added to the array if requiured
const licenses = ['Creative Commons', 'MIT', 'ISC', 'GNU General Public License']

//questions to provide to inquirer
const prompts = [
    {
        name: 'title',
        type: 'input',
        message: 'Please enter the title of your Project:'
    },
    {
        name: 'description',
        type: 'input',
        message: 'Please enter the description of your Project:'
    },
    {
        name: 'installation',
        type: 'input',
        message: 'What are the instructions for installing your project?'
    },
    {
        name: 'usage',
        type: 'input',
        message: 'Please enter usage information: '
    },
    {
        name: 'contribution',
        type: 'input',
        message: 'Please enter information on how people can contribute to the project: '
    },
    {
        name: 'test',
        type: 'input',
        message: 'Please enter testing instructions: '
    },
    {//type of list accepts an additional prop called choices which should be an array of choices
        name: 'license',
        type: 'list',
        message: 'Please select from the following licenses: ',
        choices: licenses
    },
    {
        name: 'github',
        type: 'input',
        message: 'Please enter your GitHub username: ',
    },
    {
        name: 'email',
        type: 'input',
        message: 'Please enter your email address',
    }
];

const init = () => {
    inquirer
    .prompt(prompts)
    .then(answers => generateReadme(answers))
}

init();


