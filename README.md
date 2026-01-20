# Aptos x402v2 Demo

A high-performance demonstration of **Aptos x402v2** (Pay-per-request API protocol) using USDC micropayments on Aptos Testnet.

## Overview

This repository demonstrates how to integrate the `aptos-x402` protocol to protect API endpoints with on-chain payments. Users pay a small amount of USDC for each request, which is then verified by the backend before releasing the data.

### Features

- **Micropayments**: Native USDC payments on Aptos for API access.
- **Protected Routes**: Secure Next.js API routes protected by `aptos-x402`.
- **Client-Side Automation**: Uses `aptos-x402` client SDK to handle payment flows seamlessly.

## Getting Started

### Prerequisites

- Node.js 18+
- Two Aptos wallets on Testnet:
  - **Sender wallet**: Must have USDC for making payments (APT not required as transactions are sponsored)
  - **Receiver wallet**: For receiving payments

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SENDER_PRIVATE_KEY=your_testnet_private_key
NEXT_PUBLIC_NETWORK=testnet
```



### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

1. **Client**: Initiates a request to a protected endpoint without payment.
2. **Server**: Returns a `402 Payment Required` status with payment specifications.
3. **Client**: The `aptos-x402` library automatically retries the request with a signed transaction in the header.
4. **Server**: Verifies and settles the transaction through the facilitator (which sponsors gas fees).
5. **Server**: After successful payment verification, returns the requested data (e.g., Weather Data).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Blockchain**: [Aptos](https://aptos.dev/)
- **Protocol**: [aptos-x402](https://www.npmjs.com/package/aptos-x402)
- **Styling**: Vanilla CSS / Tailwind CSS

## License

MIT
