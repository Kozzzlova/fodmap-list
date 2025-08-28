let productsData = {};

// Fetch data from JSON
fetch('./list.json')
  .then((res) => res.json())
  .then((data) => {
    productsData = data.products;

    const productsList = document.getElementById('productsList');
    const searchInput = document.getElementById('search');

    const cache = {};

    const renderList = (items) => {
      productsList.innerHTML = '';
      for (const { name, status } of items) {
        const li = document.createElement('li');
        li.classList.add('product-item');

        if (status === 'forbidden') {
          li.classList.add('red');
        }
        li.textContent = `${name}`;
        productsList.appendChild(li);
      }
    };

    const filterProducts = (query) => {
      if (cache[query]) {
        return cache[query];
      }
      const result = productsData.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      cache[query] = result;
      return result;
    };

    searchInput.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase().trim();
      if (value === '') {
        renderList(productsData);
      } else {
        const filtered = filterProducts(value);
        renderList(filtered);
      }
    });

    renderList(productsData);
  })
  .catch((err) => console.error('Failed to load JSON', err));
