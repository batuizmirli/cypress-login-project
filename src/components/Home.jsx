export default function Home({ onStartOrder }) {
  return (
    <main id="home" className="home-page">
      <header className="home-hero" aria-label="Pizza kampanya alanı">
        <img src="/iteration-1-images/logo.svg" alt="Teknolojik Yemekler logosu" className="hero-logo" />
        <h1>KOD ACIKTIRIR PİZZA, DOYURUR</h1>
        <a
          href="#order-form"
          className="hero-cta"
          data-cy="hero-order-btn"
          aria-label="Sipariş formuna git"
          onClick={(event) => {
            event.preventDefault();
            onStartOrder();
          }}
        >
          ACIKTIM
        </a>
      </header>
    </main>
  );
}
