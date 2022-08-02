import React from "react";
import { useNavigate } from "react-router-dom";

const CountryBorders = ({title, param, refetch}) => {
    const navigate = useNavigate();

    return(
        <>
        {title}:
        {
            param.length ? (
                param.map((val) => (
                    <div    
                        className='border_country'
                        onClick={() => {
                            refetch();
                            navigate(`/${val}`)
                        }}
                        key={val}
                    >
                        <p>{val}</p>
                    </div>
                ))
            ) : (
                <div className='border_country_none'>
                    <p>No border</p>
                </div>
            )
        }
        </>
    )
}

export default CountryBorders;