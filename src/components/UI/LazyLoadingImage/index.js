import React from 'react'
import Lazyload from 'react-lazyload';


const LazyloadImg = ({ url, isHover }) => {
    return (
        <Lazyload throttle={1000} height={300}>
            <img src={url} alt="" className={`rounded-xl lg:rounded-none ${isHover && 'scale-110'} transition duration-500 ease-linear transform `} />
        </Lazyload>
    )
}

export default LazyloadImg