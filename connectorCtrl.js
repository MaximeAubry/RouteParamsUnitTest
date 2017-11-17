import axios from 'axios'

export default class ConnectorCtrl {
  getAll () {
    return axios.get('/api/v1/Connector')
  }

  getByID (id) {
    return axios.get('/api/v1/Connector/' + id)
  }

  post (model) {
    return axios.post('/api/v1/Connector', model)
  }
}
