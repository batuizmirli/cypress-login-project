import { useMemo, useState } from 'react';
import axios from 'axios';

const sizes = ['Küçük', 'Orta', 'Büyük'];
const toppings = [
  'Pepperoni',
  'Mısır',
  'Zeytin',
  'Mantar',
  'Biber',
  'Sosis',
  'Ananas',
  'Soğan',
  'Sucuk',
  'Mozzarella',
  'Domates',
  'Jalapeno',
];

const initialForm = {
  isim: '',
  boyut: '',
  malzemeler: [],
  ozel: '',
};

const sizePrices = {
  'Küçük': 220,
  'Orta': 280,
  'Büyük': 340,
};

const toppingPrice = 25;

export default function OrderForm({ onOrderSuccess }) {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState('');

  const nameValid = formData.isim.trim().length >= 3;
  const sizeValid = Boolean(formData.boyut);
  const toppingsValid = formData.malzemeler.length >= 4 && formData.malzemeler.length <= 10;
  const isFormValid = nameValid && sizeValid && toppingsValid;
  const basePrice = sizePrices[formData.boyut] ?? 0;
  const toppingsTotal = formData.malzemeler.length * toppingPrice;
  const totalPrice = basePrice + toppingsTotal;

  const errorText = useMemo(() => {
    if (!nameValid) return 'İsim en az 3 karakter olmalı.';
    if (!sizeValid) return 'Pizza boyutu seçmelisin.';
    if (!toppingsValid) return 'Malzemeler 4 ile 10 arasında seçilmelidir.';
    return '';
  }, [nameValid, sizeValid, toppingsValid]);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (event) => {
    setFormData((prev) => ({ ...prev, boyut: event.target.value }));
  };

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prev) => {
      if (checked) {
        if (prev.malzemeler.length >= 10) return prev;
        return { ...prev, malzemeler: [...prev.malzemeler, value] };
      }

      return {
        ...prev,
        malzemeler: prev.malzemeler.filter((item) => item !== value),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRequestError('');

    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post('https://reqres.in/api/pizza', formData, {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      });

      console.log('Sipariş özeti:', response.data);
      onOrderSuccess({
        ...response.data,
        orderPayload: formData,
        pricing: {
          basePrice,
          toppingsTotal,
          totalPrice,
        },
      });
      setFormData(initialForm);
    } catch (error) {
      setRequestError('İnternet bağlantısı veya sunucu hatası oluştu. Lütfen tekrar dene.');
      console.error('Sipariş gönderilemedi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="order-form" className="order-page">
      <section className="order-header">
        <h2>Pizza Sipariş Formu</h2>
        <p>Boyutunu seç, malzemeleri işaretle, siparişi tamamla.</p>
      </section>

      <section className="order-summary" data-cy="order-summary">
        <h3>Canlı Sipariş Özeti</h3>
        <p><strong>İsim:</strong> {formData.isim || '-'}</p>
        <p><strong>Boyut:</strong> {formData.boyut || '-'}</p>
        <p><strong>Malzemeler:</strong> {formData.malzemeler.length > 0 ? formData.malzemeler.join(', ') : '-'}</p>
        <p><strong>Not:</strong> {formData.ozel || '-'}</p>
        <p><strong>Toplam:</strong> ₺{totalPrice}</p>
      </section>

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="isim">İsim</label>
          <input
            id="isim"
            name="isim"
            type="text"
            value={formData.isim}
            onChange={handleTextChange}
            placeholder="Adını yaz"
            minLength={3}
            data-cy="name-input"
            aria-label="İsim"
            required
          />
        </div>

        <fieldset className="form-group">
          <legend>Boyut</legend>
          <div className="inline-options">
            {sizes.map((size) => (
              <label key={size} htmlFor={`size-${size}`}>
                <input
                  id={`size-${size}`}
                  type="radio"
                  name="boyut"
                  value={size}
                  checked={formData.boyut === size}
                  onChange={handleSizeChange}
                  data-cy="size-option"
                />
                {size}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="form-group">
          <legend>Malzemeler (4-10 arası)</legend>
          <div className="toppings-grid">
            {toppings.map((topping) => (
              <label key={topping} htmlFor={`topping-${topping}`}>
                <input
                  id={`topping-${topping}`}
                  type="checkbox"
                  value={topping}
                  checked={formData.malzemeler.includes(topping)}
                  onChange={handleToppingChange}
                  data-cy="topping-option"
                  disabled={!formData.malzemeler.includes(topping) && formData.malzemeler.length >= 10}
                />
                {topping}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-group">
          <label htmlFor="ozel">Notlar</label>
          <textarea
            id="ozel"
            name="ozel"
            value={formData.ozel}
            onChange={handleTextChange}
            rows={4}
            placeholder="Eklemek istediğin notları yazabilirsin"
            data-cy="notes-input"
          />
        </div>

        {!isFormValid && <p className="form-error" data-cy="validation-error">{errorText}</p>}
        {requestError && <p className="form-error">{requestError}</p>}

        <button type="submit" disabled={!isFormValid || isSubmitting} data-cy="submit-order-btn">
          {isSubmitting ? 'Gönderiliyor...' : 'Sipariş Ver'}
        </button>
      </form>
    </main>
  );
}
