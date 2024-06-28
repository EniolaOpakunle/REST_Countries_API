import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../Redux/countrySlice";
import { useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  useEffect(() => {
    dispatch(fetchCountries());
    console.log(countries.data);
  }, [dispatch]);

  if (countries.isLoading) {
    return <div className="loadingDiv text-center">Loading...</div>;
    console.log(true);
  }

  return (
    <>
      <div className="" id="home">
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid div1">
            <a class="navbar-brand mb-0 h1">Where in the world?</a>
            <form class="d-flex">
              <button class="btn btn-outline-dark h1" type="submit">
                Dark Mode
              </button>
            </form>
          </div>
        </nav>
        <div className="mt-5 d-flex div2">
          <input type="text" placeholder="Search for a country" />
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
                <button class="dropdown-item">Africa</button>
              </li>
              <li>
                <button class="dropdown-item">America</button>
              </li>
              <li>
                <button class="dropdown-item">Asia</button>
              </li>
              <li>
                <button class="dropdown-item">Europe</button>
              </li>
              <li>
                <button class="dropdown-item">Oceania</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="div3 row">
          {countries?.data?.map((index, val) => (
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
      </div>
    </>
  );
}

export default Home;
