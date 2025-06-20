import React, { type FC, useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import type { EnrichedBlogItem } from '../../types/blog';
import { trackEvent } from '../../lib/analytics';

// Define interfaces for graph elements
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
  showThoughts: boolean;
  showTopics: boolean;
  searchQuery: string;
  colorMode: 'light' | 'dark';
}

// Constants for styling and layout
const MIN_RADIUS = 3;
const MAX_RADIUS = 15;

export const GraphCanvas: FC<GraphCanvasProps> = ({ items, width, height, showThoughts, showTopics, searchQuery, colorMode }) => {
  // Refs for DOM elements and D3 objects
  const svgRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const keywordsGroupRef = useRef<SVGGElement | null>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);
  const quadtreeRef = useRef<d3.Quadtree<GraphNode> | null>(null);
  const currentTransformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);
  const computeTimerRef = useRef<number | null>(null);

  // State for graph data
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());

  // Effect to process raw items into nodes and links
  useEffect(() => {
    const graphNodes: GraphNode[] = items.map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      summary: item.summary,
      wordCount: item.wordCount,
      recencyRatio: item.recencyRatio,
      tags: item.tags,
      x: width / 2, // Start nodes in the center
      y: height / 2,
    }));

    const tagMap: { [key: string]: string[] } = {};
    for (const item of items) {
      if (item.tags) tagMap[item.id] = item.tags;
    }

    const graphLinks: GraphLink[] = [];
    for (let i = 0; i < graphNodes.length; i++) {
      for (let j = i + 1; j < graphNodes.length; j++) {
        const tags1 = tagMap[graphNodes[i].id];
        const tags2 = tagMap[graphNodes[j].id];
        if (!tags1 || !tags2) continue;
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
  }, [items, width, height]);

  // Memoized drawing function for canvas
  const draw = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context || !width || !height) return;
    
    context.clearRect(0, 0, width, height);
    if (!showThoughts) return;

    const transform = currentTransformRef.current;
    context.save();
    context.translate(transform.x, transform.y);
    context.scale(transform.k, transform.k);
    
    const isDark = colorMode === 'dark';
    const colorInterpolator = d3.interpolateRgb(isDark ? '#002244' : '#E0F5FF', isDark ? '#66CCFF' : '#00A4FF');
    const minMaxWc = d3.extent(nodes, n => n.wordCount);
    const radiusScale = d3.scaleSqrt().domain([minMaxWc[0] ?? 0, minMaxWc[1] ?? 1]).range([MIN_RADIUS, MAX_RADIUS]);

    // Draw links
    context.beginPath();
    context.globalAlpha = Math.max(0.4 / transform.k, 0.1);
    for (const link of links) {
      const source = link.source as GraphNode;
      const target = link.target as GraphNode;
      if (source.x && source.y && target.x && target.y) {
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
      }
    }
    context.strokeStyle = isDark ? '#4A5568' : '#D1D5DB';
    context.lineWidth = 1.0 / transform.k;
    context.stroke();

    // Draw highlight glow
    if (highlightedNodes.size > 0) {
      context.save();
      context.globalAlpha = 0.8;
      context.strokeStyle = 'white';
      context.lineWidth = 3 / transform.k;
      context.shadowColor = 'white';
      context.shadowBlur = 15;
      for (const node of nodes) {
        if (highlightedNodes.has(node.id) && node.x && node.y) {
          const radius = radiusScale(node.wordCount) / Math.sqrt(transform.k);
          context.beginPath();
          context.arc(node.x, node.y, radius, 0, 2 * Math.PI);
          context.stroke();
        }
      }
      context.restore();
    }

    // Draw nodes
    for (const node of nodes) {
      if (node.x && node.y) {
        context.globalAlpha = (highlightedNodes.size > 0 && !highlightedNodes.has(node.id)) ? 0.2 : 1.0;
        context.beginPath();
        const radius = radiusScale(node.wordCount) / Math.sqrt(transform.k);
        context.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        context.fillStyle = colorInterpolator(node.recencyRatio);
        context.fill();
      }
    }
    context.globalAlpha = 1.0; // Reset alpha
    context.restore();
  }, [width, height, links, nodes, showThoughts, highlightedNodes, colorMode]);

  // Effect to initialize and run the D3 simulation
  useEffect(() => {
    if (nodes.length > 0 && width > 0) {
        const minMaxWc = d3.extent(nodes, n => n.wordCount);
        const radiusScale = d3.scaleSqrt().domain([minMaxWc[0] ?? 0, minMaxWc[1] ?? 1]).range([MIN_RADIUS, MAX_RADIUS]);
        const sim = d3.forceSimulation(nodes)
          .force('link', d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(100).strength(0.05))
          .force('charge', d3.forceManyBody().strength(-50))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('x', d3.forceX(width / 2).strength(0.02))
          .force('y', d3.forceY(height / 2).strength(0.02))
          .force('collide', d3.forceCollide().radius(d => (radiusScale((d as GraphNode).wordCount) / Math.sqrt(currentTransformRef.current.k)) + 2).strength(0.8));
        
        sim.on('tick', draw)
          .on('end', () => {
            quadtreeRef.current = d3.quadtree(nodes, d => d.x ?? 0, d => d.y ?? 0);
            computeAndRenderKeywords();
          });
        simulationRef.current = sim;
  
        return () => {
          sim.stop();
        };
      }
  }, [nodes, links, width, height, draw]);

  // Effect to handle canvas redraw when `showThoughts` changes
  useEffect(() => {
    draw();
  }, [draw]);
  
  // Effect to toggle visibility of SVG keywords
  useEffect(() => {
    if (keywordsGroupRef.current) {
      d3.select(keywordsGroupRef.current).style('display', showTopics ? 'block' : 'none');
    }
  }, [showTopics]);

  // Function to compute and render keywords
  const computeAndRenderKeywords = useCallback(() => {
    const quadtree = quadtreeRef.current;
    const keywordsGroup = keywordsGroupRef.current;
    if (!quadtree || !keywordsGroup) return;

    const transform = currentTransformRef.current;
    const aggregator: Record<string, { cnt: number; sx: number; sy: number }> = {};
    
    const [x0, y0] = transform.invert([0, 0]);
    const [x1, y1] = transform.invert([width, height]);
    
    quadtree.visit((node, x_0, y_0, x_1, y_1) => {
        if (node.length || x_1 < x0 || x_0 > x1 || y_1 < y0 || y_0 > y1) {
          return false;
        }
        const d = node.data;
        for (const t of d.tags) {
            if (!aggregator[t]) aggregator[t] = { cnt: 0, sx: 0, sy: 0 };
            aggregator[t].cnt += 1;
            aggregator[t].sx += d.x ?? 0;
            aggregator[t].sy += d.y ?? 0;
        }
        return false;
    });

    const data = Object.entries(aggregator)
        .sort((a, b) => b[1].cnt - a[1].cnt)
        .slice(0, 10)
        .map(([tag, info]) => ({
            tag,
            x: info.sx / info.cnt,
            y: info.sy / info.cnt,
            cnt: info.cnt,
        }));

    const minMaxCount = d3.extent(data, d => d.cnt);
    const fontScale = d3.scaleLog().domain([minMaxCount[0] ?? 1, minMaxCount[1] ?? 1]).range([12, 32]);
    
    type KeywordDatum = { tag: string; x: number; y: number; cnt: number };
    const texts = d3.select(keywordsGroup)
        .selectAll<SVGTextElement, KeywordDatum>('text')
        .data(data, (d: KeywordDatum) => d.tag);

    const renderedBBoxes: ({ x: number, y: number, width: number, height: number })[] = [];

    const textsEnter = texts.enter().append('text')
        .attr('fill', colorMode === 'dark' ? '#E2E8F0' : '#1A202C')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle').style('pointer-events', 'none')
        .style('opacity', 0).text(d => d.tag)
      .merge(texts)
        .style('font-size', d => `${fontScale(d.cnt) / transform.k}px`)
        .attr('x', d => d.x).attr('y', d => d.y)
        .style('opacity', function(d) {
          const bbox = (this as SVGTextElement).getBBox();
          const bufferedBBox = {
            x: bbox.x - 5,
            y: bbox.y - 5,
            width: bbox.width + 10,
            height: bbox.height + 10,
          };

          let collides = false;
          for (const otherBBox of renderedBBoxes) {
            if (
              bufferedBBox.x < otherBBox.x + otherBBox.width &&
              bufferedBBox.x + bufferedBBox.width > otherBBox.x &&
              bufferedBBox.y < otherBBox.y + otherBBox.height &&
              bufferedBBox.y + bufferedBBox.height > otherBBox.y
            ) {
              collides = true;
              break;
            }
          }

          if (collides) {
            return 0;
          }

          renderedBBoxes.push(bufferedBBox);
          return 0.85;
        })
        .transition()
        .duration(400);

    texts.exit().transition().duration(200).style('opacity', 0).remove();
    if (data.length) trackEvent('zoom_keywords', data.map(d => d.tag).join(','));
  }, [width, height, colorMode]);

  // Effect to compute initial keywords after nodes are positioned
  useEffect(() => {
    if (nodes.length > 0) {
      const timer = setTimeout(() => {
        quadtreeRef.current = d3.quadtree(nodes, d => d.x ?? 0, d => d.y ?? 0);
        computeAndRenderKeywords();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nodes, computeAndRenderKeywords]);

  // Main effect for setting up D3 zoom and interactions
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 20])
      .on('zoom', (event) => {
        currentTransformRef.current = event.transform;
        draw();
        d3.select(keywordsGroupRef.current).attr('transform', event.transform.toString());
        if (computeTimerRef.current) window.clearTimeout(computeTimerRef.current);
        computeTimerRef.current = window.setTimeout(() => {
          computeAndRenderKeywords();
          computeTimerRef.current = null;
        }, 100);
      });
      
    const svgSelection = d3.select(svgElement).call(zoom);

    const handleClick = (event: MouseEvent) => {
        const quadtree = quadtreeRef.current;
        if (!quadtree) return;
        const transform = currentTransformRef.current;
        const [mx, my] = d3.pointer(event);
        const [rx, ry] = transform.invert([mx, my]);
        const found = quadtree.find(rx, ry, 30 / transform.k);
        if(found) {
            trackEvent('node_click', found.title);
            window.open(found.url, '_blank');
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        const quadtree = quadtreeRef.current;
        const tooltip = tooltipRef.current;
        if (!quadtree || !tooltip) return;
        
        const [mx, my] = d3.pointer(event);
        const [x, y] = currentTransformRef.current.invert([mx, my]);
        const found = quadtree.find(x, y, 10 / currentTransformRef.current.k);
        const tooltipSelection = d3.select(tooltip);

        if (found) {
            const titleStyle = `font-family: 'IBM Plex Mono', 'Courier New', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; margin-bottom: 4px;`;
            tooltipSelection
              .style('display', 'block')
              .style('left', `${mx + 12}px`)
              .style('top', `${my + 12}px`)
              .html(`<div style="${titleStyle}">${found.title}</div><span style="font-size:0.8rem;">${found.summary.slice(0,150)}...</span>`);
        } else {
            tooltipSelection.style('display', 'none');
        }
    }

    const handleDblClick = () => {
        svgSelection.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
    }

    svgSelection.on('click', handleClick);
    svgSelection.on('mousemove', handleMouseMove);
    svgSelection.on('dblclick.zoom', null);
    svgSelection.on('dblclick', handleDblClick);
    
    return () => {
      svgSelection.on('click', null);
      svgSelection.on('mousemove', null);
      svgSelection.on('dblclick', null);
      if (computeTimerRef.current) clearTimeout(computeTimerRef.current);
    }

  }, [draw, computeAndRenderKeywords]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.trim().toLowerCase();
      const newHighlighted = new Set<string>();
      for (const node of nodes) {
        if (node.title.toLowerCase().includes(query) || node.summary.toLowerCase().includes(query)) {
          newHighlighted.add(node.id);
        }
      }
      setHighlightedNodes(newHighlighted);
    } else {
      setHighlightedNodes(new Set());
    }
  }, [searchQuery, nodes]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'all' }}
      >
        <title>Blog Post Relationship Graph</title>
        <g ref={keywordsGroupRef} />
      </svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: colorMode === 'dark' ? 'rgba(26,32,44,0.85)' : 'rgba(248, 249, 250, 0.9)',
          color: colorMode === 'dark' ? '#E2E8F0' : '#1a1a1a',
          padding: '0.5rem 0.75rem',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(6px)',
          fontSize: '0.85rem',
          display: 'none',
          zIndex: 50,
          width: '240px',
          border: `1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
      />
    </>
  );
}; 