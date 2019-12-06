// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import Chart          from 'chart.js';
import {
  earningGraphMockData
}                     from '../../models';
import Panel          from '../panel/Panel';


class BarChart extends PureComponent {
  static propTypes = {
    labels:   PropTypes.array,
    datasets: PropTypes.array,
    title: PropTypes.string
  };

  static defaultProps = {
    data: earningGraphMockData
  };

  chart = null;
  barchart = null;

  componentDidMount() {
    const { labels, datasets} = this.props;
    this.drawChart({labels, datasets});
  }

  componentWillReceiveProps(newProps) {
    const { labels, datasets } = this.props;
    if ((newProps.labels.length > 0 && newProps.datasets.length > 0) &&
        (labels.length === 0 && datasets.length === 0)) {
      this.drawChart({
        labels: newProps.labels,
        datasets: newProps.datasets
      });
    }
  }

  render() {
    const {title} = this.props;
    return (
      <Panel
        hasTitle={true}
        title={title}>
        <canvas
          ref={this.getCanvaRef}
          id="barChart"
          width="600"
          height="330"
        />
      </Panel>
    );
  }

  getCanvaRef = ref => (this.barchart = ref)

  drawChart(data) {
    // BAR CHART
    const options = {
      responsive : true,
      maintainAspectRatio: true
    };

    this.chart = new Chart(
      this.barchart.getContext('2d'),
      {
        type: 'bar',
        data,
        options
      }
    );
  }
}

export default BarChart;
