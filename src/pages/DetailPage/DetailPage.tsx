import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './DetailPage.module.css';

import { useCatalog } from '../../store/CatalogContext';
import { getPlayerImageUrl, DEFAULT_PLAYER_IMAGE } from '../../utils/imageUtils';
import type { CatalogItem } from '../../api/types';

export default function DetailPage() {
  // 兼容两种参数名
  const { id, playerId } = useParams();
  const pid = (id ?? playerId) ?? '';
  const nav = useNavigate();

  const { filtered, raw, loading } = useCatalog();

  if (loading) {
    return (
      <div className="container">
        <Link className={styles.back} to="..">← Back</Link>
        <div className={styles.card}>Loading…</div>
      </div>
    );
  }

  const item =
    filtered.find((x: CatalogItem) => x.playerId === pid) ??
    raw.find((x: CatalogItem) => x.playerId === pid);

  if (!item) {
    return (
      <div className="container">
        <Link className={styles.back} to="..">← Back</Link>
        <div className={styles.card}>No data for this player.</div>
      </div>
    );
  }

  
  const adv = item as unknown as Record<'ts' | 'usg' | 'vorp' | 'ws', number | undefined>;

  const list: CatalogItem[] = (filtered.length ? filtered : raw) as CatalogItem[];
  const idx = list.findIndex((x: CatalogItem) => x.playerId === item.playerId);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;

  return (
    <div className="container">
      <Link className={styles.back} to="..">← Back</Link>

      <div className={styles.wrap}>
        {/* 左侧：头像卡片 */}
        <div className={`${styles.card} ${styles.hero}`}>
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

        {/* 右侧：信息卡片 */}
        <div className={styles.card}>
          <h1 className={styles.title}>{item.name}</h1>

          <div className={styles.kv}>
            <div>
              <b>Team:</b> {item.team}
              &nbsp;&nbsp; <b>Pos:</b> {item.position ?? '-'}
            </div>
            <div><b>Season:</b> {item.season}</div>
          </div>

          <div className={styles.stats}>
            <div>
              <b>PTS:</b> {item.points ?? '-'}
              &nbsp;&nbsp; <b>AST:</b> {item.assists ?? '-'}
              &nbsp;&nbsp; <b>REB:</b> {item.rebounds ?? '-'}
            </div>
            <div><b>TS%:</b> {adv['ts'] ?? '-'}</div>
            <div><b>USG%:</b> {adv['usg'] ?? '-'}</div>
            <div><b>VORP:</b> {adv['vorp'] ?? '-'}</div>
            <div><b>WS:</b> {adv['ws'] ?? '-'}</div>
          </div>

          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button
              className="btn"
              onClick={() => prev && nav(`/detail/${encodeURIComponent(prev.playerId)}`)}
              disabled={!prev}
            >
              ← Prev
            </button>
            <button
              className="btn"
              onClick={() => next && nav(`/detail/${encodeURIComponent(next.playerId)}`)}
              disabled={!next}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
