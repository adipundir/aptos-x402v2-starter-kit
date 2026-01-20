import { paymentMiddleware } from 'aptos-x402';

export const proxy = paymentMiddleware(
  process.env.RECEIVER_ADDRESS!, // Your wallet that receives USDC payments
  {
    '/api/protected/weather': {
      price: '1000', // 0.001 USDC (6 decimals)
      network: 'aptos:2', // testnet
      asset: '0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832', // USDC testnet
      sponsored: true, // Facilitator pays gas fees
    }
  },
  { url: 'https://aptos-x402.org/api/facilitator' } // Public facilitator
);

export const config = {
  matcher: ['/api/protected/:path*']
};
