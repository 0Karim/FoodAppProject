import { useRef } from 'react';
import logoImg from '../assets/logo.jpg';
import CartModal from './CartModal';
export default function Header(){
    const modal = useRef();
    const cartQuantity = 3;

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
                <div id='title'>
                    <h1>REACT FOOD</h1>
                    <img className='' src={logoImg} alt='react-food' />
                </div>
                <nav>
                    <button onClick={handleOpenCartClick}>Cart(3)</button>
                </nav>
            </header>        
        </>
    );
}