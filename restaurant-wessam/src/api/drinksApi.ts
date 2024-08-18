export const fetchDrink = async () => {
    const res = await fetch('http://localhost:5000/drink'); // Corrected 'locahost' to 'localhost'
    const data = await res.json();
    return data;
}
