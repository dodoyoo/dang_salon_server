// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // Add event listeners to filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove('filter-btn-active'));
      // Add active class to clicked button
      button.classList.add('filter-btn-active');

      // Here you would typically filter the store list
      // For now, we'll just log the filter that was clicked
      console.log(`Filter applied: ${button.textContent.trim()}`);
    });
  });

  // Add event listeners to nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      navItems.forEach((nav) => nav.classList.remove('nav-item-active'));
      // Add active class to clicked item
      item.classList.add('nav-item-active');

      // Here you would typically navigate to a different page or section
      // For now, we'll just log the nav item that was clicked
      console.log(
        `Navigation: ${item.querySelector('.nav-text').textContent.trim()}`
      );
    });
  });

  // Add event listeners to store cards
  const storeCards = document.querySelectorAll('.store-card');
  storeCards.forEach((card) => {
    card.addEventListener('click', () => {
      const storeName = card.querySelector('.store-name').textContent;
      console.log(`Clicked on store: ${storeName}`);
      // Here you would typically navigate to the store details page
      // window.location.href = `/store-details.html?name=${encodeURIComponent(storeName)}`;
    });
  });
});

// Simulating API call for stores (in a real app this would be a fetch call)
function fetchStores() {
  // In a real app, you'd replace this with an actual API call
  console.log('Fetching stores...');

  // Simulated successful response
  // In a real app, this would be the data from your API
  const stores = [
    {
      id: 1,
      name: '멍멍이 살롱',
      rating: 4.8,
      reviews: 123,
      location: '서울시 강남구',
      hours: '10:00 - 20:00',
      priceLabel: '소형견 기준',
      price: '50,000원~',
    },
    {
      id: 2,
      name: '댕댕이 뷰티샵',
      rating: 4.7,
      reviews: 98,
      location: '서울시 서초구',
      hours: '09:00 - 19:00',
      priceLabel: '소형견 기준',
      price: '45,000원~',
    },
    // Add more store data as needed
  ];

  return stores;
}
