1번
가
(kor+eng+math) / 3;

나
boolean pass = (avg >= 60) ? true : false;
            if(pass == true){
                System.out.println("합격");
            } else {
                System.out.println("불합격");
            }
        System.out.println(pass);

2번
가
public void showInfo() {
    System.out.println("이름: " + name + ", 나이: " + age);
}
나
public boolean isAdult() {
    boolean checkAge;
        if (age > 20) {
            checkAge = true;
            System.out.println(checkAge);
        } else {
            checkAge = false;
            System.out.println(checkAge);
        }
        return (checkAge);
    }

3번
가

나
int price1 = 10000;
        int qty1 = 2;
        int price2 = 5000;
        int qty2 = 1;

        int total = 0;
        int total2 = 0;
// 1. 상품1 금액 계산
        total = price1 * qty1;

// 2. 상품2 금액 계산
        total2 = price2 * qty2;

// 3. 결과 출력
        System.out.println("총 금액: " + (total+total2) + "원");




응용
1번
가
for(int i = 0; i < scores.length; i++) {
            sum += scores[i];
        }

나
for(int i = 0; i < scores.length; i++) {
            if(scores[i] < 80) {
                continue;
            } else {
                System.out.print(scores[i] + " ");
            }
        }



1. 문제점
함수 레벨 스코프 - if문이나 for문 등 블록 내에 선언해도 블록을 무시하고 함수 전체 또는 전역에서 접근 가능하여 변수의 값이 의도와 다르게 바뀔 수 있음.
변수 중복 선언 가능 - 동일한 변수명으로 여러번 선언해도 에러가 발생하지 않음
호이스팅 - 변수 선언이 코드의 최상단으로 끌어올려지고 변수에 값이 없으면 undefined 리턴(오류 안나고 실행됨). 논리적 오류 유발
전역변수 남발

해결방안
var 대신 let, const 사용

2. 
tombName으로 '태조'를 선언 및 초기화 하였는데, 값이 없는 tomb를 생성하면서 선언하며 var를 사용하여 undefined가 출력됨.
tomb를 tombName으로 바꿔서 생성
const { birth, name,tombName, death } = king;

3. console.log(userMap); 은 userMap이라는 Map()인데 Map()은 콜백함수에서 return을 사용하지 않으면 해당 요소에 대해 undefined를 반환함. user.id = user.id * 2;을 return user.id = user.id * 2;으로 수정해주면 됨.


users.map(user =>){return user.id = user.id * 2;} users.map에 user라는 function이 user.id*2를 user.id에 재대입한다고 볼 수 있음. 그러므로 users.map의 키 값인 id: numder에 *2 연산이 된 값이 재대입되어 출력됨. 위의 return user.id = user.id * 2; -> return user.id*2로 수정하면 userMap에만 *2연산이 된 값이 대입되고 기존의 users의 id에는 대입되지 않게됨.