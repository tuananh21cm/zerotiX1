import fs from 'fs';
const configPath = './config.json'; 
export async function updateConfig() {
    try {
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        configData.database.host = '127.0.0.1';
        configData.app.version = '1.1.0';

        // 3. Write the updated config back to the file
        fs.writeFileSync(configPath, JSON.stringify(configData, null, 4), 'utf-8');
        console.log('Config updated successfully!');
    } catch (error) {
        console.error('Error updating config file:', error);
    }
}
 
