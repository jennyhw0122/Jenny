
//장바구니에 +,- 삭제, 총금액이 정확하게 보이게 만들고 싶다.


// 장바구니 데이터 저장 객체
const cart = {};

// HTML 요소 참조
const menu = document.querySelector("#products"); 
const cartDisplay = document.querySelector("#cart-items"); 
const totalDisplay = document.querySelector("#cart-total"); 


menu.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const product = event.target.closest(".product"); // 클릭한 버튼의 부모 요소(상품 정보)
    const name = product.querySelector("h3").innerText; // 상품 이름
    const price = parseInt(event.target.dataset.price.replace(",", "")); // 상품 가격(숫자)

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

function updateCart() {
  cartDisplay.innerHTML = ""; 
  let total = 0; 

  for (const name in cart) {
    const { price, count } = cart[name];
    total += price * count; // 총합 계산

    const item = document.createElement("div");
    item.classList.add("cart-item");

    item.innerHTML = `
      <span>${name} x${count}</span>
    `;

    // 수량 감소 버튼
    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => {
      if (cart[name].count > 1) {
        cart[name].count--;
      } else {
        delete cart[name];
      }
      updateCart(); // UI 업데이트
    });

    // 수량 증가 버튼
    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => {
      cart[name].count++;
      updateCart(); // UI 업데이트
    });

    // 삭제 버튼
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      delete cart[name];
      updateCart(); // UI 업데이트
    });

    // 버튼 추가
    item.appendChild(decreaseButton);
    item.appendChild(increaseButton);
    item.appendChild(deleteButton);

    // 장바구니에 항목 추가
    cartDisplay.appendChild(item);
  }

  // 총합 업데이트
  totalDisplay.textContent = total.toLocaleString() + "원"; // 세자리 콤마 추가된 금액
}