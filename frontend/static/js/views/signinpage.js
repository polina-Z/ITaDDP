/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import AbstractView from './abstractview.js'
import { auth, googleProvider } from '../firebase/firebase.init.js'
import navigateTo from '../index.js'
import { createUserProfileDocument } from '../firebase/firebase.utils.js'

export default class SignInAndSignUpPage extends AbstractView {
  constructor (params) {
    super(params)
  };

  async addHandlers () {
    const sign_in_form = document.getElementById('sign-in-form')
    const sign_up_form = document.getElementById('sign-up-form')
    const sign_in_error = document.getElementById('sign-in-error')
    const sign_up_error = document.getElementById('sign-up-error')
    const sign_in_error_item = localStorage.getItem('sign-in-error')
    const sign_up_error_item = localStorage.getItem('sign-up-error')
    if (sign_in_error_item) {
      sign_in_error.textContent = sign_in_error_item
      sign_in_error.classList.remove('hidden')
      sign_in_form.reset()
    };

    if (sign_up_error_item) {
      sign_up_error.textContent = sign_up_error_item
      sign_up_error.classList.remove('hidden')
      sign_up_form.reset()
    };

    sign_in_form.addEventListener('submit', async e => {
      e.preventDefault()
      const email = sign_in_form['email-input-sign-in'].value
      const password = sign_in_form['password-input-sign-in'].value
      await auth.signInWithEmailAndPassword(email, password).then(() => {
        console.log('User successfully logged in')
        localStorage.setItem('sign-in-error', '')
        localStorage.setItem('sign-up-error', '')
        navigateTo('/')
      }).catch((error) => {
        const errorMessage = error.message
        console.error(errorMessage)
        localStorage.setItem('sign-in-error', errorMessage)
        navigateTo('/sign-in')
      })
    }
    )

    sign_up_form.addEventListener('submit', async e => {
      e.preventDefault()
      const display_name = sign_up_form['name-input-sign-up'].value
      const email = sign_up_form['email-input-sign-up'].value
      const password = sign_up_form['password-input-sign-up'].value
      const confirm_password = sign_up_form['confirm-password-sign-up'].value

      if (password !== confirm_password) {
        localStorage.setItem('sign-up-error', "Passwords don't match")
        console.error("Passwords don't match")
        navigateTo('/sign-in')
        return
      };

      let user
      await auth.createUserWithEmailAndPassword(
        email,
        password
      ).then(async (userCredential) => {
        user = userCredential.user
        await createUserProfileDocument(user, { displayName: display_name }).then(() => {
          console.log('User successfully created and logged in')
          navigateTo('/')
          localStorage.setItem('sign-up-error', '')
          localStorage.setItem('sign-in-error', '')
        }).catch((error) => {
          const errorMessage = error.message
          localStorage.setItem('sign-up-error', errorMessage)
          console.error(errorMessage)
          navigateTo('/sign-in')
        })
      }).catch((error) => {
        const errorMessage = error.message
        localStorage.setItem('sign-up-error', errorMessage)
        console.error(errorMessage)
        navigateTo('/sign-in')
      })
    })

    document.getElementById('google-sign-in').addEventListener('click', () => {
      auth.signInWithPopup(googleProvider).then(() => {
        console.log('User successfully logged in')
      }).catch((error) => {
        const errorMessage = error.message
        localStorage.setItem('sign-in-error', errorMessage)
        console.error(errorMessage)
        navigateTo('/sign-in')
      })
    })
  };

  async getHtml () {
    return `
            <div class="sign-in-and-sign-up">
                <div class='sign-in'>
                    <h2>I already have an account</h2>
                    <span>Sign in with your email and password</span>
                    <span id="sign-in-error" class="form-input-error hidden">error</span>
                    <form id="sign-in-form">
                        <div class="group">
                            <label class="form-input-label" for='email-input-sign-in'>Email</label>
                            <input 
                                id="email-input-sign-in"
                                class="form-input" 
                                name='email'
                                type='email'
                                required />

                        </div>
                        <div class="group">
                            <label class="form-input-label" for='password-input-sign-in'>Password</label>
                            <input 
                                id="password-input-sign-in"
                                class="form-input" 
                                name='password'
                                type='password'
                                required />

                        </div>
                        <div class="buttons">
                            <button type="submit" class="custom-button">SIGN IN</button>
                            <button id="google-sign-in" type="button" class="custom-button google-sign-in">SIGN IN WITH GOOGLE</button>
                        </div>
                    </form>
                </div>

                <div class='sign-up'>
                    <h2 class='title'>I do not have an account</h2>
                    <span>Sign up with your email and password</span>
                    <span id="sign-up-error" class="form-input-error hidden">error</span>
                    <form id="sign-up-form" class='sign-up-form'>
                        <div class="group">
                            <label class="form-input-label" for='name-input-sign-up'>Display Name</label>
                            <input 
                                id="name-input-sign-up"
                                class="form-input" 
                                name='displayName'
                                type='text'
                                required />

                        </div>

                        <div class="group">
                            <label class="form-input-label" for='email-input-sign-up'>Email</label>
                            <input 
                                id="email-input-sign-up"
                                class="form-input" 
                                name='email'
                                type='email'
                                required />

                        </div>
                        <div class="group">
                            <label class="form-input-label" for='password-input-sign-up'>Password</label>
                            <input 
                                id="password-input-sign-up"
                                class="form-input" 
                                name='passwors'
                                type='password'
                                required />

                        </div>
                        <div class="group">
                            <label class="form-input-label" for='confirm-password-sign-up'>Confirm Password</label>
                            <input 
                                id="confirm-password-sign-up"
                                class="form-input" 
                                name='confirmPassword'
                                type='password'
                                required />

                        </div>
                        <button type="submit" class="custom-button">SIGN UP</button>
                    </form>
                </div>
            </div>
        `
  };
}
