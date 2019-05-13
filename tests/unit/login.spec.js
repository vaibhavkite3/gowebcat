import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

Vue.use(Vuex)

describe('Login', () => {
  let store
  let actions
  let state

  beforeEach(() => {
    state = { data: {} }
    actions = {
      AUTH_REQUEST: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions
    })
  })

  it('Test for Login form data entry', () => {
    const wrapper = shallowMount(Login, {
      store
    })

    wrapper.vm.username = 'Test'
    wrapper.vm.password = 'Test'

    wrapper.find('button').trigger('click')

    expect(actions.AUTH_REQUEST.mock.calls).toHaveLength(1)
  })
})
