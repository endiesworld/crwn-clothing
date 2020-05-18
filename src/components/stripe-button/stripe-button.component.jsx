import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

function StripeCheckoutButton({price}) {
    const priceForStripe = price*100 ;
    const publishableKey = 'pk_test_NXpYsEF75GtnvfhhlDCOw6bq00V06hdtAU'
    const onToken = token => {
        console.log(token)
        alert('Payment Successful') 
    }
    return (
        <div>
            <StripeCheckout 
            label = 'Pay Now'
            name= 'CRWN Clothing Ltd'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/Cuz.svg'
            description={`Your total is $ ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            
            />
        </div>
    )
}

export default StripeCheckoutButton
