import { Fragment } from 'react';
import mealsImage from '../../assets/food.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeartCartButton';

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick = {props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='table full of food' />
        </div>
    </Fragment>
}

export default Header;