let arrayResults = []
const SCORE_ROW = 10;
function setArrayResults(dataArray, data){
  arrayResults = [...dataArray];

  let indexName =arrayResults.findIndex(item => item.name === data.name)
  if(indexName !== -1) {
    arrayResults[indexName] = data;
    return arrayResults;
  }

  if (arrayResults.length + 1 > SCORE_ROW){
    let indexName2 = arrayResults.findLastIndex(item => item.score < data.score)
    console.log(indexName2)
    if(indexName !== -1) {
      if (indexName2 + 1 < SCORE_ROW) arrayResults[indexName2] = data;
      return arrayResults;
    }
  }
  else{
    arrayResults = [...arrayResults, data];
  }


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
