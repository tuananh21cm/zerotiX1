

  export async function load() {
    const category = 'meme'; 
    const response = await fetch(`http://localhost:3001/profileToolList`);
    const data = await response.json();

    return {
        data,
        defaultCategory: category
    };
}