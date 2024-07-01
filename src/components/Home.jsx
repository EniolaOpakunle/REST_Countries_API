import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../Redux/countrySlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries);
  const [countryData, setcountryData] = useState([]);
  const [country, setcountry] = useState("");
  const [message, setmessage] = useState("");
  const [dark, setdark] = useState("light");
  const [mode, setmode] = useState('Dark')
  useEffect(() => {
    dispatch(fetchCountries());
    setcountryData(countries?.countries?.data);
    console.log(countries?.countries?.data);
  }, [dispatch]);

  if (countries.isLoading) {
    return <div className="loadingDiv text-center">Loading...</div>;
    console.log(true);
  }
  const filterRegion = (region) => {
    let found = countries?.countries.data.filter((index) => index.region == region);
    console.log(found);
    setcountryData(found);
  };
  const searchCountry = (val) => {
    let found = countries?.countries.data.filter((index) =>
      index.name.common.toLowerCase().includes(val)
    );
    setcountryData(found);
    console.log(found);
  };
  const handleFullDetails = (index) => {
    let found = countries?.countries.data.find((ind) => ind == index);
    console.log(index.name);
    const name = index.name.common.toLowerCase();
    navigate(`/fulldetails/${name}`);
  };
  const handleChangeMode = () => {
    if (dark === "dark"){
      setdark('light')
      setmode("Dark")
    }else{
      setdark('dark')
      setmode("Light")
    }
  };
  console.log(dark);

  return (
    <>
      <div className={`home ${dark}`}>
        <div className="sticky-top">
          <nav class={`navbar navbar-light  p-fixed shadow-sm ${dark}`}>
            <div class="container-fluid div1">
              <a class={`navbar-brand mb-0 h1 ${dark}`}>Where in the world?</a>
                <button 
                className={`${dark}`}
                onClick={()=>handleChangeMode()}>
                  {mode} mode
                </button>
            </div>
          </nav>
        </div>
        <div className="mt-5 row div2">
          <input
            type="text"
            className={`shadow-sm col-lg-3 ${dark}`}
            placeholder="Search for a country"
            id="count"
            onChange={(e) => searchCountry(e.target.value.toLowerCase())}
          />
          <div class="dropdown col-lg-2">
            <button
              class={`dropdown-toggle ${dark}`}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter by Region
            </button>
            <ul class={`dropdown-menu ${dark}`} aria-labelledby="dropdownMenuButton1">
              <li>
                <button
                  className={`dropdown-item ${dark}`}
                  onClick={() => filterRegion("Africa")}
                >
                  Africa
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${dark}`}
                  onClick={() => filterRegion("Americas")}
                >
                  America
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${dark}`}
                  onClick={() => filterRegion("Asia")}
                >
                  Asia
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${dark}`}
                  onClick={() => filterRegion("Europe")}
                >
                  Europe
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${dark}`}
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
            <div
              className={`card col-lg-3 shadow ${dark}`}
              onClick={() => handleFullDetails(index)}
            >
              <img src={index.flags.png} class="" alt="..." />
              <div class="card-body">
                <h5 class=" my-4 title">{index.name.common}</h5>
                <p>
                  <span className="subTitle">Population: </span>
                  {index.population}
                </p>
                <p>
                  <span className="subTitle">Region: </span> {index.region}
                </p>
                <p>
                  <span className="subTitle">Capital: </span>
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
