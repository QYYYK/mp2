import type { CatalogItem, PaginatedResp, PlayerTotals, PlayerAdvanced } from './types';
import { http } from './client';
import MOCK from './mock.json';
import { getPlayerImageUrl } from '../utils/imageUtils';

function toCatalog(t: PlayerTotals): CatalogItem {
  return {
    key: `${t.playerId}-${t.season}`,
    playerId: t.playerId,
    name: t.playerName,
    team: t.team,
    position: t.position,
    season: t.season,
    points: t.points,
    assists: t.assists,
    rebounds: t.totalRb,
    image: getPlayerImageUrl(t.playerId),
  };
}


export async function fetchPlayerTotals(params: {
  season: number;
  team?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  ascending?: boolean;
  isPlayoff?: boolean;
}): Promise<CatalogItem[]> {
  try {
    const res = await http.get<PaginatedResp<PlayerTotals>>('/playertotals', { params });
    const rows = res.data?.data ?? [];
    return rows.map(toCatalog);
  } catch {
    // fallback 到 mock.json
    return (MOCK as any[]).map((m) =>
      toCatalog({ ...(m as any), season: (m as any).season ?? params.season })
    );
  }
}


export async function fetchSingleTotals(season: number, playerId: string): Promise<CatalogItem | null> {
  try {
    const res = await http.get<PaginatedResp<PlayerTotals>>('/playertotals', {
      params: { season, playerId, page: 1, pageSize: 1 },
    });
    const row = res.data?.data?.[0];
    return row ? toCatalog(row) : null;
  } catch {
    const m = (MOCK as any[]).find(
      (x) => (x.playerId || '').toLowerCase() === playerId.toLowerCase()
    );
    return m ? toCatalog({ ...(m as any), season }) : null;
  }
}


export async function fetchPlayerAdvanced(params: {
  season: number;
  team?: string;
  playerId?: string;
  isPlayoff?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  ascending?: boolean;
}): Promise<PlayerAdvanced[]> {
  try {
    const res = await http.get<PaginatedResp<PlayerAdvanced>>('/playeradvancedstats', { params });
    return res.data?.data ?? [];
  } catch {
    return [];
  }
}
