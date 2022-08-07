import type {ShirtSt, CartItem} from '../types'
import type {FormEvent} from 'react'

import axios from 'axios'
import {useState } from 'react'
import Shirt from './Shirt'
import './Search.scss'

    function Search(props: {select: (a: CartItem) => void}){
    const [searchRes, setRes] = useState<ShirtSt[]>()
    const [searchTerm, setTerm] = useState<String>()

    function search(ev: FormEvent){
	ev.preventDefault()

	if(searchTerm == '') setRes([])
	if(!searchTerm?.match(/^[0-9a-zA-Z]{1,16}$/)) return;

	setTerm(searchTerm.replace(/ /g, '+'))

	axios.get(`http://localhost:8000/api/shirts/?search=${searchTerm}`)
	     .then((el: {data: ShirtSt[]}) => setRes(el.data))
    }

    return (
    <div id='search'>
	<h1>Looking for something else?</h1>
	<form className='searchbar' onSubmit={(e) => search(e)}>
	    <input type='text' placeholder='Search..' 
		value={searchTerm as string} onChange={(e) => setTerm(e.target.value)}
	    />
	    <button type='submit' name='submit' value='submit'>
		<img src='magnify.png'/>
	    </button>
	</form>

	{ searchRes ? 
	    <div className='results'>
	    {searchRes.map((el: ShirtSt) => {
		return <Shirt key={`shirt-result-${el.id}`}
		    id={el.id} price={el.price} colors={el.colors}
		    stock={el.stock} name={el.name} select={props.select}
		/>
	    })}
	    </div>
	:
	    <div className='empty'>
		<p> no search term given </p>
	    </div>
	}
    </div>
    )
}

export default Search
