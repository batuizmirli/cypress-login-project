export default function OrderConfirmation({ orderResponse, onCreateNewOrder, onGoHome }) {
  return (
    <main id="order-confirmation" className="confirmation simple-success" data-cy="order-confirmation">
      <img src="/iteration-1-images/logo.svg" alt="Teknolojik Yemekler logosu" className="success-logo" />
      <h2 className="page-content-wrap" data-cy="order-confirmation-title">TEBRİKLER! SİPARİŞİNİZ ALINDI!</h2>
      <pre data-cy="response-json" className="sr-only">{JSON.stringify(orderResponse, null, 2)}</pre>
      <div className="success-actions">
        <button type="button" onClick={onGoHome}>Anasayfa</button>
        <button type="button" onClick={onCreateNewOrder}>Yeni Sipariş</button>
      </div>
    </main>
  );
}
