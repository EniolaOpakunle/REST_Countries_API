import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCountries } from "../Redux/countrySlice";

function FullDetails() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [country, setcountry] = useState([]);
  useEffect(() => {
    dispatch(fetchCountries());
    console.log(name)
    let found = countries.data.filter((index) =>
      index.name.common.toLowerCase().includes(name)
    );
    setcountry(found)
    console.log(found)
  }, [dispatch]);

  return (
    <div>
      {country?.map((index, val) => (
        <div class="card col-lg-3">
          <img src={index.flags.png} class="card-img-top mt-2" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{index.name.common}</h5>
            <p>
              <span>Population:</span>
              {index.population}
            </p>
            <p>
              <span>Region:</span> {index.region}
            </p>
            <p>
              <span>Capital:</span>
              {index.capital}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FullDetails;
