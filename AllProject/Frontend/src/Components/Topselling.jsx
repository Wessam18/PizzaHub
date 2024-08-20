import { useState, useEffect } from 'react';
import SingleService from './SingleService';
import { fetchPizza } from '../api/pizzasApi';
import { fetchAppitizer } from '../api/appitizersApi';

const TopSelling = () => {
    const [topSellingPizzas, setTopSellingPizzas] = useState([]);
    const [topSellingAppetizers, setTopSellingAppetizers] = useState([]);

    useEffect(() => {
        const getTopSellingItems = async () => {
            try {
                // Fetch pizzas and appetizers from the API
                const pizzas = await fetchPizza();
                const appetizers = await fetchAppitizer();

                // Select 5 random pizzas
                const randomPizzas = pizzas
                    .sort(() => 0.5 - Math.random()) // Shuffle the array
                    .slice(0, 5); // Get the first 5 items

                // Select 3 random appetizers
                const randomAppetizers = appetizers
                    .sort(() => 0.5 - Math.random()) // Shuffle the array
                    .slice(0, 3); // Get the first 3 items

                setTopSellingPizzas(randomPizzas);
                setTopSellingAppetizers(randomAppetizers);
            } catch (error) {
                console.error('Error fetching top selling items:', error);
            }
        };

        getTopSellingItems();
    }, []);

    return (
        <div className="flex lg:mx-40 m-[20px] flex-col items-center justify-center py-20 mt-6" id="topSelling">
            <h1 className="title-custom text-4xl mb-20">Top Selling</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                {topSellingPizzas.map((data, index) => (
                    <SingleService key={index} data={data} />
                ))}
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                {topSellingAppetizers.map((data, index) => (
                    <SingleService key={index} data={data} />
                ))}
            </div>
        </div>
    );
};

export default TopSelling;
