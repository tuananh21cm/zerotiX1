export async function load() {
    try {
        const response = await fetch(
            `http://localhost:3001/ShopPlus/data`
        );
        const data = await response.json();
    return { data };
    } catch (error) {
        console.error('Error fetching keywords:', error);
    }
}