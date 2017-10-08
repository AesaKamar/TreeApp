import React from 'react'
import { mount } from 'enzyme'
import Main from '../components/Main.js'

describe('<Main/>', () => {
  it('Should render the main page', () => {
    const wrapper = mount(<Main/>)
    expect(wrapper.find('#App-intro').text()).toBe('This is our app!')
    expect(wrapper.find('#App-title').text()).toBe('Ginko Family Tree')
  })
})
