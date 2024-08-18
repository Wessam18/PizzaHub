import { useEffect, useState } from 'react';
import SingleService from './SingleService';
import { fetchPizza } from '../api/pizzasApi';

const Pizzas = () => {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        const loadPizzas = async () => {
            const data = await fetchPizza();
            setPizzas(data);
        };

        loadPizzas();
    }, []);

    return (
        <div className="flex lg:mx-40 m-[20px] flex-col items-center justify-center py-20" id="pizzas">
            <h2 className="text-4xl title mb-20">Pizzas</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                {pizzas.map(data => (
                    <SingleService key={data.id} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Pizzas;
