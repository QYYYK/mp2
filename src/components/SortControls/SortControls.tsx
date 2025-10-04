import React from 'react';
import styles from './SortControls.module.css';

type Props = {
  sortKey: 'points'|'assists'|'name';
  sortDir: 'asc'|'desc';
  onKey: (k: Props['sortKey']) => void;
  onDir: (d: Props['sortDir']) => void;
};

export default function SortControls({ sortKey, sortDir, onKey, onDir }: Props){
  return (
    <div className={styles.wrap}>
      <label>
        Sort by:&nbsp;
        <select value={sortKey} onChange={e=>onKey(e.target.value as any)}>
          <option value="points">Points</option>
          <option value="assists">Assists</option>
          <option value="name">Name</option>
        </select>
      </label>
      <label>
        Order:&nbsp;
        <select value={sortDir} onChange={e=>onDir(e.target.value as any)}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </label>
    </div>
  );
}
