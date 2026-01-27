const startButton = document.querySelector('.start_btn');
const openBtn = document.querySelector('.modal_btn');
const closeBtn = document.querySelector('.close_btn');
const shareButton = document.querySelector('.share_btn');
const result = document.querySelector('.result');
const modal = document.querySelector('#modal');
const loading = document.querySelector('.result_loading');

function calculator() {
  const fieldValue = document.querySelector("#field_value");
  const timeValue = document.querySelector("#text_value"); // ID 수정 (#time_value -> #text_value)
  const timeValue_int = Number(timeValue.value);

  const fieldResult = document.querySelector(".field_result");
  const timeResult = document.querySelector(".time_result");

  // .value가 비어있는지 확인할 대상을 입력창(fieldValue)으로 변경
  if(fieldValue.value == '') {
    alert('분야가 입력되지 않았습니다.');
    fieldValue.focus();
    return false;
  } else if(timeValue.value == '') {
    alert('시간이 입력되지 않았습니다.');
    timeValue.focus();
    return false;
  } else if(timeValue_int > 24) {
    alert('잘못된 값입니다. 24이하의 값을 입력해 주세요.');
    return false;
  }

  result.style.display = 'none'; // 오타 수정
  loading.style.display = 'flex';

  setTimeout(function() {
    loading.style.display = 'none';
    result.style.display = 'flex';
    fieldResult.innerText = fieldValue.value;
    // 1만 시간을 하루 훈련 시간으로 나눔
    timeResult.innerText = Math.floor(10000 / timeValue_int);
  }, 1800);
}

function handleOpenModal() {
  modal.style.display = 'flex';
}

function handleCloseModal() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if(event.target == modal) {
    handleCloseModal();
  }
}

function copyUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('URL이 복사되었습니다.');
  });
}

// 이벤트 리스너 연결 (변수명 일치시킴)
shareButton.addEventListener('click', copyUrl);
openBtn.addEventListener('click', handleOpenModal);
closeBtn.addEventListener('click', handleCloseModal);
startButton.addEventListener('click', calculator);