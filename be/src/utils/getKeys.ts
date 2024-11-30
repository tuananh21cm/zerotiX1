import  fs  from 'fs';

export function readFileToArrayAsync(filePath: string, callback: (dataArray: string[]) => void) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return callback([]);
      }
      callback(data.split('\n'));  // Split the file data into an array by newlines
    });
  }
