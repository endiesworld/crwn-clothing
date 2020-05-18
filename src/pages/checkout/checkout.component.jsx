import React from 'react'
import {connect} from 'react-redux'
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
import {createStructuredSelector} from 'reselect'

import './checkout.styles.scss'

function CheckoutPage({cartItems, total}) {
    return (
        <div className='checkout-page'>
            <div className="checkout-header">
                <div className="header-block">
                    <span>
                        Product
                    </span>
                </div>
                <div className="header-block">
                    <span>
                        Description
                    </span>
                </div>
                <div className="header-block">
                    <span>
                        Quantity
                    </span>
                </div>
                <div className="header-block">
                    <span>
                        Price
                    </span>
                </div> 
                <div className="header-block">
                    <span>
                        Remove
                    </span>
                </div> 
            </div>
            {
                cartItems.map(cartitem =>
                    <CheckoutItem key={cartitem.id} cartItem={cartitem} />)
            }
            <div className="total">TOTAL: ${total}</div>
            <div className='text-warning'>
                *Please use the following test credit card*
                <br/>
                4242 4242 4242 4242 - exp: 01/20 - CVV:
            </div>
            <StripeCheckoutButton price={total} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems ,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage) ;
