let sum00 = add(10, 5); // 정의된 함수는 저 밑에 있는데 연산이 됩니다.
console.log(sum00);



// 함수의 정의
function add(a, b) {
  let sum = a + b;
  return sum;
}
// 함수의 호출
let sumNum = add(1, 2);
console.log(sumNum);

/**
 * calcSum과 calcAvg를 정의하세오.
 * 실행 예
 * 총합은 55입니다.
 * 평균은 5.5입니다.
 */
scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function calcSum(scoreArray) {
  let sum = 0;
  for(const score of scoreArray) {
    sum += score;
  }
  return sum;
}

function calcAvg(scoreArray) {
  let sum = calcSum(scoreArray);
  let avg = sum / scoreArray.length;
  return avg;
}
let sumScore = calcSum(scores);
console.log(sumScore);
let avgScore = calcAvg(scores);
console.log(avgScore);


function printScores(scoreArray) {
  let sum = calcSum(scoreArray);
  let avg = calcAvg(scoreArray);
  console.log('총합은 ' + sum + ' 입니다.')
  console.log('평균은 ' + avg + ' 입니다.')
}
printScores(scores);
// 함수(메서드) 하나 당 기능은 한 개씩