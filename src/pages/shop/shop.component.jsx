import React,{useState, useEffect} from 'react'
import {Route, useRouteMatch} from 'react-router-dom'
import CollectionsOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component'
import { firestore, convertCollectionsSnapshotToMap  } from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import {updateCollections} from '../../redux/shop/shop.action'
import  WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview) ;
const CollectionPagewithSpinner = WithSpinner(CollectionPage) ;

const ShopPage = ({updateCollections}) => {
    const [status, setStatus] = useState({loading: true})
    const match = useRouteMatch();
    useEffect(()=>{
        const collectionRef = firestore.collection('collections') ;
        collectionRef.onSnapshot(async snapshot=>{
            const collectionmap = convertCollectionsSnapshotToMap(snapshot) ;
            updateCollections(collectionmap)
            setStatus({loading: false})
        })
    },[]) ;
    return (
        <div className ='shop-page'>
            <Route exact path={`${match.path}`} render={(props)=> <CollectionsOverviewWithSpinner isLoading={status} {...props} />} >
                
            </Route>    
            <Route path=  {`${match.path}/:collectionId`}  render ={ (props) => < CollectionsOverviewWithSpinner  isLoading={status} {...props}/>}> 
               
            </Route>    
            
        </div>
    )

    }

   const mapDispatchToProps = dispatch =>({
     updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)) 
   }) 

export default connect(null, mapDispatchToProps)(ShopPage) ;