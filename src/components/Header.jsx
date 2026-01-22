import { useContext, useRef } from 'react';
import logoImg from '../assets/logo.jpg';
import CartModal from './CartModal';
import { CartContext } from '../context/CartContext.jsx';

export default function Header(){
    const modal = useRef();
    const {items} = useContext(CartContext);
    const cartQuantity = items.length;

    function handleOpenCartClick(){
        modal.current.open();
    }
    
    let modalActions = <button>Close</button>;
    if(cartQuantity > 0){
        modalActions=
        <>
            <button className='button'>Close</button>
            <button className='button'>Checkout</button>
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
                <div id='title'>
                    <h1>REACT FOOD</h1>
                    <img className='' src={logoImg} alt='react-food' />
                </div>
                <nav>
                    <button className='text-button' onClick={handleOpenCartClick}>Cart({cartQuantity})</button>
                </nav>
            </header>        
        </>
    );
}