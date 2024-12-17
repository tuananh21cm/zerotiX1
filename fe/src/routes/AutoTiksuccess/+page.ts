export async function load() {
  try {
  
     
      const response2 = await fetch(
          "http://localhost:3001/tikSuccess"
      );
      
      const data2 = await response2.json();
  return { data:{data2} };
  } catch (error) {
      console.error('Error fetching keywords:', error);
  }
}