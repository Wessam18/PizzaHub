import { useState, useEffect } from 'react';
import SingleService from './SingleService';
import { fetchDrink } from '../api/drinksApi';

const Drinks = () => {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        const getDrinks = async () => {
            try {
                const fetchedDrinks = await fetchDrink();
                setDrinks(fetchedDrinks);
            } catch (error) {
                console.error('Error fetching drinks:', error);
            }
        };

        getDrinks();
    }, []);

    return (
        <div className="flex lg:mx-40 m-[20px] flex-col items-center justify-center py-20" id="drinks">
            <h2 className="text-4xl title mb-20">Drinks</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                {drinks.map((data, index) => (
                    <SingleService key={index} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Drinks;
