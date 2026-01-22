import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function Cart(){
    
    const cartCtx = useContext(CartContext);
    const items = cartCtx.items;

    console.log('Cart items: ');
    console.log(items);

    return(
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.name} - Quantity: {item.quantity}
                </li>
            ))}
        </ul>
    );
}