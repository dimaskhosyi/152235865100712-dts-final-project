import React from "react";
import Text from "./Text";

const Country = ({ code, name, capital, population, region, flag, showDetails}) =>  {
    const showDetailsHandler = () => {
        showDetails(code)
    }

    return(
        <div className='country' onClick={showDetailsHandler}>
            <div className="flag_container">
                <img src={flag} alt="" />
            </div>
            <div className="details">
                <h3 className="name">{name}</h3>
                <Text 
                    title="Population"  
                    text={population} 
                />
                <Text 
                    title="Region"  
                    text={region} 
                />
                <Text 
                    title="Capital"
                    text={capital} 
                />
            </div>
        </div>
    )
}

export default Country;