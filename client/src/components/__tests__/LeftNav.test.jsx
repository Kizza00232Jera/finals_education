import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import '@testing-library/jest-dom'
import LeftNav from '../LeftNav';

const MockLeftNav = () => {
    return (
        <Provider store={store}>
    <BrowserRouter>
        <LeftNav/>
    </BrowserRouter>
    </Provider>
        
    )
}

test('should render leftnav', () => {
  render(<MockLeftNav/>)
  const leftnavElement = screen.getByTestId('1234');
  expect(leftnavElement).toBeInTheDocument();
})

