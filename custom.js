

products = [
    {
      id: 1,
      image: "https://compstore.az/data/medium/asus_tuf_f15_fx506hc-f15.i53050_1.jpg",
      name: "ASUS TUF F15",
      mark: 1115,
      count: 5,
    },
    {
      id: 2,
      image: "https://bytelecom.az/media/2022/10/01/product_images/12582/black1.webp",
      name: "Apple iPhone 14 Pro",
      mark: 999,
      count: 8,
    },
    {
      id: 3,
      image: "https://w-t.ams3.cdn.digitaloceanspaces.com/images/s22ultra12324-min%20(1).jpg",
      name: "Samsung Galaxy S22 Ultra",
      mark: 699,
      count: 3,
    },
    {
      id: 4,
      image: "https://aztech.az/wp-content/uploads/2022/03/ASUS-ROG-Strix-G17-G713-2022-8.png",
      name: "ASUS ROG Strix G17",
      mark: 1.941,
      count: 4,
    },
    {
      id: 5,
      image: "https://compstore.az/data/medium/asus_vp28uqgl_1.jpg",
      name: "ASUS VP28UQGL 28-inch",
      mark: 764,
      count: 6,
    },
];
basketProducts = [];
  
addProducts();
function addProducts() {
    products.forEach((element) => {
        let newProduct = document.createElement("div");
        newProduct.classList.add("product");
        main.appendChild(newProduct);
  
        let newPhoto = document.createElement("div");
        newPhoto.classList.add("photo");
        newProduct.appendChild(newPhoto);
  
        let newPhotoIn = document.createElement("img");
        newPhotoIn.classList.add("photoImg");
        newPhoto.appendChild(newPhotoIn);
  
        newPhotoIn.src = element.image;
  
        let newInfo = document.createElement("div");
        newInfo.classList.add("info");
        newProduct.appendChild(newInfo);
  
        let newInfoh1 = document.createElement("h1");
        newInfo.appendChild(newInfoh1);
        newInfoh1.innerText = element.name;
  
        let newInfop = document.createElement("p");
        newInfo.appendChild(newInfop);
        newInfop.innerText = "$"+ element.mark;
  
        let newInfoi = document.createElement("i");
        newInfoi.setAttribute("id", element.id);
        newInfo.appendChild(newInfoi);
        newInfoi.classList.add("fa-solid");
        newInfoi.classList.add("fa-cart-arrow-down");
        newInfoi.classList.add("cart1");
    });
};
function addBasket() {
  bottom.innerHTML = " ";
  let total=0
    basketProducts.forEach((item) => {
        bottom.innerHTML += `
            <div class="basketProduct" id="basketDeleted">
                <div class="basketPhoto">
                    <img src="${item.img}" alt="">
                </div>
                <div class="basketInfo">
                    <h1>${item.name}</h1>
                    <p>$ ${item.mark*item.count}</p>
                    <div class="basketLastLine">
                        <div class="bttns">
                            <button id="minus" onclick="minusButton(${item.id})">-</button>
                            <div id="amount" >${item.count}</div>
                            <button class="plus" onclick="plusButton(${item.id})">+</button>
                        </div>
                        <div class="rubbish">
                            <i class="fa-solid fa-trash" onclick="trash(${item.id})"></i>
                        </div>
                    </div>
                    <p id="price2"></p>
                </div>
            </div>
            `;
            total += item.count*item.mark
    });
    document.querySelector("#total").innerHTML = total;
}
cart.addEventListener("click", function () {
    modal.style.display = "block";
    body.style = "overflow-y: hidden;";
    addBasket();
});
cls.addEventListener("click", function () {
    modal.style.display = "none";
    body.style = "overflow-y: auto;";
});
document.querySelectorAll(".fa-cart-arrow-down").forEach((item) => {
    item.addEventListener("click", function () {
        let basketId = Number(this.getAttribute("id"));
        let basketImg = this.parentElement.previousElementSibling.children[0].src;
        let basketP = Number(this.previousElementSibling.innerText.split("$")[1]);
        let basketH = this.previousElementSibling.previousElementSibling.innerText;
  
        let i = basketProducts.find((element) => element.id == basketId);
        let lastProduct = products.find((element) => element.id == basketId);
        if (i == undefined) {
            basketProducts.push({
                id: basketId,
                img: basketImg,
                name: basketH,
                mark: basketP,
                count: 1,
            });
        }
        else{
            i.count++;
            if (lastProduct.count <= 1) {
                item.classList.add("pointerNone");
                item.parentElement.parentElement.classList.add("redborder");
            }
            // console.log(say,i);
          }
          decrease(basketId);
          addBasket();
          // let say=0
          // basketProducts.forEach((element) => {
          //   console.log(element.count);
          //   say+=element.count
          // })
          // say+=i.count
        document.getElementById("p1").innerText=basketProducts.length
    });
});
  
function plusButton(productId) {
    let basketPrdct = basketProducts.find((element) => element.id == productId);
    let storagePrdct = products.find((element) => element.id == productId);
    if (storagePrdct.count >= 1) {
        basketPrdct.count++;
        console.log(basketPrdct.count);
        if (storagePrdct.count <= 1) {
            document.querySelectorAll(".cart1").forEach((item) => {
                if (Number(item.getAttribute("id")) == productId) {
                item.classList.add("pointerNone");
                item.parentElement.parentElement.classList.add("redborder");
                }
            });
        }
    }
    addBasket();
    decrease(productId);
}
function decrease(id) {
    let previousCount = products.find((element) => element.id == id);
    if (previousCount.count > 0) {
        previousCount.count--;
    }
}
  
function minusButton(productId) {
    let basketPrdct = basketProducts.find((element) => element.id == productId);
    let storagePrdct = products.find((element) => element.id == productId);
    if (basketPrdct.count <= 1) {
        basketProducts.splice(basketProducts.indexOf(basketPrdct), 1);
        document.getElementById("p1").innerText=basketProducts.length
    } else if (storagePrdct.count >= 0) {
        basketPrdct.count--;
        document.querySelectorAll(".cart1").forEach((item) => {
            if (item.getAttribute("id") == productId) {
                item.classList.remove("pointerNone");
                item.parentElement.parentElement.classList.remove("redborder");
            }
        });
    }
    addBasket();
    increase(productId);
}
function increase(id) {
    let previousCount2 = products.find((element) => element.id == id);
    if (previousCount2.count < 5) {
        previousCount2.count++;
    }
  }
  function trash(productId){
    let basketPrdct = basketProducts.find((element) => element.id == productId);
    basketProducts.splice(basketProducts.indexOf(basketPrdct), 1);
    addBasket();
    document.getElementById("p1").innerText=basketProducts.length
  }