import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'
import {ReactComponent as Logo} from '../../asset/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux' ;
import {selectCartItemHidden} from '../../redux/cart/cart.selectors'
import {currentUserSelector} from '../../redux/user/user.selector'
import './header.style.scss'

function Header({currentUser, hidden}) {
    let signOut = () => {
            auth.signOut() ;
            
    }

    return (
        <div className = 'header'>
            <Link to='/' className= 'logo-container'>
                <Logo className='logo '/>
            </Link>
            <div className='options'>
            <Link to='/shop' className= 'option'>
                Shop
            </Link>
            <Link to='/contact' className= 'option'>
                Contact
            </Link>
            {
                currentUser ?
                <div className='option' onClick={signOut}>SIGN OUT</div> :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
                <CartIcon />
            </div>
            {
                hidden ? null :
                <CartDropDown /> 
             }
        </div>
    )
}

const mergeStatetoProps = createStructuredSelector({
    currentUser: currentUserSelector,
    hidden: selectCartItemHidden
})
export default connect(mergeStatetoProps)(Header)
