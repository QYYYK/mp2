import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CatalogItem } from '../api/types';
import { fetchPlayerTotals } from '../api/service';

type SortKey = 'points' | 'assists' | 'name';
type SortDir = 'asc' | 'desc';

type Ctx = {
  raw: CatalogItem[];
  loading: boolean;
  error: string | null;

  season: number;
  setSeason: (s: number) => void;

  search: string;
  setSearch: (v: string) => void;

  teams: string[];
  selectedTeams: string[];
  setSelectedTeams: (v: string[]) => void;

  positions: string[];
  selectedPositions: string[];
  setSelectedPositions: (v: string[]) => void;

  sortKey: SortKey;
  sortDir: SortDir;
  setSortKey: (k: SortKey) => void;
  setSortDir: (d: SortDir) => void;

  filtered: CatalogItem[];
};

const CatalogContext = createContext<Ctx | null>(null);

export const CatalogProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [season, setSeason] = useState<number>(2025);
  const [raw, setRaw] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  const [search, setSearch] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('points');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const list = await fetchPlayerTotals({ 
          season, 
          pageSize: 50, 
          sortBy: 'points', 
          ascending: false 
        });

        if (isActive) {
          setRaw(list);
          setError(null);
        }
      } catch(e: any) {
        if (isActive) {
          setError(e?.message ?? 'Failed to load players');
          console.error('Error loading players:', e);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to handle component unmounting
    return () => {
      isActive = false;
    };
  }, [season]);

  const teams = useMemo(() => Array.from(new Set(raw.map(x => x.team))).sort(), [raw]);
  const positions = useMemo(() => Array.from(new Set(raw.map(x => x.position ?? ''))).filter(Boolean).sort(), [raw]);

  const filtered = useMemo(() => {
    let list = raw;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.team.toLowerCase().includes(q) ||
        i.playerId.toLowerCase().includes(q)
      );
    }
    if (selectedTeams.length) {
      list = list.filter(i => selectedTeams.includes(i.team));
    }
    if (selectedPositions.length) {
      list = list.filter(i => i.position && selectedPositions.includes(i.position));
    }
    const dir = sortDir === 'asc' ? 1 : -1;
    list = [...list].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name) * dir;
      const av = (a as any)[sortKey] ?? -Infinity;
      const bv = (b as any)[sortKey] ?? -Infinity;
      return (av - bv) * dir;
    });
    return list;
  }, [raw, search, selectedTeams, selectedPositions, sortKey, sortDir]);

  const value: Ctx = {
    raw, loading, error,
    season, setSeason,
    search, setSearch,
    teams, selectedTeams, setSelectedTeams,
    positions, selectedPositions, setSelectedPositions,
    sortKey, sortDir, setSortKey, setSortDir,
    filtered
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export function useCatalog(){
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used in CatalogProvider');
  return ctx;
}
