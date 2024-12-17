import * as XLSX from 'xlsx';

export function rewriteAndUpdatePrices(filePath: string) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = 'Template';
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
        console.error(`Sheet "${sheetName}" not found.`);
        return;
    }

    // Parse the sheet into JSON format
    const jsonData = XLSX.utils.sheet_to_json<any>(sheet, { header: 1 }); // Rows as arrays

    // Define column indices (zero-based)
    const sizeColumnIndex = 4; // Column E for sizes
    const priceColumnIndex = 5; // Column F for prices

    // Helper function to clean and match size
    function getPriceBasedOnSize(size: string): number | null {
        // Extract only the size part from the string
        const cleanSizeMatch = size.match(/\b(S|M|L|XL|2XL|3XL)\b/);
    
        // Log for debugging
        console.log(`Original Size: "${size}", Extracted Size: "${cleanSizeMatch ? cleanSizeMatch[0] : 'None'}"`);
    
        // Check for a valid match
        if (!cleanSizeMatch) return null;
    
        const cleanSize = cleanSizeMatch[0]; // Extracted size
    
        // Map extracted size to price
        switch (cleanSize) {
            case 'S':
            case 'M':
            case 'L':
            case 'XL':
                return 18.34;
            case '2XL':
                return 20.34;
            case '3XL':
                return 22.34;
            default:
                return 18.99;
        }
    }
    

    const updatedData: any[] = []; // Store updated rows

    // Process each row
    jsonData.forEach((row: any[], rowIndex: number) => {
        if (rowIndex === 0) {
            updatedData.push(row); // Keep the header row as is
            return;
        }

        // Modify rows starting from row 6
        if (rowIndex >= 5) {
            const sizeValue = row[sizeColumnIndex]; // Access size value

            if (sizeValue && typeof sizeValue === 'string') {
                console.log(`Row ${rowIndex + 1} Size Value: "${sizeValue}"`);
                const newPrice = getPriceBasedOnSize(sizeValue);
                console.log(newPrice)

                if (newPrice !== null) {
                    console.log(
                        `Updating row ${rowIndex + 1}: size="${sizeValue}", new price=${newPrice}`
                    ); // Debugging line
                    row[priceColumnIndex] = newPrice; // Update price
                }
            }
        }

        updatedData.push(row); // Add updated row
    });

    // Create a new sheet with the updated data
    const newSheet = XLSX.utils.aoa_to_sheet(updatedData);

    // Replace the original sheet with the new sheet
    workbook.Sheets[sheetName] = newSheet;

    // Save changes back to the same file
    XLSX.writeFile(workbook, filePath);
    console.log(`Sheet "${sheetName}" rewritten and prices updated directly in ${filePath}`);
}
