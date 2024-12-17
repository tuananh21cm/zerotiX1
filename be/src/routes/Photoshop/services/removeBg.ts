const { exec } = require('child_process');
const path = require('path');

const photoshopScript = path.resolve(__dirname, 'removeBackground.jsx');
const imageFolder = path.resolve(__dirname, 'images');

// Replace the `<YOUR_PHOTOSHOP_PATH>` with your Photoshop executable path
const photoshopPath = '"C:\\Program Files\\Adobe\\Adobe Photoshop 2023\\Photoshop.exe"';

const command = `${photoshopPath} -r "${photoshopScript.replace(/\\/g, '\\\\')}"`;

// Update the JSX script dynamically to include the folder path
const fs = require('fs');
const jsxScript = fs.readFileSync(photoshopScript, 'utf8');
const updatedScript = jsxScript.replace('<YOUR_FOLDER_PATH>', imageFolder.replace(/\\/g, '/'));
fs.writeFileSync(photoshopScript, updatedScript);

// Execute Photoshop with the JSX script
exec(command, (err:any, stdout:any, stderr:any) => {
    if (err) {
        console.error(`Error executing Photoshop script: ${err.message}`);
        return;
    }
    console.log(`Photoshop script executed successfully.\nOutput: ${stdout}`);
});
