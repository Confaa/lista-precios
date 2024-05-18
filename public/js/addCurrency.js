const createCurrency = async (e) => {
  e.preventDefault();
  const name = e.target.currencyName.value;
  const value = e.target.currencyValue.value;
  try {
    const response = await fetch('/api/currencys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ name, value }),
    });
    if (response.ok) {
      alert('MONEDA EXTRANJERA CREADA CORRECTAMENTE');
      window.location.href = '/manage-currencys';
    } else {
      alert('MONEDA EXTRANJERA NO CREADA');
    }
  } catch (error) {
    alert('ERROR AL CREAR PROVEEDOR', error);
  }
};
