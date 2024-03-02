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
        onclick="displayCardsBasedOnCategory()"
        id="${category_id}" 
        class="text-gray-500 hover:text-blue-600 transition cursor-pointer" 
        >
        ${category_name}
        </a>
    `;
    listContainer.appendChild(li);
  });
};

loadNavItem();
