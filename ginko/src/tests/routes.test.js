import React from 'react'
import { mount } from 'enzyme'
import App from '../components/App.js'
import { MemoryRouter } from 'react-router'
import NotFoundView from '../views/NotFoundView'
import PeopleView from '../views/PeopleView'
import LoginView from '../views/LoginView'
import ProfileView from '../views/ProfileView'

describe('<App/>', () => {
  it('Should render the main page', () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={['/']}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    )
    expect(wrapper).toBeTruthy()
  })
  it('Should show a not found view with an invalid path', () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={['/abc']}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    )
    expect(wrapper.find(NotFoundView)).toHaveLength(1)
  }
  )
  it('Should render a people view', () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={['/people']}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    )
    expect(wrapper.find(PeopleView)).toHaveLength(1)
  }
  )
  it('Should render a login view', () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={['/login']}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    )
    expect(wrapper.find(LoginView)).toHaveLength(1)
  }
  )
  it('Should render a profile view', () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={['/profile']}
        initialIndex={1}
      >
        <App />
      </MemoryRouter>
    )
    expect(wrapper.find(ProfileView)).toHaveLength(1)
  }
  )
})
