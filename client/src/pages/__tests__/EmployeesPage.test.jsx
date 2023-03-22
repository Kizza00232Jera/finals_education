import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import '@testing-library/jest-dom';
import EmployeesPage from '../EmployeesPage';



const MockEmployeesPage = () => {
    return (
        <Provider store={store}>
    <BrowserRouter>
        <EmployeesPage/>
    </BrowserRouter>
    </Provider>
        
    )
}




it("should render employee", async () => {
    render(<MockEmployeesPage/>);
    const activeElement = await screen.findByText(/employees/i);
    expect(activeElement).toBeInTheDocument();
})
  

  