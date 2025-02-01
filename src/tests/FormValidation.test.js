import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonalInfo from '../components/forms/PersonalInfo';
import SmallClaimsDetails from '../components/forms/SmallClaimsDetails';

describe('Form Validation Tests', () => {
  test('PersonalInfo form shows validation errors for empty fields', async () => {
    render(<PersonalInfo />);
    
    // Find submit button and click it
    const submitButton = screen.getByRole('button', { name: /submit|next/i });
    fireEvent.click(submitButton);
    
    // Check for validation error messages
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });
  
  test('SmallClaimsDetails form handles valid input correctly', () => {
    render(<SmallClaimsDetails />);
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/claim amount/i), {
      target: { value: '5000' },
    });
    
    fireEvent.change(screen.getByLabelText(/claim description/i), {
      target: { value: 'Test claim description' },
    });
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit|next/i });
    fireEvent.click(submitButton);
    
    // Check that no validation errors are shown
    expect(screen.queryByText(/amount is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/description is required/i)).not.toBeInTheDocument();
  });
});
