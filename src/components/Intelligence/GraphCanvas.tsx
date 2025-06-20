import { type FC, useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import type { EnrichedBlogItem } from '../../types/blog';
import { trackEvent } from '../../lib/analytics';
import { interpolateRgb, quadtree } from 'd3';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  url: string;
  summary: string;
  wordCount: number;
  recencyRatio: number;
  tags: string[];
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  overlap: number;
}

interface GraphCanvasProps {
  items: EnrichedBlogItem[];
  width: number;
  height: number;
  searchQuery: string;
  showThoughts: boolean;
  showTopics: boolean;
}

const MIN_RADIUS = 4;
const MAX_RADIUS = 25;

function calculateRadius(wordCount: number, minWc: number, maxWc: number): number {
    if (maxWc === minWc) {
        return (MIN_RADIUS + MAX_RADIUS) / 2;
    }
    const scale = d3.scaleSqrt()
        .domain([minWc, maxWc])
        .range([MIN_RADIUS, MAX_RADIUS]);
    return scale(wordCount);
}

export const GraphCanvas: FC<GraphCanvasProps> = ({ items, width, height, searchQuery, showThoughts, showTopics }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  type KeywordDatum = { tag: string; x: number; y: number; cnt: number };
  const keywordsGroupRef = useRef<SVGGElement | null>(null);

  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  
  const [nodeSelection, setNodeSelection] = useState<d3.Selection<d3.BaseType | SVGCircleElement, GraphNode, SVGGElement, unknown> | null>(null);
  const [linkSelection, setLinkSelection] = useState<d3.Selection<SVGLineElement, GraphLink, SVGGElement, unknown> | null>(null);

  let currentTransform = d3.zoomIdentity;
  const computeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const limitedItems = items;

    const graphNodes: GraphNode[] = limitedItems.map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      summary: item.summary,
      wordCount: item.wordCount,
      recencyRatio: item.recencyRatio,
      tags: item.tags,
    }));

    const tagMap: { [key: string]: string[] } = {};
    for (const item of limitedItems) {
      tagMap[item.id] = item.tags;
    }

    const graphLinks: GraphLink[] = [];
    for (let i = 0; i < graphNodes.length; i++) {
      for (let j = i + 1; j < graphNodes.length; j++) {
        const tags1 = tagMap[graphNodes[i].id];
        const tags2 = tagMap[graphNodes[j].id];
        const commonTags = tags1.filter(tag => tags2.includes(tag));

        if (commonTags.length > 0) {
          graphLinks.push({
            source: graphNodes[i].id,
            target: graphNodes[j].id,
            overlap: commonTags.length,
          });
        }
      }
    }

    setNodes(graphNodes);
    setLinks(graphLinks);
  }, [items]);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0 || width === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    const g = svg.append('g');

    const wordCounts = nodes.map(n => n.wordCount);
    const minWc = Math.min(...wordCounts);
    const maxWc = Math.max(...wordCounts);

    const colorInterpolator = interpolateRgb('#002244', '#66CCFF');

    const link = g
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#4A5568') // text-gray-600
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.overlap * 1.5));

    const node = g
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => calculateRadius(d.wordCount, minWc, maxWc))
      .attr('fill', d => colorInterpolator(d.recencyRatio));

    // Tooltip handlers
    if (tooltipRef.current) {
      const tooltip = d3.select(tooltipRef.current);
      node
        .on('mouseover', (event, d) => {
          tooltip
            .style('display', 'block')
            .html(`<strong>${d.title}</strong><br/><span style="font-size:0.8rem;">${d.summary.slice(0,150)}...</span>`);
        })
        .on('mousemove', (event) => {
          tooltip
            .style('left', `${event.pageX + 12}px`)
            .style('top', `${event.pageY + 12}px`);
        })
        .on('mouseout', () => {
          tooltip.style('display', 'none');
        });
    }

    const keywordsGroup = g.append('g');
    keywordsGroupRef.current = keywordsGroup.node();
    
    setNodeSelection(node);
    setLinkSelection(link);
    
    node.on('click', (event, d) => {
      window.open(d.url, '_blank');
      trackEvent('node_click', d.title);
    });

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(120).strength(0.1))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05))
      .force('collide', d3.forceCollide().radius(d => calculateRadius(d.wordCount, minWc, maxWc) + 2).strength(0.9));

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as GraphNode).x ?? 0)
        .attr('y1', d => (d.source as GraphNode).y ?? 0)
        .attr('x2', d => (d.target as GraphNode).x ?? 0)
        .attr('y2', d => (d.target as GraphNode).y ?? 0);

      node.attr('cx', d => d.x ?? 0).attr('cy', d => d.y ?? 0);
    });

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 8])
      .on('zoom', (event) => {
        currentTransform = event.transform;
        g.attr('transform', event.transform);
        if (computeTimerRef.current) window.clearTimeout(computeTimerRef.current);
        computeTimerRef.current = window.setTimeout(() => {
          computeAndRenderKeywords();
          computeTimerRef.current = null;
        }, 200);
      })
      .on('end', () => {
        computeAndRenderKeywords();
      });
    
    svg.call(zoom);

    // Disable default double-click zoom behaviour
    svg.on('dblclick.zoom', null);

    // Custom reset on double-click
    svg.on('dblclick', () => {
      svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
    });

    // initial keywords after first layout
    computeAndRenderKeywords();

    // Stop simulation after 8 seconds to save CPU
    const timeoutId = window.setTimeout(() => {
      simulation.stop();
    }, 8000);

    // initial visibility based on toggles
    node.style('display', showThoughts ? 'block' : 'none');
    link.style('display', showThoughts ? 'block' : 'none');

    return () => {
      simulation.stop();
      window.clearTimeout(timeoutId);
    };

  }, [nodes, links, width, height, currentTransform, showThoughts]);

  const computeAndRenderKeywords = () => {
    const aggregator: Record<string, { cnt: number; sx: number; sy: number }> = {};
    const qt = quadtree(nodes, d => d.x ?? 0, d => d.y ?? 0);
    const R = MAX_RADIUS * currentTransform.k + 5;
    qt.visit((node, x0, y0, x1, y1) => {
      // Skip branches outside viewport
      if (x1 < -R || x0 > width + R || y1 < -R || y0 > height + R) return true;
      if (!node.length) {
        const d = node.data as GraphNode;
        if (d.x == null || d.y == null) return false;
        const [tx, ty] = currentTransform.apply([d.x, d.y]);
        if (tx >= -R && tx <= width + R && ty >= -R && ty <= height + R) {
          for (const t of d.tags) {
            if (!aggregator[t]) aggregator[t] = { cnt: 0, sx: 0, sy: 0 };
            aggregator[t].cnt += 1;
            aggregator[t].sx += tx;
            aggregator[t].sy += ty;
          }
        }
      }
      return false;
    });
    const data = Object.entries(aggregator)
      .sort((a, b) => b[1].cnt - a[1].cnt)
      .slice(0, 8)
      .map(([tag, info]) => ({
        tag,
        x: info.sx / info.cnt,
        y: info.sy / info.cnt,
        cnt: info.cnt,
      }));

    const fontScale = d3
      .scaleLinear()
      .domain([1, data[0]?.cnt || 1])
      .range([10, 24]);

    if (!keywordsGroupRef.current) return;
    const kGroupSel = d3.select<SVGGElement, unknown>(keywordsGroupRef.current);

    const texts = kGroupSel
      .selectAll<SVGTextElement, KeywordDatum>('text')
      .data(data, d => d.tag);

    const textsEnter = texts.enter().append('text')
      .attr('fill', '#E2E8F0')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .text(d => d.tag);

    textsEnter.merge(texts as unknown as d3.Selection<SVGTextElement, KeywordDatum, SVGGElement, unknown>)
      .transition()
      .duration(200)
      .style('opacity', 1)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .style('font-size', d => `${fontScale(d.cnt)}px`);

    texts.exit()
      .transition()
      .duration(150)
      .style('opacity', 0)
      .remove();

    if (data.length) trackEvent('zoom_keywords', data.map((d) => d.tag).join(','));
  };

  // React to toggles
  useEffect(() => {
    if (nodeSelection) nodeSelection.style('display', showThoughts ? 'block' : 'none');
    if (linkSelection) linkSelection.style('display', showThoughts ? 'block' : 'none');
    if (keywordsGroupRef.current) {
      d3.select(keywordsGroupRef.current).style('display', showTopics ? 'block' : 'none');
    }
  }, [showThoughts, showTopics, nodeSelection, linkSelection]);

  // Search highlight effect
  useEffect(() => {
    if (!nodeSelection || !linkSelection) return;
      
      const normalizedQuery = searchQuery.trim().toLowerCase();
      
      nodeSelection.transition()
          .duration(300)
          .attr('opacity', d => {
              if (normalizedQuery.length === 0) return 1;
              return d.title.toLowerCase().includes(normalizedQuery) ? 1 : 0.2;
          })
          .attr('stroke', d => {
              if (normalizedQuery.length === 0) return '#CBD5E0';
              return d.title.toLowerCase().includes(normalizedQuery) ? '#A0AEC0' : '#CBD5E0'; // text-gray-500 for highlight
          })
          .attr('stroke-width', d => {
              if (normalizedQuery.length === 0) return 1.5;
              return d.title.toLowerCase().includes(normalizedQuery) ? 2.5 : 1.5;
          });
      
      linkSelection.transition()
          .duration(300)
          .attr('stroke-opacity', d => {
              if (normalizedQuery.length === 0) return 0.6;
              const sourceMatch = (d.source as GraphNode).title.toLowerCase().includes(normalizedQuery);
              const targetMatch = (d.target as GraphNode).title.toLowerCase().includes(normalizedQuery);
              return (sourceMatch || targetMatch) ? 0.9 : 0.1;
          });
          
  }, [searchQuery, nodeSelection, linkSelection]);

  return (
    <>
      <svg ref={svgRef} width={width} height={height} />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: 'rgba(26,32,44,0.85)',
          color: '#E2E8F0',
          padding: '0.5rem 0.75rem',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(6px)',
          fontSize: '0.85rem',
          display: 'none',
          zIndex: 50,
          maxWidth: '260px',
        }}
      />
    </>
  );
}; 