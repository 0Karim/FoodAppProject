//Create User ProgressContext.jsx

import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress:'',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});

export default UserProgressContext;

export function UserProgressContextPovider({children}){
    const [userProgress, setUserProgress] = useState('');

    function showCart(){
        setUserProgress('cart');
    }

    function hideCart(){
        setUserProgress('');
    }

    function showCheckout(){
        setUserProgress('checkout');
    }

    function hideCheckout(){
        setUserProgress('');
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart: showCart,
        hideCart: hideCart,
        showCheckout: showCheckout,
        hideCheckout: hideCheckout
    };

    return <UserProgressContext.Provider value={userProgressCtx}>
        {children}
    </UserProgressContext.Provider>
}