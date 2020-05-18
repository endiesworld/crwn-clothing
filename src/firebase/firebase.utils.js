import firebase from 'firebase/app' ;
import 'firebase/firebase-firestore' ;
import 'firebase/firebase-auth'

const config = {
    apiKey: "AIzaSyAkxlwqr6ytU1GDlNsZElMD0wPa6piLeE8",
    authDomain: "crown-clothing-e4bc1.firebaseapp.com",
    databaseURL: "https://crown-clothing-e4bc1.firebaseio.com",
    projectId: "crown-clothing-e4bc1",
    storageBucket: "crown-clothing-e4bc1.appspot.com",
    messagingSenderId: "1043445002301",
    appId: "1:1043445002301:web:78f5ed26dfe77e15953a54"
  } ;


  export const createUserProfileDocument = async(userAuth, ...additionalData)=>{
      if(!userAuth) return ;
      const userRef = firestore.doc(`users/${userAuth.uid}`)

      const snapShot = await userRef.get() ;

      if(!snapShot.exists){
          let {displayName, email} = userAuth ;
          const createDate = new Date() ;
          //displayName = ((displayName) ? displayName : additionalData[displayName]);

          try{
              await userRef.set(
                  {
                      displayName,
                      email,
                      createDate,
                      ...additionalData
                  }
              )

          } catch(error){
              console.log(`error creating user: ${error.message}`)
          };
          
      }

      return userRef ;
  }

  firebase.initializeApp(config) ;

  export const auth = firebase.auth() ;
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})

  export const signInWithGoogle = () => auth.signInWithRedirect(provider) ;

  export default firebase ;