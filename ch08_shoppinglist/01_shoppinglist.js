const shoppingInput = document.getElementById('shopping-input');
const priceInput = document.getElementById('price-input');
const countInput = document.getElementById('count-input');
const budgetInput = document.getElementById('budget-input');
const addBtn = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');

let shoppings = JSON.parse(localStorage.getItem('shopping-list')) || [];
let myBudget = localStorage.getItem('my-budget') || 0;

// 초기 예산 설정
budgetInput.value = myBudget;

// [개선] X 버튼 제어 및 입력 로직을 하나로 통합
document.querySelectorAll('.input-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const btn = wrapper.querySelector('.clear-btn');

    // 입력 발생 시 버튼 표시/숨김만 제어 (render 호출 방지)
    input.addEventListener('input', () => {
        btn.style.display = input.value.length > 0 ? 'flex' : 'none';
        
        // 예산 입력창일 때만 즉시 저장 및 계산 업데이트 (무한루프 방지용)
        if (input.id === 'budget-input') {
            localStorage.setItem('my-budget', input.value);
            updateSummaryOnly(); 
        }
    });

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

// 요약 정보만 업데이트하는 가벼운 함수 (깜빡임 방지)
function updateSummaryOnly() {
    let totalPrice = shoppings.reduce((acc, cur) => acc + (Number(cur.price) * Number(cur.count)), 0);
    let totalCount = shoppings.reduce((acc, cur) => acc + Number(cur.count), 0);
    updateSummary(totalCount, totalPrice);
}

function updateSummary(totalCount, totalPrice) {
    const budget = Number(budgetInput.value);
    const totalCountDisp = document.getElementById('total-count');
    const totalPriceDisp = document.getElementById('total-price');
    const remainCont = document.getElementById('remaining-budget-container');
    const remainDisp = document.getElementById('remaining-budget');
    const priceCont = document.getElementById('total-price-container');

    if(totalCountDisp) totalCountDisp.innerText = totalCount;
    if(totalPriceDisp) totalPriceDisp.innerText = totalPrice.toLocaleString();

    if (budget > 0) {
        remainCont.style.display = 'flex';
        const remaining = budget - totalPrice;
        const isOver = remaining < 0;
        
        remainCont.firstChild.textContent = isOver ? "부족한 금액: " : "남은 예산: ";
        remainDisp.innerText = Math.abs(remaining).toLocaleString() + "원";
        remainCont.style.color = isOver ? "#ff7675" : "#00b894";
        priceCont.className = isOver ? 'over-budget' : '';
    } else {
        remainCont.style.display = 'none';
        priceCont.className = '';
    }
}

function addShopping() {
    const text = shoppingInput.value.trim();
    if (!text) return;

    shoppings.push({
        text: text,
        price: priceInput.value || 0,
        count: countInput.value || 1,
        completed: false
    });

    shoppingInput.value = '';
    priceInput.value = '';
    countInput.value = '1';
    
    // 추가 후 모든 X 버튼 숨기기
    document.querySelectorAll('.clear-btn').forEach(btn => btn.style.display = 'none');
    
    saveAndRender();
}

// 글로벌 함수 등록 (onclick 이벤트용)
window.toggleComplete = (i) => { shoppings[i].completed = !shoppings[i].completed; saveAndRender(); };
window.deleteItem = (i) => { shoppings.splice(i, 1); saveAndRender(); };

function saveAndRender() {
    localStorage.setItem('shopping-list', JSON.stringify(shoppings));
    renderShoppings();
}

addBtn.addEventListener('click', addShopping);
renderShoppings();