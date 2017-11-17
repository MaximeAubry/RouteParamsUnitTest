<template>
  <md-layout md-row class="connector-edit">
    <!-- partie gauche, client ID, client secret... -->
    <md-layout md-row md-align="end" md-vertical-align="top" class="connector-credentials-panel">
      <md-connector-credentials-form
        :model="credentials"
        @generateNewID="generateNewID"
        @activationRequest="generateNewID">
      </md-connector-credentials-form>
    </md-layout>
    <!-- partie droite, modification d'un connecteur -->
    <md-layout md-column md-align="start" md-vertical-align="top" class="connector-form-panel">
      <md-connector-form
        ref="connector-form"
        :model="connector"
        :save-button-label="'Modifier'"
        @saveConnector="saveConnector">
      </md-connector-form>
    </md-layout>
  </md-layout>
</template>

<script>
import mdConnectorCredentialsForm from './mdConnectorCredentialsForm.vue'
import mdConnectorForm from './mdConnectorForm.vue'
import { api } from '../api/backendApi'

export default {
  name: 'connector-edit',
  components: { mdConnectorCredentialsForm, mdConnectorForm },
  data: () => ({
    credentials: {
      client_id: null,
      client_secret: null
    },
    connector: {
      name: null,
      introduction_text: null,
      logo: {
        filename: null,
        mimeType: null,
        content: null
      },
      callback_url: null
    }
  }),
  mounted () {
    console.log('mounted')
    var vm = this
    api.$ConnectorCtrl.getByID(this.$router.currentRoute.params.id)
      .then(response => {
        vm.credentials.client_id = response.data.client_id
        vm.credentials.client_secret = response.data.client_secret
        vm.connector.name = response.data.name
        vm.connector.introduction_text = response.data.introduction_text
        vm.connector.logo.filename = response.data.logo.filename
        vm.connector.logo.mimeType = response.data.logo.mimeType
        vm.connector.logo.content = response.data.logo.content
        vm.connector.callback_url = response.data.callback_url
      })
      .catch(error => {
        console.log('Http request failure: unable to get connectors list.', error.message)
      })
  },
  methods: {
    generateNewID: function () {

    },
    activationRequest: function () {

    },
    saveConnector: function (connector) {
      /* api.$ConnectorCtrl.put(connector) */
    }
  }
}
</script>

<style>

</style>
