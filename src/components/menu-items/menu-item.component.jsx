import React from 'react'
import './menu-item.style.scss'
import {useHistory} from 'react-router-dom'


function MenueItem({title, imageUrl, size, linkUrl}) {
    let history = useHistory() ;
    return (
        <div 
            onClick ={() => (
                history.push(linkUrl)
            )}
            style = {{
                backgroundImage: `url(${imageUrl})`
            }}
            className= { ` ${size}, menu-item`}> 
        <div className= 'content'>
            <h1 className= 'title'>{title.toUpperCase()}</h1>
            <span className = 'subtitle'>SHOP NOW</span>
        </div>
    </div>
    )
}

export default MenueItem
