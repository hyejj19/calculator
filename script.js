'use strict';

// ELEMENTS
const labelInput = document.querySelector('.input');

const keyClear = document.querySelector('.key--clear');
const keyDelete = document.querySelector('.key--delete');
const keyFunctions = document.querySelectorAll('.key--function');
const keyEquals = document.querySelector('.key--equals');
const keypads = document.querySelectorAll('.keypads');
const keyDot = document.querySelector('.key--dot');

const keyDivide = document.querySelector('.key--divide');
const keyMultiply = document.querySelector('.key--multiply');
const keyMinus = document.querySelector('.key--minus');
const keyPlus = document.querySelector('.key--plus');

(function () {
  let value = 0;
  let inputValue = '';
  let operatorPre = '';
  let operator = '';

  const pressNumbers = function () {};

  // 숫자 키패드
  keypads.forEach((key) => {
    key.addEventListener('click', () => {
      if (!isNaN(Number(key.textContent)) && inputValue.length < 12) {
        inputValue += key.textContent.trim();
        labelInput.textContent = inputValue;
      }
    });
  });

  // Operator
  const operate = function (operator) {
    value = Number(value);
    inputValue = Number(inputValue);

    switch (operator) {
      case '/':
        value /= inputValue;
        break;
      case '*':
        value *= inputValue;
        break;
      case '-':
        value -= inputValue;
        break;
      case '+':
        value += inputValue;
        break;
    }

    if (value.toString().length > 12) {
      value = value.toString().slice(0, 13);
    }
    return value;
  };

  // Function Key
  for (let i = 0; i < keyFunctions.length; i++) {
    keyFunctions[i].addEventListener('click', () => {
      operatorPre = operator;
      operator = keyFunctions[i].textContent.trim();
      if (value && inputValue) {
        value = labelInput.textContent = operate(operatorPre);
      }
      value = value || inputValue;
      inputValue = '';
    });
  }

  //Equals
  keyEquals.addEventListener('click', () => {
    value = labelInput.textContent = operate(operator);
    operator = '';
  });

  // Clear
  keyClear.addEventListener('click', () => {
    value = 0;
    inputValue = '';
    operator = '';
    labelInput.textContent = value;
  });

  // Delete
  keyDelete.addEventListener('click', () => {
    inputValue = inputValue.slice(0, -1);
    labelInput.textContent = inputValue || 0;
  });
})();

//TODO
/* 
  1. 이퀄 키를 누르지 않아도, 연속해서 연산키를 누를 때 누적하여 계산, 이 때 연산키의 값이 누르는 키에 따라 동적으로 변화하여야 함.
  ===> 이전 오퍼레이터 값을 Pre 변수에 저장해두고, value와 input이 둘 다 있을 때 이전값을 작동하여 value로 업데이트 하도록 코드 작성.
  
  2. 추가 입력값 없이 서로 다른 연산키를 중복해서 누를 때, oprator 값을 바꿔서 연산 수행
  ===> 1번을 해결하여 자동으로 같이 해결됨. 

  3. 계산값이 소수점으로 나올 때, 12자리에서 끊기도록 반올림하여 표시
  ===> 길이를 체크하여 조건을 만족할 시 잘리도록 구현
*/

//
// 4. . 소수점 표기 활성화
// 5. 키보드 이벤트 활성화
// 6. 숫자 보기 쉽도록 자릿수마다 중간 쉼표 넣기.

// for (let i = 0; i < keypads.length; i++) {
//   keypads[i].addEventListener('click', () => {
//     if (!isNaN(Number(keypads[i].textContent)) && inputValue.length < 12) {
//       inputValue += keypads[i].textContent.trim();
//       labelInput.textContent = inputValue;
//     }
//   });
// }
