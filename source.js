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