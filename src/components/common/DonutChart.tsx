// react
import { useRef, useLayoutEffect } from 'react';
// d3
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
// mui
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
// THIS PROJECT
// types
import { NameValueData } from '../../types/Statistics';
// utilities
import formatTimeText from '../../utilityFunctions/formatTimeText';

const useStyles = makeStyles({
  donutChart: {
    height: '100%',
    width: '100%',
  },
});

interface DonutChartProps {
  data: NameValueData[];
  total: number;
  totalLabel: string;
};
export default function DonutChart(props: DonutChartProps): React.ReactElement {
  const classes = useStyles();

  const { data, total, totalLabel } = props;

  const d3Container = useRef(null);

  useLayoutEffect(() => {
    // functions and variables
    const color = d3.scaleOrdinal()
      .domain(data.map((d: NameValueData) => d.name))
      .range(d3.schemeSet1);

    const pie = d3.pie<NameValueData>()
      .padAngle(0.005)
      .sort(null)
      .value(d => d.value);

    const arcs = pie(data);

    const width = 500;

    const donutMarginSides = 50;
    const donutMarginTop = 10;
    const donutMarginBottom = 20;
    const donutRadius = (width - (donutMarginSides * 2)) / 2;
    const donutDiameter = donutRadius * 2;
    const donutContainerHeight = donutDiameter + donutMarginTop + donutMarginBottom;

    const legendItems = arcs.filter(d => (d.endAngle - d.startAngle) <= 0.25);
    const legendItemRectSides = 20;
    const legendItemRectMargin = 5;
    const legendItemTotalHeight = legendItemRectSides + (legendItemRectMargin * 2);
    const legendMarginTop = 0;
    const legendMarginBottom = 10;
    const legendMarginSides = 25;
    const legendHeight = legendItems.length * legendItemTotalHeight + legendMarginTop + legendMarginBottom;


    const height = donutContainerHeight + legendHeight;

    const arc = () => {
      return d3.arc<PieArcDatum<NameValueData>>().innerRadius(donutRadius * 0.7).outerRadius(donutRadius);
    };

    let fill = (d: d3.PieArcDatum<NameValueData>): string => color(d.data.name) as string;

    const generateId = (name: string) => name.split(' ').join('');

    // remove any old chart before appending a refreshed one
    d3.select('#donut-chart').remove();

    // full svg
    const svg = d3.select(d3Container.current)
      .append('svg')
      .attr('id', 'donut-chart')
      .attr("viewBox", `0, 0, ${width}, ${height}`);

    // shadow effect
    const defs = svg.append('defs');

    const filter = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', '150%')
      .attr('width', '150%');

    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 2)
      .attr('result', 'blur');

    filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', 3)
      .attr('dy', 3)
      .attr('result', 'offsetBlur');

    const feMerge = filter.append('feMerge');

    feMerge.append('feMergeNode')
      .attr('in', 'offsetBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // donut chart viewbox variables
    const viewBoxY = legendHeight + donutMarginBottom - (height / 2);
    const viewBoxX = - (width / 2);

    // chart shadow
    const shadowSvg = svg.append('svg')
      .attr('viewBox', `${viewBoxX}, ${viewBoxY}, ${width} ,${donutDiameter}`);

    shadowSvg.selectAll('path')
      .data(pie([{ name: '', value: 1 }]))
      .join('path')
      .attr('fill', 'white')
      .attr('d', arc())
      .style('filter', 'url(#drop-shadow)');

    // chart pieces
    const chartSvg = svg.append('svg')
      .attr('viewBox', `${viewBoxX}, ${viewBoxY}, ${width} ,${donutDiameter}`);

    chartSvg.selectAll('path')
      .data(arcs)
      .join('path')
      .attr('fill', fill)
      .attr('d', arc())
      .append('title')
      .text(d => `${d.data.name}: ${formatTimeText(d.data.value)}`);

    // labels
    chartSvg.append('g')
      .attr('id', 'labelG')
      .attr('font-size', 14)
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('id', d => generateId(d.data.name))
      .attr('transform', d => `translate(${arc().centroid(d)})`)
      .style('fill', 'white')
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
        .attr('y', '-0.4em')
        .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
        .attr('x', 0)
        .attr('y', '0.7em')
        .text(d => `${formatTimeText(d.data.value)}`));

    // label boxes
    const labelBoxPaddingSides = 5;
    const labelBoxPaddingTopBottom = 5;

    chartSvg.insert('g', '#labelG')
      .selectAll('rect')
      .data(arcs)
      .join('rect')
      .attr('x',
        (d: d3.PieArcDatum<NameValueData>): number => {
          const width = document.querySelector(`#${generateId(d.data.name)}`)?.getBoundingClientRect().width;
          const totalWidth = width && width + labelBoxPaddingSides * 2;
          return (totalWidth && -(totalWidth / 2)) as number;
        })
      .attr('y',
        (d: d3.PieArcDatum<NameValueData>): number => {
          const height = document.querySelector(`#${generateId(d.data.name)}`)?.getBoundingClientRect().height;
          const totalHeight = height && height + labelBoxPaddingTopBottom * 2;
          return (totalHeight && -(totalHeight / 2)) as number;
        })
      .attr('width',
        (d: d3.PieArcDatum<NameValueData>): number => {
          const width = document.querySelector(`#${generateId(d.data.name)}`)?.getBoundingClientRect().width;
          const totalWidth = width && width + labelBoxPaddingSides * 2;
          return totalWidth as number;
        })
      .attr('height',
        (d: d3.PieArcDatum<NameValueData>): number => {
          const height = document.querySelector(`#${generateId(d.data.name)}`)?.getBoundingClientRect().height;
          const totalHeight = height && height + labelBoxPaddingTopBottom * 2;
          return totalHeight as number;
        })
      .attr('fill', 'black')
      .attr('fill-opacity', 0.5)
      .attr('rx', 5)
      .attr('transform', d => `translate(${arc().centroid(d)})`);

    // center label
    const totalGroup = chartSvg.append('g')
      .append('text')
      .attr('text-anchor', 'middle');

    totalGroup
      .append('tspan')
      .text(total ? `${formatTimeText(total)}` : 'N/A')
      .attr('font-size', 48);


    totalGroup
      .append('tspan')
      .text(totalLabel)
      .attr('y', 30)
      .attr('x', 0);

    // legend
    const legend = svg.append('g');

    const legendXStart = legendMarginSides;
    const legendYStart = donutContainerHeight + legendMarginTop;

    legend.selectAll('rect')
      .data(legendItems)
      .join('rect')
      .attr('height', legendItemRectSides)
      .attr('width', legendItemRectSides)
      .attr('fill', fill)
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5)
      .attr('x', legendXStart)
      .attr('y', (d, i) => legendYStart + (i * legendItemTotalHeight))
      .style('filter', 'url(#drop-shadow)');

    legend.selectAll('text')
      .data(legendItems)
      .join('text')
      .attr('text-anchor', 'start')
      .attr('font-size', 14)
      .attr('x', legendXStart + legendItemTotalHeight)
      .attr('y', (d, i) => legendYStart + (i * legendItemTotalHeight) + (legendItemRectSides * .75))
      .text(d => `${d.data.name} / ${formatTimeText(d.data.value)}`);

  }, [data, total, totalLabel]);

  return (
    <Paper ref={d3Container} className={classes.donutChart}></Paper>
  );
};
