import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsContext from '../context/ProductsContext';
import Home from '../views/home/Home';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { base_URL } from '../utils/mainRoute';


//Mock server, ayuda a probar la ruta y la función getProducts
let mockedProducts;
const server = setupServer(
    rest.get(`${base_URL}/api/products`, (req, res, ctx) => {
      const responseData = {
        response: {
            message: 'Productos encontrados',
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
      console.log('-------------------', responseData)
      return res(ctx.json(responseData));
    })
  );

  beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock del context
const mockProductsContext = {
  allProductsFromBack: [
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
  ],
  getProducts: jest.fn(),
  pageCount: 3,
  setPageCount: jest.fn(),
  page: 1,
  setPage: jest.fn(),
};

// Renderiza el componente Home con el contexto mockeado
const renderHome = () => {
  return render(
    <BrowserRouter>
    <ProductsContext.Provider value={mockProductsContext}>
      <Home />
    </ProductsContext.Provider>
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  it('renders product cards', () => {
    renderHome();
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(mockProductsContext.allProductsFromBack.length);
  });

  it('calls getProducts when page changes', () => {
    renderHome();
    const nextPageButton = screen.getByTestId('btn-next');
    userEvent.click(nextPageButton);
    expect(mockProductsContext.getProducts).toHaveBeenCalledWith(1);
  });
});

describe('getProducts', () => {
    test('render a list of products', async()=>{
        renderHome();
       const products = await screen.findAllByTestId('product-card')
       expect(products).toHaveLength(1)
    })
   });
   
