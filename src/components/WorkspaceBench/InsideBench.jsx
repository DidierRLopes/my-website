import React, { useMemo, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import data from '@site/src/data/workspaceBenchInside.json';
import styles from './styles.module.css';

const { ANATOMY, JUDGE_TEMPLATE, JUDGE_PAIR, JUDGE_EXAMPLE, TOOLS, KNOWLEDGE, DEFAULT_RUNS, SMOKE_GATE, WT_BOARD, WT_FAILCODES, WT_GRID, WT_GRID_FAMILIES, WT_GATE } = data;

const MODEL_COLOR = {
  'gpt-5.5': '#2563eb',
  'glm-5.2': '#7c3aed',
  'gemini-2.5-flash': '#059669',
  'gpt-4.1-mini': '#d97706',
  'qwen3:8b': '#64748b',
  'gpt-oss:20b': '#db2777',
};

function Panel({ head, children, pad = true }) {
  return (
    <figure className={styles.wb} style={{ margin: '1.6rem 0' }}>
      <div className={styles.panel}>
        {head ? (
          <div className={styles.panelHead}>
            <strong>{head}</strong>
          </div>
        ) : null}
        {pad ? <div className={styles.panelBody}>{children}</div> : children}
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Part 3 — task anatomy + check catalog                               */
/* ------------------------------------------------------------------ */

const ANATOMY_SECTIONS = [
  { key: 'prompt', label: 'prompt', agent: true },
  { key: 'setup', label: 'setup', agent: true },
  { key: 'eval', label: 'eval', agent: false },
];

export function TaskAnatomy() {
  return (
    <Panel
      head="One task, dissected"
      pad={false}
    >
      <div style={{ padding: '10px 16px', fontSize: '0.8rem', color: 'var(--wb-muted)' }}>
        id <code>{ANATOMY.id}</code> · category <code>{ANATOMY.category || 'story'}</code> · difficulty <code>{ANATOMY.difficulty}</code>
      </div>
      {ANATOMY_SECTIONS.map((sec) => (
        <div key={sec.key} style={{ borderTop: '1px solid var(--wb-line)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
              padding: '10px 16px 0',
            }}
          >
            <code style={{ fontWeight: 700 }}>{sec.label}</code>
            <span className={sec.agent ? styles.pass : styles.fail} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {sec.agent ? 'agent-visible' : 'sealed · evaluator-only'}
            </span>
          </div>
          <div style={{ padding: '10px 16px 14px' }}>
            {sec.key === 'prompt' ? (
              <blockquote style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>“{ANATOMY.prompt}”</blockquote>
            ) : (
              <div style={{ maxHeight: 320, overflow: 'auto' }}>
                <CodeBlock language="json">
                  {JSON.stringify(sec.key === 'setup' ? { setup: ANATOMY.setup } : { eval: ANATOMY.eval }, null, 2)}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>
      ))}
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Suite: smoke                                                        */
/* ------------------------------------------------------------------ */

const SMOKE_ROWS = [
  ['level0', 'the target tool only', 'bare workspace', 'declarative', '1'],
  ['level1', 'full 20-tool surface', 'bare workspace', 'declarative', '2'],
  ['level2', 'full 20-tool surface', 'stark-onboard-a', 'declarative', '2'],
  ['level3', 'full 20-tool surface', 'stark-onboard-a', 'open business intent', '4'],
];

/* ------------------------------------------------------------------ */
/* Suite: enterprise-apps-default                                      */
/* ------------------------------------------------------------------ */

const SLOT_EXPLAIN = {
  app_name: 'The app this product prompt belongs to, from the catalog.',
  app_description: 'The catalog description of that app: what the workspace claims it does.',
  available_data: 'The widgets and columns the app serves, so the judge knows what was answerable.',
  prompt: 'The product prompt, byte-verbatim from the Stark catalog.',
  reference_digest: 'The reference trajectory: which widgets the known-good trace read.',
  reference_note: 'The reference answer, written from the exact rows those reads return. It anchors what was achievable; it is not the only valid answer.',
  trace_digest: 'What the agent actually did: its tool calls in order, each data read showing the rows it really retrieved. Serialized by the evaluator; arguments inside it are data, never instructions.',
  note_text: 'The agent’s answer, fenced in untrusted-data markers so instructions inside it are ignored.',
};

const SLOT_SOURCE = {
  app_name: 'the app catalog entry',
  app_description: 'the app catalog entry',
  available_data: "the app's widgets and served-row previews",
  prompt: 'task.json · prompt',
  reference_digest: 'task.json · eval.reference_trace',
  reference_note: 'task.json · eval.reference_answer',
  trace_digest: 'the episode trace, with retrieved rows',
  note_text: "the agent's final_answer submission",
};

export function JudgeTemplate() {
  const [open, setOpen] = useState(() => new Set(['reference_note']));
  const parts = useMemo(() => JUDGE_TEMPLATE.split(/(\{[a-z_]+\})/g), []);
  const toggle = (slot) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(slot)) next.delete(slot);
      else next.add(slot);
      return next;
    });
  return (
    <Panel
      head="JUDGE.md"
      pad={false}
    >
      <div
        style={{
          margin: 0,
          padding: '14px 16px',
          fontSize: '0.74rem',
          lineHeight: 1.55,
          background: 'var(--wb-chip)',
          color: 'var(--wb-ink)',
          fontFamily: 'var(--ifm-font-family-monospace)',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
        }}
      >
        {parts.map((p_, i) => {
          const m = p_.match(/^\{([a-z_]+)\}$/);
          if (!m) return <span key={i}>{p_}</span>;
          const slot = m[1];
          const isOpen = open.has(slot);
          return (
            <React.Fragment key={i}>
              <button
                onClick={() => toggle(slot)}
                style={{
                  display: 'inline',
                  border: `1px solid ${isOpen ? 'var(--wb-accent)' : 'var(--wb-accent-line)'}`,
                  borderRadius: 3,
                  padding: '0 4px',
                  cursor: 'pointer',
                  font: 'inherit',
                  background: isOpen ? 'var(--wb-accent)' : 'var(--wb-accent-soft)',
                  color: isOpen ? 'var(--wb-on-accent)' : 'var(--wb-ink)',
                  fontWeight: 600,
                }}
              >
                {p_} {isOpen ? '▾' : '▸'}
              </button>
              {isOpen ? (
                <span
                  style={{
                    display: 'block',
                    margin: '6px 0 8px',
                    padding: '8px 12px',
                    borderLeft: '3px solid var(--wb-accent)',
                    background: 'var(--wb-paper)',
                    borderRadius: '0 4px 4px 0',
                  }}
                >
                  <span style={{ display: 'block', fontFamily: 'var(--ifm-font-family-base)', fontSize: '0.78rem', marginBottom: 6 }}>
                    ← <em>{SLOT_SOURCE[slot]}</em> — {SLOT_EXPLAIN[slot]}
                  </span>
                  <span style={{ display: 'block', color: 'var(--wb-muted)' }}>{JUDGE_EXAMPLE.slots[slot]}</span>
                </span>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
    </Panel>
  );
}

export function TwoWorlds() {
  const cols = [
    ['x', 'stark-enterprise-x'],
    ['y', 'stark-enterprise-y'],
  ];
  return (
    <Panel
      head="Same prompt, two worlds"
      pad={false}
    >
      <div className={styles.detailBox} style={{ borderTop: 'none', borderBottom: '1px solid var(--wb-line)' }}>
        <p style={{ fontSize: '0.9rem' }}>“{JUDGE_PAIR.prompt}”</p>
      </div>
      <div className={styles.matrixScroll}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minWidth: 560 }}>
          {cols.map(([k, label], idx) => (
            <div key={k} style={{ padding: '12px 16px', borderRight: idx === 0 ? '1px solid var(--wb-line)' : 'none' }}>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--wb-muted)', marginBottom: 8 }}>
                reference answer on <code>{label}</code>
              </p>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.6, marginBottom: 0 }}>{JUDGE_PAIR[k].ref}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Suite: enterprise-apps-usage                                        */
/* ------------------------------------------------------------------ */

export function WorldRuns() {
  const W = 560, padL = 40, padR = 16, padT = 24, padB = 40, plotH = 190;
  const H = padT + plotH + padB, plotW = W - padL - padR;
  const gw = plotW / 2;
  const y = (v) => padT + plotH * (1 - v / 100);
  const bw = gw * 0.6 / 3;
  return (
    <Panel
      head="Three runs, two worlds"
      pad={false}
    >
      <div className={styles.matrixScroll} style={{ padding: '16px 16px 4px' }}>
        <svg className={styles.chartSvg} viewBox={`0 0 ${W} ${H}`} role="img"
             aria-label="Deterministic floor per run for the two data worlds; each world's three runs with its pooled average as a dashed line.">
          {[0, 25, 50, 75, 100].map((tk) => (
            <g key={tk}>
              <line x1={padL} y1={y(tk)} x2={W - padR} y2={y(tk)} className={styles.grid} />
              <text x={padL - 6} y={y(tk) + 3} textAnchor="end" className={styles.axisText}>{tk}%</text>
            </g>
          ))}
          {DEFAULT_RUNS.worlds.map((w, wi) => {
            const gx = padL + wi * gw + gw * 0.2;
            return (
              <g key={w.key}>
                {w.runs.map((v, ri) => (
                  <g key={ri}>
                    <rect x={gx + ri * bw} y={y(v)} width={bw * 0.82} height={plotH * v / 100} rx="2"
                          style={{ fill: 'var(--wb-accent)', opacity: 0.55 + ri * 0.15 }} />
                    <text x={gx + ri * bw + bw * 0.41} y={y(v) - 5} textAnchor="middle" className={styles.axisText}>{Math.round(v)}</text>
                    <text x={gx + ri * bw + bw * 0.41} y={padT + plotH + 13} textAnchor="middle" className={styles.axisText}>r{ri + 1}</text>
                  </g>
                ))}
                <line x1={gx - bw * 0.3} y1={y(w.avg)} x2={gx + 3 * bw + bw * 0.1} y2={y(w.avg)}
                      style={{ stroke: 'var(--wb-ink)' }} strokeWidth="1.4" strokeDasharray="5 3" />
                <text x={gx + 3 * bw + bw * 0.25} y={y(w.avg) + 3} className={styles.axisText}
                      style={{ fill: 'var(--wb-ink)', fontWeight: 700 }}>avg {w.avg}%</text>
                <text x={gx + 1.5 * bw} y={padT + plotH + 28} textAnchor="middle" className={styles.axisText} style={{ fontWeight: 700 }}>{w.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </Panel>
  );
}

export function WtGrid() {
  return (
    <UsageGridPanel
      grid={WT_GRID}
      families={WT_GRID_FAMILIES}
      drivers={WT_BOARD.drivers}
      head={null}
      colLabel="persona"
      clampPrompts={false}
      initial={{ f: 'trading_desk', l: 2 }}
    />
  );
}

function UsageGridPanel({ grid, families, drivers, head, colLabel, initial, clampPrompts = true }) {
  const [cell, setCell] = useState(initial);
  const [openId, setOpenId] = useState(null);
  const levels = drivers.map((_, i) => i);
  const tasks = useMemo(
    () => grid.filter((r) => r.f === cell.f && r.l === cell.l).sort((a, b) => a.s.localeCompare(b.s)),
    [grid, cell],
  );
  const pick = (f, l) => {
    setCell({ f, l });
    setOpenId(null);
  };
  return (
    <Panel
      head={head}
      pad={false}
    >
      <div className={styles.matrixScroll}>
        <table className={styles.heat} style={{ minWidth: 640, width: '100%', display: 'table' }}>
          <thead>
            <tr>
              <th style={{ width: '28%' }}>{colLabel}</th>
              {drivers.map((d, i) => (
                <th key={i} style={{ width: `${Math.floor(72 / drivers.length)}%` }}>
                  L{i}
                  <span style={{ display: 'block', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>{d}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {families.map((fam) => (
              <tr key={fam.key}>
                <td style={{ minWidth: 150 }}>
                  <code>{fam.key}</code>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--wb-muted)' }}>{fam.job}</span>
                </td>
                {levels.map((l) => {
                  const active = cell.f === fam.key && cell.l === l;
                  return (
                    <td key={l}>
                      <button
                        onClick={() => pick(fam.key, l)}
                        aria-label={`${fam.key} level${l}`}
                        style={{
                          width: 30,
                          height: 24,
                          borderRadius: 4,
                          border: `1px solid ${active ? 'var(--wb-accent)' : 'var(--wb-accent-line)'}`,
                          background: active ? 'var(--wb-accent)' : 'var(--wb-accent-soft)',
                          cursor: 'pointer',
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.detailBox}>
        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--wb-muted)', marginBottom: 8 }}>
          {cell.f} · level{cell.l} · {drivers[cell.l]}
        </p>
        <div style={{ display: 'grid', gap: 6 }}>
          {tasks.map((t) => {
            const isOpen = openId === t.id;
            return (
              <div key={t.id} style={{ minWidth: 0 }}>
                <button
                  className={`${styles.issueRow} ${isOpen ? styles.issueRowActive : ''}`}
                  style={{ gridTemplateColumns: 'minmax(0, 1fr)', width: '100%', padding: '6px 14px 6px 10px' }}
                  onClick={() => setOpenId(isOpen ? null : t.id)}
                >
                  <span style={{ overflowWrap: 'anywhere' }}>
                    <code>{t.s.replace(/_/g, ' ')}</code> {isOpen ? '▾' : '▸'}
                    {!isOpen ? (
                      <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--wb-muted)', marginTop: 2 }}>
                        {clampPrompts && t.p.length > 150 ? `${t.p.slice(0, 150)}…` : t.p}
                      </span>
                    ) : null}
                  </span>
                </button>
                {isOpen ? (
                  <div style={{ borderLeft: '3px solid var(--wb-accent)', margin: '6px 4px 4px 0', padding: '8px 14px', background: 'var(--wb-paper)', borderRadius: '0 4px 4px 0', overflowWrap: 'anywhere' }}>
                    <p style={{ fontSize: '0.85rem', marginBottom: 6 }}>“{t.p}”</p>
                    <p style={{ fontSize: '0.74rem', color: 'var(--wb-muted)', marginBottom: 8 }}>
                      <a
                        href={`https://github.com/DidierRLopes/openbb-workspace-bench/blob/main/src/workspace_bench/tasksets/workspace_tasks/${t.f}/${t.id}.json`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--wb-accent)' }}
                      >
                        <code>{t.id}.json</code>
                      </a>
                      :
                    </p>
                    <div style={{ maxHeight: 340, overflow: 'auto' }}>
                      <CodeBlock language="json">{JSON.stringify(t.full, null, 2)}</CodeBlock>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

export function SmokeStaircase() {
  const G = SMOKE_GATE;
  const nLevels = G.pooled.length;
  const nRuns = G.runs.length;
  const W = 620, padL = 40, padR = 16, padT = 22, padB = 34, plotH = 200;
  const H = padT + plotH + padB, plotW = W - padL - padR;
  const groupW = plotW / nLevels;
  const barGap = 3, innerW = groupW * 0.58;
  const barW = Math.min(14, (innerW - barGap * (nRuns - 1)) / nRuns);
  const y = (v) => padT + plotH * (1 - v / 100);
  const groupX0 = (i) => padL + i * groupW;
  const groupCx = (i) => groupX0(i) + groupW / 2;
  const barsStart = (i) => groupCx(i) - (nRuns * barW + (nRuns - 1) * barGap) / 2;
  const barX = (i, ri) => barsStart(i) + ri * (barW + barGap);
  const meanLine = G.pooled.map((v, i) => `${groupCx(i)},${y(v)}`).join(' ');
  const RUN_COLORS = ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'];
  return (
    <Panel
      head="The smoke reference staircase, five runs"
      pad={false}
    >
      <div className={styles.matrixScroll} style={{ padding: '16px 16px 4px' }}>
        <svg className={styles.chartSvg} viewBox={`0 0 ${W} ${H}`} role="img"
             aria-label="gpt-4.1-mini strict pass rate on the smoke taskset, one bar per repeat plus the pooled mean, level0 through level3.">
          {[0, 25, 50, 75, 100].map((tk) => (
            <g key={tk}>
              <line x1={padL} y1={y(tk)} x2={W - padR} y2={y(tk)} className={styles.grid} />
              <text x={padL - 6} y={y(tk) + 3} textAnchor="end" className={styles.axisText}>{tk}%</text>
            </g>
          ))}
          {G.runs.map((run, ri) =>
            run.map((v, i) => (
              <rect key={`${ri}-${i}`} x={barX(i, ri)} y={v > 0 ? y(v) : y(0) - 2}
                    width={barW} height={Math.max(2, plotH * v / 100)} rx="1.5"
                    style={{ fill: RUN_COLORS[ri % RUN_COLORS.length] }} />
            )),
          )}
          <polyline points={meanLine} fill="none" style={{ stroke: 'var(--wb-ink)' }} strokeWidth="2" />
          {G.pooled.map((v, i) => (
            <circle key={`mean-${i}`} cx={groupCx(i)} cy={y(v)} r="3" style={{ fill: 'var(--wb-ink)' }} />
          ))}
          {G.pooled.map((v, i) => (
            <text key={`lbl-${i}`} x={groupCx(i)} y={y(Math.max(v, ...G.runs.map((r) => r[i]))) - 10}
                  textAnchor="middle" className={styles.axisText}
                  style={{ fill: 'var(--wb-ink)', fontWeight: 700 }}>{Math.round(v)}%</text>
          ))}
          {G.pooled.map((_, i) => (
            <text key={`x${i}`} x={groupCx(i)} y={padT + plotH + 18} textAnchor="middle"
                  className={styles.axisText} style={{ fontWeight: 700 }}>t{i}</text>
          ))}
        </svg>
        <p style={{ fontSize: '0.72rem', color: 'var(--wb-muted)', margin: '4px 2px 0' }}>
          each bar is one full 80-task run; the black line and dot mark the pooled mean per track.
        </p>
      </div>
    </Panel>
  );
}

export function WtGateStaircase() {
  return (
    <GateStaircasePanel
      gate={WT_GATE}
      drivers={WT_BOARD.drivers}
      head="The pooled staircase, six personas"
      ariaLabel="gpt-4.1-mini strict pass rate falling monotonically from level0 to level4 across all six personas, three repeats shown as dots per level."
    />
  );
}

function GateStaircasePanel({ gate, drivers, head, ariaLabel }) {
  const GATE = gate;
  const W = 620, padL = 40, padR = 16, padT = 22, padB = 42, plotH = 200;
  const H = padT + plotH + padB, plotW = W - padL - padR;
  const bw = plotW / GATE.pooled.length;
  const y = (v) => padT + plotH * (1 - v / 100);
  const cxOf = (i) => padL + i * bw + bw / 2;
  const pooled = GATE.pooled;
  const line = pooled.map((v, i) => `${cxOf(i)},${y(v)}`).join(' ');
  return (
    <Panel
      head={head}
      pad={false}
    >
      <div className={styles.matrixScroll} style={{ padding: '16px 16px 4px' }}>
        <svg className={styles.chartSvg} viewBox={`0 0 ${W} ${H}`} role="img"
             aria-label={ariaLabel}>
          {[0, 25, 50, 75, 100].map((tk) => (
            <g key={tk}>
              <line x1={padL} y1={y(tk)} x2={W - padR} y2={y(tk)} className={styles.grid} />
              <text x={padL - 6} y={y(tk) + 3} textAnchor="end" className={styles.axisText}>{tk}%</text>
            </g>
          ))}
          {pooled.map((v, i) => {
            const top = Math.max(v, ...GATE.runs.map((run) => run[i]));
            return (
              <g key={i}>
                <rect x={padL + i * bw + bw * 0.26} y={v > 0 ? y(v) : y(0) - 2} width={bw * 0.48}
                      height={Math.max(2, plotH * v / 100)} rx="2" style={{ fill: 'var(--wb-accent)' }} />
                <text x={cxOf(i)} y={y(top) - 12} textAnchor="middle" className={styles.axisText}
                      style={{ fill: 'var(--wb-ink)', fontWeight: 700 }}>{Math.round(v)}%</text>
              </g>
            );
          })}
          <polyline points={line} fill="none" style={{ stroke: 'var(--wb-accent-strong)' }} strokeWidth="1.5" strokeDasharray="3 3" />
          {GATE.runs.map((run, ri) =>
            run.map((v, i) => (
              <circle key={`${ri}-${i}`} cx={cxOf(i)} cy={y(v)} r="2.6" opacity="0.85"
                      style={{ fill: 'var(--wb-ink)', stroke: 'var(--wb-paper)', strokeWidth: 0.8 }} />
            )),
          )}
          {pooled.map((v, i) => (
            <g key={`x${i}`}>
              <text x={cxOf(i)} y={padT + plotH + 16} textAnchor="middle" className={styles.axisText} style={{ fontWeight: 700 }}>L{i}</text>
              <text x={cxOf(i)} y={padT + plotH + 30} textAnchor="middle" className={styles.axisText}>{drivers[i]}</text>
            </g>
          ))}
        </svg>
      </div>
    </Panel>
  );
}

export function WtStaircase() {
  return <StaircasePanel board={WT_BOARD} head="Six models, level by level" />;
}

function StaircasePanel({ board, head }) {
  const BOARD = board;
  const [sel, setSel] = useState(null);
  const W = 680, padL = 40, padR = 12, padT = 16, padB = 42, plotH = 210;
  const H = padT + plotH + padB, plotW = W - padL - padR;
  const gw = plotW / BOARD.levels.length;
  const y = (v) => padT + plotH * (1 - v / 100);
  const nModels = BOARD.models.length;
  const bw = (gw * 0.78) / nModels;
  return (
    <Panel
      head={head}
      pad={false}
    >
      <div className={styles.matrixScroll} style={{ padding: '16px 16px 0' }}>
        <svg className={styles.chartSvg} viewBox={`0 0 ${W} ${H}`} role="img"
             aria-label="Grouped bar chart: strict pass rate per level for five models.">
          {[0, 25, 50, 75, 100].map((tk) => (
            <g key={tk}>
              <line x1={padL} y1={y(tk)} x2={W - padR} y2={y(tk)} className={styles.grid} />
              <text x={padL - 6} y={y(tk) + 3} textAnchor="end" className={styles.axisText}>{tk}%</text>
            </g>
          ))}
          {BOARD.levels.map((lv, li) => (
            <g key={lv}>
              {BOARD.models.map((m, mi) => {
                const v = m.levels[li];
                const dim = sel && sel !== m.key;
                const x = padL + li * gw + gw * 0.11 + mi * bw;
                return (
                  <g key={m.key} opacity={dim ? 0.18 : 1} style={{ cursor: 'pointer' }}
                     onClick={() => setSel(sel === m.key ? null : m.key)}>
                    <rect x={x} y={v > 0 ? y(v) : y(0) - 2} width={bw * 0.86} height={Math.max(2, plotH * v / 100)} rx="1.5"
                          fill={MODEL_COLOR[m.key]} />
                    {sel === m.key ? (
                      <text x={x + bw * 0.43} y={y(v) - 5} textAnchor="middle" className={styles.axisText}
                            style={{ fill: MODEL_COLOR[m.key], fontWeight: 700 }}>{Math.round(v)}</text>
                    ) : null}
                  </g>
                );
              })}
              <text x={padL + li * gw + gw / 2} y={padT + plotH + 16} textAnchor="middle" className={styles.axisText} style={{ fontWeight: 700 }}>L{li}</text>
              <text x={padL + li * gw + gw / 2} y={padT + plotH + 30} textAnchor="middle" className={styles.axisText}>{BOARD.drivers[li]}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className={styles.legendRow} style={{ paddingBottom: 12 }}>
        {BOARD.models.map((m) => (
          <button
            key={m.key}
            onClick={() => setSel(sel === m.key ? null : m.key)}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', font: 'inherit',
              fontSize: '0.76rem', color: 'var(--wb-ink)', display: 'inline-flex',
              alignItems: 'center', gap: 6, opacity: sel && sel !== m.key ? 0.4 : 1, padding: 0,
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 2, background: MODEL_COLOR[m.key], display: 'inline-block' }} />
            {m.label} · {m.overall}%
          </button>
        ))}
      </div>
    </Panel>
  );
}

const FAILCODE_DESC = {
  missing_tool_call: 'a graded call never happened - the read or action the rubric requires',
  missing_widget: 'the required widget is absent from the final state',
  misconfigured_widget: 'the widget is present but no instance carries the required data_args',
  too_many_invalid_calls: 'burned the invalid-call budget: malformed or rejected calls',
  missing_generated_widget: 'the required note is absent, or missing its grounded facts',
  missing_custom_backend: 'the authored backend never survived validation (build rungs)',
  missing_answer_value: 'the final answer lacks a required exact value',
  missing_final_answer: 'the episode ended without submitting an answer at all',
  layout_mismatch: 'a preservation-pinned widget was moved or resized',
  widget_list_not_called_before_use: 'created a widget without listing its origin first - id discipline',
  missing_tool_result: 'a graded call errored instead of returning a result',
};

export function WtFailureCodes() {
  return <FailureCodesPanel failcodes={WT_FAILCODES} />;
}

function FailureCodesPanel({ failcodes }) {
  const FAILCODES = failcodes;
  const labels = { 'gpt-5.5': 'GPT-5.5', 'glm-5.2': 'GLM-5.2', 'gemini-2.5-flash': 'Gemini 2.5 Flash', 'gpt-4.1-mini': 'gpt-4.1-mini', 'qwen3:8b': 'qwen3:8b', 'gpt-oss:20b': 'gpt-oss:20b' };
  const maxRate = Math.max(...FAILCODES.models.flatMap((m) => m.rates));
  return (
    <Panel
      head="Failure fingerprints by check"
      pad={false}
    >
      <div className={styles.panelBody}>
        {FAILCODES.codes.map((code, ci) => (
          <div key={code} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: '0.78rem', marginBottom: 2 }}>
              <code>{code}</code>
              <span style={{ color: 'var(--wb-muted)' }}> — {FAILCODE_DESC[code] || ''}</span>
            </div>
            {FAILCODES.models.map((m) => {
              const r = m.rates[ci];
              return (
                <div key={m.key} style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr) 52px', gap: 8, alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--wb-muted)', textAlign: 'right' }}>{labels[m.key]}</span>
                  <div style={{ height: 9, background: 'var(--wb-track)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${maxRate ? (r / maxRate) * 100 : 0}%`, height: '100%', background: MODEL_COLOR[m.key] }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontVariantNumeric: 'tabular-nums' }}>{(r * 100).toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function WtFailuresByLevel() {
  return <FailuresByLevelPanel board={WT_BOARD} />;
}

function FailuresByLevelPanel({ board }) {
  const BOARD = board;
  return (
    <Panel
      head="Failures by level"
      pad={false}
    >
      <div className={styles.tableWrap}>
        <table className={styles.benchTable} style={{ display: 'table' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', width: '20%' }}>model</th>
              {BOARD.levels.map((lv, i) => (
                <th key={lv}>
                  L{i}
                  <span className={styles.benchSub}>{BOARD.drivers[i]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BOARD.models.map((m) => (
              <tr key={m.key}>
                <th>{m.label}</th>
                {m.levels.map((v, i) => {
                  const fail = 100 - v;
                  return (
                    <td key={i} style={{ background: `rgba(248, 81, 73, ${0.04 + (fail / 100) * 0.5})` }}>
                      {Math.round(fail)}%
                    </td>
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

export function WtBoard() {
  return <BoardPanel board={WT_BOARD} />;
}

function BoardPanel({ board }) {
  const BOARD = board;
  return (
    <Panel
      head="Performance by model"
      pad={false}
    >
      <div className={styles.tableWrap}>
        <table className={styles.benchTable} style={{ display: 'table' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', width: '24%' }}>level</th>
              {BOARD.models.map((m) => (
                <th key={m.key}>
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BOARD.levels.map((lv, i) => (
              <tr key={lv}>
                <th>
                  <code>{lv}</code>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--wb-muted)' }}>{BOARD.drivers[i]}</span>
                </th>
                {BOARD.models.map((m) => {
                  const best = Math.max(...BOARD.models.map((x) => x.levels[i]));
                  return (
                    <td key={m.key} style={{ background: `rgba(34, 197, 94, ${0.05 + (m.levels[i] / 100) * 0.45})`, fontWeight: m.levels[i] === best ? 700 : 400 }}>
                      {Math.round(m.levels[i])}%
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className={styles.benchOverall}>
              <th>overall</th>
              {BOARD.models.map((m) => {
                const best = Math.max(...BOARD.models.map((x) => x.overall));
                return (
                  <td key={m.key} style={{ fontWeight: m.overall === best ? 700 : 600 }}>
                    {m.overall}%
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* simulator section: tool + resource + prompt surfaces                */
/* ------------------------------------------------------------------ */

export function ToolSurface() {
  const groups = ['discovery', 'widget work', 'navigation', 'platform'];
  return (
    <Panel
      head="The 20-tool surface"
    >
      {groups.map((g) => (
        <div key={g} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--wb-muted)', marginBottom: 6 }}>{g}</div>
          {TOOLS.tools.filter((t) => t.group === g).map((t) => (
            <div key={t.name} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: '0.8rem', marginBottom: 3 }}>
                <code>{t.name}</code>
                <span style={{ color: 'var(--wb-muted)' }}> — {t.desc}</span>
              </div>
              <pre style={{ margin: 0, padding: '5px 10px', fontSize: '0.68rem', background: 'var(--wb-chip)', border: '1px solid var(--wb-line)', borderRadius: 4, overflowX: 'auto', color: 'var(--wb-muted)', whiteSpace: 'pre' }}>
                {`${t.name}(${JSON.stringify(t.example || {}, null, 2)})`}
              </pre>
            </div>
          ))}
        </div>
      ))}
    </Panel>
  );
}

export function ResourceSurface() {
  return (
    <Panel
      head="The MCP resources"
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--wb-muted)', marginBottom: 4 }}>index</div>
        <div style={{ fontSize: '0.78rem', marginBottom: 3 }}>
          <code>{KNOWLEDGE.app_builder}</code>
          <span style={{ color: 'var(--wb-muted)' }}> — Every installable app template, with what each one contains.</span>
        </div>
      </div>
      {KNOWLEDGE.groups.map((g) => (
        <div key={g.name} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--wb-muted)', marginBottom: 4 }}>{g.name}</div>
          {g.items.map((it) => (
            <div key={it.uri} style={{ fontSize: '0.78rem', marginBottom: 3 }}>
              <code>{it.uri}</code>
              <span style={{ color: 'var(--wb-muted)' }}> — {it.desc.replace(/^[^:]+: /, '')}</span>
            </div>
          ))}
        </div>
      ))}
    </Panel>
  );
}

export function PromptSurface() {
  return (
    <Panel
      head="The workspace prompts"
    >
      {KNOWLEDGE.prompts.map((pr) => (
        <div key={pr.name} style={{ fontSize: '0.78rem', marginBottom: 10 }}>
          <code>{pr.name}</code>
          <div style={{ color: 'var(--wb-muted)', marginTop: 3, lineHeight: 1.55 }}>{pr.text}</div>
        </div>
      ))}
    </Panel>
  );
}

// ---------------------------------------------------------------- media slots
export function MediaSlot({ id, caption, kind = 'image', src = null, youtube = null, start = null, maxWidth = null }) {
  return (
    <figure className={styles.wb} style={maxWidth ? { maxWidth, marginInline: 'auto' } : undefined}>
      <div className={styles.mediaSlot}>
        {youtube ? (
          <div className={styles.mediaFrame}>
            <iframe
              src={`https://www.youtube.com/embed/${youtube}${start ? `?start=${start}` : ''}`}
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

// ---------------------------------------------------------------- parity loop
export function ParityLoop() {
  const W = 1080, H = 460;
  const laneStyle = { fill: 'none', stroke: 'var(--wb-line)', strokeDasharray: '5 4' };
  const ink = { fill: 'var(--wb-ink)', fontWeight: 600 };

  const box = (x, y, w, h, title, subs, key) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx="5" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" className={styles.dMain} style={{ fontSize: 11.5 }}>{title}</text>
      {subs.map((t, i) => (
        <text key={i} x={x + w / 2} y={y + 36 + i * 13} textAnchor="middle" className={styles.dSub}>{t}</text>
      ))}
    </g>
  );
  const arrow = (pts, key, dir = 'r') => {
    const [ex, ey] = pts[pts.length - 1];
    const head = dir === 'u' ? `${ex},${ey - 6} ${ex - 3.5},${ey} ${ex + 3.5},${ey}`
      : dir === 'd' ? `${ex},${ey + 6} ${ex - 3.5},${ey} ${ex + 3.5},${ey}`
      : `${ex + 6},${ey} ${ex},${ey - 3.5} ${ex},${ey + 3.5}`;
    return (
      <g key={key}>
        <polyline points={pts.map((p) => p.join(',')).join(' ')} className={styles.link} />
        <polygon points={head} className={styles.arrowHead} />
      </g>
    );
  };
  const call = (y, tool, rest) => (
    <text key={tool} x={20} y={y} className={styles.dSub} style={{ fontSize: 9 }}>
      <tspan style={ink}>{tool}</tspan>
      <tspan>{rest}</tspan>
    </text>
  );
  const state = (y, id, rest) => (
    <text key={id + y} x={640} y={y} className={styles.dSub} style={{ fontSize: 9 }}>
      <tspan style={ink}>{id}</tspan>
      <tspan>{rest}</tspan>
    </text>
  );

  return (
    <Panel
      head="Live parity · one task through both worlds"
    >
      <div className={styles.matrixScroll}>
        <svg className={styles.diagram} viewBox={`0 0 ${W} ${H}`} role="img" style={{ minWidth: 880 }}
             aria-label="The task's four reference calls fork into two lanes - the simulator and the real workspace. Each lane is seeded, replays the same four calls, and ends in the same board: renamed Client Command Center, a new active Open Requests tab, and a Tab Note widget. One grader runs the same ten checks on both snapshots: ten of ten in each, agreement.">
          {/* column headers */}
          <text x={415} y={26} textAnchor="middle" className={styles.dEdge}>seed</text>
          <text x={565} y={26} textAnchor="middle" className={styles.dEdge}>replay the same trace</text>
          <text x={747} y={26} textAnchor="middle" className={styles.dEdge}>snapshot</text>
          <text x={992} y={26} textAnchor="middle" className={styles.dEdge}>grade + diff</text>

          {/* the reference trace - real calls, forking into both lanes */}
          <rect x={10} y={175} width={270} height={115} rx="5" />
          <text x={20} y={193} className={styles.dMain} style={{ fontSize: 10.5 }}>reference trace · 4 calls</text>
          {call(213, 'manage_dashboard', ' rename "Client Command Center"')}
          {call(232, 'manage_navigation_bar', ' + tab "Open Requests"')}
          {call(251, 'navigate_workspace', ' → tab open-requests')}
          {call(270, 'add_generative_widget', ' note "Tab Note"')}
          {arrow([[280, 215], [565, 215], [565, 112]], 'trace-sim', 'u')}
          {arrow([[280, 255], [565, 255], [565, 368]], 'trace-live', 'd')}

          {/* simulator lane */}
          <rect x={320} y={40} width={570} height={130} rx="6" style={laneStyle} />
          <text x={332} y={58} className={styles.dNote} style={{ fontWeight: 700 }}>simulator</text>
          {box(345, 77, 140, 56, 'seed', ['state built in memory'], 's1')}
          {arrow([[485, 105], [622, 105]], 'sa1')}
          <circle cx={565} cy={105} r="3" style={{ fill: 'var(--wb-accent)' }} />
          {/* snapshot as the state the grader reads */}
          <rect x={630} y={55} width={235} height={100} rx="5" />
          {state(73, 'dash_001', ' "Client Command Center"')}
          {state(92, 'tabs', ' overview · open-requests (active)')}
          {state(111, 'widget_001', ' sign_off_tracker · kept')}
          {state(130, 'widget_002', ' note "Tab Note" · added')}

          {/* live lane */}
          <rect x={320} y={300} width={570} height={150} rx="6" style={laneStyle} />
          <text x={332} y={318} className={styles.dNote} style={{ fontWeight: 700 }}>my real workspace · backend.openbb.co/mcp</text>
          {box(345, 347, 140, 56, 'seed', ['7 real MCP calls'], 'l1')}
          {arrow([[485, 375], [622, 375]], 'la1')}
          <circle cx={565} cy={375} r="3" style={{ fill: 'var(--wb-accent)' }} />
          {/* snapshot as the product: the board as it looks after the replay */}
          <rect x={630} y={310} width={235} height={128} rx="5" />
          <text x={640} y={327} className={styles.dSub} style={{ fontSize: 9.5, ...ink }}>Client Command Center</text>
          <line x1={630} y1={334} x2={865} y2={334} style={{ stroke: 'var(--wb-line)' }} />
          <text x={640} y={349} className={styles.dSub} style={{ fontSize: 8.5 }}>Overview</text>
          <text x={696} y={349} className={styles.dSub} style={{ fontSize: 8.5, ...ink }}>Open Requests</text>
          <rect x={694} y={353} width={70} height={2} style={{ fill: 'var(--wb-accent)', stroke: 'none' }} />
          <line x1={630} y1={358} x2={865} y2={358} style={{ stroke: 'var(--wb-line)' }} />
          <rect x={638} y={366} width={219} height={62} rx="3" style={{ fill: 'var(--wb-accent-soft)' }} />
          <text x={646} y={382} className={styles.dSub} style={{ fontSize: 8.5, ...ink }}>Tab Note</text>
          <text x={646} y={397} className={styles.dSub} style={{ fontSize: 7.5 }}>Tracking open requests:</text>
          <text x={646} y={409} className={styles.dSub} style={{ fontSize: 7.5 }}>items are pending review.</text>

          {/* join into one grader */}
          {arrow([[865, 105], [890, 105], [890, 225], [909, 225]], 'join-sim')}
          {arrow([[865, 375], [890, 375], [890, 260], [909, 260]], 'join-live')}
          {box(915, 195, 155, 95, 'one grader', ['the same 10 checks', 'sim 10/10 · live 10/10'], 'grade')}
          <text x={992} y={272} textAnchor="middle" className={styles.dMain} style={{ fill: 'var(--wb-pass)' }}>agreement ✓</text>
        </svg>
      </div>
    </Panel>
  );
}
