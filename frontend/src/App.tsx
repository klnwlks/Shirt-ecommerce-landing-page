import { useState, useEffect, Key } from 'react'
import axios from 'axios'
import './App.scss'
import {ShirtSt, CartItem} from './types'

import Shirt from './components/Shirt'
import Form from './components/Form'
import Search from './components/Search'

function App() {
    const [shirts, setShirts] = useState<ShirtSt[]>()
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
	axios.get('http://localhost:8000/api/shirts/?ordering=-sold')
	.then((ele) => {setShirts(ele.data); })
    }, [])

    function AddtoCart(c: CartItem){
	let temp = [...cart]
	let i = temp.findIndex(o => (o.shirtID == c.shirtID && o.shirtC == c.shirtC));

	if (i != -1) {
	    temp[i].shirtQ++
	    setCart(temp)
	    return;
	}

	temp.push(c)
	setCart(temp)
    }

    function RemoveFromCart(i: number){
	let temp = [...cart]
	let index = temp.findIndex(o => o.shirtID == i)
	if (index == -1) { return }
	temp[index].shirtQ--

	if (temp[index].shirtQ < 1) {
	    temp.splice(index, 1)
	}
	setCart(temp)
    }

    function scrollSlider(n: number){
	let slider = document.querySelector('.shirt-wrapper')
	slider!.scrollLeft += n
    }

    return (
	<div id='App'>
	    <div className='cart'>
		<a className='content' href='#form'>
		    <img src='cart.png'/>
		    <p>{cart.length}</p>
		</a>
	    </div>

	    <section className='intro'>
		<p>tss</p> { /*pretend this is a link to the main page*/ }
		<div className='text'>
		    <h1>Clothes for every moment and opportunity.</h1>
		</div>
	    </section>

	    <section className='order-wrapper'>
		<h1>Trending</h1>
		<div className='scroll-left scroll' 
		    onClick={() => {scrollSlider(-1 * document.querySelector('.shirt-wrapper')!.clientWidth)}}>
		    <img src='arrow.png'/>
		</div>
		<div className='shirt-wrapper'>
		    {shirts ? 
		    shirts.map((el: ShirtSt) => {
			if (el.stock < 2) return null

			return <Shirt key={el.id as Key}
			id = {el.id} price = {el.price}
			name = {el.name} stock = {el.stock}
			colors = {el.colors} select={AddtoCart}
			/>
		     })  
		    :
		    null
		    }
		</div>

		<div className='scroll-right scroll'
		    onClick={() => {scrollSlider(document.querySelector('.shirt-wrapper')!.clientWidth)}}>
		    <img src='arrow.png'/>
		</div>

		<Search select={AddtoCart}/>
	    </section> 

	    <section className='form-wrapper'>
		<Form cart={cart!} remove={RemoveFromCart}/>
	    </section>

	    <section className='contact'>
		<ul>
		    <li><a href=''>Facebook</a></li>
		    <li><a href=''>+~~ ~~~ ~~~~ ~~~</a></li>
		    <li>©2022 this is a mockup</li>
		</ul>
	    </section>
	</div>
    )
}

export default App
