import React from 'react';
import { Link } from 'react-router-dom';
import type { CatalogItem } from '../../api/types';
import styles from './PlayerCard.module.css';
import { getPlayerImageUrl, DEFAULT_PLAYER_IMAGE } from '../../utils/imageUtils';

export default function PlayerCard({ item }: { item: CatalogItem }) {
  return (
    <Link to={`/detail/${encodeURIComponent(item.playerId)}`}
      className={`${styles.card} card`}
    >
      {/* 头像区域：固定比例，img 用 object-fit: contain 完整显示 */}
      <div className={styles.thumb}>
        <img
          className={styles.photo}
          src={getPlayerImageUrl(item.playerId)}
          alt={item.name}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.src.includes(DEFAULT_PLAYER_IMAGE)) {
              img.src = DEFAULT_PLAYER_IMAGE;
            }
          }}
        />
      </div>

      {/* 文本信息 */}
      <div className={styles.meta}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.sub}>
          Team: {item.team} · Pos: {item.position ?? '-'}
        </div>
        <div className={styles.stats}>
          PTS {item.points ?? '-'} · AST {item.assists ?? '-'} · REB {item.rebounds ?? '-'}
        </div>
      </div>
    </Link>
  );
}
