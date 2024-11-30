export async function load() {
    const res = await fetch(`http://localhost:3001/account`);
    const data = await res.json();
    console.log(data)
    return { data };
  }