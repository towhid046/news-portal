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
        class="text-gray-500 hover:text-blue-600 transition cursor-pointer single-category-btn" 
        >
        ${category_name}
        </a>
    `;
    listContainer.appendChild(li);
  });
};

// fetch data baded on category:
const displayCardsBasedOnCategory = async (id) => {
  document.getElementById("spinner").classList.remove("hidden");
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const news = data.data;

    if (news.length > 1) {
      document.getElementById("spinner").classList.add("hidden");
    }
    if (news.length <= 0) {
      document.getElementById("spinner").classList.add("hidden");
      throw "/images/error-page.png";
    }
    displayCards(news);
  } catch (error) {
    errorPageHandelar(error);
  }

  // set color function is called here
  setTimeout(() => {
    setColor(id);
  }, 100);
};

// error page handelar:
const errorPageHandelar = (err) => {
  const cardsContainer = document.getElementById("cards_container");
  cardsContainer.innerHTML = "";

  const div = document.createElement("div");
  div.innerHTML = `
        <div class='flex flex-col items-center space-y-4 text-center'>
            <img class="w-[200px] " src='${err}'/>
            <h2 class="font-bold text-2xl">Current there is no news in this category</h2>
        </div>
    `;
  cardsContainer.appendChild(div);
};
// display news:
const displayCards = (news) => {
  const cardsContainer = document.getElementById("cards_container");
  // clear the cardsContainer
  cardsContainer.innerHTML = "";
  news.map((ne) => {
    const { _id, thumbnail_url, title, details, author, total_view } = ne;
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

        <div class="card-body space-y-3">
          <h2 class="card-title">
            ${title}
          </h2>
          <p>
           ${details
             .split("")
             .slice(0, 320)
             .join(
               ""
             )} <span onclick="viewSingleCardDetailsHandelar('${_id}')" class="text-gray-400 cursor-pointer">Read more...</span>
          </p>
          <div class="card-actions flex justify-between gap-5 items-center">
            <div class="flex gap-2 items-center">
              <img class="w-12 h-12 rounded-full" src="${
                author?.img
              }" alt="Image" />
              <div>
                <strong>${author?.name || "Unknown Author"}</strong>
                <p>${author?.published_date || "Date unavailable"}</p>
              </div>
            </div>

            <div class="flex gap-2 items-center">
              <i class="fa-regular fa-eye"></i>
              <strong>${total_view} Views</strong>
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
                onclick = "viewSingleCardDetailsHandelar('${_id}')"
                class="text-blue-600 text-2xl cursor-pointer fa-solid fa-arrow-right-long"
              ></i>
            </div>
          </div>
        </div>
        `;
    cardsContainer.appendChild(cardDiv);
  });
};

// set color based on selected category
const setColor = (id) => {
  const allCategories = document.querySelectorAll(".single-category-btn");
  allCategories.forEach((category) => {
    category.classList.remove("text-blue-500");
    category.id === id && category.classList.add("text-blue-500");
  });
};

// view single card details handelar:
const viewSingleCardDetailsHandelar = async (newsId) => {
  const url = ` https://openapi.programming-hero.com/api/news/${newsId}`;
  const res = await fetch(url);
  const data = await res.json();

  const { _id, thumbnail_url, title, details, author, total_view } =
    data.data[0];

  const cardsContainer = document.getElementById("cards_container");
  // clear the cardsContainer
  cardsContainer.innerHTML = "";

  const cardDiv = document.createElement("div");
  cardDiv.classList = `rounded-xl md:items-start bg-base-100 shadow-xl flex flex-col md:flex-row`;

  cardDiv.innerHTML = `
        <figure class="m-4 w-11/12 md:min-w-[300px] md:max-w-[300px]  lg:min-w-[200px] lg:max-w-[200px]">
          <img
            class = "w-[100%] rounded-xl"
            src="${thumbnail_url}"
            alt="Thumbnail Image"
          />
        </figure>

        <div class="card-body space-y-3">
          <h2 class="card-title">
            ${title}
          </h2>
          <p>
           ${details}
          </p>
          <div class="card-actions flex justify-between gap-5 items-center">
            <div class="flex gap-2 items-center">
              <img class="w-12 h-12 rounded-full" src="${
                author?.img
              }" alt="Image" />
              <div>
                <strong>${author?.name || "Unknown Author"}</strong>
                <p>${author?.published_date || "Date unavailable"}</p>
              </div>
            </div>

            <div class="flex gap-2 items-center">
              <i class="fa-regular fa-eye"></i>
              <strong>${total_view} Views</strong>
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
                onclick = "viewSingleCardDetailsHandelar('${_id}')"
                class="text-blue-600 text-2xl cursor-pointer fa-solid fa-arrow-right-long"
              ></i>
            </div>
          </div>
        </div>
        `;
  cardsContainer.appendChild(cardDiv);
  console.log(title);
};

loadNavItem();

// call the display cards first time load the page by the all category:
displayCardsBasedOnCategory("08");
