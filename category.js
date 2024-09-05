const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate").content;
const categoryList = document.querySelector("#categoryList"); /****this is qs i will insert data fetch and inject */
const params = new URLSearchParams(document.location.search); ////****here its constant function by java script */
const category = params.get("category"); //////***parameters helps in asking api  , my variabel which helps in getting the variebel data of the particular id*/
let url = undefined;

fetch("https://kea-alt-del.dk/t7/api/categories") /////*********vi are making request to  get category data in json  */
  .then((response) => response.json()) ////////////******this is a promise */
  .then((categories) => {
    categories.forEach((category) => {
      ////***loop */
      categoryList.innerHTML += `<li><a href="productlist.html?category=${category.category}">${category.category}</a></li>`; /***inject in my html by giving class and ids categoryList is given id in html , if i didnot put + so it will only show one item in category list its due to the + its showing different items */
    }); ///***it should remain on the same page or productliste then we have to filter */
  });

if (params.has("category")) {
  ///***variable category true or false*/
  url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
} else {
  url = "https://kea-alt-del.dk/t7/api/products";
}

function duplicateTemplate(template, container) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        const templateClone = template.cloneNode(true);

        templateClone.querySelector(".category").textContent = product.category;
        templateClone.querySelector(".price").textContent = product.price;
        templateClone.querySelector(".brand").textContent = product.brandname;
        templateClone.querySelector("#seemore").setAttribute("href", `productlist.html?productid=${product.id}`);
        templateClone.querySelector("img").setAttribute("src", `https://kea-alt-del.dk/t7/images/jpg/640/${product.id}.jpg`);

        container.appendChild(templateClone);
      });
    })
    .catch((error) => console.log(error));
}

duplicateTemplate(productTemplate, productContainer);
