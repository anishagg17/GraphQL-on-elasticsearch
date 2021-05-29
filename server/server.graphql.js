const {ElasticSearchClient} = require('./server.elasticsearch');
const elasticSearchSchema = require('./server.es.schema');
const {makeExecutableSchema} = require('graphql-tools');

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type inOthers {
    name: String!
    quantity: String!
    uuid: String!
  }
  
  type inStocks {
    name: String!
    quantity: String!
    uuid: String!
  }
  
  type Study {
    brief_title: String
    facility_states: [String]
    facility_names: [String]
  }

  type Query {
    studies: [Study]
  }
`;

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    studies: () => new Promise((resolve, reject) => {
      ElasticSearchClient({...elasticSearchSchema})
        .then(r => {
          let _source = r['hits']['hits'];
          _source = _source.map((item, i) => item._source);
          console.log(_source);
          resolve(_source);
        });
    }),
  }
};

module.exports = makeExecutableSchema({
  "typeDefs": [typeDefs],
  "resolvers": resolvers
});
