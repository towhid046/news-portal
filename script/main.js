const loadNavItem = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  const categories = data.data.news_category;
  displayNewsCategory(categories);
};

// display category btns
const displayNewsCategory = (categories) => {
  const listContainer = document.getElementById("catetory_list_container");
  categories.forEach((category) => {
    const { category_name, category_id } = category;
    const li = document.createElement("li");
    li.innerHTML = `
        <a
        onclick="displayCardsBasedOnCategory('${category_id}')"
        id="${category_id}" 
        class="text-gray-500 hover:text-blue-600 transition cursor-pointer" 
        >
        ${category_name}
        </a>
    `;
    listContainer.appendChild(li);
  });
};

// fetch data baded on category:
const displayCardsBasedOnCategory = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const news = data.data;
  displayCards(news);
};

// display news:
const displayCards = (news) => {
  const cardsContainer = document.getElementById("cards_container");
  // clear the cardsContainer
  cardsContainer.innerHTML = "";
  news.map((ne) => {
    const {thumbnail_url, title, details} = ne;
    const cardDiv = document.createElement("div");
    cardDiv.classList = `rounded-xl items-center bg-base-100 shadow-xl flex flex-col md:flex-row`;

    cardDiv.innerHTML = `
        <figure class="m-4 w-11/12 md:min-w-[300px] md:max-w-[300px]  lg:min-w-[200px] lg:max-w-[200px]">
          <img
            class = "w-[100%] rounded-xl"
            src="${thumbnail_url}"
            alt="Thumbnail Image"
          />
        </figure>

        <div class="card-body">
          <h2 class="card-title">
            ${title}
          </h2>
          <p>
           ${details.split('').slice(0,320).join('')}
          </p>
          <div class="card-actions flex justify-between gap-5 items-center">
            <div class="flex gap-2 items-center">
              <img src="" alt="Image" />
              <div>
                <strong>Author Name</strong>
                <p>Jan 10, 2024</p>
              </div>
            </div>

            <div class="flex gap-2 items-center">
              <i class="fa-regular fa-eye"></i>
              <strong>1.5M</strong>
            </div>

            <div class="rating">
              <input type="radio" name="rating-1" class="mask mask-star" />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star"
                checked
              />
              <input type="radio" name="rating-1" class="mask mask-star" />
              <input type="radio" name="rating-1" class="mask mask-star" />
              <input type="radio" name="rating-1" class="mask mask-star" />
            </div>

            <div class="">
              <i
                class="text-blue-600 text-2xl cursor-pointer fa-solid fa-arrow-right-long"
              ></i>
            </div>
          </div>
        </div>
        `;
    cardsContainer.appendChild(cardDiv);
  });
};

loadNavItem();

// call the display cards first time load the page by the all category:
displayCardsBasedOnCategory('08')