import React, {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'
import './sign-up.style.scss'

function SignUP() {
    const [user, setUser] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const handleChange = (e) =>{
        let name = e.target.name ;
        let value = e.target.value ;
        setUser(oldvalue =>({
            ...oldvalue ,
            [name]:value
        }))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault() ;
        const {displayName, email, password, confirmPassword} = user ; 
        if(password !== confirmPassword){
            alert("password do not match")
            return ;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password) ;
            await createUserProfileDocument(user, displayName) ;
            setUser({displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        }catch(error){
            console.log(error) ;
        } ;  
    }

    return (
        <div className='sign-up'>
            <h2 className='tittle'> I do not have an account</h2>
            <span> Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    type='text'
                    name='displayName'
                    value={user.displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required 
                />
                 <FormInput 
                    type='email'
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                    label='email'
                    required 
                />
                 <FormInput 
                    type='password'
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                    label='password'
                    required 
                /> 
                <FormInput 
                    type='password'
                    name='confirmPassword'
                    value={user.confirmPassword}
                    onChange={handleChange}
                    label='confirm Password'
                    required 
                />   
                <CustomButton type='submit'> Sign up </CustomButton> 
            </form>
        </div>
    )
}

export default SignUP
