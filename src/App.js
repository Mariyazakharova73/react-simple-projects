import './index.scss';
import React from 'react';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({ correctAnswer }) {
  return (
    <div className="result">
      <img
        src={
          correctAnswer > 0
            ? 'https://cdn-icons-png.flaticon.com/512/2278/2278992.png'
            : 'https://cdn-icons-png.flaticon.com/512/742/742752.png'
        }
      />
      <h2>{`Вы отгадали ${correctAnswer} ответа из ${questions.length}`}</h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ question, onClickVariant, questionNumber }) {
  const persent = Math.round((questionNumber / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${persent}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((item, index) => (
          <li
            key={item}
            onClick={() => {
              onClickVariant(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [correctAnswer, setCorrectAnswer] = React.useState(0);
  const [selected, setSelected] = React.useState('');

  const question = questions[questionNumber];

  function onClickVariant(index) {
    setQuestionNumber(questionNumber + 1);
    if (index === question.correct) {
      setCorrectAnswer(correctAnswer + 1);
    }
    console.log(correctAnswer);
  }
  return (
    <div className="App">
      {questionNumber !== questions.length ? (
        <Game
          question={question}
          onClickVariant={onClickVariant}
          questionNumber={questionNumber}
          selected={selected}
        />
      ) : (
        <Result correctAnswer={correctAnswer} />
      )}
    </div>
  );
}

export default App;
