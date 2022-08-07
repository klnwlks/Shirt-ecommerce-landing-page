import {CartItem, ShirtSt} from '../types'
import axios from 'axios'
import {useEffect, useState} from 'react'

import './CartOrder.scss'

function CartOrder(props: {cart: CartItem, remove:(i: number) => any}){
    const [Shirt, setShirt] = useState<ShirtSt>()
    useEffect(() => {
	axios.get(`http://localhost:8000/api/shirts/${props.cart.shirtID}/`)
	     .then(el => {setShirt(el.data)})

    }, [])

    return (
	<div className={`cart-item cart-item-${props.cart.shirtID}`}>
	    <div className='cart-img'>
		<img src={`assets/${props.cart.shirtID}-${props.cart.shirtC}.jpg`} />
	    </div>

	    <div className='cart-text'>
		<h3>{Shirt?.name}</h3>
		<p>{`Total Price: $${Number(props.cart.shirtQ) * Number(Shirt?.price)}`}</p>
		<p>{`Number of orders: ${props.cart.shirtQ}`}</p>
	    </div>

	    <div className='remove' onClick={() => {props.remove(props.cart.shirtID)}}>
		<img src='close.png' />
	    </div>
	</div>
    )
}

export default CartOrder
