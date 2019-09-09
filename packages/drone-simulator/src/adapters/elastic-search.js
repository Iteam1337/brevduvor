const { Client } = require('@elastic/elasticsearch')
const { elasticSearch: elasticSearchConfig } = require('../config')

const elasticSearchClient = new Client({ node: 'http://localhost:9200' })

const saveDroneStatus = async droneStatus => {
  await elasticSearchClient.index({
    index: 'locations',
    body: {
      timestamp: new Date(),
      location: {
        ...droneStatus.currentPos,
      },
    },
  })

  await elasticSearchClient.indices.refresh({ index: 'locations' })
}

module.exports = {
  elasticSearchClient,
  saveDroneStatus,
}
