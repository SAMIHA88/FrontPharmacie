import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './App.css';

const Zone = () => {
  const [zoneName, setZoneName] = useState('');
  const [villeId, setVilleId] = useState('');
  const [villes, setVilles] = useState([]);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    fetchVilles();
    fetchZones();
  }, []);

  const fetchVilles = async () => {
    try {
      const response = await axios.get('/api/villes/all');
      setVilles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get('/api/zones/all');
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleZoneChange = (event) => {
    setZoneName(event.target.value);
  };

  const handleVilleChange = (event) => {
    setVilleId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newZone = {
      nom: zoneName,
      ville: {
        id: villeId
      }
    };

    try {
      await axios.post('/api/zones/save', newZone);
      setZoneName('');
      setVilleId('');
      fetchZones();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteZone = async (id) => {
    try {
      await axios.delete(`/api/zones/delete/${id}`);
      fetchZones();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table-container">
      <h1 className="text-g font-big1 slide-in-top">Zones</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" className="button-search" value={zoneName} onChange={handleZoneChange} placeholder="Nom" />
        </div>
        <div>
        <label>Ville:</label>
          <select value={villeId} className="button-search" onChange={handleVilleChange}>
            
            <option value="" className="button-search" disabled>Selectionner Ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.id}>{ville.nom}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-sm btn-primary"> <FaPlus className="icon-lg" /></button>
        
      </form>

      <table className="table">
        <thead>
          <tr>
            <th >Id</th>
            <th>Zone</th>
            <th>Ville</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone, index) => (
            <tr key={zone.id}>
              <td>{index + 1}</td>
              <td>{zone.nom}</td>
              <td>{zone.ville ? zone.ville.nom : ''}</td>
              <td className="action-buttons">
              <button className="btn btn-sm btn-success"><FaEdit className="icon-lg" /></button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteZone(zone.id)}
                >
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

export default Zone;