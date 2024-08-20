export const fetchDrink = async () => {
    const res = await fetch('http://localhost:5000/drinks');
    const data = await res.json();
    return data;
}
