const xlsx = require('xlsx');
const path = require('path');

export const getDataExcel = async () => {
    // const filePath = path.join(__dirname, 'data.xlsx');
    const filePath  = "C:/Users/KBT/Downloads/Tiktoksellercenter_batchedit_20241203_media_information_template.xlsx";
    const workbook = xlsx.readFile(filePath);

    // Select the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert the sheet data to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    console.log({jsonData})
    // Extract specific columns
    const extractedData = jsonData.map((row:any) => ({
        "name": row['product_name'], 
        "img": row['main_image'],             
    }));
    console.log({extractedData});
    return extractedData;
};

