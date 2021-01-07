const fs = require('fs');

// wikipedia reference to the licence images
const licenseImagesURLS = {
    'Creative Commons': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cc.logo.circle.svg/1200px-Cc.logo.circle.svg.png',
    'MIT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
    'ISC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/%28ISC%29%C2%B2_logo_%28vectorized%29.svg/640px-%28ISC%29%C2%B2_logo_%28vectorized%29.svg.png',
    'GNU General Public License': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPLv3_Logo.svg/1200px-GPLv3_Logo.svg.png'
};

const generateReadme = data => {
    // we check each property of the return object to see if it has been answered (inquirer returns '' if the user provides no answer)
    const title = data.title.length > 0 ? data.title : 'Project Title';
    // set the following to null if no information has been provided by the user. Later, this prevents a section being generated with no data
    const projectDescription = {
        data: data.description.length > 0 ? data.description : null,
        contentHeader: '[Project Description](##project-description)'
    }; //the content header is the necessary syntax for a markdown link to a section

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

    //github and email address are part of their own section called questions and are so handlded seperately
    const githubProfile = data.github.length > 0 ? data.github : null;
    const emailAddress = data.email.length > 0 ? data.email : null;

    const contents = [projectDescription, installationInstructions, usageInformation, contributionInformation, testInformation, license]
    // we remove any sections where the user has not entered information
    const filteredContents = contents.filter(elem => elem.data !== null);

    let contentsTable = '';
    let contentNum = 1;

    let readmeBody = '';
    //this for each loop creates a content header for every valid section and then adds the users input in to the readme string
    filteredContents.forEach(contentsItem => {
        contentsTable += `${contentNum}. ${contentsItem.contentHeader}\n`;
        contentNum++;

        let subHead = `## ${contentsItem.contentHeader.split(']')[0].replace('[', '')}\n`;
        let sectionText = contentsItem.data;
        //in the case of license, we add some additional text and logic to handle GNU (so that it doesnt read License license)
        if (contentsItem === license){
            sectionText = `This application is published under ${contentsItem.data} `;
            contentsItem.data !== 'GNU General Public License' ? sectionText+= 'license.' : sectionText += ' .';
        }

        readmeBody += `${subHead}\n${sectionText}\n\n`;
    });
    // we add the license image text using the correct syntax for markdown image
    let licenseIMG = `\n`;

    if (filteredContents.includes(license)){
        licenseIM;G = `![${license.data} Image](${licenseImagesURLS[license.data]})`;
    }

    //github and email is to be add to a separate section entitled Questions;

    const questions = [githubProfile, emailAddress];

    let questionsText = '';

    if (questions[0] !== null && questions[1] !== null){
        contentsTable += `${contentNum}. [Questions](##questions]\n`;
        contentNum++;
        questionsText += '## Questions\n\n';
        questionsText += 'To contact me with questions: \n\n';

        if (questions[0] !== null){
            questionsText += `Visit my [Github Profile](https://github.com/${githubProfile})\n`;
        };

        if (questions[1] !== null){
            questionsText += `Contact me via [email](mailto:${emailAddress})`;
        };

    };

// in order to format the markdown string correctly, the text must be formatted as below
    const readmeString = `# ${title}
${licenseIMG}        
## Contents

${contentsTable}

${readmeBody}
${questionsText}

`;

    fs.writeFile('README.md', readmeString, err => err ? console.error(err) : console.log('Readme.md Succesfully generated!'));
}

module.exports = generateReadme;