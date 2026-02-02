/* --- 1. MOBILE NAVBAR LOGIC --- */
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar && nav) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close && nav) {
    close.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents page jump
        nav.classList.remove('active');
    });
}

/* --- 2. GLOBAL VARIABLES --- */
let originalPrice = ""; 

// Added: Database for the searchProducts() function to work
const allProducts = [
    { name: "Flash Disk 16gb", category: "Electronics", link: "sproduct2.html", price: "45,000" },
    { name: "Dell Desktop", category: "Electronics", link: "sproduct2.html", price: "550,000" },
    { name: "Hissense Smart TV", category: "Electronics", link: "sproduct2.html", price: "380,000" }
    // Add more items here as needed
];

/* --- 3. PAGE LOAD LOGIC --- */
window.onload = function() {
    const MainImg = document.getElementById("MainImg");
    const smalling = document.getElementsByClassName("small-img");
    const nameDisplay = document.getElementById("productName");
    const priceDisplay = document.getElementById("productPrice");

    if (MainImg && smalling.length > 0) {
        for (let i = 0; i < smalling.length; i++) {
            smalling[i].onclick = function() {
                MainImg.src = smalling[i].src;
            };
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const price = urlParams.get('price');
    const img1 = urlParams.get('img1');
    const img2 = urlParams.get('img2');
    const img3 = urlParams.get('img3');
    const img4 = urlParams.get('img4');

    if (name && nameDisplay) {
        nameDisplay.innerText = name;
    }
    
    if (price && priceDisplay) {
        originalPrice = price; 
        priceDisplay.innerText = "Select choice to see price";
    }

    if (MainImg && img1) MainImg.src = img1;
    if (smalling[0] && img1) smalling[0].src = img1;
    if (smalling[1] && img2) smalling[1].src = img2;
    if (smalling[2] && img3) smalling[2].src = img3;
    if (smalling[3] && img4) smalling[3].src = img4;
};

/* --- 4. PRICE UPDATE LOGIC --- */
const sizeSelector = document.getElementById("sizeSelector");
if (sizeSelector) {
    sizeSelector.onchange = function() {
        const priceDisplay = document.getElementById("productPrice");
        if (priceDisplay) {
            if (this.value.includes("Select")) {
                priceDisplay.innerText = "Select choice to see price";
            } else {
                priceDisplay.innerText = "Ug shs " + originalPrice + "/=";
            }
        }
    };
}

/* --- 5. SEARCH LOGIC --- */
function searchProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let resultsContainer = document.getElementById('search-results');
    
    if (!resultsContainer) return; // Guard clause

    if (input.length === 0) {
        resultsContainer.style.display = "none";
        return;
    }

    let filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(input)
    );

    if (filtered.length > 0) {
        resultsContainer.style.display = "block";
        resultsContainer.innerHTML = filtered.map(item => `
            <div style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="${item.link}" style="color: #088178; text-decoration: none;">
                    ${item.name} <br>
                    <small style="color: #666;">View in ${item.category}</small>
                </a>
            </div>
        `).join('');
    } else {
        resultsContainer.innerHTML = "<div style='padding:10px;'>No items found</div>";
        resultsContainer.style.display = "block";
    }
}

function liveSearch() {
    let input = document.getElementById('masterSearch').value.toLowerCase();
    let products = document.querySelectorAll('.pro');
    let noResults = document.getElementById('no-results');
    let visibleCount = 0;

    products.forEach(product => {
        // Fallback: If data-name is missing, search the text inside the <h5> tag
        let nameAttr = product.getAttribute('data-name');
        let name = nameAttr ? nameAttr.toLowerCase() : product.querySelector('h5').innerText.toLowerCase();
        
        if (name.includes(input)) {
            product.style.display = "block"; 
            visibleCount++;
        } else {
            product.style.display = "none";  
        }
    });

    if (noResults) {
        noResults.style.display = (visibleCount === 0) ? "block" : "none";
    }
}