/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Vue from 'vue'
import Router from 'vue-router'
import VpnLoader from '@/pages/vpn-loader'
import AppLoading from '@/pages/app-loading'
import Vpn from '@/pages/vpn'
import Terms from '@/pages/terms'
import ConnectionHistory from '@/pages/connection-history'
import About from '@/pages/about'
import logger from '../../app/logger'

function factory (store) {
  Vue.use(Router)

  const router = new Router({
    linkActiveClass: 'is-active',
    routes: [
      {
        path: '/',
        name: 'home',
        component: AppLoading,
        meta: {
          visual: 'head',
          navVisible: false
        }
      },
      {
        path: '/load',
        name: 'load',
        meta: {
          visual: 'head'
        },
        component: VpnLoader
      },
      {
        path: '/vpn',
        name: 'vpn',
        meta: {
          visual: 'head'
        },
        component: Vpn
      },
      {
        path: '/terms',
        name: 'terms',
        component: Terms,
        meta: {
          navVisible: false
        }
      },
      {
        path: '/connection-history',
        name: 'connection-history',
        component: ConnectionHistory
      },
      {
        path: '/about',
        name: 'about',
        component: About
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    logger.info(`Route changes ${from.path} -> ${to.path}`)
    if (!store.getters.loading) {
      store.dispatch(
        'setVisual',
        typeof to.meta.visual !== 'undefined' ? to.meta.visual : null
      )
    }

    store.dispatch('setNavVisibility', typeof to.meta.navVisible !== 'undefined'
      ? (to.meta.navVisible === true)
      : true
    )

    store.dispatch('switchNav', false)
    next()
  })

  return router
}

export default factory
