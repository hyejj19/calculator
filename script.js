'use strict';

// ELEMENTS
const labelInput = document.querySelector('.input');

const keyClear = document.querySelector('.key--clear');
const keyDelete = document.querySelector('.key--delete');
const keyFunctions = document.querySelectorAll('.key--function');
const keyEquals = document.querySelector('.key--equals');
const keypads = document.querySelectorAll('.keypads');
const keyDot = document.querySelector('.key--dot');

(function () {
  // 계산에 필요한 데이터
  let value = 0;
  let inputValue = '';
  let operatorPre = '';
  let operator = '';

  // 계산 실행 함수
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

    // 출력값의 자릿수 제한
    if (value.toString().length > 12) {
      value = value.toString().slice(0, 13);
    }
    return value.toLocaleString();
  };

  // equals, clear, deleteOne, addDot
  const equals = function () {
    value = labelInput.textContent = operate(operator);
    operator = '';
  };
  const clear = function () {
    value = 0;
    inputValue = '';
    operator = '';
    labelInput.textContent = value;
  };
  const deleteOne = function () {
    inputValue = inputValue.slice(0, -1);
    labelInput.textContent = inputValue || 0;
  };
  const addDot = function () {
    inputValue += '.';
    labelInput.textContent = inputValue;
  };

  // 숫자 입력값 생성
  const setNumber = function (num) {
    if (!isNaN(num) && inputValue.length < 12) {
      inputValue += num;
      labelInput.textContent = inputValue;
    }
  };

  // 연산자 셋팅
  const setOperator = function (key) {
    operatorPre = operator;
    operator = key;
    if (value && inputValue) {
      value = labelInput.textContent = operate(operatorPre);
    }
    value = value || inputValue;
    inputValue = '';
  };

  // 이벤트 리스너
  // 숫자 클릭이벤트 감지
  keypads.forEach((key) => {
    key.addEventListener('click', (e) => {
      let num = e.target.textContent.trim();
      setNumber(num);
    });
  });

  // 연산자 클릭이벤트 감지
  keyFunctions.forEach((key) =>
    key.addEventListener('click', (e) => {
      let key = e.target.textContent.trim();
      setOperator(key);
    })
  );

  // equals, clear, deleteOne 클릭감지
  keyEquals.addEventListener('click', () => {
    equals();
  });
  keyClear.addEventListener('click', () => {
    clear();
  });
  keyDelete.addEventListener('click', () => {
    deleteOne();
  });

  // 키보드 이벤트 감지
  window.addEventListener('keydown', function (e) {
    let key = e.key;
    if (!isNaN(key)) setNumber(key);
    else if (key === '/' || key === '*' || key === '-' || key === '+')
      setOperator(key);
    else if (key === 'Enter') equals();
    else if (key === 'Backspace') deleteOne();
    else if (key === 'Escape') clear();
    else if (key === '.') addDot();
  });

  keyDot.addEventListener('click', () => {
    addDot();
  });
})();
