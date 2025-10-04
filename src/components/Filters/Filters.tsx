import React from 'react';
import styles from './Filters.module.css';

type Props = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
};

export default function Filters({ label, options, selected, onChange }: Props){
  function toggle(val: string){
    onChange(selected.includes(val) ? selected.filter(x=>x!==val) : [...selected, val]);
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>{label}</div>
      <div className={styles.chips}>
        {options.map(o=>(
          <button key={o} className={`${styles.chip} ${selected.includes(o)?styles.active:''}`} onClick={()=>toggle(o)} type="button">
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
