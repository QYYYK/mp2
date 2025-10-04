import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCatalog } from '../../store/CatalogContext';
import { fetchPlayerAdvanced, fetchSingleTotals } from '../../api/service';
import type { CatalogItem, PlayerAdvanced } from '../../api/types';
import { getPlayerImageUrl, DEFAULT_PLAYER_IMAGE } from '../../utils/imageUtils';
import styles from './DetailPage.module.css';

export default function DetailPage() {
  const params = useParams();
  const location = useLocation();
  // 1) 主路径参数
  let playerId = (params.playerId ?? '').trim();
  // 2) 兜底：从 URL 最后一段再解析一次
  if (!playerId && location.pathname.includes('/detail/')) {
    const last = location.pathname.split('/').filter(Boolean).pop();
    if (last) playerId = decodeURIComponent(last);
  }

  const { filtered, season } = useCatalog();
  const navigate = useNavigate();

  const [item, setItem] = useState<CatalogItem | null>(null);
  const [adv, setAdv] = useState<PlayerAdvanced | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        if (!playerId) {
          setErr('No player ID provided');
          return;
        }
        // 列表上下文优先
        let found = filtered.find(x => x.playerId?.toLowerCase() === playerId.toLowerCase()) ?? null;

        // 直接 URL 打开时单拉一条
        if (!found) {
          found = await fetchSingleTotals(season, playerId);
        }
        if (!found) {
          setErr('Player not found');
          return;
        }
        setItem(found);

        // 高阶数据可选
        try {
          const rows = await fetchPlayerAdvanced({ season, playerId });
          if (rows?.length) setAdv(rows[0]);
        } catch {}
      } catch (e: any) {
        setErr(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [playerId, season, filtered]);

  const index = useMemo(
    () => filtered.findIndex(x => x.playerId?.toLowerCase() === playerId.toLowerCase()),
    [filtered, playerId]
  );
  const prevId = index > 0 ? filtered[index - 1]?.playerId : null;
  const nextId = index >= 0 && index < filtered.length - 1 ? filtered[index + 1]?.playerId : null;

  if (loading) return <div className="container"><p>Loading…</p></div>;
  if (err) return <div className="container"><p>{err}</p></div>;
  if (!item) return <div className="container"><p>Player not found</p></div>;

  return (
    <div className="container">
      <Link to="/">← Back</Link>
      <div className={styles.wrap}>
        <div className={`${styles.left} card`}>
          <img
            src={getPlayerImageUrl(item.playerId)}
            alt={item.name}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              if (!img.src.includes(DEFAULT_PLAYER_IMAGE)) img.src = DEFAULT_PLAYER_IMAGE;
            }}
          />
        </div>
        <div className={styles.right}>
          <h1>{item.name}</h1>
          <p><b>Team:</b> {item.team} &nbsp; <b>Pos:</b> {item.position ?? '-'}</p>
          <p><b>Season:</b> {item.season}</p>
          <p><b>PTS:</b> {item.points ?? '-'} &nbsp; <b>AST:</b> {item.assists ?? '-'} &nbsp; <b>REB:</b> {item.rebounds ?? '-'}</p>

          {adv && (
            <div className={styles.adv}>
              <div><b>TS%:</b> {adv.tsPercent ?? '-'}</div>
              <div><b>USG%:</b> {adv.usgPercent ?? '-'}</div>
              <div><b>VORP:</b> {adv.vorp ?? '-'}</div>
              <div><b>WS:</b> {adv.winShares ?? '-'}</div>
            </div>
          )}

          <div className={styles.nav}>
            <button className="btn" disabled={!prevId} onClick={() => prevId && (navigate(`/detail/${encodeURIComponent(prevId)}`), window.scrollTo(0,0))}>⟵ Prev</button>
            <button className="btn" disabled={!nextId} onClick={() => nextId && (navigate(`/detail/${encodeURIComponent(nextId)}`), window.scrollTo(0,0))}>Next ⟶</button>
          </div>
        </div>
      </div>
    </div>
  );
}
