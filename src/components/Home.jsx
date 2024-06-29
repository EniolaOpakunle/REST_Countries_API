import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../Redux/countrySlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries);
  const [countryData, setcountryData] = useState([]);
  const [country, setcountry] = useState('')
  const [message, setmessage] = useState('')
  useEffect(() => {
    dispatch(fetchCountries());
    setcountryData(countries.data);
    console.log(countryData);
  }, [dispatch]);

  if (countries.isLoading) {
    return <div className="loadingDiv text-center">Loading...</div>;
    console.log(true);
  }
  const filterRegion = (region) => {
    let found = countries.data.filter((index) => index.region == region);
    console.log(found);
    setcountryData(found);
  };
  const searchCountry = (val) =>{
    let found = countries.data.filter((index) => index.name.common.toLowerCase().includes(val))
    // if(!found){
    //     setmessage('country not found')
    // }else{
    //     setmessage('')
    // }
    setcountryData(found)
    console.log(found)
  }
  const handleFullDetails = (index) =>{
    let found = countries.data.find((ind) => ind == index )
    console.log(index.name)
    const name = index.name.common.toLowerCase()
    navigate(`/fulldetails/${name}`)

  }

  return (
    <>
      <div className="" id="home">
        <Navbar/>
        <div className="mt-5 d-flex div2">
          <input type="text" placeholder="Search for a country" id="count" onChange={(e) => searchCountry(e.target.value.toLowerCase())}/>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter by Region
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button
                  class="dropdown-item"
                  onClick={() => filterRegion("Africa")}
                >
                  Africa
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item"
                  onClick={() => filterRegion("Americas")}
                >
                  America
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item"
                  onClick={() => filterRegion("Asia")}
                >
                  Asia
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item"
                  onClick={() => filterRegion("Europe")}
                >
                  Europe
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item"
                  onClick={() => filterRegion("Oceania")}
                >
                  Oceania
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>{message}</div>
        <div className="div3 row">
          {countryData?.map((index, val) => (
            <div class="card col-lg-3" onClick={ () => handleFullDetails(index)}>
              <img src={index.flags.png} class="" alt="..." />
              <div class="card-body">
                <h5 class="card-title my-4">{index.name.common}</h5>
                <p>
                  <span>Population: </span>
                  {index.population}
                </p>
                <p>
                  <span>Region: </span> {index.region}
                </p>
                <p>
                  <span>Capital: </span>
                  {index.capital}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
