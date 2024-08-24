import { useState, useEffect } from 'react';
import SingleService from './SingleService';
import { fetchAppitizer } from '../api/appitizersApi';

const Appetizers = () => {
    const [appetizers, setAppetizers] = useState([]);

    useEffect(() => {
        const getAppetizers = async () => {
            try {
                const fetchedAppetizers = await fetchAppitizer();
                setAppetizers(fetchedAppetizers);
            } catch (error) {
                console.error('Error fetching appetizers:', error);
            }
        };

        getAppetizers();
    }, []);

    return (
        <div className="flex lg:mx-40 m-[20px] flex-col items-center justify-center py-20" id="appetizers">
            <h2 className="text-4xl title mb-20">Appetizers</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                {appetizers.map((data, index) => (
                    <SingleService key={index} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Appetizers;
