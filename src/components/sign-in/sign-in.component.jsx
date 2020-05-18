import React, {useState} from 'react' ;
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {signInWithGoogle, auth} from '../../firebase/firebase.utils' ;
import './sign-in.style.scss'

function SignIn() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const {email, password} = values ;

    const handleSubmit= async (e) =>{
        e.preventDefault();
        try{
            auth.signInWithEmailAndPassword( values.email , values.password )
        setValues({email:'', password:''})
        }catch(error){
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target ;
        setValues((oldState) => ({...oldState, [name]:value})) ;
    }

    return (
        <div className = 'sign-in'>
            <h2> I already have an account</h2>
            <span>Sign with your email and password</span>
            <form onSubmit = {handleSubmit}>
                <FormInput 
                    label = 'email'
                    name='email' type= 'email' 
                    value={email} 
                    handleChange ={handleChange}
                    required 
                />
                <FormInput
                    label = 'password'
                    name='password' 
                    type='password' 
                    value={password} 
                    handleChange ={handleChange}
                    required 
                />
                <div className='buttons'>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign in with google </CustomButton>
                </div>
               </form>
        </div>
    )
}

export default SignIn
