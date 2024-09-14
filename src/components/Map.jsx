import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5ueTE2IiwiYSI6ImNtMTI4ZDF2NzB5MXEya3NnZmM5d3htYTkifQ.lJcMTjuY8uxONbmaKrzlng";

export default function Map({ locationName }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(13);

  // Function to fetch coordinates from Mapbox Geocoding API
  const getCoordinates = async (locationName) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
            limit: 1,
          },
        }
      );
      const longitude = response.data.features[0].center[0];
      const latitude = response.data.features[0].center[1];
      setLng(longitude);
      setLat(latitude);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // Fetch coordinates when locationName changes
  useEffect(() => {
    if (locationName) {
      getCoordinates(locationName);
    }
  }, [locationName]);

  // Initialize map after coordinates are fetched or updated
  useEffect(() => {
    if (!map.current && lng !== 0 && lat !== 0) {
      // Initialize map only once with fetched coordinates
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      // Update map view on map movement
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });

      // Add marker to map
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    } else if (map.current) {
      // Fly to new coordinates when they change
      map.current.flyTo({ center: [lng, lat], zoom: zoom });
    }
  }, [lng, lat]);

  return (
    <div style={{width: "89%", margin: "auto", marginTop:20, marginBottom:50 }}>
      <p style={{fontSize: 24, fontWeight:500, paddingLeft:18}}>Map Area</p>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "400px", width: "100%", }}
      />
    </div>
  );
}
