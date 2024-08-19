// cartApi.ts
// cartApi.ts
interface ICartItem {
    id: string;
    title: string;
    quantity: number;
    size?: 'Small' | 'Medium' | 'Large';
    price: number;
}

interface ICart {
    items: ICartItem[];
    totalQuantity: number;
    totalPrice: number;
}

interface CartItemParams {
    itemId: string;
    quantity: number;
    size?: 'Small' | 'Medium' | 'Large';
    itemType: 'Pizza' | 'Drinks' | 'Appetizers';
}

const API_BASE_URL = '/';

// (Rest of the code for fetchCart, addItemToCart, and clearCart functions)

interface CartItemParams {
    itemId: string;
    quantity: number;
    size?: 'Small' | 'Medium' | 'Large';
    itemType: 'Pizza' | 'Drinks' | 'Appetizers';
}


// Function to fetch the active cart
export const fetchCart = async (): Promise<ICart | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        const cart: ICart = await response.json();
        return cart;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
    }
};

// Function to add an item to the cart

export const addItemToCart = async (itemParams: CartItemParams): Promise<ICart | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
            },
            body: JSON.stringify(itemParams),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.data || 'Failed to add item to cart');
        }

        const updatedCart: ICart = await response.json();
        return updatedCart;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return null;
    }
};
// Function to clear the user's cart
export const clearCart = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/clear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
            },
        });

        if (!response.ok) {
            throw new Error('Failed to clear cart');
        }

        return true;
    } catch (error) {
        console.error('Error clearing cart:', error);
        return false;
    }
};
