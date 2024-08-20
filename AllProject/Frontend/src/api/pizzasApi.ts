export const fetchPizza = async () => {
    const res = await fetch('http://localhost:5000/pizza');
    const data = await res.json();
    return data;
}
