import React,{useState, useEffect} from 'react'
import {Route, useRouteMatch} from 'react-router-dom'
import CollectionsOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component'
import { firestore, convertCollectionsSnapshotToMap  } from '../../firebase/firebase.utils'
import {createStructuredSelector} from 'reselect'

import {connect} from 'react-redux'
import {fetchCollectionStartAsync} from '../../redux/shop/shop.action'
import {selectIsCollectionFetching} from '../../redux/shop/shop.selector'
import  WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview) ;
const CollectionPagewithSpinner = WithSpinner(CollectionPage) ;

const ShopPage = ({isCollectionFetching, fetchCollectionStartAsync}) => {
    
    const match = useRouteMatch();
    useEffect(()=>{
        fetchCollectionStartAsync()
    },[]) ;
    return (
        <div className ='shop-page'>
            <Route exact path={`${match.path}`} render={(props)=> <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} >
                
            </Route>    
            <Route path=  {`${match.path}/:collectionId`}  render ={ (props) => < CollectionPagewithSpinner  isLoading={isCollectionFetching} {...props}/>}> 
               
            </Route>    
            
        </div>
    )

    }

   const mapStateToProps = createStructuredSelector({
       isCollectionFetching: selectIsCollectionFetching
   })
    
   const mapDispatchToProps = dispatch =>({
        fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())     
}) 

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage) ;