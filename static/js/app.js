// clear the table for new data
function deleteFruitRows() {
  d3.selectAll('#fruit_item').remove();
  d3.selectAll('#fruit_row').remove();
};
  
// 'Filter Table' button
var button = d3.select('#filter-btn');

function insertFruits(fruitData){
  // iterate through all the input fields

  var selection = d3.select('#results')
    .selectAll('div')
    .data(fruitData)
    .enter();

  for (var i = 0; i < fruitData.length; i++) {
    var fDdistance = fruitData[i].distance;
    var fDfilename = fruitData[i].filename;
    var fDfruit = fruitData[i].fruit;
    var fDfilepath = '/static/images/' + fDfruit + '/' + fDfilename

    if ((i % 6) == 0) {
    selection.append('div')
        .attr('class', 'row')
        .attr('id', 'fruit_row')
    };

    selection.append('div')
        .attr('class', 'col-md-2 col-sm-4 col-xs-6')
        .attr('id', 'fruit_item')
        .enter()
          .append('img')
            .attr('class', 'center-block')
            .attr('src', fDfilepath)
          .append('p')
            .attr('class', 'center small')
            .text(fDfruit)
  };
  selection.exit();
}

// filter the database
button.on('click', function(event) {
  
  d3.event.preventDefault();
  deleteFruitRows();
  
  //var fruitNum = document.getElementByID("fruit_choice");
  var fruitNum = d3.select('#fruit_choice').property('value');
  console.log(fruitNum);
  d3.json('http://127.0.0.1:5000/fruit_choice/' + fruitNum, function(data) {
    console.log(data);
    insertFruits(data);
  });
});