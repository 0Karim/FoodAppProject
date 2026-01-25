import { useEffect, useState } from "react";
import { fetchAvilabelMeals } from "../http.js";
import Error from './Error.jsx';
import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig={}; //we create empty config for GET request to make it recreated every time the component is rendered
 
export default function Meals(){
    //old code we will use cutom hook instead
    // const[loadedMeals, setLoadedMeals] = useState([]);

    // useEffect(() => {
    //     async function fetchMeals(){
    //         const response = await fetch('http://localhost:3000/meals');
    //         if(!response.ok){

    //         }
    //         const meals = await response.json();        
    //         setLoadedMeals(meals)
    //     }

    //     fetchMeals();
    // },[]);
  
    const {
        data: loadedMeals, 
        isLoading, 
        error
    } = useHttp('http://localhost:3000/meals', requestConfig  , []); //initial data is empty array

    console.log(loadedMeals);

    if(isLoading){
        return <p className="center">Fetching meals...</p>
    }

    if(error){
        return <Error title="failed to fetch meals" message={error}/>
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal}></MealItem>
            ))}
        </ul>
    );
}