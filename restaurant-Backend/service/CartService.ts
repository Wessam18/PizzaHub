import mongoose from 'mongoose';
import { ICart, CartModel, ICartItem } from '../models/CartModel';
import  pizzasModel from '../models/PizzaModal';
import  appetizersModal from '../models/AppetizersModel';
import drinksModel, { IDrinks }  from '../models/DrinksModel';
import { IAppitizers } from '../models/AppetizersModel';
import { IPizzas} from '../models/PizzaModal';
import { Types } from 'mongoose';

interface CreateCartUser {
    userId: string;
}

const CreateCartUser = async ({ userId }: CreateCartUser) => {
    const cart = await CartModel.create({ userId, total: 0 })
    await cart.save()
    return cart;
}
interface GetActiveCart  {
    userId: string
}

export const getActiveCart = async ({userId}: GetActiveCart)=>{
    let cart = await CartModel.findOne({ userId, status: "active" })
    if(!cart) {
        cart = await CreateCartUser({ userId })
    }
    return cart;
};

interface AddItemToCartParams {
    userId: string;
    itemId: any;
    quantity: number;
    size?: 'Small' | 'Medium' | 'Large';
    itemType: 'Pizza' | 'Drinks' | 'Appetizers';
}

export const addItemToCart = async ({ userId, itemId, quantity, size, itemType }: AddItemToCartParams) => {
    const cart = await getActiveCart({ userId });

    let item, price, title;
    switch (itemType) {
        case 'Pizza':
            item = await pizzasModel.findById(itemId);
            if (!item) return { data: "Pizza Wasn't Found", statusCode: 400 };

            switch (size) {
                case 'Small':
                    price = item.sprice;
                    break;
                case 'Medium':
                    price = item.mprice;
                    break;
                case 'Large':
                    price = item.lprice;
                    break;
                default:
                    return { data: "Invalid Size", statusCode: 400 };
            }
            title = item.title;
            break;

        case 'Drinks':
            item = await drinksModel.findById(itemId);
            if (!item) return { data: "Drink Wasn't Found", statusCode: 400 };

            price = item.price;
            title = item.title;
            break;

        case 'Appetizers':
            item = await appetizersModal.findById(itemId);
            if (!item) return { data: "Appetizer Wasn't Found", statusCode: 400 };

            price = item.price;
            title = item.title;
            break;

        default:
            return { data: "Invalid Item Type", statusCode: 400 };
    }

    const totalPrice = price * quantity;
    cart.items.push({
        [itemType]: itemId,
        price: totalPrice,
        quantity,
        title,
        ...(itemType === 'Pizza' && { size }),
    });
    cart.total += totalPrice;

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
};

const clearUserCart = async (userId: string) => {
    const cart = await getActiveCart({ userId });
    try {
        await CartModel.updateOne(
            { userId },
            { $set: { status: 'cleared', items: [], total: 0 } }
        );
        console.log('Cart cleared successfully');
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw new Error('Failed to clear cart');
    }
};
export { clearUserCart };
