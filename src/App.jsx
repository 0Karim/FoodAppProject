import Cart from './components/Cart.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import CartContext, { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextPovider } from './store/UserProgressContext.jsx';

function App() {
  return (
    <>
      <UserProgressContextPovider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
        </CartContextProvider>      
      </UserProgressContextPovider>      
    </>
  );
}

export default App;
