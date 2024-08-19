import { useNavigate } from 'react-router-dom';
import { AppetizersCover, PizzaCover, DrinksCover } from '../images'; // Make sure DrinksCover is added to your images

const Categories = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center pb-8">
            <h2 className="text-4xl title mb-10">Categories</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-6"> {/* Updated to lg:grid-cols-3 */}
                <div className="shadow-lg rounded-3xl p-6 flex flex-col items-center bg-white">
                    <div className="flex gap-4 mb-4">
                        <div><img src={PizzaCover} className="h-[300px] w-56 rounded-3xl" alt="Pizza Cover" /></div>
                    </div>
                    <button
                        className="w-full px-8 py-4 bg-gradient-to-r from-orange to-red-500 text-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                        onClick={() => navigate('/pizzas')}
                    >
                        Pizzas
                    </button>
                </div>
                <div className="shadow-lg rounded-3xl p-6 flex flex-col items-center bg-white">
                    <div className="flex gap-4 mb-4">
                        <div><img src={AppetizersCover} className="h-[300px] w-56 rounded-3xl" alt="Appetizers Cover" /></div>
                    </div>
                    <button
                        className="w-full px-8 py-4 bg-gradient-to-r from-orange to-red-500 text-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                        onClick={() => navigate('/appetizers')}
                    >
                        Appetizers
                    </button>
                </div>
                <div className="shadow-lg rounded-3xl p-6 flex flex-col items-center bg-white">
                    <div className="flex gap-4 mb-4">
                        <div><img src={DrinksCover} className="h-[300px] w-56 rounded-3xl" alt="Drinks Cover" /></div>
                    </div>
                    <button
                        className="w-full px-8 py-4 bg-gradient-to-r from-orange to-red-500 text-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                        onClick={() => navigate('/drinks')}
                    >
                        Drinks
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Categories;
