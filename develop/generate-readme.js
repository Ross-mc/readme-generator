const fs = require('fs');

const generateReadme = data => {

    const title = data.title.length > 0 ? data.title : 'Project Title';
    const projectDescription = data.description.length > 0 ? data.description : 'Project Description';
    const installationInstructions = data.installation.length > 0 ? data.installation : 'Installation Instructions';
    const usageInformation = data.usage.length > 0 ? data.usage : 'Usage Information';
    const contributionInformation = data.contribution.length > 0 ? data.contribution : 'Contribution Information';
    const testInformation = data.test.length > 0 ? data.test : 'Test Information';
    const license = data.license.length > 0 ? data.license[0] : 'Licence Information';
    const github = data.github.length > 0 ? data.github : 'GitHub Profile';
    const email = data.email.length > 0 ? data.email : 'User Email Address';

    const readmeString = `# ${title}
        
## Contents

1. [Project Description](##project-description)
2. [Installation Instructions](##installation-instructions)
3. [Usage Information](##usage-information)
4. [Contribution Information](##contribution-information)
5. [Test Information](##test-information)
6. [License](##license)
7. [GitHub Profile](##github-profile)
8. [Email Address](##email-address)

## Project Description

${projectDescription}

## Installation Instructions

${installationInstructions}

## Usage Information

${usageInformation}

## Contribution Information

${contributionInformation}

## Test Information

${testInformation}

## License

${license}

## Github Profile

${github}

## Email Address

${email}`

    fs.writeFile('README.md', readmeString, err => err ? console.error(err) : console.log('Readme.md Succesfully generated!'))
}

module.exports = generateReadme