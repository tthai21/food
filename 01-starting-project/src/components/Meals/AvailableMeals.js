
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';



const AvailableMeals = () => {
  // meals was an empty array at start
  const[meals, setMeals] =  useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

// useEffect to fetch object from database => return object
  useEffect(() =>{
    // cant use async on useEffect so create async in a nested function
    const fetchMeals = async()=>{
      
      // return promise
      const response =await fetch('https://food-order-app-react-9a98e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')

      if(!response.ok){
        throw new Error('Something went wrong')
      }
      // convert to a json object
      const responseData = await response.json()

      // for loop and push single object to an array
      const loadedMeals = []      
      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }

      //useState update meals + finished loading
      setMeals(loadedMeals)
      setIsLoading(false)

    };
      // Cant try-catch a promise so we use .catch(error =>{})
      fetchMeals().catch(error => {
        setIsLoading(false)
        setHttpError(error.message)
      });
    
  },[]);

  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
