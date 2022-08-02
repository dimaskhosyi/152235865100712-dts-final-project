import React from "react";
import Header from "./Header";
import SearchIcon from "@mui/icons-material/Search"
import Country from "./Country";
import Footer from "./Footer";

const Home = ({regionRef, countriesInputRef, searchCountries, selectRegion, noCountries, countries, showDetails}) => {
    return(
        <>
        <Header />
        <div className="app_body">
            <div className="inputs">
                <div className='search_input'>
                <SearchIcon />
                <input type="text" placeholder="Search country" ref={countriesInputRef} onChange={searchCountries} />
                </div>
                <div className='select_region'>
                    <select ref={regionRef} onChange={selectRegion} >
                        <option>All</option>
                        <option>Africa</option>
                        <option>Asia</option>
                        <option>Americas</option>
                        <option>Europe</option>
                        <option>Oceania</option>
                    </select>
                </div>
            </div>

            <div className="countries">
                {!noCountries ? (
                countries.map((country) => (
                    <Country
                        key={country.alpha3Code}
                        code={country.alpha3Code}
                        name={country.name}
                        capital={country.capital}
                        population={country.population}
                        region={country.region}
                        flag={country.flag}
                        showDetails={showDetails}
                    />
                ))
                ) : (
                <p>No countries found....</p>
                )}
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Home;