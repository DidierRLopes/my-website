import React, { useMemo, useState } from 'react';
import data from '@site/src/data/workspaceBench.json';
import styles from './styles.module.css';

const { TM_TOOLS, TM_TIER, TM_ANCHOR, TM_ROWS, SURFACE, DIST, issueMeaning, benchCopy, stepCopy, levelCopy, contractCopy, CALIB, TX, BENCH, ISSUES_MATRIX } = data;

const TIERS = ['t0', 't1', 't2', 't3', 't4'];

const FAMILY_DESC = {
  create: 'create widgets', update: 'update widget params', delete: 'remove widgets',
  layout: 'grid geometry', note: 'documentation notes', read: 'read & cite data',
  apps: 'instantiate apps', navigate: 'dashboards & tabs', skills: 'run workspace skills',
  delegate: 'delegate to agents', params: 'parameter surgery', backends: 'manage backends',
  resources: 'MCP resources', prompts: 'MCP prompts', inspect: 'ambient-state reasoning',
};

const REPO = 'https://github.com/DidierRLopes/openbb-workspace-bench/blob/main/';

const MODEL_META = {
  'gpt-5.5': { color: '#2563eb', why: 'most advanced model' },
  'sonnet-5': { color: '#0d9488', why: 'recent release, fairly affordable' },
  'glm-5.2': { color: '#7c3aed', why: 'best open-weights model' },
  'gpt-4.1-mini': { color: '#d97706', why: 'solid and cheap — the gating model' },
  'gpt-oss-20b': { color: '#db2777', why: 'strong open-weights MoE' },
  'qwen3-8b': { color: '#64748b', why: 'small dense model, runs locally' },
};
// red ramp aligned to model order, for the failure chart (fewer is better)
const FAIL_COLORS = ['#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#7f1d1d'];

// where each eval-loop stage lives in the repo
const STEP_FILES = {
  scenario: [['src/workspace_bench/core/scenario_packs/workspace_bench_v1/', 'the 300 scenario JSON files — one task each']],
  seed: [['src/workspace_bench/workspace/fixtures.py', 'fixture backends: equities, macro, portfolio, Stark']],
  discover: [['src/workspace_bench/workspace/simulated_workspace.py', 'list_available_widgets, get_widget_schema']],
  act: [['src/workspace_bench/workspace/simulated_workspace.py', 'create_widget, update_widget, delete_widget, …']],
  snapshot: [['src/workspace_bench/workspace/simulated_workspace.py', 'get_workspace_snapshot — the durable state']],
  grade: [['src/workspace_bench/core/graders.py', 'final-state + trace checks, issue codes']],
};

function ModelLegend({ colors }) {
  return (
    <div className={styles.legendRow}>
      {CALIB.map((m, i) => (
        <span key={m.slug} className={styles.legendItem}>
          <span className={styles.legendSwatch}
                style={{ background: colors ? colors[i] : MODEL_META[m.slug].color }} />
          {m.label}
        </span>
      ))}
    </div>
  );
}

