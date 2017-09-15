#!/usr/bin/env node

//to run: node transform.js source.rc

var fs = require('fs');

var source = process.argv.splice(2)[0];
var target = source.substring(0, source.lastIndexOf('.')) + '.js';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var assessor = "chart.variable = function(value){ if (!arguments.length) { return variable; } variable = value; return chart;}\n";
var functionStart = "function chartName() {";
var declareVariable = "var variable = value";
var chartMethod = 'function chart(selection) {\n\tselection.each(function(data) { \n\t\tvar svg = d3.select(this).selectAll("svg").data([data]).enter().append("svg"); \n\t\tsvg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);\n\t\tvar gEnter = svg.append("g");\n\t\tvar mainGroup = svg.select("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");\n})}\n'

fs.readFile(source, 'utf-8', function(err, data) {
    if (err) throw err;
    var variables = [];
    var chartName;

    var analyze = function(input) {
        return input.map(function(line) {
            var input = line.split(/:(.+)/);
            return {variable: input[0].trimRight(), value: input[1]};
        });
    };

    var transform = function(lines) {
        return lines.map(function(line) {
            if (line.variable == 'chart') {
                chartName = line.value;
                return 'function ' + line.r + '(){';
            }
            else{
              variables.push([line.variable,line.value]);
              return assessor.replaceAll("variable", line.variable);
            }
        });
    };

    var output = transform(analyze(data.trim().split('\n'))).join('\n');
    var output_new = 'function ' + chartName + '(){\n';
    for (i = 0; i < variables.length; i++){
      output_new = output_new + variables[i][0] + " =" + variables[i][1] + ";\n";
    }
    output_new = output_new + chartMethod;
    for (i = 0; i < variables.length; i++){
      output_new = output_new + assessor.replaceAll("variable", variables[i][[0]]);
    }
    output_new = output_new + "return chart;\n}"


    fs.writeFile(target, output_new, function(err) {
        if (err) throw err;

        console.log('Wrote ' + target + '!');
    });
});
