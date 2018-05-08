angular.module('todoApp').directive('barChart',function(){
    return{
        restrict: 'E',
        template: '<svg width="960" height="500"></svg>',
        scope:{
            data: '='
        },
        link: function(scope){
            var margin = {top: 20, right: 20, bottom: 30, left: 60},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

            // set the ranges
            var x = d3.scaleBand()
                      .range([0, width])
                      .padding(0.1);
            var y = d3.scaleLinear()
                      .range([height, 0]);

            // append the svg object to the body of the page
            // append a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.select("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var div = d3.select("body").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);
            var getToolTip = function(data){
                    var value="";
                    var keys = Object.keys(scope.data.toolTipToDisplay);
                    for(var i=0;i<keys.length;i++){
                        value += scope.data.toolTipToDisplay[keys[i]] + ":" + data[keys[i]];
                        if(i<keys.length-1){
                            value +="<br/>";
                        }
                    }
                    return value;
                }
            var data = scope.data.data;
            data.forEach(function(d) {
                d.population = +d.population;
            });

            // Scale the range of the data in the domains
            x.domain(data.map(function(d) { return d.age; }));
            y.domain([0, d3.max(data, function(d) { return d.population; })]);

            // append the rectangles for the bar chart
            var bar = svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .style("fill", "steelblue")
              .attr("x", function(d) { return x(d.age); })
              .attr("width", x.bandwidth())
              .attr("y", height);
            if(scope.data.drawAnimation){
                bar.transition()
                  .attr("y", function(d) { return y(d.population); })
                  .attr("height", function(d) { return height - y(d.population); })
                .duration(1500);
            }else{
                bar.attr("y", function(d) { return y(d.population); })
                  .attr("height", function(d) { return height - y(d.population); });
            }

            // add the x Axis
            svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

            // add the y Axis
            svg.append("g")
              .call(d3.axisLeft(y));
            bar.on("mouseover", function(d) {	
                    div.style("position", "absolute")
                        .style("opacity", .9)
                        .style("left", d3.event.clientX+"px")
                        .style("top", d3.event.clientY+"px");
                    div.html(getToolTip(d));
                }).on("mousemove", function(d) {
                    div.style("position", "absolute")
                        .style("opacity", .9)
                        .style("left", d3.event.clientX+10+"px")
                        .style("top", d3.event.clientY+10+"px");
                }).on("mouseout", function(d) {		
                    div.transition()	
                        .style("opacity", 0);
                    });


        }
    }
})