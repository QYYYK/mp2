export type PaginatedResp<T> = {
  data: T[];
  pagination?: { page: number; pageSize: number; totalPages: number; totalResults: number };
};

export type PlayerTotals = {
  playerId: string;      // 如 "greemja01"
  playerName: string;    // "Jalen Green"
  team: string;          // "HOU"
  position?: string;     // "SG"
  season: number;        // 2025 表示 2024-25
  games?: number;
  minutesPg?: number;
  totalRb?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  personalFouls?: number;
  points?: number;
  fieldGoalPercent?: number;
  threePtPercent?: number;
};

export type PlayerAdvanced = {
  playerId: string;
  playerName: string;
  team: string;
  season: number;
  position?: string;
  tsPercent?: number;
  usgPercent?: number;
  vorp?: number;
  winShares?: number;
  winSharesPer?: number;
  offensiveBox?: number;
  defensiveBox?: number;
};

export type CatalogItem = {
  key: string;           // playerId-season
  playerId: string;
  name: string;
  team: string;
  position?: string;
  season: number;
  points?: number;
  assists?: number;
  rebounds?: number;     // = totalRb
  image: string;         // 头像URL或占位图
};
