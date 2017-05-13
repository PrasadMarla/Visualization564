function drawPie(id1){

d3.select("#contain").selectAll("svg").remove();
 var r = 120,                            //radius
    color = d3.scale.category20c();     //builtin range of colors
    data = renderData.histData;
   	
	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .direction('e')
	  .offset([0, 20])
	  .html(function(d) {
	    return '<table id="tiptable">'+d.data.meta+"<br> Val : " +d.data.numfill +"</table>";
	});
	
    var svgV = d3.select("#contain")
        .append("svg:svg")              //create the SVG element inside the <body>
        .call(tip)
		.data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + 300 + "," + 200 + ")")    //move the center of the pie chart from 0, 0 to radius, radius
            .on('click',function(){
			 tip.hide();
	        d3.select("#contain").selectAll("svg").remove();
			mode  = 0;
	        //document.location.href = 'force.html';
		    drawHist(id1);
	       }); 
  
    var arcOver = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(130);
	  
    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);
    var pie = d3.layout.pie()           //this will create arc data  list of values
        .value(function(d) { return d.numfill; });   
    var arcs = svgV.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //creating a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
             .attr("class", "slice");   
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc)		
		 .on("mouseover",function(d) {
		 tip.show(d);
         d3.select(this).transition()
          .duration(300)
          .attr("d", arcOver);
      })
      .on("mouseout", function(d) {
	     tip.hide(d)
        d3.select(this).transition()
          .duration(300)
          .attr("d", arc);
      });
        
	
    d3.select("#contain").attr("align","center");
}
