// react
import { useRef, useLayoutEffect } from 'react';
// d3
import * as d3 from 'd3';
// mui
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
// THIS PROJECT
// types
import { NameValueDataInclPercentile } from '../../types/Statistics';
// utilities
import formatTimeText from '../../utilityFunctions/formatTimeText';

const useStyles = makeStyles({
  chart: {
    height: '100%',
    width: '100%'
  }
});

interface VerticalBarChartProps {
  data: NameValueDataInclPercentile[];
};
export default function VerticalBarChart(props: VerticalBarChartProps): React.ReactElement {
  const classes = useStyles();

  const { data } = props;

  const d3Container = useRef(null);

  useLayoutEffect(() => {
    // functions and variables
    const barHeight = 20;
    const barMargin = 30;
    const paddingBottom = 20;

    const height = (barHeight + barMargin) * data.length + paddingBottom;
    const width = 500;
    const padding = 20;

    const sortedData = [...data].sort((a, b) => b.value - a.value);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.value))] as [number, number])
      .range([0, width - (padding * 2) - 75]);

    // const fill = (d: NameValueDataInclPercentile) => color(d.name);

    const fill = (d: NameValueDataInclPercentile) => {
      if (d.avgPercentile >= 90) {
        return '#9500ae';
      } else if (d.avgPercentile >= 80) {
        return '#d500f9';
      } else if (d.avgPercentile >= 60) {
        return '#dd33fa';
      } else if (d.avgPercentile >= 40) {
        return '#757de8';
      } else if (d.avgPercentile >= 20) {
        return '#3f51b5';
      } else {
        return '#002984';
      }
    };

    // remove any old chart before appending a refreshed one;
    d3.select('#bar-chart').remove();

    // full svg
    const svg = d3.select(d3Container.current)
      .append('svg')
      .attr('id', 'bar-chart')
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

    // chart rectangles
    svg.selectAll('rect')
      .data(sortedData)
      .join('rect')
      .attr('fill', fill)
      .attr('x', padding)
      .attr('y', (d, i) => i * (barHeight + barMargin) + barMargin)
      .attr('height', barHeight)
      .attr('width', d => xScale(d.value))
      .attr('stroke', 'black')
      .attr('stroke-width', 0.25)
      .attr('rx', 5)
      .style('filter', 'url(#drop-shadow)');

    // labels
    svg.append('g')
      .attr('font-size', 14)
      .selectAll('text')
      .data(sortedData)
      .join('text')
      .attr('transform',
        (d, i) => `translate(${padding}, ${i * (barHeight + barMargin) + (barMargin * 0.9)})`)
      .call(text => text.append('tspan')
        .text(d => d.name)
        .attr('font-family', 'roboto')
        .attr('font-size', 16)
        .attr('y', -3))
      .call(text => text.append('tspan')
        .attr('x', d => xScale(d.value) + 15)
        .attr('y', barHeight)
        .attr('font-style', 'normal')
        .text(d => `(${formatTimeText(d.value)})`));
  }, [data]);

  return (
    <Paper ref={d3Container} className={classes.chart}></Paper>
  );
}