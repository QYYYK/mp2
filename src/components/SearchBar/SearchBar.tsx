import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange }: { value: string; onChange: (v:string)=>void }){
  return (
    <input
      className={styles.input}
      placeholder="Search player / team / id..."
      value={value}
      onChange={(e)=>onChange(e.target.value)}
    />
  );
}
