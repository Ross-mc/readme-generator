const fs = require('fs');

const generateReadme = data => {

    const title = data.title.length > 0 ? data.title : 'Project Title';

    const projectDescription = {
        data: data.description.length > 0 ? data.description : null,
        contentHeader: '[Project Description](##project-description)'
    };

    const installationInstructions = {
        data: data.installation.length > 0 ? data.installation : null,
        contentHeader: '[Installation Instructions](##installation-instructions)',
    };

    const usageInformation = {
        data: data.usage.length > 0 ? data.usage : null,
        contentHeader: '[Usage Information](##usage-information)'
    };
    const contributionInformation = {
        data: data.contribution.length > 0 ? data.contribution : null,
        contentHeader: '[Contribution Information](##contribution-information)'
    };
    const testInformation = {
        data: data.test.length > 0 ? data.test : null,
        contentHeader: '[Test Information](##test-information)'
    };
    const license = {
        data: data.license.length > 0 ? data.license[0] : null,
        contentHeader: '[License](##license)'
    };
    const githubProfile = {
        data: data.github.length > 0 ? data.github : null,
        contentHeader: '[GitHub Profile](##github-profile)'
    };
    const emailAddress = {
        data: data.email.length > 0 ? data.email : null,
        contentHeader: '[Email Address](##email-address)'
    };

    const contents = [projectDescription, installationInstructions, usageInformation, contributionInformation, testInformation, license, githubProfile, emailAddress]
    const filteredContents = contents.filter(elem => elem.data !== null);

    let contentsTable = '';
    let contentNum = 1;

    let readmeBody = ''

    filteredContents.forEach(contentsItem => {
        contentsTable += `${contentNum}. ${contentsItem.contentHeader}\n`;
        contentNum++;

        let subHead = `## ${contentsItem.contentHeader.split(']')[0].replace('[', '')}\n`;
        let sectionText = contentsItem.data;

        readmeBody += `${subHead}\n${sectionText}\n\n`
    })


    const readmeString = `# ${title}
        
## Contents

${contentsTable}

${readmeBody}

`

    fs.writeFile('README.md', readmeString, err => err ? console.error(err) : console.log('Readme.md Succesfully generated!'))
}

module.exports = generateReadme