import React from "react";

const CartContext = React.createContext({
  // Initialize context with default data which will not be used but helps for autocompletion
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
})

export default CartContext;