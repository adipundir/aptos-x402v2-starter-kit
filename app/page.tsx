import { ThemeToggle } from "./components/ThemeToggle";
import { SocialLinks } from "./components/SocialLinks";
import WeatherClient from "./components/WeatherClient";

export default function Home() {
  return (
    <div className="page-container">
      <div className="header-controls">
        <SocialLinks />
        <ThemeToggle />
      </div>

      <main className="main-content">
        <div className="hero">
          <h1 className="title">
            APTOS x402v2 DEMO
          </h1>
          <p className="subtitle">
            Pay-per-request APIs with <strong>USDC micropayments</strong> on Aptos testnet.
          </p>
        </div>

        <WeatherClient />

        {!process.env.NEXT_PUBLIC_SENDER_PRIVATE_KEY && (
          <div className="env-warning">
            <span>MISSING ENV KEYS</span>
          </div>
        )}
      </main>
    </div>
  );
}
