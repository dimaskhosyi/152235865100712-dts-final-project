import React from "react";

const Text = ({text, title}) => {
    return(
        <p>
            {title}:
            <span className='text_values'> {text}</span>
        </p>
    )
}

export default Text;