export async function fetchAvilabelMeals() {
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json();
    console.log('resData');
    console.log(resData);
    if(!response.ok){
        throw new Error('Failed to fetch meals');        
    }

    return resData;
}