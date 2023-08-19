import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext , useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://tesr-390705-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
            method:'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
    };

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item)=>(
        <CartItem
        key = {item.id} 
        name = {item.name}
        amount = {item.amount}
        price = {item.price}
        onRemove = {cartItemRemoveHandler.bind(null, item.id)}
        onAdd = {cartItemAddHandler.bind(null, item)}
        />
    ))}</ul>;

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const modalActions = <div className={classes.actions}>
    <button className= {classes['button--alt']} onClick ={props.onClose}>Close</button>
    {hasItems && <button className= {classes.button} onClick={orderHandler}>Order</button>}
    </div>
    const cartModalContent = <React.Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel = {props.onClose} onConfirm = {submitOrderHandler}/>}
            {!isCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModelContent = <h3>Loading...please Wait!!</h3>

    const didSubmitModelContent = <React.Fragment>
        <h3>Happy meal!! Order arriving soon.</h3>
        <div className={classes.actions}>
    <button className= {classes.button} onClick ={props.onClose}>Close</button></div>
        </React.Fragment>

    return(
        <Modal onClose = {props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModelContent}
            {!isSubmitting && didSubmit && didSubmitModelContent}
        </Modal>
    )
}

export default Cart;