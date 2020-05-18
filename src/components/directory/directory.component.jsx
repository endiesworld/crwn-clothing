import React from 'react'
import MenueItem from '../menu-items/menu-item.component'
import './directory.style.scss'
import {connect} from 'react-redux' ;
import {selectDirectorySections} from '../../redux/directory/directory.selector'
import {createStructuredSelector} from 'reselect'

const Directory = ({sections})=>  (
            <div className = 'directory-menu'>
                {sections.map(({title,imageUrl,id, linkUrl}) => (
                    <MenueItem key ={id} title = {title} imageUrl = {imageUrl} linkUrl ={linkUrl}/>
                ))}
                
            </div>
        )
    

const mapStateToProp = createStructuredSelector ({ 
  sections: selectDirectorySections
})

export default connect(mapStateToProp)(Directory)
