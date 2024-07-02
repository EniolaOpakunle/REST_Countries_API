import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../Redux/countrySlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries);
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [dark, setDark] = useState("light");
  const [mode, setMode] = useState("Dark");
  const [findMode, setFindMode] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    setCountryData(countries?.countries?.data);
  }, [countries]);

  if (countries.countries.isLoading) {
    return <div className="loadingDiv text-center">Loading...</div>;
  }

  const filterRegion = (region) => {
    let found = countries?.countries.data.filter(
      (index) => index.region === region
    );
    setCountryData(found);
  };

  const searchCountry = (val) => {
    let found = countries.countries.data.filter((index) =>
      index.name.common.toLowerCase().includes(val)
    );
    if (found.length > 0) {
      setCountryData(found);
    } else {
      setCountryData([]);
      setMessage("No countries found");
    }
  };

  const handleFullDetails = (index) => {
    let found = countries?.countries.data.find((ind) => ind === index);
    const name = index.name.common.toLowerCase();
    navigate(`/fulldetails/${name}`);
  };

  const handleChangeMode = () => {
    if (dark === "dark") {
      setDark("light");
      setMode("Dark");
    } else {
      setDark("dark");
      setMode("Light");
    }
  };

  return (
    <>
      <div className={`home ${dark}`}>
        <div className="sticky-top">
          <nav className={`navbar navbar-light p-fixed shadow-sm ${dark}`}>
            <div className="container-fluid div1">
              <a className={`navbar-brand mb-0 h1 ${dark}`}>Where in the world?</a>
              <button className={`${dark}`} onClick={handleChangeMode}>
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
          <div className="dropdown col-lg-2">
            <button
              className={`dropdown-toggle ${dark}`}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter by Region
            </button>
            <ul className={`dropdown-menu ${dark}`} aria-labelledby="dropdownMenuButton1">
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
        {countryData && countryData.length > 0 ? (
          <div className="div3 row">
            {countryData.map((index) => (
              <div
                className={`card col-lg-3 shadow ${dark}`}
                onClick={() => handleFullDetails(index)}
                key={index.name.common}
              >
                <img src={index.flags.png} className="" alt="..." />
                <div className="card-body">
                  <h5 className="my-4 title">{index.name.common}</h5>
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
        ) : (
          <div className="text-center mt-5 title">
            {message || "No countries found."}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
