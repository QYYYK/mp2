export const DEFAULT_PLAYER_IMAGE =
  'https://via.placeholder.com/600x400?text=Player';

function brefHeadshot(id: string) {
  return `https://www.basketball-reference.com/req/202106291/images/headshots/${id}.jpg`;
}

export function getPlayerImageUrl(playerId?: string) {
  if (!playerId) return DEFAULT_PLAYER_IMAGE;
  // playerId 通常是小写格式（如 duranke01 / hardeke01），保险起见转小写
  return brefHeadshot(playerId.toLowerCase());
}
