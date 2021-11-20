import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  
  // To pass a ref to a custom element we need to user forwardRef in the custom element
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 0 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    // pass entered amount to MealItem where all the info is available to update context (add to items)
    props.addToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref = {amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (number between 1-5).</p>}
    </form>
  );
};

export default MealItemForm;
