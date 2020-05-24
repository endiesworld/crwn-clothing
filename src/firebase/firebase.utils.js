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

  firebase.initializeApp(config) ;
  export const createUserProfileDocument = async(userAuth, ...additionalData)=>{
      if(!userAuth) return ;
      const userRef = firestore.doc(`users/${userAuth.uid}`)

      const snapShot = await userRef.get() ;

      if(!snapShot.exists){
          let {displayName, email} = userAuth ;
          const createDate = new Date() ;
          
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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey) ;
    const batch = firestore.batch();
    objectsToAdd.forEach(obj=> {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    });

    return await batch.commit()
  }
  
  export const convertCollectionsSnapshotToMap = (collections) => {
      const transformedCollection = collections.docs.map(doc => {
          const {title,items} = doc.data();

          return {
              routeName: encodeURI(title.toLowerCase()),
              id: doc.id,
              title,
              items
          };
      });

      return transformedCollection.reduce((accumulator, collection) => {
          accumulator[collection.title.toLowerCase()] = collection ;
          return accumulator ;
      },{})
  }
 

  export const auth = firebase.auth() ;
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})

  export const signInWithGoogle = () => auth.signInWithRedirect(provider) ;

  export default firebase ;