const searchProduct = (e) => {
  e.preventDefault();
  const filter = e.target.filter.value;
  console.log(filter);
  if (filter) {
    window.location.href = `/list-products?filter=${filter}`;
  } else {
    window.location.href = `/list-products`;
  }
};

const limitChange = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;
  const limit = e.target.value;

  const searchParams = new URLSearchParams(search);
  searchParams.set("limit", limit);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const sortPrice = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const sort = e.target.value;

  const searchParams = new URLSearchParams(search);
  if (!sort) {
    searchParams.delete("sort");
    window.location.href = `${pathname}?${searchParams.toString()}`;
    return;
  }
  searchParams.set("sort", sort);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const filterBrand = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const brand = e.target.brand.value;

  const searchParams = new URLSearchParams(search);
  searchParams.set("brand", brand);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const deleteFilterBrand = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;
  const searchParams = new URLSearchParams(search);
  searchParams.delete("brand");
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const input = document.getElementById("inputSearch");

document.addEventListener("keydown", function (e) {
  let key = e.key;

  if (['Backspace', 'Enter', 'Escape'].includes(key)) {
    e.preventDefault();
  }

  if (e.ctrlKey) {
    if (key === 'c' || key === 'C') {
      return;
    }
    if (key === 'v' || key === 'V') {
      return;
    }
  }

  switch (key) {
    case 'Backspace':
      input.value = input.value.slice(0, -1);
      break;
    case 'Enter':
      window.location.href = `/list-products?filter=${input.value}`;
      break;
    case 'Escape':
      input.value = "";
      break;
    case 'Control':
    case 'Alt':
    case 'Shift':
    case 'CapsLock':
    case 'Tab':
    case 'Meta':
      break;
    default:
      if (key.length === 1 && !e.ctrlKey) {
        input.value += key;
      }
      break;
  }
});
