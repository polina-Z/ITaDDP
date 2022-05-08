/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import HomePage from './views/homepage.js'
import ShopPage from './views/shoppage.js'
import CartPage from './views/cartpage.js'
import SignInAndSignUpPage from './views/signinpage.js'
import CategoryPage from './views/categorypage.js'
import SignOut from './views/signout.js'
import { auth } from '../js/firebase/firebase.init.js'

const navigateTo = (url, state = null) => {
  history.pushState(null, '', url)
  router()
}

const router = async () => {
  const routes = [
    { path: '/', view: HomePage },
    { path: '/jackets', view: CategoryPage },
    { path: '/hats', view: CategoryPage },
    { path: '/womens', view: CategoryPage },
    { path: '/mens', view: CategoryPage },
    { path: '/sneakers', view: CategoryPage },
    { path: '/shop', view: ShopPage },
    { path: '/sign-in', view: SignInAndSignUpPage },
    { path: '/cart', view: CartPage },
    { path: '/sign-out', view: SignOut }
  ]

  const potentialMatches = routes.map(route => {
    return {
      route,
      isMatch: location.pathname === route.path
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    }
  };
  document.getElementById('cart').classList.add('hidden')

  const view = new match.route.view(match.route.path)

  document.querySelector('#app').innerHTML = await view.getHtml()
  view.addHandlers()
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('mode') === 'dark') {
    document.getElementById('dark').setAttribute('href', 'static/styles/dark.css')
    document.getElementById('cart-button').classList.add('inverted')
    document.getElementById('checkbox').setAttribute('checked', 'checked')
  };
  updateCartCout()

  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()
      navigateTo(e.target.href)
    };
  })
  router()
})

auth.onAuthStateChanged((firebaseUser) => {
  const sign_in_or_sign_out = document.getElementById('sign-link')

  if (firebaseUser) {
    localStorage.setItem('user', firebaseUser.multiFactor.user)
    sign_in_or_sign_out.setAttribute('href', '/sign-out')
    sign_in_or_sign_out.textContent = 'SIGN OUT'
  } else {
    localStorage.setItem('user', null)
    sign_in_or_sign_out.setAttribute('href', '/sign-in')
    sign_in_or_sign_out.textContent = 'SIGN IN'
  };
})

export default navigateTo
