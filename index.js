#!/usr/bin/env node
var Retrieval = require('./Retrieval');
var retriever = new Retrieval();

(async function () {
  var results = await retriever.getResults();
  var json = await results.json();

  console.log(retriever.parseResults(json).map(result => result.formatted))
})();
