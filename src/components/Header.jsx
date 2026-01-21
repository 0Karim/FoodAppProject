import logoImg from '../assets/logo.jpg';
export default function Header(){
    return(
        <header id="main-header">
            <div id='title'>
                <h1>REACT FOOD</h1>
                <img className='' src={logoImg} alt='react-food' />
            </div>
            <nav>
                <button>Cart(3)</button>
            </nav>
        </header>
    );
}