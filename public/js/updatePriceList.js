const selectSupplier = (e) => {
  e.preventDefault();
  const supplier = e.target.value;
  window.location.href = `/update-prices-list?sid=${supplier}`;
};

const selectItem = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const item = e.target.value;
  const searchParams = new URLSearchParams(search);
  searchParams.set('item', item);
  searchParams.delete('sub_item');
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const selectSubItem = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const subItem = e.target.value;
  const searchParams = new URLSearchParams(search);
  searchParams.set('sub_item', subItem);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const updatePrice = async (e) => {
  e.preventDefault();

  const userConfirmed = await showModalConfirmation();

  if (!userConfirmed) {
    document.getElementById('textNotification').innerText =
      'Actualización de precios cancelada';
    showToast();
    return;
  }
  const { search } = window.location;
  const percentage = e.target.percentage.value;
  const adjustment_type = e.target.adjustment_type.value;

  try {
    const response = await fetch(`/api/products${search}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ percentage, adjustment_type }),
    });

    if (response.ok) {
      document.getElementById('textNotification').innerText =
        'Precios actualizados correctamente';
      showToast();
    } else {
      document.getElementById('textNotification').innerText =
        'Precios no actualizados';
      showToast();
    }
  } catch (error) {
    document.getElementById('textNotification').innerText =
      'Price update failed due to an error';
    showToast();
  }
};

const showModalConfirmation = () => {
  return new Promise((resolve) => {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('hidden');

    document.getElementById('confirmBtn').onclick = () => {
      modal.classList.add('hidden');
      resolve(true);
    };

    document.getElementById('cancelBtn').onclick = () => {
      modal.classList.add('hidden');
      resolve(false);
    };
  });
};

const showToast = () => {
  const toast = document.getElementById('toast');
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 5000);
};

const closeToast = () => {
  const closeButton = document.querySelector('[data-dismiss-target]');
  closeButton.addEventListener('click', function () {
    const target = this.getAttribute('data-dismiss-target');
    document.querySelector(target).classList.add('hidden');
  });
};

closeToast();
