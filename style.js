const inputMeal = document.querySelector("input");
const search = document.querySelector(".search");
const addList = document.querySelector(".list");
const popup = document.querySelector(".popup");
const outPopup = document.querySelector(".outPopup");
const body = document.querySelector("body");
let html = "";
let addPopup = "";

async function getMeal(mealValue) {
    // const link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealValue}`;
    // const promise = await fetch(`${link}`);

    const promise = await fetch(`${mealValue}`);
    const data = await promise.json();
    return data;
}
async function getDetail(id) {
    const linkDetail = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const promiseDetail = await fetch(`${linkDetail}`);
    const dataDetail = await promiseDetail.json();
    return dataDetail;
}
async function getRecipe(idMeal) {
    let dataDetail = await getDetail(idMeal);
    addPopup += `
      <div class="popup">
        <div class="innerPopup">
          <h3 class="nameMeal">${dataDetail.meals[0].strMeal}</h3>
          <p class="type"><span>${inputMeal.value}</span></p>
          <h4>Instruction:</h4>
          <p class="content">${dataDetail.meals[0].strInstructions}</p>
          <div class="popupPicture">
            <img src="${dataDetail.meals[0].strMealThumb}" alt="" />
          </div>
          <a href="${dataDetail.meals[0].strYoutube}" target="_blank">Watch Video</a>
        </div>
        <button class="close" onclick="closePopup()"><i class="fa-solid fa-xmark"></i></button>
      </div>
        `;
    outPopup.innerHTML = addPopup;
    outPopup.classList.add("active");
}

outPopup.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        outPopup.classList.remove("active");
    }
});
function closePopup() {
    addPopup = "";
    outPopup.innerHTML = addPopup;
    outPopup.classList.remove("active");
}
closePopup();

search.addEventListener("click", async function () {
    const link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputMeal.value}`;
    if (!inputMeal.value) {
        alert("No input search");
    } else {
        let data = await getMeal(link);
        if (!data.meals) {
            alert("No food found");
        } else {
            data.meals.forEach((element) => {
                addList.innerHTML += `
       <div class="card">
         <div class="picture">
          <img src="${element.strMealThumb}" alt="" />
         </div>
         <h4>${element.strMeal}</h4>
         <button class="detail" onclick="getRecipe(${element.idMeal})">Get Recipe</button>
       </div>`;
            });
        }
    }
});
