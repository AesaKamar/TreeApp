import React from 'react'
import { mount } from 'enzyme'
import App from '../App.js'
import { MemoryRouter } from 'react-router'

describe('<App/>', () => {
  it('Should render the main page', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(wrapper).toBeTruthy()
  })
})
