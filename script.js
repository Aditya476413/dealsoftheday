document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and script running');
    const hamburgerToggle = document.getElementById('hamburgerToggle');
    const sidebar = document.getElementById('sidebar');
    const searchIcon = document.getElementById('searchIcon');
    const navbarSearchInput = document.getElementById('navbarSearchInput');
    const dealsList = document.getElementById('dealsList');
    const productCards = document.getElementById('productCards');
    console.log({ hamburgerToggle, sidebar, searchIcon, navbarSearchInput, dealsList, productCards });

    hamburgerToggle.addEventListener('click', () => {
        sidebar.classList.add('sidebar-visible');
        hamburgerToggle.classList.add('hide');
    });

    function isMobile() {
        return window.innerWidth <= 480;
    }

    searchIcon.addEventListener('click', () => {
        if (isMobile()) {
            searchIcon.classList.add('hide-mobile');
        } else {
            searchIcon.style.display = 'none';
        }
        navbarSearchInput.classList.add('active');
        navbarSearchInput.focus();
    });

    navbarSearchInput.addEventListener('blur', () => {
        navbarSearchInput.classList.remove('active');
        if (isMobile()) {
            searchIcon.classList.remove('hide-mobile');
        } else {
            searchIcon.style.display = 'inline-block';
        }
    });

    // Populate deals as a list
    const deals = [
        { value: 'home', label: 'Home' },
        { value: 'phonefinder', label: 'Phone Finder' },
        { value: 'laptops', label: 'Laptops' },
        { value: 'tvdeals', label: 'Tv Deals' },
        { value: 'blog', label: 'Blog' },
        { value: 'deals', label: 'Deals' },
        { value: 'amazon', label: 'Amazon' },
        { value: 'flipkart', label: 'Flipkart' },
        { value: 'freebiescontest', label: 'Freebies & Contest' }
    ];

    deals.forEach(deal => {
        const li = document.createElement('li');
        li.textContent = deal.label;
        li.dataset.value = deal.value;
        dealsList.appendChild(li);
        console.log('Appended deal:', deal.label);
    });

    // Add close button as last list item
    const closeLi = document.createElement('li');
    closeLi.innerHTML = '&times;';
    closeLi.className = 'close-btn';
    closeLi.id = 'closeSidebar';
    closeLi.title = 'Close Sidebar';
    dealsList.appendChild(closeLi);
    console.log('Appended close button');

    closeLi.addEventListener('click', () => {
        sidebar.classList.remove('sidebar-visible');
        hamburgerToggle.classList.remove('hide');
    });

    // Add product cards
    const products = [
        {
            name: 'iPhone 14 Pro',
            img: 'https://dummyimage.com/300x200/eee/333&text=iPhone+14+Pro',
            link: 'https://www.apple.com/in/iphone-14-pro/',
            category: 'phonefinder'
        },
        {
            name: 'Samsung Galaxy S23',
            img: 'https://dummyimage.com/300x200/eee/333&text=Galaxy+S23',
            link: 'https://www.samsung.com/in/smartphones/galaxy-s23/',
            category: 'phonefinder'
        },
        {
            name: 'HP Pavilion Laptop',
            img: 'https://dummyimage.com/300x200/eee/333&text=HP+Pavilion',
            link: 'https://www.hp.com/in-en/shop/laptops-tablets/pavilion-laptops.html',
            category: 'laptops'
        },
        {
            name: 'Sony Bravia TV',
            img: 'https://dummyimage.com/300x200/eee/333&text=Sony+Bravia+TV',
            link: 'https://www.sony.co.in/electronics/bravia-lcd-tv',
            category: 'tvdeals'
        },
        {
            name: 'Amazon Echo Dot',
            img: 'https://dummyimage.com/300x200/eee/333&text=Echo+Dot',
            link: 'https://www.amazon.in/dp/B084J4MZK6/',
            category: 'deals'
        },
        {
            name: 'Flipkart Smart TV',
            img: 'https://dummyimage.com/300x200/eee/333&text=Flipkart+Smart+TV',
            link: 'https://www.flipkart.com/',
            category: 'tvdeals'
        },
        {
            name: 'Amazon Gift Card',
            img: 'https://dummyimage.com/300x200/eee/333&text=Amazon+Gift+Card',
            link: 'https://www.amazon.in/',
            category: 'amazon'
        },
        {
            name: 'Flipkart Voucher',
            img: 'https://dummyimage.com/300x200/eee/333&text=Flipkart+Voucher',
            link: 'https://www.flipkart.com/',
            category: 'flipkart'
        },
        {
            name: 'Free Contest Entry',
            img: 'https://dummyimage.com/300x200/eee/333&text=Free+Contest',
            link: 'https://www.example.com/',
            category: 'freebiescontest'
        }
    ];

    let currentCategory = 'home';

    function renderProducts(category, searchTerm = '') {
        productCards.innerHTML = '';
        let filtered = products;
        if (category && category !== 'home') {
            filtered = products.filter(p => p.category === category);
        }
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <a href="${product.link}" target="_blank" rel="noopener">
                    <button class="get-deal-btn">GET DEAL</button>
                </a>
            `;
            productCards.appendChild(card);
        });
    }

    // Initial render (show all)
    renderProducts(currentCategory);

    // Add click listeners to deals list items
    Array.from(dealsList.querySelectorAll('li')).forEach(li => {
        if (!li.classList.contains('close-btn')) {
            li.addEventListener('click', () => {
                currentCategory = li.dataset.value;
                renderProducts(currentCategory, navbarSearchInput.value);
                sidebar.classList.remove('sidebar-visible');
                hamburgerToggle.classList.remove('hide');
            });
        }
    });

    // Search bar functionality
    navbarSearchInput.addEventListener('input', function() {
        renderProducts(currentCategory, navbarSearchInput.value);
    });
}); 
