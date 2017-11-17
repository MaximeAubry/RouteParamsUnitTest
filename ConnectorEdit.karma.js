/* plugins for unit tests */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'vue-test-utils'

/* VueJs app modules */
import router from '@/router'
import { auth } from '../../../src/auth/authService'
import ConnectorEdit from '@/components/ConnectorEdit.vue'

describe('ConnectorEdit.vue', () => {
  var authMock = null
  var mockApi = null

  beforeEach(() => {
    authMock = sinon.mock(auth)
    authMock.expects('isAuthenticated').returns(true)
    mockApi = new MockAdapter(axios)
  })

  afterEach(() => {
    authMock.restore()
    mockApi.restore()
  })

  it('Shoud load front-end link correctly', async () => {
    /* const $route = { name: 'connector-edit', params: { id: 'azerty' } } */
    /* const $route = { path: '/connector/edit/:id', params: { id: 'azerty' } } */
    /* const $route = { fullPath: '/connector/edit/azerty' } */

    /* router.push({ name: 'connector-edit', params: { id: 'azerty' } }) */

    var data = {
      name: 'connector 1',
      introduction_text: 'azerty',
      client_id: 'azerty',
      client_secret: 'azerty',
      logo: {
        filename: null,
        mimeType: null,
        content: null
      },
      callback_url: null
    }
    mockApi.onGet('/api/v1/Connector').reply(200, data)
    mockApi.onPost('/api/v1/Connector').reply(200, {})

    const wrapper = mount(ConnectorEdit, {
      router
      /* ,
      mocks: {
        $route
      } */
    })

    console.log(wrapper.vm.connector)
  })
})
