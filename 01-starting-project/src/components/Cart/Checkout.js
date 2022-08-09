import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.trim().length === 4;

const Checkout = (props) => {

  // 
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city:true,
    postal: true
  })

  // set ref
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // get entered data through Ref current.value
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    // valid logic
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    // update state to check input value  
    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city:enteredCityIsValid,
      postal: enteredPostalIsValid
    })




    //check valid form
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid

    
      
    if(!formIsValid){
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal
    })
    

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formValidity.name ? "" : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formValidity.name && <p>Please enter a valid name</p>}
      </div>

      <div className={`${classes.control} ${formValidity.street ? "" : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />        {!formValidity.street && <p>Please enter a valid Street</p>}
      </div>

      <div className={`${classes.control} ${formValidity.postal ? "" : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formValidity.postal && <p>Please enter a valid Postal Code (4 character long)</p>}
      </div>

      <div className={`${classes.control} ${formValidity.city ? "" : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formValidity.city && <p>Please enter city</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
