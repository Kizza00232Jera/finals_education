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
  const leftnavElement = screen.getAllByRole('button');
  expect(leftnavElement.length).not.toBe(0);
})

test('should render logo', () => {
    render(<MockLeftNav/>)
    const logoElement = screen.getByRole("img");
    expect(logoElement).toBeInTheDocument();
  })

it("should render user info", () => {
    render(<MockLeftNav/>)
    const activeElement = screen.getByText(/current user/i);
    expect(activeElement).toBeInTheDocument();
})
  