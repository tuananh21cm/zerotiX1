const fs = require("fs");
const path = require("path");
export const getFileNameByOrder = (folderPath:string, order:number) => {
    try {
        const files = fs.readdirSync(folderPath);
        const filesWithStats = files.map((file:any) => {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            return { file, birthtime: stats.birthtime };
        });
        const sortedFiles = filesWithStats.sort((a:any, b:any) => a.birthtime - b.birthtime);
        if (order > 0 && order <= sortedFiles.length) {
            console.log(sortedFiles[order - 1].file);
            return sortedFiles[order - 1].file; 
        } else {
            throw new Error(`Invalid order: ${order}. Available files: ${files.length}`);
        }
    } catch (err) {
        console.error("Error reading folder or sorting:", err);
        return null;
    }
};
