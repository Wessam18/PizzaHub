import { useState, useContext, useEffect } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from './tools/CartContext';

const SingleService = ({ data }) => {
    const { title, image, details, _id: id, sprice, mprice, lprice, ssize, msize, lsize, price } = data;

    const { addToCart } = useContext(CartContext);

    const getPrice = (size) => {
        if (size === ssize && sprice !== undefined) {
            return sprice;
        } else if (size === msize && mprice !== undefined) {
            return mprice;
        } else if (size === lsize && lprice !== undefined) {
            return lprice;
        } else {
            return price || 0;
        }
    };

    const [size, setSize] = useState(ssize || msize || lsize || '');
    const [quantity, setQuantity] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(getPrice(size));

    useEffect(() => {
        setCurrentPrice(getPrice(size));
    }, [size]);

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const handleAddToCart = () => {
        addToCart({ id, title, size, quantity, price: currentPrice * quantity });
    };

    return (
        <div className="hover:shadow-lg transition-all duration-700 lg:p-5 p-[20px] w-[100%] rounded-3xl">
            <div className="overflow-hidden rounded-3xl">
                <img className="hover:scale-125 hover:opacity-75 transition-all duration-700" src={image} alt={title}  style={{ width: '345px', height: '240px', objectFit: 'cover' }}/>
            </div>
            <h2 className="text-xl font-semibold my-4">{title}</h2>
            <p>{details}</p>
            <div className="flex items-center space-x-4">
                <select className="m-2 h-100 select-orange" value={quantity} onChange={handleQuantityChange}>
                    {[...Array(6).keys()].map(i => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                {ssize || msize || lsize ? (
                    <select className="m-2 h-100 select-success rounded" value={size} onChange={handleSizeChange}>
                        {ssize && <option value={ssize}>{ssize}</option>}
                        {msize && <option value={msize}>{msize}</option>}
                        {lsize && <option value={lsize}>{lsize}</option>}
                    </select>
                ) : null}
                <div className="d-inline h-100 fs-6">Total Price: ${(currentPrice * quantity).toFixed(2)}</div>
            </div>
            <div className="flex justify-center mt-10">
                <button 
                    className="flex items-center px-[20px] py-[2px]"
                    onClick={handleAddToCart}
                >
                    Add To Cart <FaShoppingCart className="ml-[16px]" />
                </button>
            </div>
        </div>
    );
};

export default SingleService;
