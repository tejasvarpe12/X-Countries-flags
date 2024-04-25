import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries data');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="country-list">
      {error && <p>Error: {error}</p>}
      {countries.map(country => (
        <div key={country.cca3} className="country">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
          />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
