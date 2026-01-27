const shoppingInput = document.getElementById('shopping-input');
const priceInput = document.getElementById('price-input');
const countInput = document.getElementById('count-input');
const budgetInput = document.getElementById('budget-input');
const addBtn = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');

let shoppings = JSON.parse(localStorage.getItem('shopping-list')) || [];
let myBudget = localStorage.getItem('my-budget') || 0;

// 초기 세팅
budgetInput.value = myBudget === 0 ? '' : myBudget;

// 1. 입력창 X 버튼 제어 및 예산 실시간 반영
document.querySelectorAll('.input-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const btn = wrapper.querySelector('.clear-btn');

    // 입력 시 X 버튼 토글
    input.addEventListener('input', () => {
        btn.style.display = input.value.length > 0 ? 'flex' : 'none';
        
        // 예산 입력 시 즉시 저장 및 요약만 업데이트 (전체 리스트 렌더링 X -> 깜빡임 방지)
        if (input.id === 'budget-input') {
            localStorage.setItem('my-budget', input.value);
            updateSummaryOnly();
        }
    });

    // X 버튼 클릭 시 초기화
    btn.addEventListener('click', () => {
        input.value = '';
        btn.style.display = 'none';
        input.focus();
        if (input.id === 'budget-input') {
            localStorage.setItem('my-budget', '');
            updateSummaryOnly();
        }
    });
});

// 2. 전체 리스트 렌더링
function renderShoppings() {
    shoppingList.innerHTML = '';
    let totalCount = 0;
    let totalPrice = 0;

    shoppings.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `shopping-item ${item.completed ? 'shopping-item--completed' : ''}`;
        const itemTotal = Number(item.price) * Number(item.count);

        li.innerHTML = `
            <div class="item-info">
                <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
                <span class="item-text">${item.text} <small>(${item.count}개)</small></span>
            </div>
            <div class="item-side">
                <span class="item-price">${itemTotal.toLocaleString()}원</span>
                <button class="delete-btn" onclick="deleteItem(${index})">&times;</button>
            </div>
        `;
        shoppingList.appendChild(li);
        totalCount += Number(item.count);
        totalPrice += itemTotal;
    });

    updateSummary(totalCount, totalPrice);
}

// 요약 정보만 새로고침 (입력 시 깜빡임 방지용)
function updateSummaryOnly() {
    const totalCount = shoppings.reduce((acc, cur) => acc + Number(cur.count), 0);
    const totalPrice = shoppings.reduce((acc, cur) => acc + (Number(cur.price) * Number(cur.count)), 0);
    updateSummary(totalCount, totalPrice);
}

// 3. 하단 요약 업데이트 (중복 "원" 수정 완료)
function updateSummary(totalCount, totalPrice) {
    const budget = Number(budgetInput.value);
    const totalCountDisp = document.getElementById('total-count');
    const totalPriceDisp = document.getElementById('total-price');
    const remainCont = document.getElementById('remaining-budget-container');
    const remainDisp = document.getElementById('remaining-budget');
    const remainText = document.getElementById('remaining-text') || remainCont?.querySelector('span:first-child');
    const priceCont = document.getElementById('total-price-container');

    if (totalCountDisp) totalCountDisp.innerText = totalCount;
    if (totalPriceDisp) totalPriceDisp.innerText = totalPrice.toLocaleString() + "원";

    if (budget > 0) {
        remainCont.style.display = 'flex';
        const remaining = budget - totalPrice;
        const isOver = remaining < 0;
        
        // 문구 및 금액 설정
        if(remainText) remainText.innerText = isOver ? "부족한 금액:" : "남은 예산:";
        remainDisp.innerText = Math.abs(remaining).toLocaleString() + "원";
        
        // 색상 및 스타일 제어
        remainCont.style.color = isOver ? "var(--red)" : "var(--green)";
        priceCont.className = isOver ? 'over-budget' : '';
    } else {
        if(remainCont) remainCont.style.display = 'none';
        if(priceCont) priceCont.className = '';
    }
}

// 4. 품목 추가
function addShopping() {
    const text = shoppingInput.value.trim();
    if (!text) return;

    shoppings.push({
        text: text,
        price: priceInput.value || 0,
        count: countInput.value || 1,
        completed: false
    });

    // 입력창 초기화
    shoppingInput.value = '';
    priceInput.value = '';
    countInput.value = '1';
    document.querySelectorAll('.clear-btn').forEach(btn => btn.style.display = 'none');

    saveAndRender();
}

// 헬퍼 함수
window.toggleComplete = (i) => { shoppings[i].completed = !shoppings[i].completed; saveAndRender(); };
window.deleteItem = (i) => { shoppings.splice(i, 1); saveAndRender(); };

function saveAndRender() {
    localStorage.setItem('shopping-list', JSON.stringify(shoppings));
    renderShoppings();
}

addBtn.addEventListener('click', addShopping);
// 엔터 키 지원
[shoppingInput, priceInput, countInput].forEach(input => {
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addShopping(); });
});

renderShoppings();