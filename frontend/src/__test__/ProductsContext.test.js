import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ProductsProvider } from '../context/ProductsContext';
import { base_URL } from '../utils/mainRoute';
import { getProducts } from '../context/ProductsContext'; // Importa la función getProducts desde el contexto

const server = setupServer(
  rest.get(`${base_URL}/api/products`, (req, res, ctx) => {
    const responseData = {
      response: {
        products: [
          {
            category: 'Anuales',
            code: 'z1',
            description: 'Zinnia roja',
            id: '123',
            price: 200,
            status: true,
            stock: 10,
            thumbnails: 'https://loremflickr.com/640/480',
            title: 'Zinnia',
          },
          {
            category: 'Árboles',
            code: 'ar1',
            description: 'Eucaliptus',
            id: '124',
            price: 2000,
            status: true,
            stock: 10,
            thumbnails: 'https://loremflickr.com/640/480',
            title: 'Eucaliptus',
          },
        ],
        totalPages: 2,
      },
    };
    return res(ctx.json(responseData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getProducts', () => {
  it('fetches and sets products data correctly', async () => {
    render(
      <ProductsProvider>
        <div>
          <button onClick={() => getProducts()}>Load Products</button>
          <span data-testid="product-count"></span>
        </div>
      </ProductsProvider>
    );

    const loadButton = screen.getByRole('button', { name: 'Load Products' });
    loadButton.click();


    await waitFor(() => {
      const productCountElement = screen.getByTestId('product-count');
      expect(productCountElement).not.toHaveTextContent(''); // Verifica que el elemento no esté vacío
    });

    const productCountElement = screen.getByTestId('product-count');
    expect(productCountElement.textContent).toEqual('2');
  });
});
