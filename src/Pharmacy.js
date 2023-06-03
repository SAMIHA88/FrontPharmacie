import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
const Pharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacieNom, setPharmacieNom] = useState('');
  const [pharmacieAdresse, setPharmacieAdresse] = useState('');
  const [pharmacieLatitude, setPharmacieLatitude] = useState('');
  const [pharmacieLongitude, setPharmacieLongitude] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [zones, setZones] = useState([]);
  const [editingPharmacieId, setEditingPharmacieId] = useState(null);

  const fetchPharmacies = async () => {
    try {
      const response = await axios.get('/api/pharmacies/all');
      setPharmacies(response.data);
    } catch (error) {
      console.error(error);
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

  const savePharmacy = async () => {
    if (editingPharmacieId) {
      try {
        await axios.post(`/api/pharmacies/save`, {
          nom: pharmacieNom,
          adresse: pharmacieAdresse,
          latitude: pharmacieLatitude,
          longitude: pharmacieLongitude,
          zone: {
            id: zoneId
          }
        });
        setEditingPharmacieId(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post('/api/pharmacies/save', {
          nom: pharmacieNom,
          adresse: pharmacieAdresse,
          latitude: pharmacieLatitude,
          longitude: pharmacieLongitude,
          zone: {
            id: zoneId
          }
        });
        setPharmacies([...pharmacies, response.data]);
      } catch (error) {
        console.error(error);
      }
    }

    setPharmacieNom('');
    setPharmacieAdresse('');
    setPharmacieLatitude('');
    setPharmacieLongitude('');
    setZoneId('');

    fetchPharmacies();
  };

  const deletePharmacy = async (id) => {
    try {
      await axios.delete(`/api/pharmacies/delete/${id}`);
      fetchPharmacies();
    } catch (error) {
      console.error(error);
    }
  };

  const editPharmacy = (pharmacie) => {
    setPharmacieNom(pharmacie.nom);
    setPharmacieAdresse(pharmacie.adresse);
    setPharmacieLatitude(pharmacie.latitude);
    setPharmacieLongitude(pharmacie.longitude);
    setZoneId(pharmacie.zone ? pharmacie.zone.id : '');
    setEditingPharmacieId(pharmacie.id);
  };

  useEffect(() => {
    fetchPharmacies();
    fetchZones();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-g font-big1 slide-in-top">Pharmacies</h1>
      <div className="mt-3">
        <form onSubmit={savePharmacy}>
          <div className="mb-3">
            <label htmlFor="pharmacieNom" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="pharmacieNom"
              value={pharmacieNom}
              onChange={(e) => setPharmacieNom(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pharmacieAdresse" className="form-label">
              Adresse
            </label>
            <input
              type="text"
              className="form-control"
              id="pharmacieAdresse"
              value={pharmacieAdresse}
              onChange={(e) => setPharmacieAdresse(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pharmacieLatitude" className="form-label">
              Latitude
            </label>
            <input
              type="text"
              className="form-control"
              id="pharmacieLatitude"
              value={pharmacieLatitude}
              onChange={(e) => setPharmacieLatitude(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pharmacieLongitude" className="form-label">
              Longitude
            </label>
            <input
              type="text"
              className="form-control"
              id="pharmacieLongitude"
              value={pharmacieLongitude}
              onChange={(e) => setPharmacieLongitude(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="zoneId" className="form-label">
              Zone
            </label>
            <select
              className="form-control"
              id="zoneId"
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
            >
              <option value="">Selectionner une  zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.nom}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {editingPharmacieId ? 'Update' : 'Add'} Pharmacie
          </button>
        </form>
      </div>
      <div className="mt-4">
        <h3>Pharmacies</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Adresse</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
              <th scope="col">Zone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacie) => (
              <tr key={pharmacie.id}>
                <td>{pharmacie.nom}</td>
                <td>{pharmacie.adresse}</td>
                <td>{pharmacie.latitude}</td>
                <td>{pharmacie.longitude}</td>
                <td>{pharmacie.zone ? pharmacie.zone.nom : ''}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => editPharmacy(pharmacie)}
                  >
                   <FaEdit className="icon-lg" />
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => deletePharmacy(pharmacie.id)}
                  >
                    
                <FaTrash className="icon-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pharmacy;