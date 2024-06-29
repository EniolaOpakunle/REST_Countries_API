import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCountries } from "../Redux/countrySlice";
import Navbar from "./Navbar";

function FullDetails() {
  const navigate = useNavigate()
  const { name } = useParams();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [country, setcountry] = useState([]);
  useEffect(() => {
    dispatch(fetchCountries());
    console.log(name);
    let found = countries.data.filter((index) =>
      index.name.common.toLowerCase().includes(name)
    );
    setcountry(found);
    console.log(found);
  }, [dispatch]);
  const handleExit = () => {
    navigate('/home')
  };

  return (
    <div className="fullDetails">
      <Navbar />
      <div className="mt-5 btnDiv">
        <button className="shadow-sm" onClick={() => handleExit()}>Go back</button>
      </div>
      <div className="">
        {country?.map((index, val) => (
          <div className="row m-auto detailsDiv">
            <div className="col-lg-4">
              <img src={index.flags.png} alt="" className="w-100 h-100" />
            </div>
            <div className="col-lg-7">
              <p className="title">{index.name.common}</p>
              <div className="row">
                <div className="col-lg-5">
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
                <div className="col-lg-5">
                  <p className="">
                    <span className="subTitle">Top Level Domain:</span>{" "}
                    {index.tld}
                  </p>
                  <p className="">
                    <span className="subTitle">Top Level Domain:</span>{" "}
                    {index.tld}
                  </p>
                  <p className="">
                    <span className="subTitle">Top Level Domain:</span>{" "}
                    {index.tld}
                  </p>
                </div>
              </div>
              <div className="mt-5 subTitle">
                <p>Border Countries:</p>
              </div>
            </div>
          </div>
          // <div class="card col-lg-3">
          //   <img src={index.flags.png} class="card-img-top mt-2" alt="..." />
          //   <div class="card-body">
          //     <h5 class="card-title">{index.name.common}</h5>
          //     <p>
          //       <span>Population: </span>
          //       {index.population}
          //     </p>
          //     <p>
          //       <span>Region: </span> {index.region}
          //     </p>
          //     <p>
          //       <span>Capital: </span>
          //       {index.capital}
          //     </p>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default FullDetails;
