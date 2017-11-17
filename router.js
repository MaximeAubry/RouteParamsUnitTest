import Vue from 'vue'
import Router from 'vue-router'

/* Modules */
import { auth } from '../auth/authService'
import { settings } from '../settings/settingsService'

/* Pages */
import Home from '@/components/Home'
import Connector from '@/components/Connector'
import ConnectorList from '@/components/ConnectorList'
import ConnectorNew from '@/components/ConnectorNew'
import ConnectorEdit from '@/components/ConnectorEdit'
import Development from '@/components/Development'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/connector',
      name: 'connector',
      redirect: '/connector/list',
      component: Connector,
      children: [
        {
          path: 'list',
          name: 'connector-list',
          component: ConnectorList
        },
        {
          path: 'new',
          name: 'connector-new',
          component: ConnectorNew
        },
        {
          path: 'edit/:id',
          name: 'connector-edit',
          component: ConnectorEdit
        }
      ]
    },
    {
      path: '/development',
      name: 'development',
      component: Development
    }
  ]
})

router.beforeEach((to, from, next) => {
  var loadRoute = function () {
    if (to.path.indexOf('AADB2C90118') !== -1) {
      auth.gotoForgotPasswordPage()
    } else if (from.path === '/' && to.fullPath.substring(0, 9) === '/id_token') {
      var token = to.fullPath.replace('/id_token=', '')
      auth.setSession(token)
      router.replace('home')
    } else if (!to.matched.some(record => record.meta.anonymous) && !auth.isAuthenticated()) {
      auth.logout()
    } else {
      next()
    }
  }

  var loadSettings = function () {
    auth.urlLogin = settings.website.url_login
    auth.urlForgotPassword = settings.website.url_forgot_password
  }

  if (settings.isInitialized) {
    loadSettings()
    loadRoute()
  } else {
    settings.loadSettings(() => {
      loadSettings()
      loadRoute()
    })
  }
})

export default router
