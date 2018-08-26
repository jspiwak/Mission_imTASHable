var margin = {top: 100, right: 15, bottom: 150, left: 150},
    width = 1150 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var data = d3.csv("csvData.csv", function(error, data) {
  data.forEach(function(d) {
    d.Streams = +d.Streams;

    // console.log(data)
  });

  data.sort(function(a,b) {
    return d3.descending(+a.Streams, +b.Streams);
    });
  

  x.domain(data.map(function(d) { return d.Genre; }));
  y.domain([0, d3.max(data, function(d) { return d.Streams; })]);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -100)
      .attr("dy", ".75em")
      .style("text-anchor", "end")
      .style("font", "20px times")
      .attr("fill", "green")
      .text("Number of Streams");
  
    svg.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "green")
      .text("Genres");

    var bar = svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .classed("bar", true)
      .attr("x", function(d) { return x(d.Genre); })
      .attr("y", function(d) { return y(d.Streams); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return height - y(d.Streams); });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .style("font", "10px times")
      .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

      svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "25px") 
      .style("text-decoration", "underline")  
      .text("Number of Streams Per Genre");

    // Step 1: Append tooltip div
    var toolTip = d3.select("body")
    .append("div")
    .style("display", "none")
    .classed("tooltip", true);

  // Step 2: Create "mouseover" event listener to display tooltip
  bar.on("mouseover", function(d) {
    toolTip.style("display", "block")
        .html(
          `<strong>${d.Genre}<strong>`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
  })
    // Step 3: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });
  }
);

// plot for genre graph