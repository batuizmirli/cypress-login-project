export default function Home() {
  return (
    <>
      <header className="hero" aria-label="Pizza kampanya alanı">
        <p className="hero-brand">fırsatı kaçırma</p>
        <h1>Sıcak ve taze pizza keyfi</h1>
        <p className="hero-subtitle">Kendi pizzanı oluştur, saniyeler içinde siparişini gönder.</p>
        <a href="#order-form" className="hero-cta" data-cy="hero-order-btn" aria-label="Sipariş formuna git">
          Acıktım
        </a>
      </header>

      <section className="feature-strip" aria-label="Pizza avantajları">
        <article>
          <h3>30 Dakika Teslimat</h3>
          <p>Sıcak teslimat garantisiyle kapında.</p>
        </article>
        <article>
          <h3>Özel Hamur</h3>
          <p>Taş fırın lezzetiyle çıtır kenarlar.</p>
        </article>
        <article>
          <h3>12+ Malzeme</h3>
          <p>Kendi kombinasyonunu özgürce seç.</p>
        </article>
      </section>
    </>
  );
}
