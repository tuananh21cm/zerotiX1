export async function load() {
  console.log('Fetching data...');
  const fetchAccount = await fetch(`http://localhost:3001/report/`);
  const data:any = await fetchAccount.json();
  console.log({data})
  return { data };
}