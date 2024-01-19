const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { appendFileSync, readFileSync } = require('fs')
const readline = require('readline');
import * as clipboardy from 'clipboardy'
import { writeFileSync } from 'fs';

let listOfCodes = readFileSync('nitro-codes.txt', 'utf-8').split('\n')
let amountOfCodes = (listOfCodes.length - 1);

const getUserInput = async (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (userInput) => {
            resolve(userInput);
            rl.close();
        });
    });
};

function formatCLI() {
    console.clear();
    let formattedOutput = ` \x1b[38;2;237;171;227m
    
⠀⠀⠀⠀⣾⣿⣿⣷⣄
⠀⠀⠀⢸⣿⣿⣿⣿⣿⣧⣴⣶⣶⣶⣄        
⠀⠀⠀⣀⣿⣿⡿⠻⣿⣿⣿⣿⣿⣿⣿⡄        
⠀⠀⠀⢇⠠⣏⡖⠒⣿⣿⣿⣿⣿⣿⣿⣧⡀       
⠀⠀⢀⣷⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷  \x1b[0m         Total codes: \x1b[38;2;237;171;227m${amountOfCodes}  
⠀⠀⢸⣿⣿⡿⢋⠁⠀⠀⠀⠀⠉⡙⢿⣿⣿⡇  
⠀⠀⠘⣿⣿⠀⣿⠇⠀⢀⠀⠀⠘⣿⠀⣿⡿⠁        
⠀⠀⠀⠈⠙⠷⠤⣀⣀⣐⣂⣀⣠⠤⠾⠋⠁        

    `
    console.log(formattedOutput)
}

(async () => {
    formatCLI()

    let amountRequested = await getUserInput('Please enter something: ');
    let amountRequestedNumber = Number(amountRequested)
    if ( (amountRequestedNumber != NaN) && (amountOfCodes >= amountRequestedNumber) ) {
        let requestedAmount = []
        let copyString = ""
        let reformatString = ""
        for (let i = 1; i <= amountRequestedNumber; i++) {
            let item = listOfCodes[i]
            requestedAmount.push(item)
            listOfCodes.splice(i,1)
            copyString += `${item}\n`
        }
        
        clipboardy.default.writeSync(copyString)

        for (let i = 1; i <= listOfCodes.length-1; i++) {
            let item = listOfCodes[i]
            reformatString += `${item}\n`
        }

        writeFileSync('nitro-codes.txt',reformatString)
    }

})();
