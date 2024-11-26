
//장바구니가 나타나면서 DIM 처리도 되었으면 좋겠다.


// 장바구니 데이터 저장 객체
const cart = {};

// HTML 요소 참조
const menu = document.querySelector("#products");
const cartDisplay = document.querySelector("#cart-items"); 
const totalDisplay = document.querySelector("#cart-total");
const overlay = document.getElementById("overlay"); 
const cartAside = document.getElementById("cart"); 
const closeCartButton = document.getElementById("close-cart"); 


menu.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const product = event.target.closest(".product");
    const name = product.querySelector("h3").innerText; // 상품 이름 가져오기
    const price = parseInt(event.target.dataset.price.replace(",", "")); // 가격 가져오기


    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price, count: 1 };
    }

    updateCart(); // 장바구니 UI 업데이트
    openCart(); // 장바구니 열기
  }
});


function updateCart() {
  cartDisplay.innerHTML = ""; // 기존 UI 초기화
  let total = 0; // 총합 초기화


  for (const name in cart) {
    const { price, count } = cart[name];
    total += price * count; // 총합 계산

    const item = document.createElement("div"); 
    item.classList.add("cart-item");


    item.innerHTML = `
      <span>${name} x${count}</span>
    `;


    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => {
      if (cart[name].count > 1) {
        cart[name].count--;
      } else {
        delete cart[name];
      }
      updateCart();
    });


    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => {
      cart[name].count++;
      updateCart();
    });


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      delete cart[name];
      updateCart();
    });

    item.appendChild(decreaseButton);
    item.appendChild(increaseButton);
    item.appendChild(deleteButton);


    cartDisplay.appendChild(item);
  }


  totalDisplay.textContent = total.toLocaleString() + "원";
}


function openCart() {
  cartAside.classList.add("open");
  overlay.classList.add("active");
}


function closeCart() {
  cartAside.classList.remove("open");
  overlay.classList.remove("active");
}

closeCartButton.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);