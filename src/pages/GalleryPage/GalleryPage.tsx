import React from 'react';
import { useCatalog } from '../../store/CatalogContext';
import Filters from '../../components/Filters/Filters';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

export default function GalleryPage(){
  const {
    filtered, teams, positions,
    selectedTeams, setSelectedTeams,
    selectedPositions, setSelectedPositions
  } = useCatalog();

  return (
    <div className="container">
      <h1>Players — Gallery</h1>
      <div className="toolbar">
        <Filters label="Teams" options={teams} selected={selectedTeams} onChange={setSelectedTeams}/>
        <Filters label="Positions" options={positions} selected={selectedPositions} onChange={setSelectedPositions}/>
      </div>
      <div className="grid">
        {filtered.map(i => <PlayerCard key={i.key} item={i}/>)}
      </div>
      {filtered.length===0 && <p>No results. Try removing some filters.</p>}
    </div>
  );
}
