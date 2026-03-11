export default function Home({ onStartOrder }) {
  return (
    <main id="home" className="home-page">
      <header className="home-hero" aria-label="Pizza kampanya alanı">
        <img src="/iteration-1-images/logo.svg" alt="Teknolojik Yemekler logosu" className="hero-logo" />
        <p className="hero-brand">lezzetin yolda</p>
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

      <section className="home-categories" aria-label="Kategori listesi">
        <article>YENİ! Kore</article>
        <article>Pizza</article>
        <article>Burger</article>
        <article>Kızartmalar</article>
        <article>Fast food</article>
        <article>Gazlı İçecek</article>
      </section>
    </main>
  );
}
