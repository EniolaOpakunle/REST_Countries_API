import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCountries } from '../Redux/countrySlice';
import { useSelector } from 'react-redux';

function Home() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    useEffect(() =>{
        dispatch(fetchCountries())
    },[dispatch])

    if(countries.isLoading){
        return <div className="loadingDiv text-center">Loading...</div>
        console.log(true)
      }

  return (
    <div>Home</div>
  )
}

export default Home