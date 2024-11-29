// 장바구니 데이터 저장 객체
const cart = {};

// HTML 요소 참조
const menu = document.querySelector("#products");
const cartDisplay = document.querySelector("#cart-items");
const totalDisplay = document.querySelector("#cart-total");
const checkoutButton = document.getElementById("checkout");
const clearCartButton = document.getElementById("clear-cart"); // Clear Cart 버튼 참조

// 상품 추가 이벤트
menu.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const product = event.target.closest(".product"); 
    const name = product.querySelector("h3").innerText; 
    const price = parseInt(event.target.dataset.price.replace(",", "")); 

    // 장바구니 추가 또는 수량 증가
    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price, count: 1 }; // 새로운 상품 추가
    }

    updateCart(); // 장바구니 UI 업데이트
    console.log(cart); // 현재 장바구니 상태 출력
  }
});

// 장바구니 업데이트
function updateCart() {
  cartDisplay.innerHTML = "";
  let total = 0;

  for (const name in cart) {
    const { price, count } = cart[name];
    total += price * count; // 총합 계산

    // 장바구니 항목 생성
    const item = document.createElement("div");
    item.classList.add("cart-item");

    // 상품 이름 추가
    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    item.appendChild(nameSpan);

    // 수량 컨트롤 생성
    const quantityControls = document.createElement("div");
    quantityControls.classList.add("quantity-controls");

    // 수량 감소 버튼
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

    // 수량 표시
    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = count;

    // 수량 증가 버튼
    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => {
      cart[name].count++;
      updateCart();
    });

    // 수량 컨트롤 추가
    quantityControls.appendChild(decreaseButton);
    quantityControls.appendChild(quantitySpan);
    quantityControls.appendChild(increaseButton);

    // 삭제 버튼
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      delete cart[name];
      updateCart();
    });

    // 항목에 컨트롤 추가
    item.appendChild(quantityControls);
    item.appendChild(deleteButton);

    // 장바구니에 항목 추가
    cartDisplay.appendChild(item);
  }

  // 총합 업데이트
  totalDisplay.textContent = total.toLocaleString() + " KRW"; // 세자리 콤마 추가된 금액
}

// Checkout 버튼 동작
checkoutButton.addEventListener("click", () => {
  alert("힝~속았찌!!");
});

// Clear Cart 버튼 동작
clearCartButton.addEventListener("click", () => {
  for (const key in cart) {
    delete cart[key];
  }
  updateCart();
  alert("카트는 다 비울께유~!👿");
});

// toLocaleString() 예제 출력
const now = new Date();
console.log("Default Locale:", now.toLocaleString());