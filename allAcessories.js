// Modal Logic
window.onclick = function (event) {
  const loginModal = document.getElementById("loginModal");
  const signUpModal = document.getElementById("signUpModal");

  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target === signUpModal) {
    signUpModal.style.display = "none";
  }
};

// Open and Close Navigation
const mainHome = document.getElementById("mainHome");
console.log(mainHome); // Should log the mainHome element

function openNav() {
  document.getElementById("mySidenav").style.width = "195px";
  document.getElementById("mySidenav").style.left = "16px";
  document.getElementById("mainHome").style.zIndex = "-1"; // Ensure it's visible
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.left = "-20%";
  document.getElementById("mainHome").style.zIndex = "auto";
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Update the profile link based on login status
  const profileLink = document.querySelector("#profileLink");
  if (profileLink) {
    if (isLoggedIn) {
      profileLink.href = "./logout.html";
      profileLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="iconNav" id="loginIcon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg> <p>Logout</p>
      `;
    } else {
      profileLink.href = "./login.html";
      profileLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="iconNav" id="loginIcon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg> <p>Login</p>
      `;
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("products")) || [];
  const allProductsContainer = document.getElementById("allProducts");
  const productCardTemplate = document.getElementById("productCardTemplate");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestionsBox");
  const searchInputOutside = document.getElementById("searchInputOutside");
  const suggestionsBoxOutside = document.getElementById("suggestionsBoxOutside");

  const productsPerPage = 15; // Number of products to display per page
  let currentPage = 1; // Current page number

  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  // Function to display products with pagination
  function displayAllProducts(filteredProducts = productData) {
    allProductsContainer.innerHTML = "";

    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    if (paginatedProducts.length > 0) {
      paginatedProducts.forEach((product) => {
        const { name, price, images, discount, description } = product;
        const productCard = productCardTemplate.content.cloneNode(true);

        productCard.querySelector(".accessorieName").textContent = name;
        productCard.querySelector(".accessoriePrice").textContent = price;

        const discountElement = productCard.querySelector(".accessorieDiscount");
        discountElement.textContent = discount ? `${discount}%` : "No";
        productCard.querySelector(".product-description").textContent = description || "No description available";

        const imageContainer = productCard.querySelector(".acessorieImg");
        if (images && images.length > 0) {
          const img = document.createElement("img");
          img.src = images[0];
          img.alt = "Product Image";
          imageContainer.appendChild(img);
        } else {
          const placeholder = document.createElement("div");
          placeholder.textContent = "No image available";
          imageContainer.appendChild(placeholder);
        }

        const productButton = productCard.querySelector("button");
        productButton.addEventListener("click", () => {
          localStorage.setItem("selectedProduct", JSON.stringify(product));
          window.location.href = "acessorieDetail.html";
        });

        allProductsContainer.appendChild(productCard);
      });
    } else {
      allProductsContainer.innerHTML = `<p>No products available.</p>`;
    }

    // Update pagination controls
    updatePaginationControls(filteredProducts.length);
  }

  // Function to update pagination controls
  function updatePaginationControls(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    // Disable "Previous" button if on the first page
    prevPageButton.disabled = currentPage === 1;
    // Disable "Next" button if on the last page
    nextPageButton.disabled = currentPage === totalPages;
  }

  // Function to show search suggestions
  function showSuggestions(filteredProducts, suggestionsBox) {
    suggestionsBox.innerHTML = "";
    if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        const suggestion = document.createElement("div");
        suggestion.textContent = product.name;
        suggestion.classList.add("suggestion");
        suggestion.addEventListener("click", () => {
          searchInput.value = product.name;
          displayAllProducts([product]);
          suggestionsBox.classList.add("hidden");
        });
        suggestionsBox.appendChild(suggestion);
      });
      suggestionsBox.classList.remove("hidden");
    } else {
      suggestionsBox.classList.add("hidden");
    }
  }

  // Event listener for the search input inside the navbar
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      displayAllProducts();
      suggestionsBox.classList.add("hidden");
    } else {
      const filteredProducts = productData.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      );
      displayAllProducts(filteredProducts);
      showSuggestions(filteredProducts, suggestionsBox);
    }
  });

  // Event listener for the search input outside the navbar
  searchInputOutside.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      displayAllProducts();
      suggestionsBoxOutside.classList.add("hidden");
    } else {
      const filteredProducts = productData.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      );
      displayAllProducts(filteredProducts);
      showSuggestions(filteredProducts, suggestionsBoxOutside);
    }
  });

  // Event listener for the "Previous" button
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayAllProducts();
    }
  });

  // Event listener for the "Next" button
  nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(productData.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayAllProducts();
    }
  });

  // Initial display of all products
  displayAllProducts();
});


