export async function load() {
    try {
        const response = await fetch(
            `http://localhost:3001/keywordTitle?category=meme`
        );
        const data = await response.json();
    // console.log(data)
    return { data };
    } catch (error) {
        console.error('Error fetching keywords:', error);
    }
}