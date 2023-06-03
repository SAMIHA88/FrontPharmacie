import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const City = () => {
    const [cities, setCities] = useState([]);
    const [cityNom, setCityNom] = useState('');
    const [cityId, setCityId] = useState('');
  
    const fetchCities = async () => {
      try {
        const response = await axios.get('/api/villes/all');
        setCities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const getCityById = async (cityId) => {
      try {
        const response = await axios.get(`/ville/${cityId}`);
        const cit = cities.find((city) => city.id === cityId);
        setCityNom(response.data.nom);
        setCityId(response.data.id);
        document.getElementById('cityname').value = response.data.nom;
      } catch (error) {
        console.error(error);
      }
    };
  
    const addCity = async () => {
      try {
        const response = await axios.post('/api/villes/save', { nom: cityNom });
        setCities([...cities, response.data]);
        setCityNom('');
      } catch (error) {
        console.error(error);
      }
      fetchCities();
    };
  
    const deleteCity = async (id) => {
      try {
        await axios.delete(`/api/villes/delete/${id}`);
        const updatedCities = cities.filter((city) => city.id !== id);
        setCities(updatedCities);
      } catch (error) {
        console.error(error);
      }
      fetchCities();
    };
  
    const updateCity = async (cityId) => {
      try {
        const response = await axios.put(`/ville/update/${cityId}`, { nom: cityNom });
        const updatedCities = cities.map((city) => {
          if (city.id === response.data.id) {
            return response.data;
          }
          return city;
        });
        setCityId('');
        setCityNom('');
        setCities(updatedCities);
      } catch (error) {
        console.error(error);
      }
      fetchCities();
      document.getElementById('cityname').value = '';
    };
  
    useEffect(() => {
      fetchCities();
    }, []);
  
    return (
      <div className="container mt-4">
        <h1 className="text-g font-big1 slide-in-top">Villes</h1>
        
        <div className="mt-3">
          <input
            type="text"
            id="cityname"
            className="form-control"
            placeholder="City Name"
            value={cityNom}
            onChange={(e) => setCityNom(e.target.value)}
          />
          {cityId ? (
            <button className="btn btn-primary mt-2" onClick={() => updateCity(cityId)}>
              <FaEdit />
            </button>
          ) : (
            <button className="btn btn-primary mt-2" onClick={addCity}>
               <FaPlus/>
            </button>
          )}
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={city.id}>
                <th scope="row">{index + 1}</th>
                <td>{city.nom}</td>
                <td>
                <button className="btn btn-primary btn-sm mx-1 zoom-on-hover" onClick={() => getCityById(city.id)}>
  <FaEdit />
</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteCity(city.id)}>
  <FaTrash className="icon-lg" />
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
 
export default City;