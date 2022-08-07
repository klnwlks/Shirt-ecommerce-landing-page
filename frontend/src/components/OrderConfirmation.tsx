import './OrderConfirmation.scss'

function OrderConfirmation(props: {umount: () => void}) {
    function close() {
	document.querySelector('#confirmation')!.classList.toggle("disappear-anim")
	setTimeout(props.umount, 1000)
    }
    return (
	<div id='confirmation'>
	    <div className='box'>
		<div className='close' onClick={close}>
		    <img src='close.png' />
		</div>

		<div className='content'>
		    <h1>Thank you for your order!</h1>
		    <h3>Confirmation and status will be sent out to your email shortly.</h3>

		    <p>For any inquiries and/or support, please message us at 
			<a href='mailto:thisdoesntleadtoanemail@example.com'> ~~~~~~~@gmail.com</a>
		    </p>
		</div>
	    </div>
	</div>
    )
}

export default OrderConfirmation
