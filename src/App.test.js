import { render, screen } from '@testing-library/react';
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get(`${process.env.REACT_APP_BACKEND_URL || ""}/api`, (req, res, ctx) => {
    return res(ctx.json({
      data: [{
        "url": "https://fake.com",
        "price": 5.99,
        "product_description": "Fake description",
        "image_urls": ["https://fake.com/demo.jpg"],
        "product_title": "Fake title",
        "currency_code": "USD"
      }],
      page: 1,
      per_page: 20,
      count: 1,
      total: 1
    }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders search screen on page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});
test('loads product info correctly', async () => {
  render(<App />);
  const productTitle = await screen.findByRole('heading');
  expect(productTitle).toHaveTextContent('Fake title');
});