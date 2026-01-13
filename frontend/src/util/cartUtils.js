export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    //Calculate total items price
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    //Calculate total tax price (if order is over $100 : free)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    //Calculate total shipping price
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    //Calculate total cart items price
    state.totalPrice = Number(
        state.itemsPrice + state.shippingPrice + state.taxPrice
    ).toFixed(2);

    localStorage.setItem("cart", JSON.stringify(state));

    return state;
};
