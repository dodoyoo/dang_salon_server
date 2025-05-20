// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  const storeGrid = document.querySelector('.store-grid');
  storeGrid.innerHTML = '<div class="loading">데이터를 불러오는 중…</div>';
  // API에서 실제 데이터 가져오기
  fetchStores();

  // Add event listeners to filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove('filter-btn-active'));
      // Add active class to clicked button
      button.classList.add('filter-btn-active');

      // 필터에 따라 데이터 가져오거나 정렬하기
      const filterType = button.textContent.trim();
      console.log(`Filter applied: ${filterType}`);
      fetchStores(filterType);
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
      console.log(
        `Navigation: ${item.querySelector('.nav-text').textContent.trim()}`
      );
    });
  });

  // 검색 기능 구현
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      const searchText = this.value.trim();
      if (searchText) {
        searchStores(searchText);
      } else {
        fetchStores();
      }
    }
  });
});

// 실제 API에서 가게 데이터 가져오기
function fetchStores(filterType = '전체보기', page = 1, pageSize = 20) {
  console.log('Fetching stores...');

  fetch(`/api/stores?page=${page}&pageSize=${pageSize}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }
      return response.json();
    })
    .then((data) => {
      console.log('가게 데이터 받음:', data);

      let stores = data.stores;

      if (!stores || stores.length === 0) {
        showNoStoresMessage();
        return;
      }

      // 필터에 따라 데이터 정렬
      if (filterType === '리뷰순') {
        stores = stores.sort(
          (a, b) => (b.like_counts || 0) - (a.like_counts || 0)
        );
      } else if (filterType === '거리순') {
        console.log('거리순 정렬은 위치 정보가 필요합니다.');
      }

      // 가게 목록 렌더링
      renderStores(stores);
    })
    .catch((error) => {
      console.error('데이터 가져오기 에러:', error);
      showNoStoresMessage('데이터를 불러오는 중 오류가 발생했습니다.');
    });
}

// 검색 함수
function searchStores(searchText) {
  console.log(`검색: ${searchText}`);

  fetch(`/api/stores?search=${encodeURIComponent(searchText)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('검색 요청 실패');
      }
      return response.json();
    })
    .then((data) => {
      if (!data || data.length === 0) {
        showNoStoresMessage('검색 결과가 없습니다.');
        return;
      }
      renderStores(data);
    })
    .catch((error) => {
      console.error('검색 에러:', error);
      showNoStoresMessage('검색 중 오류가 발생했습니다.');
    });
}

// 가게 목록 없을 때 메시지 표시
function showNoStoresMessage(message = '표시할 가게가 없습니다.') {
  const storeGrid = document.querySelector('.store-grid');
  storeGrid.innerHTML = `<div class="no-stores-message">${message}</div>`;
}

// 가게 목록 렌더링 함수
function renderStores(stores) {
  const storeGrid = document.querySelector('.store-grid');
  storeGrid.innerHTML = ''; // 기존 내용 제거

  stores.forEach((store) => {
    const storeCard = document.createElement('div');
    storeCard.className = 'store-card';

    const imageUrl =
      store.store_images && store.store_images.length > 0
        ? store.store_images[0].image_url
        : '/images/placeholders.jpg';

    storeCard.innerHTML = `
      <img src="${imageUrl}" alt="${store.name}" class="store-image" />
      <div class="store-info">
        <h3 class="store-name">${store.name}</h3>
        <div class="store-rating">
          <i data-lucide="star" class="rating-icon"></i>
          <span>${store.like_counts || 0} likes</span>
        </div>
        <div class="store-location">
          <i data-lucide="map-pin" class="location-icon"></i>
          <span>${store.address || '위치 정보 없음'}</span>
        </div>
        <div class="store-hours">
          <i data-lucide="clock" class="hours-icon"></i>
          <span>${store.open_time} - ${store.close_time}</span>
        </div>
        <div class="store-price">
          <span class="price-label">예약 시간</span>
          <span class="price-value">${store.duration_in_minutes}분</span>
        </div>
      </div>
    `;

    // 가게 카드 클릭 이벤트 추가
    storeCard.addEventListener('click', () => {
      const storeName = store.name;
      console.log(`Clicked on store: ${storeName}`);
      // 가게 상세 페이지로 이동
      // window.location.href = `/store-details.html?id=${store.id}`;
    });

    storeGrid.appendChild(storeCard);
  });

  // Lucide 아이콘 업데이트
}
