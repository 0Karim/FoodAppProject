import { useContext, useRef } from 'react';
import logoImg from '../assets/logo.jpg';
import CartModal from './CartModal';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header(){
    const modal = useRef();
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    // const cartQuantity = cartCtx.items.length;
    //we call reduce to sum up the quantity of all items in the cart
    const cartQuantity = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    },0);    

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return(
        <>
            <header id="main-header">
                <div id="title">
                    <h1>REACT FOOD</h1>
                    <img src={logoImg} alt='react-food' />
                </div>
                <nav>
                    <Button textOnly onClick={handleShowCart}>Cart ({cartQuantity})</Button>
                </nav>
            </header>        
        </>
    );
}