import { act, createContext, useReducer } from "react";

export const CartContext = createContext({
    items:[],
    addItems: (item) => {},
    removeItem : (item) => {}
});


function shoppingCartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload.id);

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems.push(
                {
                    ...action.payload,
                    quantity:1
                })
        }
        console.log('state after adding item: ');
        console.log(state);        
        return {
            ...state,
            items: updatedItems
        };
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        
        if (existingCartItem !== null && existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);        
        }else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };            
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        console.log('state after removing item: ');
        console.log(state);
        
        return { ...state, items: updatedItems };
    }

        console.log('state after no action met: ');
        console.log(state);            

    return state;
}

export function CartContextProvider({children}){
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer,{
        items:[]
    });

    function handleAddItemToCart(item){
        console.log('adding item to cart');
        console.log(item);
        //using useReducer
        shoppingCartDispatch({
            type:'ADD_ITEM',   
            payload : item         
        });
    }

    function handleRemoveItem(item){
        shoppingCartDispatch({
            type:'REMOVE_ITEM',
            payload: item
        })
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItems: handleAddItemToCart,
        removeItem : handleRemoveItem
    };

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
        // <CartContextProvider.Provider value={ctxValue}>
        //     {children}
        // </CartContextProvider.Provider>
    );
}

