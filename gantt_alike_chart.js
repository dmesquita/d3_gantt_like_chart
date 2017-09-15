function  ganttAlikeChart(){
  width = 800;
  height = 600;
  margin = {top: 20, right: 100, bottom: 20, left:100};
  xScale = d3.scaleTime();
  yScale = d3.scaleLinear();
  colorScale = d3.scaleLinear();
  xValue = d => d.date;
  colorValue = d => d.status;
  barHeight = 30;
  barWidth = 100;
  dateFormat = d3.timeParse("%d/%m/%Y");
  function chart(selection) {
  	selection.each(function(data) { 
  		var svg = d3.select(this).selectAll("svg").data([data]).enter().append("svg");
  		svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
  		var gEnter = svg.append("g");
  		var mainGroup = svg.select("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      xScale = xScale
                      .domain(d3.extent(data, d => dateFormat(xValue(d))))
                      .range([0, width]);

        yScale = yScale
                       .domain([0, data.length])
                       .range([0, height]);

        let dataByDates = d3.nest().key(d => xValue(d)).entries(data);
        let tickValues = dataByDates.map(d => dateFormat(d.key));

        let dataByCategories = d3.nest().key(d => colorValue(d)).entries(data);
        let categories = dataByCategories.map(d => d.key).sort();

        colorScale = colorScale
                     .domain([0, categories.length])
                     .range(["#00B9FA", "#F95002"])
                     .interpolate(d3.interpolateHcl);

        var xAxis = d3.axisBottom()
                    .scale(xScale)
                    .tickValues(tickValues)
                    .tickSize(height, 0, 0)
                    .tickSizeOuter(0);

        var grid = mainGroup.append('g').attr("class","grid").call(xAxis)
                .selectAll("text")
                .style("text-anchor", "middle")
                .attr("fill", "#000")
                .attr("stroke", "none")
                .attr("font-size", 10)
                .attr("dy", "1em");

        var meetingsLabels = mainGroup.append('g')
                .selectAll("text")
                .data(dataByDates)
                .enter()
                .append("text")
                .attr("x", d => xScale(dateFormat(d.values[0].date)))
                .attr("y", - 3)
                .text( d => d.values[0].meeting)
                .attr("font-size", 10)
                .attr("text-anchor", "middle")
                .attr("fill", "lightgrey");

        yScale = yScale.domain([0, data.length]).range([0, height]);

        var projects = mainGroup
                       .append('g')
                       .selectAll("this_is_empty")
                       .data(data)
                       .enter();

        var innerRects = projects.append("rect")
                      .attr("rx", 3)
                      .attr("ry", 3)
                      .attr("x", (d,i) => xScale(dateFormat(xValue(d))) - barWidth/2)
                      .attr("y", (d,i) => yScale(i))
                      .attr("width", barWidth)
                      .attr("height", 30)
                      .attr("stroke", "none")
                      .attr("fill", d => d3.rgb(colorScale(categories.indexOf(colorValue(d)))));

        var rectText = projects.append("text")
                      .text(d => d.label)
                      .attr("x", d => xScale(dateFormat(xValue(d))))
                      .attr("y", (d,i) => yScale(i) + 20)
                      .attr("font-size", 11)
                      .attr("text-anchor", "middle")
                      .attr("text-height", 30)
                      .attr("fill", "#fff");

      var tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

                  innerRects.on("mouseover", e => {
                    tooltip.transition().duration(200).style("opacity", .9);
                    tooltip.html(e.label + "</br>" + e.description + "</br>" + "status: " + e.status)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  }).on("mouseout", e => {
                      tooltip.transition().duration(500).style("opacity", 0);
                  });
  })}
  chart.width = function(value){ if (!arguments.length) { return width; } width = value; return chart;}
  chart.height = function(value){ if (!arguments.length) { return height; } height = value; return chart;}
  chart.margin = function(value){ if (!arguments.length) { return margin; } margin = value; return chart;}
  chart.xScale = function(value){ if (!arguments.length) { return xScale; } xScale = value; return chart;}
  chart.yScale = function(value){ if (!arguments.length) { return yScale; } yScale = value; return chart;}
  chart.colorScale = function(value){ if (!arguments.length) { return colorScale; } colorScale = value; return chart;}
  chart.xValue = function(value){ if (!arguments.length) { return xValue; } xValue = value; return chart;}
  chart.colorValue = function(value){ if (!arguments.length) { return colorValue; } colorValue = value; return chart;}
  chart.barHeight = function(value){ if (!arguments.length) { return barHeight; } barHeight = value; return chart;}
  chart.barWidth = function(value){ if (!arguments.length) { return barWidth; } barWidth = value; return chart;}
  chart.dateFormat = function(value){ if (!arguments.length) { return dateFormat; } dateFormat = value; return chart;}
  return chart;
}
