import React from 'react'

import {auth} from '../../firebase/firebase.utils'
import {ReactComponent as Logo} from '../../asset/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux' ;
import {selectCartItemHidden} from '../../redux/cart/cart.selectors'
import {currentUserSelector} from '../../redux/user/user.selector'
import {HeaderContainer, LogoContainer, OptionsContainer,  OptionLink} from './header.styled'

function Header({currentUser, hidden}) {
    let signOut = () => {
            auth.signOut() ;
            
    }

    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo '/>
            </LogoContainer>
            <OptionsContainer>
            <OptionLink to='/shop' >
                Shop
            </OptionLink>
            <OptionLink to='/contact' >
                Contact
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={signOut}>SIGN OUT</OptionLink> :
                <OptionLink className='option' to='/signin'>SIGN IN</OptionLink>
            }
                <CartIcon />
            </OptionsContainer>
            {
                hidden ? null :
                <CartDropDown /> 
             }
        </HeaderContainer>
    )
}

const mergeStatetoProps = createStructuredSelector({
    currentUser: currentUserSelector,
    hidden: selectCartItemHidden
})
export default connect(mergeStatetoProps)(Header)
