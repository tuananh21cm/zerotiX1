const xlsx = require('xlsx');
export const getDataExcel = async () => {
    // const filePath = path.join(__dirname, 'data.xlsx');
    const filePath  = "//72.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/excel/profile.xlsx";
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    console.log({jsonData})
    const extractedData = jsonData.map((row:any) => ({
        "profileName": row['profileName'], 
        "order": row['order'],             
        "category": row['category'],             
        "folderPath": row['folderPath'],             
    }));
    console.log({extractedData});
    return extractedData;
};

