import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCountries } from "../Redux/countrySlice";
import Borders from "./Border";
import Spinner from "../utils/Spinner";
import Map from "./Map";


function FullDetails() {
  const { darkMode, handleChangeMode, currentMode } = useOutletContext();
  const navigate = useNavigate();
  const { name } = useParams();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [country, setcountry] = useState([]);
  console.log(countries);
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countries?.countries?.data) {
      let found = countries?.countries?.data?.filter(
        (index) => index.name.common.toLowerCase() === name
      );
      setcountry(found);
      
    }
  }, [countries, name]);

  if (countries.countries.isLoading) {
    return <Spinner currentMode={currentMode} darkMode={darkMode} />;
  }

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className={`fullDetails ${currentMode}`}>
      <div className="pt-5 btnDiv">
        <button
          className={`shadow-sm ${currentMode}`}
          onClick={() => handleExit()}
        >
          Go back
        </button>
      </div>
      <div className="">
        {country?.map((index, val) => (
          <div>
            <div className="row detailsDiv py-5 " >
            <div className="col-lg-5 d-flex justify-content-left">
              <img src={index.flags.png} alt="" className="w-100 h-100" />
            </div>
            <div className="col-lg-6">
              <p className="title">{index.name.common}</p>
              <div className="row">
                <div className="col-lg-6">
                  <p className="">
                    <span className="subTitle">Native Name:</span>{" "}
                    {index.name.official}
                  </p>
                  <p className="">
                    <span className="subTitle">Population: </span>
                    {index.population}
                  </p>
                  <p className="">
                    <span className="subTitle">Region:</span> {index.region}
                  </p>
                  <p className="">
                    <span className="subTitle">Sub Region:</span>{" "}
                    {index.subregion}
                  </p>
                  <p className="">
                    <span className="subTitle">Capital:</span> {index.capital}
                  </p>
                </div>
                <div className="col-lg-6 text-right" >
                  <p className="">
                    <span className="subTitle">Top Level Domain:</span>{" "}
                    {index.tld}
                  </p>
                  {Object.keys(index.currencies).map((key) => (
                    <p>
                      <span className="subTitle">Currencies: </span>
                      {index.currencies[key].name}
                    </p>
                  ))}
                  <p className="d-flex">
                    <span className="subTitle">Languages:</span>
                    {Object.values(index.languages).join(", ")}
                  </p>
                </div>
                <div className="mt-5 subTitle row borderDiv">
                  <div className="col-lg-3">
                    <p>Border Countries:</p>
                  </div>
                  <div className="col-lg-8 d-flex">
                    <span></span>
                    <Borders borders={index.borders} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Map area */}
          <Map locationName={index.name.common}/>
          </div>
           
        ))}
       
      </div>
      
    </div>
  );
}

export default FullDetails;
