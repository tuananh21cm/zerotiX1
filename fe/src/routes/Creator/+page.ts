export async function load() {
    console.log('Fetching data...');
    const fetchAccount = await fetch(`http://localhost:3001/account/`);
    const data = await fetchAccount.json();
    const fetchProfile = await fetch(`http://localhost:3001/profileScan/account?account=${data[0]._id}`);
    const listProfile = await fetchProfile.json()
    return { data ,listProfile};
  }