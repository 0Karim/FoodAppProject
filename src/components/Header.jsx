import { useContext, useRef } from 'react';
import logoImg from '../assets/logo.jpg';
import CartModal from './CartModal';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function Header(){
    const modal = useRef();
    const cartCtx = useContext(CartContext);
    // const cartQuantity = cartCtx.items.length;
    //we call reduce to sum up the quantity of all items in the cart
    const cartQuantity = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    },0);    

    function handleOpenCartClick(){
        modal.current.open();
    }
    
    let modalActions = <button>Close</button>;
    if(cartQuantity > 0){
        modalActions=
        <>
            <button>Close</button>
            <button>Checkout</button>
        </>
    }


    return(
        <>
            <CartModal 
                title="Cart Title" 
                actions={modalActions} 
                ref={modal} 
            />
            <header id="main-header">
                <div id="title">
                    <h1>REACT FOOD</h1>
                    <img src={logoImg} alt='react-food' />
                </div>
                <nav>
                    <Button textOnly onClick={handleOpenCartClick}>Cart ({cartQuantity})</Button>
                </nav>
            </header>        
        </>
    );
}