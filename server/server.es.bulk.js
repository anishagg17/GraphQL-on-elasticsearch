const _ = require('lodash');
const client = require('./server.client');
const STUDIES = require('./json/elastic_index.json').study;

/**
 * Generate own bulk schema:
 * {index: {_index: "study"}}
 * {name: "Some name of product", brand: "Name Brand", ...}
 */
let initialBulk = {index: {_index: "study"}};
let collectionBulk = [];
_.map(_.keys(STUDIES), uuid => {
  collectionBulk = [
    ...collectionBulk, 
    initialBulk, 
    STUDIES[uuid]
  ];
});

client.bulk({body: collectionBulk}, function (err, r) {
  if (err) {
    console.log(`Failed Bulk operation\n`, err);
  } else {
    console.log(`Successfully imported ${_.keys(STUDIES).length} items \n`);
  }
});
