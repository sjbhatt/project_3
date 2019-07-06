// clear the table for new data
function deleteFruitRows() {
  d3.selectAll("#fruit_item").remove();
  d3.selectAll("#fruit_row").remove();
};
  
// 'Filter Table' button
var button = d3.select("#filter-btn");

// filter the database
button.on("click", function(event) {
  
  d3.event.preventDefault();
  deleteFruitRows();
  
  //var fruitNum = document.getElementByID("fruit_choice");
  var fruitNum = d3.select('#fruit_choice').property('value');
  console.log(fruitNum);
  var fruitData = d3.json("http://127.0.0.1:5000/fruit_choice/" + fruitNum, function(data) {
    console.log(data);
  });
  
  

  // iterate through all the input fields
  for (var i = 0; i < fruitData.length; i+=8) {
	
    var fDdistance = fruitData[i].distance;
    var fDfilename = fruitData[i].filename;
    var fDfruit = fruitData[i].fruit;
    var fDfilepath = '../web_app/images/' + fDfruit + '/' + fDfilename

    var field = d3.select("#" + idName).property("value");
    
    // treat empty or space-only fields as a search for ALL for that field
    if (field.trim() !== "") {
      var filteredData = filteredData.filter(ufoSighting =>
        // match as case insensitive
      ufoSighting[idName].toUpperCase().trim() ===
      field.toUpperCase().trim());
	};
  };
 
  // display message if no records found
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No Records Found</h4>");
  };
  
  // display the database
  console.log(fruitData);
  tableDisplay(fruitData);
});