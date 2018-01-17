import React from 'react';
import notFoundImage from '../../assets/images/404.gif';
import './NotFound.scss';

export default () => {
    return (
        <div className="not-found-component">
            <img alt="Not found!" className="not-found-image" src={notFoundImage}/>
        </div>
    )
}