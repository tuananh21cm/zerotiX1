

//   export async function load() {
//     try {
//         const response = await fetch('http://localhost:3001/warehouse/images', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({folderPath:"//172.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/test"})
//         });

//         if (response.ok) {
//             const result = await response.json();
//             console.log(result)
//             return{data:result}
//         } else {
//             console.error('Failed:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }