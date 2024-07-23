import React, { useEffect, useState } from 'react';
import './Dropdown.css';
import axios from 'axios';
import config from '../../config/config.js';

const Dropdown = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [district, setDistrict] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [town, setTown] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const fetchAllCountries = async () => {
    try {
      const response = await axios.get(`${config.apiBaseURL}/getcountry`);
      setCountry(response.data.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(`${config.apiBaseURL}/getstate/${countryId}`);
      console.log("response",response)
      setState(response.data.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    setSelectedCountry(selectedCountryId);
    fetchStates(selectedCountryId);
  };


  const fetchDistrict = async (stateId) => {
    try {
      const response = await axios.get(`${config.apiBaseURL}/getdistrict/${stateId}`);
      console.log("response",response)
      setDistrict(response.data.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setSelectedState(selectedStateId);
    fetchDistrict(selectedStateId);
  };

  const fetchTown = async (districtId,countryId,stateId) => {
    try {
      const response = await axios.get(`${config.apiBaseURL}/gettown/?country_id=${countryId}&state_id=${stateId}&district_id=${districtId}`);
      console.log("response",response)
      setTown(response.data.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);
    fetchTown(selectedDistrictId,selectedCountry,selectedState);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return (
    <div className="dropdown">
      <label htmlFor="country">Choose a Country:</label>
      <select name="country" id="country" onChange={handleCountryChange} value={selectedCountry}>
        <option value="">Select</option>
        {country.map((item) => (
          <option key={item.country_id} value={item.country_id}>
            {item.country_name}
          </option>
        ))}
      </select>

      <label htmlFor="state">Choose a State:</label>
      <select name="state" id="state" onChange={handleStateChange} value={selectedState}>
        <option value="">Select</option>
        {state.map((item) => (
          <option key={item.state_id} value={item.state_id}>
            {item.state_name}
          </option>
        ))}
      </select>

      <label htmlFor="district">Choose a District:</label>
      <select name="district" id="district" onChange={handleDistrictChange} value={selectedDistrict}>
        <option value="">Select</option>
        {district.map((item) => (
          <option key={item.district_id} value={item.district_id}>
            {item.district_name}
          </option>
        ))}
      </select>

      <label htmlFor="town">Choose a Town:</label>
      <select name="town" id="town">
        <option value="">Select</option>
        {town.map((item) => (
          <option key={item.town_id} value={item.town_id}>
            {item.town_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
