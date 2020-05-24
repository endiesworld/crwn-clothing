import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import HomePage from './pages/hompepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'
import {Route, Switch, Redirect} from 'react-router-dom'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.action'
import {currentUserSelector} from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'

import './App.css'




function App(props) {
  const {setCurrentUser} = props ;
  useEffect(
    ()=> {
       let unsub = auth.onAuthStateChanged( async userAuth => {
        if(userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapshot => {
            setCurrentUser ({
              id: snapshot.id,
              ...snapshot.data()
            } )
          }
          )  
        }
        else {
          setCurrentUser(userAuth)
        }
         }
    )
      return function unsubscribe() {
        unsub() ;
      };
      },[]
    )

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path = '/'>
          <HomePage />
        </Route>
        <Route path = '/shop' >
          <ShopPage />
        </Route>  
        <Route exact path = '/signin' render={()=>
          props.currentUser ?
            (<Redirect to ='/' />) : (<SignInAndSignUpPage />)}>  
        </Route>
        <Route path = '/checkout'>
          <CheckoutPage />
        </Route>
      </Switch>   
    </div>
  );
}

const mergeStatetoProps = createStructuredSelector({
  currentUser: currentUserSelector
})
const mapDispatchToProps = dispatch =>({
  setCurrentUser: user=>dispatch(setCurrentUser(user))
})

export default connect(mergeStatetoProps, mapDispatchToProps)(App);
