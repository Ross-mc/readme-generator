const fs = require('fs');

const licenseImagesURLS = {
    'Creative Commons': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cc.logo.circle.svg/1200px-Cc.logo.circle.svg.png',
    'MIT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
    'ISC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/%28ISC%29%C2%B2_logo_%28vectorized%29.svg/640px-%28ISC%29%C2%B2_logo_%28vectorized%29.svg.png',
    'GNU General Public License': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPLv3_Logo.svg/1200px-GPLv3_Logo.svg.png'
};

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
        data: data.license.length > 0 ? data.license : null,
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

    let readmeBody = '';

    filteredContents.forEach(contentsItem => {
        contentsTable += `${contentNum}. ${contentsItem.contentHeader}\n`;
        contentNum++;

        let subHead = `## ${contentsItem.contentHeader.split(']')[0].replace('[', '')}\n`;
        let sectionText = contentsItem.data;

        if (contentsItem === license){
            sectionText = `This application is published under ${contentsItem.data} `;
            contentsItem.data !== 'GNU General Public License' ? sectionText+= 'license.' : sectionText += ' .'
        }

        if (contentsItem === githubProfile){
            sectionText = `Visit my [Github Profile](https://github.com/${contentsItem.data})`
        }

        if (contentsItem === emailAddress){
            sectionText = `[Contact me](mailto:${contentsItem.data})`
        }

        readmeBody += `${subHead}\n${sectionText}\n\n`
    });

    let licenseIMG = `\n`

    if (filteredContents.includes(license)){
        licenseIMG = `![${license.data} Image](${licenseImagesURLS[license.data]})`
    }


    const readmeString = `# ${title}
${licenseIMG}        
## Contents

${contentsTable}

${readmeBody}

`

    fs.writeFile('README.md', readmeString, err => err ? console.error(err) : console.log('Readme.md Succesfully generated!'))
}

module.exports = generateReadme