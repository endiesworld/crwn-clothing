import React from 'react'

import {ReactComponent as ShoppingIcon} from '../../asset/shopping-bag.svg'
import {connect} from 'react-redux'
import {toggleCartHidden } from '../../redux/cart/cart.action'
import { selectCartItemsCount} from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'
import './cart-icon.styles.scss'

function CartIcon({toggleCartHidden, itemCount}) {
    return (
        <div className= 'cart-icon'>
             <ShoppingIcon className= 'shopping-icon' onClick = {toggleCartHidden}/>
            <span className='item-count'>{ itemCount}</span>
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
}) 

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: ()=> dispatch (toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
