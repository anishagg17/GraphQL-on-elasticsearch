const client = require('./server.client');

client.indices.delete(
  {
    index: "study"
  },
  (error, response, status) => {
    if(!error) {
      console.info("Deleted index");
      console.info(response);
    } else {
      console.info(error);
    }

  }
);
