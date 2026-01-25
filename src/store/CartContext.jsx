import { act, createContext, useReducer } from "react";

//1# create the cart context shape that will be used in the application
const CartContext = createContext({
    items: [],
    addItem:(item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

//#5 define the reducer function to handle cart actions
function cartReducer(state, action) {
    if(action.type === 'ADD_ITEM'){
        //... update the state to add the meal item
        const existingItemIndex = state.items
        .findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if(existingItemIndex > -1){
            //item exists in the cart
            const existingItem = state.items [existingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity : existingItem.quantity + 1
            }
            updatedItems[existingItemIndex] = updatedItem;
        }else{
            //add new item to the cart
            updatedItems.push({...action.item, quantity: 1});
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if(action.type === 'REMOVE_ITEM'){
        //... remove an item from the state
        //update items in immutable way
        const existingItemIndex = state.items
        .findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];

        if(existingCartItem.quantity === 1){
            updatedItems.splice(existingItemIndex, 1);
        }else{
            const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity - 1};
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if(action.type === 'CLEAR_CART'){
        return {...state, items: []};
    }

    //return the updated state from the action
    return state; //unchanged
}

//2# we want to define cart context provider component which will be used to 
//warpped around our components that need access to cart context
// like App.jsx 
//which will do the actual state management and provide the context values to its children
//and provide actual data management logic
export function CartContextProvider({ children }) {
    //#4 implement the state management logic here
    //useState or useReducer for complex logic can be used here to manage cart items state
    const [ cart, dispatchCartAction ] = useReducer(cartReducer, {items: []})

    //#6 define functions to add and remove items from the cart
    function addItem(item){
        dispatchCartAction({type: 'ADD_ITEM', item: item});
    }

    function removeItem(id){
        dispatchCartAction({type: 'REMOVE_ITEM', id: id});
    }

    function clearCart(){
        dispatchCartAction({type: 'CLEAR_CART'});
    }

    //#6 pass cart state to cart context provider value to be passess it to all other components
    const cartContext={
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCart
    };

    console.log('CartContext');
    console.log(cartContext);    
    console.log('CartContextProvider cart items:', cart.items);

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

//#3 export the cart context to be used in other parts of the application
export default CartContext;


