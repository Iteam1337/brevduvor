import { RESTDataSource } from 'apollo-datasource-rest'
import { Client } from '@elastic/elasticsearch'
import config from './../config'

export default class ElasticAPI extends RESTDataSource {
  private client
  public baseURL
  constructor() {
    super()
    this.baseURL = config.ELASTIC_URL
    this.client = new Client({ node: this.baseURL })
  }

  public async saveDroneStatus(droneStatus) {
    await this.client.index({
      index: 'drone-status',
      body: {
        timestamp: new Date(),
        location: {
          ...droneStatus.currentPos,
        },
        id: 'Drone ID',
        eta: null,
        distance: null,
        battery: null,
        height: null,
        bearing: null,
      },
    })

    await this.client.indices.refresh({ index: 'drone-status' })
  }
}

config.ELASTIC_URL

// const { Client } = require('@elastic/elasticsearch')
// const { elasticSearch: elasticSearchConfig } = require('../config')

// const elasticSearchClient = new Client({ node: 'http://localhost:9200' })

// const saveDroneStatus = async droneStatus => {
//   await elasticSearchClient.index({
//     index: 'locations',
//     body: {
//       timestamp: new Date(),
//       location: {
//         ...droneStatus.currentPos,
//       },
//     },
//   })

//   await elasticSearchClient.indices.refresh({ index: 'locations' })
// }

// module.exports = {
//   elasticSearchClient,
//   saveDroneStatus,
// }
