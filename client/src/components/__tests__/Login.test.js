import { render, screen, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';
import { store } from '../../app/store';
import '@testing-library/jest-dom'



test('should render leftnav', () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
    </Provider>)
  const leftnavElement = screen.getByTestId('123');
  expect(leftnavElement).toBeInTheDocument();
})

test('should render leftnav2', () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
    </Provider>)
  const leftnavElement = screen.getByText(/forgot password/i);
  expect(leftnavElement).toBeInTheDocument();
})