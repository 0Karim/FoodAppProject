import { useEffect, useState } from "react";
import { fetchAvilabelMeals } from "../http.js";
import ErrorPage from './Error.jsx';
import MealItem from "./MealItem.jsx";

export default function Meals(){
    const [isFetching, setIsFetching] = useState(false);
    const [meals, setMeals] = useState([]);
    const [error, setError]= useState();

    useEffect(() => {
        async function fetchMeals(){
            setIsFetching(true);
            try{
                const mealsResponse = await fetchAvilabelMeals();
                console.log('res => ')
                console.log(mealsResponse)                
                setMeals(mealsResponse);
                setIsFetching(false);       
            }catch(error){
                console.log(error);
                setError({message: error.message || 'Could not find meals.'});
                setIsFetching(false);
            }
        }
        fetchMeals();
        console.log('meal items');
        console.log(meals);        
    },[])

    
    if(error){
        return (
        <ErrorPage title="An error occured!" message={error.message} />
        )
    }


    return(
        <ul id="meals">
            {isFetching && <p className="fallback-text">Loading Meals</p>}
            {!isFetching && meals?.length === 0 && <p className="fallback-text">There are no Meals</p>}
            {!isFetching && meals?.length > 0 && (
                meals.map((mealItem) => (
                    <MealItem key={mealItem.id} meal={mealItem}></MealItem>
                ))
            )}
        </ul>
    );
}