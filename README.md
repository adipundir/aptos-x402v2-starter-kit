# Aptos x402v2 Demo

A high-performance demonstration of **Aptos x402v2** (Pay-per-request API protocol) using USDC micropayments on Aptos Testnet.

## Overview

This repository demonstrates how to integrate the `aptos-x402` protocol to protect API endpoints with on-chain payments. Users pay a small amount of USDC for each request, which is then verified by the backend before releasing the data.

### Features

- **Micropayments**: Native USDC payments on Aptos for API access.
- **Protected Routes**: Secure Next.js API routes protected by `aptos-x402`.
- **Modern UI**: Built with Next.js 15, Tailwind CSS, and `next-themes` for a premium dark mode experience.
- **Client-Side Automation**: Uses `aptos-x402` client SDK to handle payment flows seamlessly.

## Getting Started

### Prerequisites

- Node.js 18+
- An Aptos wallet with Testnet USDC (or a private key for automation)

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SENDER_PRIVATE_KEY=your_testnet_private_key
NEXT_PUBLIC_NETWORK=testnet
```

> [!IMPORTANT]
> For this demo, we use a sender private key client-side to automate the payment flow for testing. In a production app, this would be handled by a user's wallet.

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

1. **Client**: Initiates a request to a protected endpoint.
2. **Server**: Returns a `402 Payment Required` status with a payment challenge.
3. **Client**: Executes the USDC transfer on Aptos Testnet.
4. **Client**: Re-submits the request with the transaction hash.
5. **Server**: Verifies the transaction on-chain and returns the data (e.g., Weather Data).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Blockchain**: [Aptos](https://aptos.dev/)
- **Protocol**: [aptos-x402](https://www.npmjs.com/package/aptos-x402)
- **Styling**: Vanilla CSS / Tailwind CSS

## License

MIT
