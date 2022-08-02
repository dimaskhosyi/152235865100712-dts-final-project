import React from "react";

const Textdetails = ({ title, param }) => {
    return(
        <p>
            {title}:
            {
                param.map((val) => {
                    if(param.indexOf(val) !== param.length - 1){
                        return(
                            
                            <span key={val} className='values'>
                                {" "}
                                {val},
                            </span>
                        )
                    }else{
                        return (
                            <span key={val} className='values'>
                                {" "}
                                {val}
                            </span>
                        )
                    }
                })
            }
        </p>
    )
}

export default Textdetails;