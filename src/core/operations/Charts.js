import * as d3 from "d3";

/**
 * Charts module.
 *
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * @namespace
 */
const Charts = {
    wrapWithSvg(elements) {
      const innerHtml = elements.join("\n");

      return `<svg
           viewBox="0 0 100 100"
           width="100%"
           height="100%"
           style="background-color: #222;"
         >
           ${innerHtml}
         </svg>`;
    },

    /**
     * Timeseries chart
     *
     * Lines are the format:
     * <value1><delimiter><value2>[<delimiter><value3>]
     * Where
     *   value1 is the x axis value (i.e. the date)
     *
     *   value2 is the y axis value
     *
     *   value3 is optional and is the series name, which is the thing which
     *   groups values
     *
     */
    runTimeseries(input, args) {
        const delimiter = ',',
              axesPerc  = 20,
              marginPerc = 5;

        const rows = (input.match(/[^\r\n]+/g) || [])
            .filter(line => line.length > 0)
            .map(line => line.split(delimiter));

        if (rows.length === 0) {
            throw "0 records found";
        }

        if (rows.some(row => row.length !== rows[0].length) ) {
            throw "All records must be the same length";
        }

        if (rows.some(row => [2, 3].indexOf(row.length) === -1)) {
            throw "All records must length 2 or 3";
        }

        const seriesEnabled = rows[0].length === 3;

        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(rows, row => row[0]))
            .range(0, 100);

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(rows, row => row[1]))
            .range(0, 100);

        const xAxis = d3.axisBottom(xScale),
              yAxis = d3.axisLeft(yScale);

        const axes = '';
        const points = '<circle cx="50" cy="50" r="25" fill="mediumseagreen">';
        const lines = '';
        const tooltips = '';

        const chartContents = [
          axes,
          points,
          lines,
          tooltips,
        ];

        return Charts.wrapWithSvg(chartContents);
    },
};

export default Charts;
