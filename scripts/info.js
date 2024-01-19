const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { appendFileSync, readFileSync  } = require('fs')
let totalAmountOfLinesInFile = (readFileSync('nitro-codes.txt','utf-8').split('\n').length - 1)
let amountOfCodes = totalAmountOfLinesInFile;

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

formatCLI()
