export const fetchAppitizer = async () => {
    const res = await fetch('http://localhost:5000/appitizer');
    const data = await res.json();
    return data;
}
