import {render, screen} from '@testing-library/react'
import LeftNav from '../LeftNav'
import React from 'react'

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

describe('With React Testing Library', () => {
    const initialState = {output:10}
    const mockStore = configureStore()
    let store,wrapper
  
    it('Shows "Hello world!"', () => {
      store = mockStore(initialState)
      const { getByText } = render(<Provider store={store}><LeftNav /></Provider>)
  
      expect(getByText('Educations')).not.toBeNull()
    })
  })