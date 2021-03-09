import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { Reading } from '../data-table/data-table-datasource';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges {
  @Input() public data: Reading[];

  private width = 700;
  private height = 700;
  private margin = 50;

  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;
  public xLabel;
  public yLabel;

  constructor(public chartElem: ElementRef) {
  }

  public ngOnChanges(changes): void {
    if (changes.hasOwnProperty('data') && this.data) {
      d3.selectAll('svg').remove()
      this.initializeChart();
      this.drawChart();

      window.addEventListener('resize', () => this.drawChart());
    }
  }

  private initializeChart(): void {
    this.svg = d3
      .select(this.chartElem.nativeElement)
      .select('.linechart')
      .append('svg')
      .attr('height', this.height);
    this.svgInner = this.svg
      .append('g')
      .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

    this.yScale = d3
      .scaleLinear()
      .domain([d3.max(this.data, d => d.reading) + 1, d3.min(this.data, d => d.reading) - 1])
      .range([0, this.height - 2 * this.margin]);

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px,  0)');

    this.yLabel = this.svgInner
      .append('text')
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (this.margin / 4))
      .attr("x",0 - (this.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(`${this.data[0].name} (${this.data[0].unit})`)

    this.xScale = d3.scaleTime().domain(d3.extent(this.data, d => new Date(d.reading_ts)));

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

    this.xLabel = this.svgInner
      .append('text')             
      .attr("transform",
            "translate(" + ((window.innerWidth/2)) + " ," + 
                           (640) + ")")
      .style("text-anchor", "middle")
      .text('Time')

    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', 'green')
      .style('stroke-width', '2px')
  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.xScale.range([this.margin, this.width - 2 * this.margin]);

    const xAxis = d3
      .axisBottom(this.xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat('%d / %m / %Y'));

    this.xAxis.call(xAxis);

    const yAxis = d3
      .axisLeft(this.yScale);

    this.yAxis.call(yAxis);

    const line = d3
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveMonotoneX);

    const points: [number, number][] = this.data
      .map(d => [
        this.xScale(new Date(d.reading_ts)),
        this.yScale(d.reading),
      ]);

    this.lineGroup.attr('d', line(points));
  }
}