import { useState } from 'react';

let display, setDisplay;

let deleteSymbol = '\u232b', divideSymbol = '\u00f7', multiplySymbol = '\u00d7';

function App() {
  [display, setDisplay] = useState('0');
  let buttonValues = [
    ['AC', 'C', '^', deleteSymbol],
    ['7', '8', '9', divideSymbol],
    ['4', '5', '6', multiplySymbol],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];
  let buttons = [];
  for(let row of buttonValues) {
    let buttonRow = [];
    for(let buttonValue of row) {
      buttonRow.push(<button className='bg-yellow-300 text-xl my-2.5 h-12 w-12 rounded-full border-2 border-black p-1.5 hover:bg-yellow-500' onClick={()=>handleClick(buttonValue)}>{buttonValue}</button>);
    }
    buttons.push((
      <div className='flex justify-around w-80'>
        {buttonRow}
      </div>
    ));
  }
  return (
    <div className='bg-[#faebd7] min-h-screen flex  flex-col items-center justify-center'>
      <h1 className='text-3xl'>Calculator</h1>
      <span className='bg-white w-80 leading-8 border border-black p-2 text-end text-2xl m-2.5'>{display}</span>
      {buttons}
    </div>
  );
}

let memory = 0, operator = null;
let calculate = {
  '+': (a, b)=>a+b,
  '-': (a, b)=>a-b,
  '^': (a, b)=>a**b,
};
calculate[multiplySymbol] = (a, b)=>a*b;
calculate[divideSymbol] = (a, b)=>a/b;

let lastEntryOperator = false;

function handleClick(value) {
  switch(value) {
    case '.':
        if(display.indexOf('.') === -1) {
          setDisplay(display + value);
        }
        break;
      case deleteSymbol:
        if(display.length > 1) {
          setDisplay(display.substring(0, display.length - 1))
        } else {
          setDisplay('0');
        }
        break;
      case 'C':
        setDisplay('0');
        break;
      case '+':
      case '-':
      case multiplySymbol:
      case divideSymbol:
      case '^':
        if(!lastEntryOperator) {
          if(operator !== null) {
            memory = calculate[operator](memory, Number(display));
            setDisplay(String(memory));
          } else {
            memory = Number(display);
          }
        }
        operator = value;
        lastEntryOperator = true;
        break;
      case '=':
        if(operator !== null) {
          setDisplay(calculate[operator](memory, Number(display)));
          memory = 0;
          operator = null;
        }
        lastEntryOperator = true;
        break;
      case 'AC':
        setDisplay('0');
        lastEntryOperator = false;
        memory = 0;
        operator = null;
        break;
      default:
        if(value >= '0' && value <= '9') {
          if(lastEntryOperator || display === '0') {
            setDisplay(value);
            lastEntryOperator = false;
          } else {
            setDisplay(display + value);
          }
        } 
  }
}

export default App;
