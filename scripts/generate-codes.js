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

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to calculate SHA-256 hash
function calculateSHA256Hash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    return crypto.subtle.digest('SHA-256', data).then(buffer => {
        const hashArray = Array.from(new Uint8Array(buffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    });
}

async function fetchData() {
    try {
        let randomString = await generateRandomString(64)
        let randomHash = await calculateSHA256Hash(randomString);
        const response = await fetch("https://api.discord.gx.games/v1/direct-fulfillment", {
            "headers": {
                'authority': 'api.discord.gx.games',
                'method': 'POST',
                'path': '/v1/direct-fulfillment',
                'scheme': 'https',
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'origin': 'https://www.opera.com',
                'referer': 'https://www.opera.com/',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Opera GX";v="106"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'
            },
            "body": JSON.stringify({ "partnerUserId": randomHash }),
            "method": "POST"
        })
        const json_payload = await response.json()
        appendFileSync('nitro-codes.txt', `https://discord.com/billing/partner-promotions/1180231712274387115/${json_payload.token}\n`)
        amountOfCodes ++;
        formatCLI()
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await new Promise(resolve => setTimeout(resolve, 1000));
        fetchData();
    }
}

formatCLI()
fetchData();
