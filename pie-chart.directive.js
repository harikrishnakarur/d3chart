angular.module('todoApp').directive('pieChart',function(){
    return{
        restrict: 'E',
        template: '<svg width="960" height="500"></svg>',
        scope:{
            data: '='
        },
        link: function(scope){
            var t = d3.transition()
                .duration(2000);
            var svg = d3.select("svg"),
                width = +svg.attr("width"),
                height = +svg.attr("height"),
                radius = Math.min(width, height) / 2 - 10,
                g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
            var color = d3.scaleOrdinal(scope.data.colors);

            var pie = d3.pie()
                .sort(null)
                .value(function(d) { return d[scope.data.value]; });

            var path = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            var label = d3.arc()
                .outerRadius(radius - 40)
                .innerRadius(radius - 40);

            var data = scope.data.data;
            var div = d3.select("body").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);
              var arc = g.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                  .attr("class", "arc");
              
              if(scope.data.drawAnimation){  
                arc.append("path")
                    .style("fill", function(d) { return color(d.data[scope.data.category]); })
                    .transition().delay(function(d,i) {return i * 50; }).duration(50)
                    .attrTween('d', function(d) {
                    var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                    return function(t) {
                        d.endAngle = i(t); 
                        return path(d)
                        }
                    });
              }else{
                arc.append("path")
                    .attr("d", path)
                    .style("fill", function(d) { return color(d.data[scope.data.category]); })
              }
            
              arc.append("text")
                  .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
                  .attr("dy", "0.35em")
                  .text(function(d) { return d.data[scope.data.category]; });
                var getToolTip = function(data){
                    var value="";
                    var keys = Object.keys(scope.data.toolTipToDisplay);
                    for(var i=0;i<keys.length;i++){
                        if(data[keys[i]]){
                            value += scope.data.toolTipToDisplay[keys[i]] + ":" + data[keys[i]];
                            if(i<keys.length-1){
                                value +="<br/>";
                            }
                        }
                    }
                    return value;
                }
                var arcOver = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius + 10);
                arc.on("mouseover", function(d) {	
                    d3.select(this)
                      .select("path")
                      .transition()
                      .attr("d", arcOver)
                      .duration(200);
                    div.style("position", "absolute")
                        .style("opacity", .9)
                        .style("left", d3.event.clientX+"px")
                        .style("top", d3.event.clientY+"px");
                    div.html(getToolTip(d.data));
                }).on("mousemove", function(d) {
                    div.style("position", "absolute")
                        .style("opacity", .9)
                        .style("left", d3.event.clientX+10+"px")
                        .style("top", d3.event.clientY+10+"px");
                }).on("mouseout", function(d) {		
                    div.transition()	
                        .style("opacity", 0);
                    d3.select(this)
                      .select("path")
                      .transition()
                      .attr("d", path)
                      .duration(200);
                    });

//            });
        }
    }
})