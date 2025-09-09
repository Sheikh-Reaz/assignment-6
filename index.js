const catagoryContainer = document.getElementById('catagoriesContainer')



//All plants.......................................

const loadAllCard = document.getElementById('cardContainer');

const loadCardAll = () => {
  fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {

      const plants = data.plants

      plants.forEach(plant => {

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
              <h2 class="text-lg font-semibold text-gray-800">${plant.name}</h2>
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
      
      `

      })
    })
}

loadCardAll();








//display card......................................

const loadPlants = (id) => {//load plants by id
    
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch (url)
    .then((res) => res.json())
    .then((data) => displayCard(data.plants));
    
};

const displayCard =(plants) =>{//display each card
   const cardContainer = document.getElementById("cardContainer");

   cardContainer.innerHTML ="";
   plants.forEach(plant => {
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
              <h2 class="text-lg font-semibold text-gray-800">${plant.name}</h2>
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
              <button
                class="w-full bg-[#15803D] text-white py-2 mt-4 rounded-full font-medium hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
    
    `
    cardContainer.append(card);

   })

}







// Categories.........................................

const loadCatagories = () =>{//Load catagories
    fetch ("https://openapi.programming-hero.com/api/categories") //Load catagories
    .then( (res) => res.json())
    .then( (data) => {
        // console.log(data.catagories);
    const categories = data.categories 
    showCatagory(categories)

    }) 
};

 const showCatagory = (categories) => {//show categories
        categories.forEach(cat => {
        catagoryContainer.innerHTML +=
        `<li onClick="loadPlants(${cat.id})" id="${cat.id}" class="hover:bg-[#15803D] hover:text-white rounded-sm font-medium py-2 pl-2">
              ${cat.category_name}
        </li>`

    });
    catagoryContainer.addEventListener('click', (e) => {
        
        const allLi= document.querySelectorAll('li')
        allLi.forEach(li => {
            li.classList.remove('text-white' , 'bg-[#15803D]')
        })

        if(e.target.localName === 'li'){
            // console.log(e.target)
            e.target.classList.add('text-white' , 'bg-[#15803D]')
        }
    })

    
    
 }
loadCatagories()

