import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchBorderCountries } from '../redux/borderSlice';
import { fetchBorderCountries } from '../Redux/borderSlice';

export default function Borders({ borders }) {
const navigate = useNavigate();
  const dispatch = useDispatch();
  const { borderCountries, isLoading, isError } = useSelector((state) => state.border);

  useEffect(() => {
    if (borders && borders.length > 0) {
      dispatch(fetchBorderCountries(borders));
    } else {
      dispatch({ type: 'border/fetchBorderCountries/fulfilled', payload: ['N/A'] });
    }
  }, [borders, dispatch]);
  const handleFullDetails = (data) => {
    const name = data.toLowerCase();
    navigate(`/fulldetails/${name}`);
  }
  return (
    <div className='borderCountries'>
       {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Something Went Wrong!</div>
      ) : (
        <div>
        {borderCountries.map((border, index) => (
            // <Link to={`/fulldetails/${border.toLowerCase()}`} key={index}>
                  <button className='mx-1'onClick={() => handleFullDetails(border)}>{border}</button>
                //  </Link>
            ))}
        </div>
      )}
    </div>
  );
}