// generic grouped column chart (SVG)
function GroupedColumns({ groups, values, colors, yMax, yFmt, angled }) {
  const W = 720, padL = 32, padR = 10, padT = 10, padB = angled ? 74 : 30, plotH = 214;
  const H = padT + plotH + padB, plotW = W - padL - padR;
  const gw = plotW / groups.length;
  const bw = Math.min(20, (gw - 10) / CALIB.length);
  const y = (v) => padT + plotH * (1 - v / yMax);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * yMax));
  return (
    <div className={styles.matrixScroll}>
      <svg className={styles.chartSvg} viewBox={`0 0 ${W} ${H}`} role="img">
        {ticks.map((tk) => (
          <g key={tk}>
            <line x1={padL} y1={y(tk)} x2={W - padR} y2={y(tk)} className={styles.grid} />
            <text x={padL - 5} y={y(tk) + 3} textAnchor="end" className={styles.axisText}>{yFmt(tk)}</text>
          </g>
        ))}
        {groups.map((g, gi) => {
          const inner = bw * CALIB.length;
          const start = padL + gi * gw + (gw - inner) / 2;
          const lx = padL + gi * gw + gw / 2;
          return (
            <g key={g.key}>
              {CALIB.map((m, si) => {
                const v = values[gi][si];
                return (
                  <rect key={m.slug} x={start + si * bw + 1} y={y(v)} width={bw - 2}
                        height={plotH * v / yMax} rx="1" style={{ fill: colors[si] }}>
                    <title>{`${m.label} · ${g.label}: ${yFmt(v)}`}</title>
                  </rect>
                );
              })}
              {angled ? (
                <text x={lx} y={padT + plotH + 12} className={styles.axisText}
                      transform={`rotate(-30 ${lx} ${padT + plotH + 12})`} textAnchor="end">{g.label}</text>
              ) : (
                <text x={lx} y={padT + plotH + 16} textAnchor="middle" className={styles.axisText}>{g.label}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Panel({ head, sub, note, children, pad = true }) {
  return (
    <figure className={styles.wb} style={{ margin: '1.6rem 0' }}>
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <strong>{head}</strong>
          {sub ? <span>{sub}</span> : null}
        </div>
        {pad ? <div className={styles.panelBody}>{children}</div> : children}
        {note ? <div className={styles.panelNote}>{note}</div> : null}
      </div>
    </figure>
  );
}

function Bar({ name, pct, label }) {
  return (
    <div className={styles.distRow}>
      <span>{name}</span>
      <div className={styles.distTrack}>
        <div className={styles.distFill} style={{ width: `${pct}%` }} />
      </div>
      <span>{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------- media slots
export function MediaSlot({ id, caption, kind = 'image', src = null, youtube = null }) {
  return (
    <figure className={styles.wb}>
      <div className={styles.mediaSlot}>
        {youtube ? (
          <div className={styles.mediaFrame}>
            <iframe
              src={`https://www.youtube.com/embed/${youtube}`}
              title={caption || id}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : src ? (
          kind === 'video' ? (
            <video src={src} controls muted playsInline />
          ) : (
            <img src={src} alt={caption} loading="lazy" />
          )
        ) : (
          <div className={styles.mediaBody}>media pending · {id}</div>
        )}
        {caption ? <div className={styles.mediaCaption}>{caption}</div> : null}
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------- toc strip
export function TocStrip() {
  const items = [
    ['#why', '01 · Why a benchmark'],
    ['#inside', '02 · Inside the benchmark'],
    ['#distribution', '03 · A designed distribution'],
    ['#results', '04 · Results'],
    ['#cuts', '05 · The score cuts both ways'],
  ];
  return (
    <nav className={`${styles.wb} ${styles.toc}`} aria-label="Contents">
      {items.map(([href, label]) => (
        <a key={href} href={href}>{label}</a>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------- tile selectors
function TileSelector({ tiles, copy, cols }) {
  const [active, setActive] = useState(tiles[0].key);
  const detail = copy[active];
  const colClass = { 4: styles.tilesCols4, 5: styles.tilesCols5, 6: styles.tilesCols6 }[cols];
  return (
    <>
      <div className={`${styles.tiles} ${colClass}`} style={{ padding: 16 }}>
        {tiles.map((t) => (
          <button
            key={t.key}
            className={`${styles.tile} ${active === t.key ? styles.tileActive : ''}`}
            onClick={() => setActive(t.key)}
          >
            <small>{t.small}</small>
            <strong>{t.strong}</strong>
            {t.span ? <span>{t.span}</span> : null}
          </button>
        ))}
      </div>
      <div className={styles.detailBox} aria-live="polite">
        <h4>{detail.title}</h4>
        <p>{detail.text}</p>
        {detail.example ? <span className={styles.example}>{detail.example}</span> : null}
      </div>
    </>
  );
}

export function PatternList() {
  const rows = [
    ['swe', 'SWE-bench', 'Software issues'],
    ['terminal', 'Terminal-Bench', 'Terminal tasks'],
    ['webarena', 'WebArena', 'Browser tasks'],
    ['workspace', 'WorkspaceBench', 'OpenBB workspace tasks'],
  ];
  return (
    <Panel head="The pattern, elsewhere">
      <ul className={styles.levelList}>
        {rows.map(([key, name, kind]) => (
          <li key={key} className={styles.levelItem}>
            <div className={styles.levelHead}>
              <strong>{name}</strong>
              <span className={styles.levelCount}>{kind}</span>
            </div>
            <p className={styles.levelText}>{benchCopy[key].text}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const STEP_KEYS = ['scenario', 'seed', 'discover', 'act', 'snapshot', 'grade'];
const STEP_LABELS = {
  scenario: ['Scenario', 'task · checks'],
  seed: ['Seed', 'fixture state'],
  discover: ['Discover', 'list · schema'],
  act: ['Act', 'create · repair'],
  snapshot: ['Snapshot', 'state + trace'],
  grade: ['Grade', 'scorecard'],
};
const STEP_BOXES = {
  scenario: { x: 16, y: 163, w: 112, h: 56 },
  seed: { x: 156, y: 163, w: 104, h: 56 },
  discover: { x: 312, y: 146, w: 156, h: 34 },
  act: { x: 312, y: 206, w: 156, h: 34 },
  snapshot: { x: 516, y: 163, w: 100, h: 56 },
  grade: { x: 648, y: 163, w: 104, h: 56 },
};

export function EvalLoopDiagram() {
  const [active, setActive] = useState('scenario');
  const m = 'url(#wb-arr-e)';
  const d = stepCopy[active];
  const isLoopActive = active === 'discover' || active === 'act';
  const isWorkspaceActive = ['seed', 'discover', 'act', 'snapshot'].includes(active);
  const stage = (k) => {
    const box = STEP_BOXES[k];
    const [main, sub] = STEP_LABELS[k];
    const on = active === k;
    const cx = box.x + box.w / 2;
    const cy = box.y + box.h / 2;
    const setStage = () => setActive(k);
    return (
      <g
        key={k}
        role="button"
        tabIndex={0}
        aria-pressed={on}
        aria-label={`${main}: ${sub}`}
        style={{ cursor: 'pointer' }}
        onClick={setStage}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setStage();
          }
        }}
      >
        <rect
          x={box.x} y={box.y} width={box.w} height={box.h} rx="4"
          style={{
            fill: on ? 'var(--wb-accent)' : 'var(--wb-paper)',
            stroke: on ? 'var(--wb-accent-strong)' : 'var(--wb-accent-line)',
          }}
        />
        <text className={styles.dMain} x={cx} y={cy - 3} textAnchor="middle"
              style={{ fill: on ? 'var(--wb-on-accent)' : 'var(--wb-ink)' }}>{main}</text>
        <text className={styles.dSub} x={cx} y={cy + 11} textAnchor="middle"
              style={{ fill: on ? 'var(--wb-on-accent)' : 'var(--wb-muted)' }}>{sub}</text>
      </g>
    );
  };
  return (
    <Panel head="The eval loop" sub="click a step" pad={false}>
      <div className={styles.matrixScroll} style={{ padding: 16 }}>
        <svg className={styles.diagram} viewBox="0 0 760 288" role="img"
             aria-label="The eval loop: a scenario seeds a deterministic workspace, the agent runs a discover and act turn loop, then the final state is snapshotted and graded.">
          <Arrow id="wb-arr-e" />

          {/* deterministic workspace boundary */}
          <rect x="140" y="64" width="480" height="210" rx="8" strokeDasharray="5 5"
                style={{ fill: 'none', stroke: isWorkspaceActive ? 'var(--wb-accent-line)' : 'var(--wb-line)' }} />
          <text className={styles.dEdge} x="156" y="86">deterministic workspace / simulator</text>
          <text className={styles.dSub} x="156" y="101">fixture state · tool surface · reproducible</text>

          {/* agent turn loop boundary */}
          <rect x="300" y="118" width="180" height="144" rx="6"
                style={{ fill: 'none', stroke: isLoopActive ? 'var(--wb-accent-line)' : 'var(--wb-line)' }} />
          <text className={styles.dEdge} x="390" y="138" textAnchor="middle">agent turn loop</text>

          {/* outer flow arrows on the centerline */}
          <line className={styles.link} x1="128" y1="191" x2="154" y2="191" markerEnd={m} />
          <line className={styles.link} x1="260" y1="191" x2="298" y2="191" markerEnd={m} />
          <line className={styles.link} x1="480" y1="191" x2="514" y2="191" markerEnd={m} />
          <line className={styles.link} x1="616" y1="191" x2="646" y2="191" markerEnd={m} />

          {/* discover <-> act loop arrows */}
          <line className={styles.link} x1="352" y1="180" x2="352" y2="204" markerEnd={m} />
          <line className={styles.link} x1="428" y1="206" x2="428" y2="182" markerEnd={m} />

          {STEP_KEYS.map(stage)}
        </svg>
      </div>
      <div className={styles.detailBox} aria-live="polite">
        <h4>{d.title}</h4>
        <p>{d.text}</p>
        <p className={styles.repoLine}>in the repo:</p>
        <ul className={styles.repoList}>
          {STEP_FILES[active].map(([path, note]) => (
            <li key={path}>
              <a href={REPO + path} target="_blank" rel="noreferrer"><code>{path}</code></a>
              <span> — {note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

export function WorkflowMixList() {
  const rows = [
    ['L0', '28', 'Inspect & answer', 'l0'],
    ['L1', '124', 'Single widget', 'l1'],
    ['L2', '76', 'Build a dashboard', 'l2'],
    ['L3', '40', 'Apps & skills', 'l3'],
    ['L4', '32', 'Repair', 'l4'],
  ];
  return (
    <Panel head="The workflow mix" sub="L0–L4 across the 300">
      <ul className={styles.levelList}>
        {rows.map(([lvl, n, name, key]) => (
          <li key={key} className={styles.levelItem}>
            <div className={styles.levelHead}>
              <span className={styles.levelBadge}>{lvl}</span>
              <strong>{name}</strong>
              <span className={styles.levelCount}>{n} tasks</span>
            </div>
            <p className={styles.levelText}>{levelCopy[key].text}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// ---------------------------------------------------------------- surface bar chart
export function SurfaceBarChart() {
  const items = useMemo(() => {
    const c = {};
    TM_TOOLS.forEach((t) => (c[t] = 0));
    for (const row of TM_ROWS) TM_TOOLS.forEach((t, i) => { if (row[3] & (1 << i)) c[t] += 1; });
    return SURFACE
      .map(([name, short, , desc]) => ({ name, short, desc, count: c[short] ?? 0 }))
      .sort((a, b) => b.count - a.count);
  }, []);
  const max = Math.max(...items.map((it) => it.count));
  return (
    <Panel head="The full surface" sub="scenarios exercising each part · most to least">
      <div className={styles.hbarList}>
        {items.map((it) => (
          <div key={it.short} className={styles.hbarRow}>
            <div className={styles.hbarLabel}>
              <div className={styles.hbarName}>{it.name}</div>
              <div className={styles.hbarDesc}>{it.desc}</div>
            </div>
            <div className={styles.hbarTrack}>
              <div className={styles.hbarFill} style={{ width: `${(100 * it.count) / max}%` }} />
            </div>
            <span className={styles.hbarVal}>{it.count}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- distribution at a glance
export function DistributionGlance() {
  // Tier and difficulty are tallied live from the scenarios on this page, so the
  // reader can see they are real counts and not a hand-written summary.
  const groups = useMemo(() => {
    const tier = {}, diff = {};
    TIERS.forEach((t) => (tier[t] = 0));
    for (const r of TM_ROWS) { tier[r[2]] += 1; diff[r[8]] = (diff[r[8]] || 0) + 1; }
    return {
      'by tier': TIERS.map((t) => [t, tier[t]]),
      'by level': DIST['by level'],
      'by difficulty': [['easy', diff.easy], ['medium', diff.medium], ['hard', diff.hard]],
      'by backend': DIST['by backend'],
    };
  }, []);
  return (
    <Panel
      head="The distribution, at a glance"
      sub="counted from the 300 certified scenarios"
      note={
        <>Every count is tallied from the certified pack, not hand-written: tier and difficulty are
        computed live from the scenarios rendered on this page, level and backend from the same scenario
        tags. All four are quota-enforced at generation and re-checked by <code>workspace-bench validate</code> on
        every run, so a regression fails CI. The per-scenario tags live in{' '}
        <a href="https://github.com/DidierRLopes/openbb-workspace-bench/blob/main/docs/scenario-catalog.md">docs/scenario-catalog.md</a>.</>
      }
    >
      <div className={styles.distGrid}>
        {Object.entries(groups).map(([title, rows]) => {
          const max = Math.max(...rows.map((r) => r[1]));
          return (
            <div className={styles.distPanel} key={title}>
              <h5>{title}</h5>
              {rows.map(([name, n]) => (
                <Bar key={name} name={name} pct={(100 * n) / max} label={n} />
              ))}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- tool matrix
const TM_FAMILIES = [...new Set(TM_ROWS.map((r) => r[1]))];

export function ToolMatrix() {
  const [family, setFamily] = useState(TM_FAMILIES[0]);
  const [sel, setSel] = useState(null);
  const rows = useMemo(() => TM_ROWS.filter((r) => r[1] === family), [family]);
  const anchors = TM_ANCHOR[family] || [];
  const detail = sel !== null ? rows[sel] : null;
  return (
    <Panel head="Which tools does each test require?" sub="pick a family · click a test" pad={false}>
      <div style={{ padding: 16 }}>
        <div className={styles.btnRow}>
          <span className={styles.btnLabel}>Family</span>
          <select className={styles.select} value={family}
                  onChange={(e) => { setFamily(e.target.value); setSel(null); }}>
            {TM_FAMILIES.map((f) => (
              <option key={f} value={f}>{f} — {FAMILY_DESC[f]}</option>
            ))}
          </select>
          <span className={styles.familyDesc}>{FAMILY_DESC[family]}</span>
        </div>
        <div className={styles.matrixLegend}>
          <span><span className={`${styles.tmMark} ${styles.tmAnchor}`}>x</span> the family's anchor tool, exercised at every tier</span>
          <span><span className={styles.tmMark}>x</span> another tool the reference solution uses</span>
        </div>
      </div>
      <div className={styles.matrixScroll}>
        <table className={`${styles.matrixTable} ${styles.matrixWide}`}>
          <thead>
            <tr>
              <th className={styles.hHoriz}>#</th>
              <th className={styles.hHoriz}>tier</th>
              <th className={styles.hHoriz}>test</th>
              {TM_TOOLS.map((t) => <th key={t} className={styles.hAngle}><span>{t}</span></th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const tierStart = i % 4 === 0;
              return (
                <tr key={r[0]} onClick={() => setSel(i)}
                    className={`${sel === i ? styles.rowActive : ''} ${tierStart && i !== 0 ? styles.tierBreak : ''}`}>
                  <td>{i + 1}</td>
                  {tierStart ? <td rowSpan={4} className={styles.tierCell}>{r[2]}</td> : null}
                  <td className={styles.tmId}>{r[0]}</td>
                  {TM_TOOLS.map((t, ti) => {
                    const used = r[3] & (1 << ti);
                    const anchor = anchors.includes(t);
                    return (
                      <td key={t}>
                        {used ? <span className={`${styles.tmMark} ${anchor ? styles.tmAnchor : ''}`}>x</span> : ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.detailBox} aria-live="polite">
        {detail ? (
          <>
            <h4 style={{ overflowWrap: 'anywhere' }}>{detail[0]}</h4>
            <p className={styles.tmMeta}>
              {TM_TIER[detail[2]].label} · {detail[8]} · split: {detail[9]} · max turns {detail[4]}
            </p>
            <p style={{ marginBottom: 8 }}>{detail[5]}</p>
            <p className={styles.tmMeta} style={{ marginBottom: 4 }}>
              oracle: {detail[6].join(' → ')}
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.78rem' }}>
              {detail[7].map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            {detail[10] ? <p className={styles.tmMeta} style={{ marginTop: 8 }}>novelty: {detail[10]}</p> : null}
          </>
        ) : (
          <p>Every row is one certified scenario: click it for the analyst prompt, the reference tool sequence, and the pass criteria.</p>
        )}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- composition heatmap
function popcount(n) { let c = 0; while (n) { c += n & 1; n >>>= 1; } return c; }

export function CompositionHeatmap() {
  // cell[tier][family] = rounded avg tools per episode (integer)
  const { value, lo, hi } = useMemo(() => {
    const cells = {};
    for (const r of TM_ROWS) {
      const k = `${r[2]}|${r[1]}`;
      (cells[k] = cells[k] || []).push(popcount(r[3]));
    }
    const val = {};
    let mn = Infinity, mx = -Infinity;
    for (const t of TIERS) for (const f of TM_FAMILIES) {
      const v = cells[`${t}|${f}`] || [];
      const avg = v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 0;
      val[`${t}|${f}`] = avg;
      if (avg < mn) mn = avg; if (avg > mx) mx = avg;
    }
    return { value: val, lo: mn, hi: mx };
  }, []);
  return (
    <Panel
      head="Composition heatmap"
      sub="tools per episode · tier × family"
      note="Reading down a column, almost every family darkens — the same anchor capability wrapped in progressively more of the surface. The flat columns are deliberate too: layout stays a two-tool game at every tier because its difficulty comes from geometric precision, not composition."
      pad={false}
    >
      <div className={`${styles.tableWrap} ${styles.heatPad}`} style={{ display: 'flex', justifyContent: 'center' }}>
        <table className={`${styles.heat} ${styles.heatCentered}`}>
          <thead>
            <tr>
              <th>tier</th>
              {TM_FAMILIES.map((f) => <th key={f} className={styles.heatFamCol}>{f}</th>)}
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t) => (
              <tr key={t}>
                <td>{t}</td>
                {TM_FAMILIES.map((f) => {
                  const v = value[`${t}|${f}`];
                  const a = (v - lo) / (hi - lo || 1);
                  return (
                    <td key={f} style={{
                      background: `color-mix(in srgb, var(--wb-accent) ${Math.round(a * 85)}%, transparent)`,
                      color: a > 0.55 ? 'var(--wb-on-accent)' : 'var(--wb-ink)',
                    }}>{v}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- contracts figure
export function FourContracts() {
  const keys = [
    ['scenario', 'Scenario file'],
    ['toolcall', 'Agent tool call'],
    ['command', 'Run command'],
    ['result', 'Grade result'],
  ];
  const [active, setActive] = useState('scenario');
  const c = contractCopy[active];
  return (
    <Panel head="The four shapes an agent sees" sub="choose one" pad={false}>
      <div className={styles.btnRow} style={{ padding: 16 }}>
        {keys.map(([k, label]) => (
          <button key={k} className={`${styles.btn} ${active === k ? styles.btnActive : ''}`}
                  onClick={() => setActive(k)}>{label}</button>
        ))}
      </div>
      <div className={styles.detailBox} aria-live="polite">
        <p style={{ marginBottom: 10 }}>{c.text}</p>
        <pre style={{ margin: 0, fontSize: '0.72rem' }}><code>{c.code}</code></pre>
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- SVG diagrams
function Arrow({ id }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L8 4 L0 8 z" className={styles.arrowHead} />
      </marker>
    </defs>
  );
}

function Node({ x, y, w, h, main, sub, sub2 }) {
  const cx = x + w / 2;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="3" />
      <text className={styles.dMain} x={cx} y={y + (sub2 ? 21 : 19)} textAnchor="middle">{main}</text>
      {sub ? <text className={styles.dSub} x={cx} y={y + (sub2 ? 35 : 35)} textAnchor="middle">{sub}</text> : null}
      {sub2 ? <text className={styles.dSub} x={cx} y={y + 47} textAnchor="middle">{sub2}</text> : null}
    </>
  );
}

export function ContractsDiagram() {
  const m = 'url(#wb-arr-c)';
  return (
    <Panel
      head="How the layers connect"
      sub="the contracts are the edges"
      note="Every edge is one of the four contracts below. The agent side is a black box to the harness: anything that reads the envelope and emits tool-call JSONL can be benchmarked — a model adapter, a CLI agent, or the oracle itself."
      pad={false}
    >
      <div className={styles.matrixScroll} style={{ padding: 16 }}>
        <svg className={styles.diagram} viewBox="0 0 760 312" role="img"
             aria-label="Data flow from scenario file through harness and agent to the simulated workspace, grader, and scorecard.">
          <Arrow id="wb-arr-c" />
          <Node x={20} y={28} w={180} h={46} main="Scenario file" sub="JSON · prompt, seed, checks" />
          <line className={styles.link} x1="200" y1="51" x2="243" y2="51" markerEnd={m} />
          <Node x={250} y={28} w={200} h={46} main="Harness" sub="task envelope · 4 env vars" />
          <line className={styles.link} x1="450" y1="51" x2="493" y2="51" markerEnd={m} />
          <text className={styles.dEdge} x="473" y="90" textAnchor="middle">run command</text>
          <Node x={500} y={28} w={240} h={46} main="Your agent" sub="any process, any language" />
          <line className={styles.link} x1="560" y1="74" x2="560" y2="146" markerEnd={m} />
          <text className={styles.dEdge} x="550" y="114" textAnchor="end">tool calls · jsonl</text>
          <line className={styles.link} x1="680" y1="150" x2="680" y2="78" markerEnd={m} />
          <text className={styles.dEdge} x="690" y="114" textAnchor="start">results</text>
          <Node x={500} y={150} w={240} h={46} main="Simulated workspace" sub="deterministic state machine" />
          <path className={styles.link} d="M 560 196 V 221 H 350 V 242" markerEnd={m} />
          <text className={styles.dEdge} x="455" y="214" textAnchor="middle">final state + trace</text>
          <Node x={250} y={246} w={200} h={46} main="Grader" sub="state first, then trace" />
          <line className={styles.link} x1="450" y1="269" x2="493" y2="269" markerEnd={m} />
          <text className={styles.dEdge} x="473" y="308" textAnchor="middle">grade result</text>
          <Node x={500} y={246} w={240} h={46} main="Scorecard" sub="pass · score · issue codes" />
        </svg>
      </div>
    </Panel>
  );
}

export function CalibrationLoopDiagram() {
  const m = 'url(#wb-arr-l)';
  const boxes = [
    ['Generate', '15 families', '× 5 tiers'],
    ['Certify', 'oracle passes', 'no-op fails'],
    ['Gate', 'pass-rate band', 'per tier'],
    ['Expose bugs', '3 real defects', 'caught pre-release'],
    ['Fix generator', 'not one task,', 're-run all 300'],
  ];
  const xs = [20, 169, 318, 467, 616];
  return (
    <Panel head="The calibration loop" sub="design · certify · calibrate · fix · repeat" pad={false}>
      <div className={styles.matrixScroll} style={{ padding: 16 }}>
        <svg className={styles.diagram} viewBox="0 0 760 200" role="img"
             aria-label="A loop: design, certify, calibrate, expose bugs, fix, then re-certify and re-run. The gating curve improved from 83-67-48-47-30 to a monotonic 98-92-77-52-33.">
          <Arrow id="wb-arr-l" />
          {boxes.map(([main, s1, s2], i) => (
            <Node key={main} x={xs[i]} y={24} w={124} h={54} main={main} sub={s1} sub2={s2} />
          ))}
          {[144, 293, 442, 591].map((x) => (
            <line key={x} className={styles.link} x1={x} y1="51" x2={x + 17} y2="51" markerEnd={m} />
          ))}
          <path className={styles.link} d="M 678 78 V 120 H 231 V 84" markerEnd={m} />
          <text className={styles.dEdge} x="455" y="113" textAnchor="middle">re-certify · re-run the sweep from scratch</text>
          <text className={styles.dNote} x="380" y="160" textAnchor="middle">
            gating curve&nbsp;&nbsp;&nbsp;83–67–48–47–30&nbsp;&nbsp;→&nbsp;&nbsp;
            <tspan className={styles.dAfter}>98–92–77–52–33</tspan>
          </text>
          <text className={styles.dEdge} x="380" y="180" textAnchor="middle">monotonic · well spaced · t0 close to free · t4 still hard</text>
        </svg>
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- benchmark board
export function BenchBoard() {
  const overall = BENCH.rows.find((r) => r.overall);
  return (
    <Panel
      head="WorkspaceBench"
      sub="strict pass rate · 300 scenarios · single attempt · higher is better"
      note={
        <>Strict pass = every grader check on the scenario passes; mean check score gives partial credit.
        Best score per row highlighted. All models at temperature 0 except GPT-5.5, which samples at
        temperature 1. Each family cell is 20 scenarios, so one scenario moves it 5 points; read the family
        block for failure fingerprints, not rankings. Full per-scenario data below and in{' '}
        <a href="https://github.com/DidierRLopes/openbb-workspace-bench/blob/main/runs/reports/calibration.json">runs/reports/calibration.json</a>.</>
      }
      pad={false}
    >
      <div className={styles.panelBody}>
        <div className={styles.colsChart} role="img" aria-label="Overall strict pass rate by model">
          {BENCH.header.map((h, i) => {
            const v = parseFloat(overall.values[i].v);
            return (
              <div className={styles.col} key={h.name}>
                <span className={styles.colVal}>{overall.values[i].v}</span>
                <div className={styles.colTrack}>
                  <div className={styles.colFill} style={{ height: `${v}%` }} />
                </div>
                <span className={styles.colName}>{h.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.matrixScroll}>
        <table className={styles.benchTable}>
          <thead>
            <tr>
              <th>&nbsp;</th>
              {BENCH.header.map((h) => (
                <th key={h.name}>{h.name}<span className={styles.benchSub}>{h.sub}</span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BENCH.rows.map((r, i) =>
              r.group ? (
                <tr className={styles.benchGroup} key={i}><td colSpan={7}>{r.group}</td></tr>
              ) : (
                <tr key={i} className={r.overall ? styles.benchOverall : ''}>
                  <th scope="row">
                    {r.label.includes('|') ? (
                      <>{r.label.split('|')[0]}<span className={styles.benchMuted}>{r.label.split('|')[1]}</span></>
                    ) : r.label}
                  </th>
                  {r.values.map((c, j) => (
                    <td key={j} className={c.best ? styles.best : ''}>{c.v}</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- per-tier panels
export function TierGroupedBars() {
  const groups = TIERS.map((t) => ({ key: t, label: t }));
  const values = TIERS.map((t, ti) => CALIB.map((m) => m.tiers[ti]));
  const colors = CALIB.map((m) => MODEL_META[m.slug].color);
  return (
    <Panel head="Pass rate by structural tier" sub="grouped by model · higher is better"
           note="Every model falls the same way, t0 to t4 — that shared shape is what makes the tiers a real difficulty axis and not just labels. The frontier stays high across the whole range; the small model collapses at t2 where episodes turn multi-step.">
      <ModelLegend />
      <GroupedColumns groups={groups} values={values} colors={colors} yMax={100} yFmt={(v) => `${v}%`} />
    </Panel>
  );
}

// gpt-4.1-mini's tier curve — the gating illustration
export function GatingCurve() {
  const mini = CALIB.find((m) => m.slug === 'gpt-4.1-mini');
  const W = 460, padL = 34, padR = 16, padT = 18, padB = 30, plotH = 170;
  const H = padT + plotH + padB, plotW = W - padL - padR;
  const bw = plotW / TIERS.length;
  const y = (v) => padT + plotH * (1 - v / 100);
  const cxOf = (i) => padL + i * bw + bw / 2;
  const line = TIERS.map((t, i) => `${cxOf(i)},${y(mini.tiers[i])}`).join(' ');
  return (
    <Panel head="The gating curve" sub="gpt-4.1-mini · pass rate falls t0 → t4"
           note="Monotonic: 98 → 92 → 77 → 52 → 33. A flat or bumpy curve would mean the tier labels are fiction; this steady fall is what says the difficulty axis is real.">
      <div className={styles.matrixScroll}>
        <svg className={styles.chartSvg} viewBox={`0 0 ${W} ${H}`} role="img"
             aria-label="gpt-4.1-mini pass rate falling monotonically across tiers t0 to t4.">
          {[0, 25, 50, 75, 100].map((tk) => (
            <g key={tk}>
              <line x1={padL} y1={y(tk)} x2={W - padR} y2={y(tk)} className={styles.grid} />
              <text x={padL - 6} y={y(tk) + 3} textAnchor="end" className={styles.axisText}>{tk}%</text>
            </g>
          ))}
          {TIERS.map((t, i) => {
            const v = mini.tiers[i];
            return (
              <rect key={t} x={padL + i * bw + bw * 0.26} y={y(v)} width={bw * 0.48} height={plotH * v / 100}
                    rx="2" style={{ fill: 'var(--wb-accent)' }} />
            );
          })}
          <polyline points={line} fill="none" style={{ stroke: 'var(--wb-accent-strong)' }} strokeWidth="1.5" strokeDasharray="3 3" />
          {TIERS.map((t, i) => {
            const v = mini.tiers[i];
            const cx = cxOf(i);
            return (
              <g key={t}>
                <circle cx={cx} cy={y(v)} r="2.6" style={{ fill: 'var(--wb-accent-strong)' }} />
                <text x={cx} y={y(v) - 8} textAnchor="middle" className={styles.axisText}
                      style={{ fill: 'var(--wb-ink)', fontWeight: 600 }}>{v}%</text>
                <text x={cx} y={padT + plotH + 17} textAnchor="middle" className={styles.axisText}>{t}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- calibration explorer
export function CalibExplorer() {
  const [sel, setSel] = useState(0);
  const m = CALIB[sel];
  return (
    <Panel head="Calibration results" sub="6 models · 300 scenarios each · pick one" pad={false}>
      <div className={styles.btnRow} style={{ padding: 16 }}>
        <span className={styles.btnLabel}>Model</span>
        {CALIB.map((mo, i) => (
          <button key={mo.slug} className={`${styles.btn} ${sel === i ? styles.btnActive : ''}`}
                  onClick={() => setSel(i)}>
            {mo.label} · {Math.round(mo.strict / 3)}%
          </button>
        ))}
      </div>
      <div style={{ padding: '0 16px 16px' }}>
        <p className={styles.tmMeta} style={{ margin: '0 0 4px' }}>{m.role}</p>
        <p style={{ margin: '0 0 12px', fontSize: '0.85rem' }}>
          <strong>strict {m.strict}/300</strong> · mean score {m.mean}% · {m.note}
        </p>
        {TIERS.map((t, i) => (
          <Bar key={t} name={t} pct={m.tiers[i]} label={`${m.tiers[i]}%`} />
        ))}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- failure analysis
function MiniVBars({ values, max, colors }) {
  const W = 200, H = 100, padT = 15, padB = 4;
  const n = values.length, bw = W / n, plotH = H - padT - padB;
  const y = (v) => padT + plotH * (1 - v / max);
  return (
    <svg className={styles.miniSvg} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img">
      {values.map((v, i) => (
        <g key={i}>
          <rect x={i * bw + bw * 0.16} y={y(v)} width={bw * 0.68} height={plotH * v / max}
                rx="1.5" style={{ fill: colors[i] }}>
            <title>{`${CALIB[i].label}: ${v}`}</title>
          </rect>
          <text x={i * bw + bw / 2} y={y(v) - 3} textAnchor="middle" className={styles.miniVal}>{v}</text>
        </g>
      ))}
    </svg>
  );
}

export function FailureAnalysis() {
  const codes = ISSUES_MATRIX.codes;
  const max = Math.max(...codes.flatMap((c) => ISSUES_MATRIX.counts[c]));
  return (
    <Panel head="Failure analysis" sub="scenarios tripping each check, by model · fewer is better">
      <ModelLegend colors={FAIL_COLORS} />
      <div className={styles.failGrid}>
        {codes.map((c) => (
          <div key={c} className={styles.failCell}>
            <div className={styles.failTitle}><code>{c}</code></div>
            <MiniVBars values={ISSUES_MATRIX.counts[c]} max={max} colors={FAIL_COLORS} />
            <div className={styles.failDesc}>{issueMeaning[c] || 'a grader check failure'}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- tier explorer
const TX_PROMPTS = Object.fromEntries(TM_ROWS.map((r) => ['gen_' + r[0], r[5]]));

function txShort(s) {
  return s.id.replace(new RegExp(`^gen_${s.t}_(${s.f}|app|skill)_?`), '') || s.id;
}

export function TierExplorer() {
  const [tier, setTier] = useState('t0');
  const [sel, setSel] = useState(null);
  const rows = useMemo(() => TX.scenarios.filter((s) => s.t === tier), [tier]);
  const contested = rows.filter((s) => {
    const n = s.p.reduce((a, b) => a + b, 0);
    return n > 0 && n < TX.order.length;
  }).length;
  const totals = TX.order.map((_, col) => rows.reduce((a, s) => a + s.p[col], 0));
  const detail = sel !== null ? rows[sel] : null;
  return (
    <Panel head="Scenario × model" sub="pick a tier · every scenario · click a row" pad={false}>
      <div className={styles.btnRow} style={{ padding: 16 }}>
        <span className={styles.btnLabel}>Tier</span>
        {TIERS.map((t) => (
          <button key={t} className={`${styles.btn} ${tier === t ? styles.btnActive : ''}`}
                  onClick={() => { setTier(t); setSel(null); }}>{t}</button>
        ))}
      </div>
      <p className={styles.tmMeta} style={{ padding: '0 16px' }}>
        {rows.length} scenarios · {contested} contested (models disagree) · sorted by family
      </p>
      <div className={styles.matrixScroll}>
        <table className={styles.txTable}>
          <thead>
            <tr>
              <th>family</th><th>scenario</th>
              {TX.short.map((s) => <th key={s}>{s}</th>)}
              <th>passed</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => {
              const n = s.p.reduce((a, b) => a + b, 0);
              return (
                <tr key={s.id} onClick={() => setSel(i)} className={sel === i ? styles.rowActive : ''}>
                  <td>{s.f}</td>
                  <td className={styles.txId}>{txShort(s)}</td>
                  {s.p.map((v, j) => (
                    <td key={j}>{v ? <span className={styles.pass}>✓</span> : <span className={styles.fail}>✕</span>}</td>
                  ))}
                  <td className={styles.mono}>{n}/{TX.order.length}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td></td><td style={{ textAlign: 'left' }}>tier total</td>
              {totals.map((t, i) => <td key={i}>{t}</td>)}
              <td>/{rows.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className={styles.detailBox} aria-live="polite">
        {detail ? (
          <>
            <h4 style={{ overflowWrap: 'anywhere' }}>{detail.id}</h4>
            <p className={styles.tmMeta}>{detail.f} family · {detail.t} · {detail.d}</p>
            {TX.labels.map((label, i) => (
              <div key={label} style={{ display: 'flex', gap: 10, fontSize: '0.8rem', marginBottom: 2 }}>
                <span style={{ minWidth: 120 }}>{label}</span>
                {detail.p[i] ? <span className={styles.pass}>PASS</span> : <span className={styles.fail}>FAIL</span>}
                <span style={{ color: 'var(--wb-muted)' }}>
                  score {detail.s[i]}%{!detail.p[i] && detail.i[i] ? <> · <code>{detail.i[i]}</code></> : null}
                </span>
              </div>
            ))}
            {TX_PROMPTS[detail.id] ? (
              <p className={styles.tmMeta} style={{ marginTop: 10 }}>prompt: {TX_PROMPTS[detail.id]}</p>
            ) : null}
          </>
        ) : (
          <p>Each cell is one model's strict verdict on one scenario. Click a row to see per-model scores, the first failed check, and the task prompt.</p>
        )}
      </div>
    </Panel>
  );
}
