import React from 'react';
import { useState } from 'react';

const RegionsList = ({onRegionsListChange, selectedValue}) => {
    const regions = ["Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Centre-Val de Loire",
    "Corse",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandie",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur",
    "Guadeloupe",
    "Martinique",
    "Guyane",
    "La Réunion",
    "Mayotte"
    ];

    const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionListChange = (e) => {
    setSelectedRegion(e.target.value);
    onRegionsListChange(e.target.value);
  };

  const regionsOptions = regions.map((region, index) => (
    <option key={index} value={region}>
      {region}
    </option>
  ));

  return (
    <div>
      <input
        style={{
          borderRadius: 5,
          fontSize: 17,
          padding: 5,
          fontFamily: 'Poppins',
          textAlign: 'center',
          border: '1px solid #5A6ACF',
          color: '#5A6ACF',
          backgroundColor: 'white',
          margin: 7,
          minWidth: '150%',
          maxWidth: '150%'
        }}
        type="text"
        placeholder="Sélectionnez une région"
        value={selectedRegion}
        onChange={handleRegionListChange}
        list="regionsList" // Lier l'input à la datalist
      />
      <datalist id="regionsList"> {/* Créez la datalist */}
        {regionsOptions}
      </datalist>
    </div>
  );
};

export default RegionsList;