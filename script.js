console.log("script loaded");

document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartCountSpan = document.getElementById('cart-count');

  function updateCartCount() {
    let totalQty = 0;
    cart.forEach(item => totalQty += item.quantity);
    if (cartCountSpan) {
      cartCountSpan.textContent = totalQty;
    }
  }

  updateCartCount();

  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const productCard = button.closest('.product-card');
      const name = productCard.querySelector('h3').textContent;
      const price = parseFloat(productCard.querySelector('.price').textContent.replace('₹', ''));
      const image = productCard.querySelector('img').getAttribute('src');

      // ✅ Add only the clicked product
      const existingIndex = cart.findIndex(item => item.name === name);
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();

      // ✅ Redirect to cart page
      window.location.href = "cart.html";
    });
  });
});
