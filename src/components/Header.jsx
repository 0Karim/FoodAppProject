import { useRef } from 'react';
import logoImg from '../assets/logo.jpg';
import CartModal from './CartModal';
import Button from './UI/Button.jsx';


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
                <div id="title">
                    <h1>REACT FOOD</h1>
                    <img src={logoImg} alt='react-food' />
                </div>
                <nav>
                    <Button textOnly onClick={handleOpenCartClick}>Cart (0)</Button>
                </nav>
            </header>        
        </>
    );
}