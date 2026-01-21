import { act, createContext, useReducer } from "react";

const CartContext = createContext({
    items:[],
    addItems: (item) => {},
    removeItem : (id) => {}
});


function shoppingCartReducer(state, action){
    if(action === 'ADD_ITEM'){
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload);

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems.push({...action.item, quantity:1})
        }
        return {
            ...state,
            items: updatedItems
        };
    }

    if(action === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);        
        }else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };            
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }

    return state;
}

export function CartContextProvider({children}){
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer,{
        items:[]
    });

    function handleAddItemToCart(item){
        //using useReducer
        shoppingCartDispatch({
            type:'ADD_ITEM',   
            payload : id         
        });
    }

    function handleRemoveItem(id){
        shoppingCartDispatch({
            type:'REMOVE_ITEM',
            payload: id
        })
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItems: handleAddItemToCart,
        removeItem : handleRemoveItem
    };

    return (
        <CartContextProvider.Provider value={ctxValue}>
            {children}
        </CartContextProvider.Provider>
    );
}

export default CartContext;