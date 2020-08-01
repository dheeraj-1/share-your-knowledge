import React from 'react';

const article = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    );
}

export default article;