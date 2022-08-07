import {ShirtSt, CartItem} from '../types'
import {useState, Key} from 'react'
import './Shirt.scss'

function Shirt(props: ShirtSt) {
    const [curCol, setCol] = useState<String>(props.colors[0])

    return (
    <div className={`shirt shirt-${props.id}`}>
	<div className='img-wrapper'>
	    <img src={`assets/${props.id}-${curCol}.jpg`} /> {/* switch to a CDN soon */}
	</div>

	<div className='content'>
	    <p>{props.name}</p>
	    <p>{`$ ${props.price}`}</p>
	    <div className='col-container'>
		{props.colors.map((col: String) => {
		return <div key={col as Key}
		    style={{backgroundColor: col as string}}
		    onClick={() => {setCol(col)}}
		/>
		})}
	    </div>
	    <p onClick={() => {
		props.select!({shirtID: props.id, shirtC: curCol, shirtQ: 1, shirtP: props.price})
	    }} className='add'>
		Add to Cart	
	    </p>
	</div>
    </div>
    ) 
}

export default Shirt
