import {FETCH_COLLECTIONS_START, 
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAILURE } from './shop.types'

import { firestore, convertCollectionsSnapshotToMap  } from '../../firebase/firebase.utils'


export const fetchCollectionStart = () => ({
    type: FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionmap => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: collectionmap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch => { 
        const collectionRef = firestore.collection('collections') ;
        dispatch(fetchCollectionStart())

        //collectionRef.onSnapshot(async snapshot=>{
        collectionRef.get().then( snapshot=>{    
        const collectionmap = convertCollectionsSnapshotToMap(snapshot) ;
        dispatch(fetchCollectionsSuccess(collectionmap))
        } ).catch(error => dispatch(fetchCollectionsFailure(error.message)))
        }    
}