import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

// Helper Functions
const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street : true,
    postalCode : true,
    city : true,
  })

  const nameInputRef       = useRef();
  const streetInputRef     = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef       = useRef();
     
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName       = nameInputRef.current.value;
    const enteredStreet     = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity       = cityInputRef.current.value;

    const enteredNameIsValid       = !isEmpty(enteredName);
    const enteredStreetIsValid     = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid       = !isEmpty(enteredCity);

    setFormInputValidity({
      name       : enteredNameIsValid,
      street     : enteredStreetIsValid,
      postalCode : enteredPostalCodeIsValid,
      city       : enteredCityIsValid,
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit cart data
    props.onConfirm({
      name : enteredName,
      street : enteredStreet,
      postalCode : enteredPostalCode,
      city : enteredCity
    });
  };

  const nameControlClasses       = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
  const StreetControlClasses     = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`;
  const cityControlClasses       = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Empty field. Please fill this field.</p>}
      </div>
      <div className={StreetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Empty field. Please fill this field.</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p>Postal Code must be 5 characters long.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Empty field. Please fill this field.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;