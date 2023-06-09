import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import './App.css';
import { FaSearch } from 'react-icons/fa';
const Search = () => {
  const [villes, setVilles] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedVille, setSelectedVille] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [selectedPharmacyPosition, setSelectedPharmacyPosition] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    fetchVilles();
  }, []);

  useEffect(() => {
    if (selectedVille) {
      fetchZonesByVille();
    }
  }, [selectedVille]);

  const fetchVilles = async () => {
    try {
      const response = await axios.get('/api/villes/all');
      setVilles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchZonesByVille = async () => {
    try {
      const response = await axios.get(`/api/villes/${selectedVille}/zones`);
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchPharmacies = async () => {
    try {
      const response = await axios.get(`/api/pharmacies/byZone/${selectedZone}`);
      setPharmacies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVilleChange = (e) => {
    setSelectedVille(e.target.value);
    setSelectedZone('');
    setZones([]);
  };

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedZone) {
      searchPharmacies();
    }
  };

  const handlePharmacyClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setSelectedPharmacyPosition({
      lat: parseFloat(pharmacy.latitude),
      lng: parseFloat(pharmacy.longitude),
    });
    handleRouteDirections(); 
  };

  const handleRouteDirections = () => {
    if (selectedPharmacyPosition) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = { lat: 31.6294, lng: -8.0797 }; 

      directionsService.route(
        {
          origin: origin,
          destination: selectedPharmacyPosition,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Error fetching directions:', result);
          }
        }
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-g font-big1 slide-in-top">Recherche des pharmacies</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ville">Ville:</label>
          <select id="ville" value={selectedVille} onChange={handleVilleChange}>
            <option value="">Selectionner la Ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.nom}>
                {ville.nom}
              </option>
            ))}
          </select>
        </div>
        {selectedVille && (
          <div>
            <label htmlFor="zone">Zone:</label>
            <select id="zone" value={selectedZone} onChange={handleZoneChange}>
              <option value="">Selectionner la Zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.nom}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" disabled={!selectedZone}>
         <FaSearch/>
        </button>
      </form>

      {pharmacies.length > 0 && (
        <div>
          <h3 className="font-m"> Pharmacies :</h3>
          <ul className="pharmacy-list">
            {pharmacies.map((pharmacie) => (
              <li key={pharmacie.id}>
                <button onClick={() => handlePharmacyClick(pharmacie)}>
                  {pharmacie.nom}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <br/>
        <h3 className="font-m">Localisation :</h3>
        <LoadScript googleMapsApiKey="AIzaSyB5elPgCtl5JlcrQBgMQxWUFjnI7eUYZ7U">
          <GoogleMap
            center={selectedPharmacyPosition || { lat: 0, lng: 0 }}
            zoom={8} 
    
            mapContainerStyle={{ height: '500px', width: '500px' }}
          >
            {}
            {pharmacies.map((pharmacy) => (
              <Marker
                key={pharmacy.id}
                position={{ lat: parseFloat(pharmacy.latitude), lng: parseFloat(pharmacy.longitude) }}
                onClick={() => handlePharmacyClick(pharmacy)}
              />
            ))}

            {}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Search;
