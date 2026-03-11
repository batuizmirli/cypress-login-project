describe('Pizza Sipariş Formu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('inputa metin girer', () => {
    cy.get('[data-cy="name-input"]').type('Batu');
    cy.get('[data-cy="name-input"]').should('have.value', 'Batu');
  });

  it('birden fazla malzeme seçebilir', () => {
    cy.contains('label', 'Pepperoni').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Mısır').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Zeytin').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Mantar').find('[data-cy="topping-option"]').check();

    cy.get('[data-cy="topping-option"]:checked').should('have.length', 4);
  });

  it('formu başarıyla gönderir', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', {
      statusCode: 201,
      body: {
        id: 'pizza-101',
        createdAt: '2026-03-11T12:00:00.000Z',
      },
    }).as('createPizza');

    cy.get('[data-cy="name-input"]').type('Batu');
    cy.contains('label', 'Büyük').find('[data-cy="size-option"]').check();

    cy.contains('label', 'Pepperoni').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Mısır').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Zeytin').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Mantar').find('[data-cy="topping-option"]').check();

    cy.get('[data-cy="notes-input"]').type('Kapıya bırakabilirsiniz.');
    cy.get('[data-cy="submit-order-btn"]').should('not.be.disabled').click();

    cy.wait('@createPizza');
    cy.get('[data-cy="order-confirmation-title"]').should('be.visible');
    cy.get('[data-cy="response-json"]').should('contain', 'pizza-101');
  });

  it('eksik malzemede butonu disabled tutar', () => {
    cy.get('[data-cy="name-input"]').type('Batu');
    cy.contains('label', 'Orta').find('[data-cy="size-option"]').check();
    cy.contains('label', 'Pepperoni').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Mısır').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Zeytin').find('[data-cy="topping-option"]').check();

    cy.get('[data-cy="submit-order-btn"]').should('be.disabled');
    cy.get('[data-cy="validation-error"]').should('be.visible');
  });

  it('ağ hatasında kullanıcıya uyarı gösterir', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', {
      forceNetworkError: true,
    }).as('createPizzaFail');

    cy.get('[data-cy="name-input"]').type('Batu');
    cy.contains('label', 'Büyük').find('[data-cy="size-option"]').check();

    cy.contains('label', 'Pepperoni').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Mısır').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Zeytin').find('[data-cy="topping-option"]').check();
    cy.contains('label', 'Mantar').find('[data-cy="topping-option"]').check();

    cy.get('[data-cy="submit-order-btn"]').click();
    cy.wait('@createPizzaFail');
    cy.contains('İnternet bağlantısı veya sunucu hatası oluştu. Lütfen tekrar dene.').should('be.visible');
  });
});
