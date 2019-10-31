const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    PORT: 4000,
    DRONE_URL: 'https://drone.brevduvor.iteamdev.se',
    OSRM_URL: process.env.OSRM_HOST || 'http://localhost:5000',
    ELASTIC_URL: process.env.ELASTIC_HOST || 'http://localhost:9200',
    WEBHOOK_URL: 'https://api.brevduvor.iteamdev.se/status',
    POSTGRES: {
      USER: 'iteamadmin',
      PASSWORD: process.env.POSTGRES_PASSWORD || 'adminadmin1337',
      DATABASE: 'brevduvor',
      PORT: 5432,
      HOST: process.env.POSTGRES_HOST || 'localhost',
      MAX: 20,
      timeout: 30000,
    },
    JWT_PRIVATE_KEY:
      'wgQuABVcobsQhcFv1XjflYPRAwZRU-cvzVjjk-dv7rz2yOXIstOxgi30rKLTZzVyfHYbQNw-UqYfI1IZYiZHv1fuN2muTqwUH5LKzfp_DwxuVyGbdZa9lBwmJbDeSwciStsyCylonFYyUCCr4k-Jg2hr68fo3dl-SRYQlDq_gRSY2Irtoyve_XKO_OvSxA3HRztdJJb9AyaTAi9_3O617j4oTcFIMaW80n8QATWCzXlm2QWU4sK5odw-MDK83WJuJ20p6iYz1dHWL2Avw6CB8Y0fq0kEw4wUZJXt1IYi42ZXZDKxl-goHzE8gBhCdeRsnLtVilHGGIZKM3QEkRXgYQ',
  },
})

export default {
  PORT: config.get('PORT'),
  DRONE_URL: config.get('DRONE_URL'),
  OSRM_URL: config.get('OSRM_URL'),
  ELASTIC_URL: config.get('ELASTIC_URL'),
  WEBHOOK_URL: config.get('WEBHOOK_URL'),
  POSTGRES: config.get('POSTGRES'),
  JWT_SECRET: config.get('JWT_PRIVATE_KEY'),
}
