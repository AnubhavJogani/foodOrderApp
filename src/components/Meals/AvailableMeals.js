import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

  const AvailableMeals = () =>{
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
      const fetchMeal = async () => {
        const response = await fetch('https://tesr-390705-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

        if(!response.ok){
          throw new Error();
        }
        const responseData =await response.json();
        const loadedMeals = [];

        for (const key in responseData){
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      }
      fetchMeal().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    },[]);

    if(isLoading){
      return <h3 className={classes.MealsLoading}>Loading...</h3>
    }

    if(httpError) {
      return (
        <section className={classes.MealsError}>
          <h3>{httpError}</h3>
        </section>
      )
    }

    const mealsList = meals.map((meal)=> <MealItem id = {meal.id} key = {meal.id} name = {meal.name} description = {meal.description} price = {meal.price}/>)
    return (
        <section className={classes.meals}>
            <Card>
            <ul>
                {mealsList}
            </ul>
            </Card>
        </section>
    )
  }

  export default AvailableMeals;