let arrayResults = []

function setArrayResults(dataArray, data){
  // if (!arrayResults.name.includes(data.name))
    arrayResults = [...dataArray, data];
  // else console.log("error")

  return arrayResults;
}
function getList(array){
  return array.sort(function (a, b){
    return a.score > b.score ? -1 : 1
  })
}

exports.setArrayResults = setArrayResults;
exports.getList = getList;
//[{"name":"test1","score":10},{"name":"test2","score":0},{"name":"test3","score":30}]
