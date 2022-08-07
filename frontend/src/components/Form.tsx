import { FormEvent, useState, useEffect, Key } from 'react'
import axios from 'axios'
import {OrderSt, CartItem} from '../types'

import OrderConfirmation from './OrderConfirmation'
import CartOrder from './CartOrder'
import './Form.scss'

function Form(props: {cart: CartItem[], remove:(i: number) => void}) {
    const [order, setOrder] = useState<OrderSt>(Object) 
    const [total, setTotal] = useState<number>(0)
    const [show, setShow] = useState<Boolean>(false)

    useEffect(() => {
	setOrder((order: OrderSt) => ({...order, cart: props.cart}))
	let temp = 0

	if (!order.cart) return
	setTotal(temp)
	order.cart.forEach((i) => {
	    setTotal(temp += (i.shirtP * i.shirtQ))
	    if (order.cart.length == 0) setTotal(0)
	})
    }, [JSON.stringify(props.cart)])

    function handleSubmit(e: FormEvent){
	e.preventDefault()
	if (Object.keys(order).length < 4) return; // add more stuff to indicate error

 	if (!order.email.toLowerCase().match(/^\S+@\S+\.\S+$/)){
	    window.alert('please enter a proper email')
	    return;
	}

	axios.post('http://localhost:8000/api/orders/', order)
	setShow(true)
    }

    return (
    <div id='form'>
	<form onSubmit={(e) => handleSubmit(e)}>
	    <h1>Place an Order</h1>
	    <label>Name</label>
	    <input type='text' value={order.name as string} onChange={e => {
		setOrder((order: OrderSt) => ({...order, name: e.target.value}));
	    }} placeholder='Your full name..' required/>

	    <label>Email</label>
	    <input type='text' value={order.email as string} onChange={e => {
		setOrder((order: OrderSt) => ({...order, email: e.target.value}))
	    }} placeholder='Your email...' required/>

	    <label>Address</label>
	    <input type='text' value={order.address as string} onChange={e => {
		setOrder((order: OrderSt) => ({...order, address: e.target.value}))
	    }} placeholder='Your address..' required/>

	    <p>{`Total-$${total}`}</p>


	    <input type='submit' value='Place an order' />
	</form>

	<div className='order-info'>
	{order.cart && order.cart.length > 0?
	    order.cart.map((el: CartItem) => {
	    return <CartOrder key={el.shirtID as Key}
		cart={el}
		remove={props.remove}
	    />
	    })
	:
	    <p> no selected item </p>
	}
	</div>

	{ show ? <OrderConfirmation umount={() => setShow(false)} /> : null }
    </div>
    )
}

export default Form
