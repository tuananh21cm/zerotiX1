export async function load() {
  try {
      const response = await fetch(
          `http://localhost:3001/keywordTitle?category=meme`
      );
      const response2 = await fetch(
          "http://localhost:3001/tikSuccess"
      );
      const data = await response.json();
      const data2 = await response2.json();
  // console.log(data)
  return { data:{data,data2} };
  } catch (error) {
      console.error('Error fetching keywords:', error);
  }
}