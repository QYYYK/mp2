import React from 'react';
import { useCatalog } from '../../store/CatalogContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortControls from '../../components/SortControls/SortControls';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

export default function ListPage() {
  const {
    loading, error, filtered,
    search, setSearch,
    sortKey, sortDir, setSortKey, setSortDir,
    season, setSeason,
  } = useCatalog();

  return (
    <div className="container">
      <h1>Players — List</h1>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <SortControls
          sortKey={sortKey}
          sortDir={sortDir}
          onKey={setSortKey}
          onDir={setSortDir}
        />
        <label>
          Season:&nbsp;
          <select
            className="btn"
            value={season}
            onChange={(e) => setSeason(Number(e.target.value))}
          >
            <option value={2025}>2024-25</option>
            <option value={2024}>2023-24</option>
            <option value={2019}>2018-19</option>
          </select>
        </label>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p>Failed: {error}</p>}

      <div className="grid">
        {filtered.map((i) => (
          <PlayerCard key={i.playerId} item={i} />
        ))}
      </div>

      {!loading && filtered.length === 0 && <p>No results.</p>}
    </div>
  );
}
