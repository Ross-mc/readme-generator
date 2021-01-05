const inquirer = require('inquirer');
const fs = require('fs');

const licenseImagesURLS = {
    'Creative Commons': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cc.logo.circle.svg/1200px-Cc.logo.circle.svg.png',
    'MIT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
    'ISC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/%28ISC%29%C2%B2_logo_%28vectorized%29.svg/640px-%28ISC%29%C2%B2_logo_%28vectorized%29.svg.png',
    'GNU General Public License': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPLv3_Logo.svg/1200px-GPLv3_Logo.svg.png'
};

const licenses = Object.keys(licenseImagesURLS);

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
    {
        name: 'license',
        type: 'list',
        message: 'Please select from the following licenses: ',
        choices: licenses
    },
];

inquirer
    .prompt(prompts)
    .then(answers => console.log(answers))
