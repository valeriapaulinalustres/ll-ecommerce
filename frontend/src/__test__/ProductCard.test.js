import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductsContext from '../context/ProductsContext';
import ProductCard from '../components/productCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    
        category: 'Anuales',
        code: 'z1',
        description: 'Zinnia roja',
        id: '123',
        price: 200,
        status: true,
        stock: 10,
        thumbnails: 'https://loremflickr.com/640/480',
        title: 'Zinnia',
      
  };

  const mockGetProductById = jest.fn();
  const mockSetProductToEdit = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <ProductsContext.Provider
          value={{
            getProductById: mockGetProductById,
            setProductToEdit: mockSetProductToEdit,
          }}
        >
    
            <ProductCard product={mockProduct} />
       
        </ProductsContext.Provider>
      </BrowserRouter>
    );
  });

  it('renders product details correctly', () => {
    const titleElement = screen.getByText('Zinnia');
    const descriptionElement = screen.getByText('Zinnia roja');
    const priceElement = screen.getByText('Precio: $200');
    const buttonElement = screen.getByRole('button', { name: 'Ver detalles' });

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls getProductById and navigate when button is clicked', () => {
    const buttonElement = screen.getByRole('button', { name: 'Ver detalles' });

    fireEvent.click(buttonElement);

    expect(mockSetProductToEdit).toHaveBeenCalledWith(mockProduct);
    expect(mockGetProductById).toHaveBeenCalledWith(mockProduct.id);
   expect(mockNavigate).toHaveBeenCalledWith('/product');
  });
});
