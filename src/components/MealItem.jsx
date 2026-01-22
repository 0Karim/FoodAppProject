import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function MealItem({meal}){
    const {addItems} = useContext(CartContext);
    return(
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.image}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">$ {meal.price}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <button className="button" onClick={() => addItems(meal)}>Add to Cart</button>
                </p>
            </article>
        </li>
    );
}