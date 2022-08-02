import React, {useEffect} from "react";
import ArrowBack from "@mui/icons-material/ArrowBack"
import { useParams, useNavigate } from "react-router-dom";
import Text from "./Text";
import Textdetails from "./Textdetails";
import CountryBorders from "./CountryBorders";
import Header from "./Header";
import Footer from "./Footer";

const CountryDetails = ({countries, refetch}) => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = sessionStorage.getItem('Auth Token')

        if (!authToken) {
        navigate('/login')
        }
    }, [navigate])

    let name;
    let flagImg
    let nativeName
    let population
    let region
    let subregion
    let capital
    let topLevelDomain;
    let currencies = []
    let languages = []
    let borders  = []

    const goBack = () => {
        navigate('/')
    }

    countries.forEach((country) => {
        if(country.alpha3Code === params.countryCode){
            name = country.name;
            flagImg = country.flag;
            nativeName = country.nativeName;
            population = country.population;
            region = country.region;
            subregion = country.subregion;
            capital = country.capital;
            topLevelDomain = country.topLevelDomain;   

            country.currencies?.forEach((currency) => {
                currencies.push(currency.name)
            })

            country.languages?.forEach((language) => {
                languages.push(language.name)
            })

            country.borders?.forEach((border) => {
                borders.push(border)
            })
        }
    })

    return(
        <>
            <Header />
                <div className="country_details">
                    <button className='back' onClick={goBack} >
                        <ArrowBack />
                        <p>Go Back</p>
                    </button>

                    <div className="country_details_body">
                        <div className="img_container">
                            <img src={flagImg} alt="" />
                        </div>
                        <div className="info">
                            <h2>{name}</h2>
                            <div className="info_container">
                                <div className="left_info">
                                    <Text 
                                        text={nativeName} 
                                        title="Native Name" 
                                    />
                                    <Text 
                                        text={population} 
                                        title="Population" 
                                    />
                                    <Text 
                                        text={region} 
                                        title="Region" 
                                    />
                                    <Text 
                                        text={subregion} 
                                        title="Sub region" 
                                    />
                                </div>
                                <div className="right_info">
                                    <Text 
                                        text={capital} 
                                        title="Capital" 
                                    />
                                    <Text 
                                        text={topLevelDomain} 
                                        title="Top-Level Domain" 
                                    />
                                    <Textdetails 
                                        title="Currencies" 
                                        param={currencies} 
                                    />
                                    <Textdetails 
                                        title="Languages" 
                                        param={languages} 
                                    />
                                </div>
                            </div>
                            <CountryBorders 
                                title="Border Countries" 
                                param={borders} 
                                refetch={refetch} 
                            /> 
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}

export default CountryDetails;