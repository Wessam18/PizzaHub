export const fetchAppitizer = async () => {
    const res = await fetch('https://pizzahub.me/appitizer');
    const data = await res.json();    
    return data;
}
