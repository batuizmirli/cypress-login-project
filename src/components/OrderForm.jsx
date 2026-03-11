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
  hamur: 'İnce Kenar',
  malzemeler: [],
  ozel: '',
  adet: 1,
};

const sizePrices = {
  'Küçük': 85.5,
  'Orta': 95.5,
  'Büyük': 105.5,
};

const toppingPrice = 5;

export default function OrderForm({ onOrderSuccess, onGoHome }) {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState('');

  const nameValid = formData.isim.trim().length >= 3;
  const sizeValid = Boolean(formData.boyut);
  const toppingsValid = formData.malzemeler.length >= 4 && formData.malzemeler.length <= 10;
  const isFormValid = nameValid && sizeValid && toppingsValid;
  const basePrice = sizePrices[formData.boyut] ?? 0;
  const toppingsTotal = formData.malzemeler.length * toppingPrice;
  const totalPrice = (basePrice + toppingsTotal) * formData.adet;

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

  const handleQuantity = (step) => {
    setFormData((prev) => ({
      ...prev,
      adet: Math.max(1, prev.adet + step),
    }));
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
      <header className="page-topbar">
        <h1>Teknolojik Yemekler</h1>
        <nav className="breadcrumb breadcrumb-top" aria-label="Sayfa yolu">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              onGoHome();
            }}
          >
            Anasayfa
          </a>
          <span>-</span>
          <a href="#order-form" aria-current="page">Sipariş Oluştur</a>
        </nav>
      </header>

      <section className="order-header page-content-wrap">
        <h2>Position Absolute Acı Pizza</h2>
        <div className="price-line">
          <p className="price">85.50₺</p>
          <p className="muted">4.9</p>
          <p className="muted">(200)</p>
        </div>
        <p className="desc">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
          Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış,
          daha sonra genellikle olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen,
          genellikle yuvarlak, düzleştirilmiş maya bazlı buğday hamurundan oluşan İtalyan
          kökenli lezzetli bir yemektir.
        </p>
      </section>

      <form className="order-form page-content-wrap" onSubmit={handleSubmit}>
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

        <div className="form-group">
          <label htmlFor="hamur">Hamur Seç</label>
          <select id="hamur" name="hamur" value={formData.hamur} onChange={handleTextChange}>
            <option>İnce Kenar</option>
            <option>Klasik</option>
            <option>Kalın</option>
          </select>
        </div>

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

        <div className="bottom-row">
          <div className="qty-box" aria-label="Sipariş adedi">
            <button type="button" onClick={() => handleQuantity(-1)}>-</button>
            <span>{formData.adet}</span>
            <button type="button" onClick={() => handleQuantity(1)}>+</button>
          </div>

          <div className="total-card" data-cy="order-summary">
            <h3>Sipariş Toplamı</h3>
            <p>
              <span>Seçimler</span>
              <strong>{(toppingsTotal * formData.adet).toFixed(2)}₺</strong>
            </p>
            <p className="final-total">
              <span>Toplam</span>
              <strong>{totalPrice.toFixed(2)}₺</strong>
            </p>

            <button type="submit" disabled={!isFormValid || isSubmitting} data-cy="submit-order-btn">
              {isSubmitting ? 'Gönderiliyor...' : 'SİPARİŞ VER'}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
