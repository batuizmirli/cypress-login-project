export default function OrderConfirmation({ orderResponse, onCreateNewOrder }) {
  const orderPayload = orderResponse.orderPayload ?? {};
  const pricing = orderResponse.pricing ?? {};

  return (
    <main className="confirmation" data-cy="order-confirmation">
      <h2 data-cy="order-confirmation-title">Sipariş Alındı 🎉</h2>
      <p>Siparişin başarıyla kaydedildi.</p>
      <div className="confirmation-card">
        <p><strong>Sipariş ID:</strong> {orderResponse.id ?? 'N/A'}</p>
        <p><strong>Oluşturulma:</strong> {orderResponse.createdAt ?? 'N/A'}</p>
        <p><strong>Müşteri:</strong> {orderPayload.isim ?? 'N/A'}</p>
        <p><strong>Boyut:</strong> {orderPayload.boyut ?? 'N/A'}</p>
        <p><strong>Malzeme Adedi:</strong> {orderPayload.malzemeler?.length ?? 0}</p>
        <p><strong>Toplam:</strong> ₺{pricing.totalPrice ?? 0}</p>
      </div>
      <div className="confirmation-raw">
        <h3>Axios Yanıtı</h3>
        <pre data-cy="response-json">{JSON.stringify(orderResponse, null, 2)}</pre>
      </div>
      <button type="button" onClick={onCreateNewOrder}>
        Yeni Sipariş Oluştur
      </button>
    </main>
  );
}
