const catagoryContainer = document.getElementById("catagoriesContainer");
const mobileCategories = document.getElementById("mobileCategories");
const loadAllCard = document.getElementById("cardContainer");
const cardContainer = document.getElementById("cardContainer");

// Add to Cart Section.............................

const yourCart = document.getElementById("yourCart");
// Remove from cart section.............................

yourCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-xmark")) {//font awsome theke dawa class 
    e.target.parentNode.remove();
    
    updateTotalPrice();
  }
});

//Event Listener
cardContainer.addEventListener("click", (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const price = e.target.parentNode.children[2].children[1].innerText;

  if (e.target.id === "addCardContainer") {
    yourCart.innerHTML += `<div class="bg-[#F0FDF4] p-4 mt-2 rounded-lg flex items-center justify-between ">
              <div>
                <h1 class="text-[#1F2937] font-semibold ">${title}</h1>
              <p class=" text-[#879395] mt-1">${price} x 1</p>
              </div>
              <i class="fa-solid fa-xmark text-[#8C8C8C]"></i>
            </div>`

    
    updateTotalPrice();
  }
});

//  Function for updating total price
function updateTotalPrice() {
  let total = 0;
  const cartItems = yourCart.querySelectorAll("p");

  cartItems.forEach(item => {
  
    const priceText = item.innerText.split(" ")[0]; // "৳500"
    const price = parseInt(priceText.replace("৳", ""));
    total += price;
  });

  // total price div update
  const totalElement = document.querySelector(".mt-3 h1:last-child");
  if (totalElement) {
    totalElement.innerText = `৳${total}`;
  }
}

//All plants.......................................


const loadCardAll = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const plants = data.plants;

      plants.forEach((plant) => {
        loadAllCard.innerHTML += ` 
       <div class="max-w-sm bg-white rounded-2xl shadow-md    overflow-hidden">
            <!-- Image -->
            <img
              src="${plant.image}"
              alt="Tree"
              class="w-full h-48 object-cover"
            />

            <!-- Content -->
            <div class="p-4">
              <h2 onclick="loadPlantsDetails(${plant.id})" class="text-lg font-semibold text-gray-800 cursor-pointer">${plant.name}</h2>
              <p class="text-sm text-gray-600 mt-2">${plant.description}</p>

              <!-- Category + Price -->
              <div class="flex items-center justify-between mt-3">
                <span
                  class="px-3 py-1  bg-[#DCFCE7] text-xs rounded-full text-green-500">
                  ${plant.category}
                </span>
                <span class="text-lg font-semibold text-gray-800">৳${plant.price}</span>
              </div>

              <!-- Button -->
              <button id="addCardContainer"
                class="w-full cursor-pointer bg-[#15803D] text-white py-2 mt-4 rounded-full font-medium hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
      
      `;
      });
    });
};

loadCardAll();

//display card......................................
const loadPlants = (id) => {
  
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCard(data.plants));
};

const displayCard = (plants) => {

  const cardContainer = document.getElementById("cardContainer");

  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    console.log(plant);
    const card = document.createElement("div");
    card.innerHTML = `
     
     <div class="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden">
            <!-- Image -->
            <img
              src="${plant.image}"
              alt="Tree"
              class="w-full h-48 object-cover"
            />

            <!-- Content -->
            <div class="p-4">
              <h2 onclick="loadPlantsDetails(${plant.id})" class="text-lg font-semibold text-gray-800 cursor-pointer">${plant.name}</h2>
              <p class="text-sm text-gray-600 mt-2">${plant.description}</p>

              <!-- Category + Price -->
              <div class="flex items-center justify-between mt-3">
                <span
                  class="px-3 py-1  bg-[#DCFCE7] text-xs rounded-full text-green-500">
                  ${plant.category}
                </span>
                <span class="text-lg font-semibold text-gray-800">৳${plant.price}</span>
              </div>

              <!-- Button -->
              <button id="addCardContainer"
                class="w-full bg-[#15803D] text-white py-2 mt-4 rounded-full font-medium hover:bg-green-400 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
    
    `;
    cardContainer.append(card);
  });
};

// Categories.........................................
const loadCatagories = () => {

  fetch("https://openapi.programming-hero.com/api/categories") 
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCatagory(categories);
    });
};


//Show Catagories....................................

const showCatagory = (categories) => {
  
  categories.forEach((cat) => {

    catagoryContainer.innerHTML += `
      <li onClick="loadPlants(${cat.id})" id="${cat.id}" class="hover:bg-[#75cf96] hover:text-white rounded-sm font-medium py-2 pl-2">
        ${cat.category_name}
      </li>`;

    // responsive 
    if (mobileCategories) {
      mobileCategories.innerHTML += `
        <li onClick="loadPlants(${cat.id})" class="hover:bg-[#57d384] hover:text-white rounded-sm font-medium">
          <a>${cat.category_name}</a>
        </li>`;
    }
  });

  
  catagoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("#catagoriesContainer li");
    allLi.forEach((li) => {
      li.classList.remove("text-white", "bg-[#15803D]");
    });

    if (e.target.localName === "li") {
      e.target.classList.add("text-white", "bg-[#15803D]");
    }
  });
};
loadCatagories();

//Load Plants Detail..................................

const loadPlantsDetails = async(id)=>{
  const url = `https://openapi.programming-hero.com/api/plant/${id}`
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayPlantDetails(details.plants);
}
const displayPlantDetails=(plant) =>{
  console.log(plant);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  
  <div class="p-2">
      <h3 class="text-xl font-bold">${plant.name}</h3>
    </div>

    <!-- Modal Image -->
    <div class="w-full p-2">
      <img src="${plant.image}"  class="w-full h-56 object-cover rounded-xl">
    </div>

    <!-- Modal Content -->
    <div class="p-2">
      <p class="font-semibold"><span class="font-bold">Category:</span> ${plant.category} </p>
      <p class="font-semibold mt-2"><span class="font-bold">Price:</span> ৳${plant.price}</p>
      <p class="mt-2"><span class="font-bold">Description:</span> ${plant.description} </p>
    </div>
  
  
  `
  document.getElementById("plant_modal").showModal();
  
}






