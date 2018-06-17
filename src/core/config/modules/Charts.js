import Charts from "../../operations/Charts.js";


/**
 * Charts module.
 *
 * Libraries:
 * - d3
 *
 * @author tlwr [toby@toby.codes]
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */
let OpModules = typeof self === "undefined" ? {} : self.OpModules || {};

OpModules.Charts = {
    "Timeseries chart": Charts.runTimeseries,
};

export default OpModules;
