import React, { useState, useRef } from 'react';
import './App.css';

export default function App(){
  const [questions, setQuestions] = useState([
    {
      questionText: 'Corgi stands for:',
      questionAnswers: [
        {question: 'Dwarf dog', 
        isCorrect: true},
        {question: 'Long genius', 
        isCorrect: false},
        {question: 'Tail lacking', 
        isCorrect: false},
        {question: 'Smallest friend', 
        isCorrect: false},
  
      ]
    },
    {
      questionText: 'The Corgis ancestor is the:',
      questionAnswers: [
        {question: 'Dachshund', 
        isCorrect: false},
        {question: 'Huskey', 
        isCorrect: false},
        {question: 'Bloodhound', 
        isCorrect: false},
        {question: 'Swedish Vallhund', 
        isCorrect: true},
  
      ]
    },
    {
      questionText: 'Corgis used to be bred for this job:',
      questionAnswers: [
        {question: 'Sled Puller', 
        isCorrect: false},
        {question: 'Herding', 
        isCorrect: true},
        {question: 'Hunting', 
        isCorrect: false},
        {question: 'Truffle Hunters', 
        isCorrect: false},
  
      ]
    },
    {
      questionText: 'In Welsh legend, Corgis were mighty steeds for what magical creature?',
      questionAnswers: [
        {question: 'Fairies', 
        isCorrect: true},
        {question: 'Orcs', 
        isCorrect: false},
        {question: 'Monkey men', 
        isCorrect: false},
        {question: 'Gnomes', 
        isCorrect: false},
  
      ]
    }
  ]);

  const form = useRef(null);

  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  const [gameScreen, setGameScreen] = useState('quizStart');
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const answerQuestion = (answer, question) => {
    if(answer.isCorrect === true){
      setScore(score + 1);
    } else {
      const questionFromWrongAnswer = question.questionText;
      const rightAnswer = question.questionAnswers.filter((num) => num.isCorrect === true);
      const newWrongAnswers = [...wrongAnswers, [questionFromWrongAnswer,' ', rightAnswer[0].question]];
      setWrongAnswers(newWrongAnswers);
    }

    if(questionNum < questions.length){
      setQuestionNum(questionNum + 1);
    } else {
      setGameScreen('quizEnd');
    }

  }

  const buildQuizStart = () => {
    setQuestions([]);
    setGameScreen('quizBuild');
  }

  const buildQuiz = (info) => {
    info.preventDefault();

    if(info.target[0].value === "" || info.target[1].value === "" || info.target[3].value === "" || info.target[5].value === "" || info.target[7].value === "" || (info.target[2].checked === false  && info.target[4].checked === false && info.target[6].checked === false && info.target[8].checked === false)){
      alert("One or more inputs are empty, please fill them in!");
      return;
    }

    const newQuestion = {
      questionText: info.target[0].value,
      questionAnswers: [
        {question: info.target[1].value, 
        isCorrect: info.target[2].checked},
        {question: info.target[3].value, 
        isCorrect: info.target[4].checked},
        {question: info.target[5].value, 
        isCorrect: info.target[6].checked},
        {question: info.target[7].value, 
        isCorrect: info.target[8].checked}
      ]
    }
    const newQuestions = [...questions, newQuestion]
    setQuestions(newQuestions);


    if(questionNum < 4){
      setQuestionNum(questionNum + 1);
    } else {
      setQuestionNum(1);
      setGameScreen('quizBuildDone');
    }
    // console.log(info);
    // console.log(newQuestion);
    // console.log(questions);
    form.current.reset();
  }

  const resetQuiz = () => {
    setScore(0);
    setQuestionNum(1);
    setGameScreen('');
    setWrongAnswers([]);
  }

  return(
      <div className='App'>
        {(() => {
          switch (gameScreen) {

            case 'quizEnd':
              return (
                <div className="quiz">
                  <h2 className="quiz-title">You got {score} out of {questions.length} questions right.</h2>
                  <h3 className="quiz-subtext">Questions you got wrong and their correct answer:</h3>
                  {wrongAnswers.map((answer, index) => {
                    return(
                      <div>
                        <div key={index}>{answer}</div>
                        <br/>
                      </div>
                    )
                  })}
                  <button onClick={() => resetQuiz()} className="btn">Reset the quiz</button>
                </div>
              )

            case 'quizActive':
              return (
                <div className="quiz">
                  <div>
                    <h3 className="quiz-subtext">Question {questionNum} / {questions.length}</h3>
                    <h2 className="quiz-title">{questions[questionNum -1].questionText}</h2>
                  </div>
                  <div className="button-flex">
                    <button onClick={() => {answerQuestion(questions[questionNum -1].questionAnswers[0], questions[questionNum -1])}} className="btn">{questions[questionNum -1].questionAnswers[0].question}</button>
                    <button onClick={() => {answerQuestion(questions[questionNum -1].questionAnswers[1], questions[questionNum -1])}} className="btn">{questions[questionNum -1].questionAnswers[1].question}</button>
                    <button onClick={() => {answerQuestion(questions[questionNum -1].questionAnswers[2], questions[questionNum -1])}} className="btn">{questions[questionNum -1].questionAnswers[2].question}</button>
                    <button onClick={() => {answerQuestion(questions[questionNum -1].questionAnswers[3], questions[questionNum -1])}} className="btn">{questions[questionNum -1].questionAnswers[3].question}</button>
                  </div>
                </div>
              )

              case 'quizBuild':
                return (
                  <div className="quiz">
                    <div>Question {questionNum} / 4</div>
                    <h2 className="quiz-title">Fill in quiz Questions and Answers</h2>
                      <form onSubmit={(info) => buildQuiz(info)} ref={form}>
                        <h3 className="quiz-subtext">Question:</h3>
                        <input className='input question-input'/>
                        <div>
                          <h3 className="quiz-subtext">Answers and mark which is true:</h3>
                          <div>
                            <input className='input'/>
                            <input type='radio' name='true-false' className='radio'/>
                          </div>
                          <div>
                            <input className='input'/>
                            <input type='radio' name='true-false' className='radio'/>
                          </div>
                          <div>
                            <input className='input'/>
                            <input type='radio' name='true-false' className='radio'/>
                          </div>
                          <div>
                            <input className='input'/>
                            <input type='radio' name='true-false' className='radio'/>
                          </div>
                        </div>
                        
                        {questionNum === 4 
                        ? <button type='submit' className="btn">Finish building Quiz!</button>
                        : <button type='submit' className="btn">Next Question</button>}
                        
                      </form>
                  </div>
                )

              case 'quizBuildDone':
                  return (
                    <div className="quiz">
                      <h2 className="quiz-title">Building Quiz Completed!</h2>
                      <button onClick={() => setGameScreen('quizActive')} className="btn"> Start the quiz!</button>
                    </div>
                  )  
            
            default:
              return (
                <div className="quiz">
                  <h1 className="quiz-title">Test your knowledge of Corgis<br/>or Build your own quiz</h1>
                  <h2 className="quiz-subtext">Test your knowledge of your favorite dog breed</h2>
                  <button onClick={() => setGameScreen('quizActive')} className="btn"> Start the quiz</button>
                  <button onClick={() => buildQuizStart()} className="btn"> Build my own quiz</button>
                </div>
              )
          }})()}
        
  </div>
  )
}




// case 'quizEnd':
//   return (
//     <div className="quiz">
//       <h2 className="quiz-title">You got {score} out of {questions.length} questions right.</h2>
//       <h3 className="quiz-subtext">Questions you got wrong and their correct answer:</h3>
//       {wrongAnswers.map((answer, index) => {
//         return(
//           <div>
//             <div key={index}>{answer}</div>
//             <br/>
//           </div>
//         )
//       })}
//       <button onClick={() => resetQuiz()} className="btn">Reset the quiz</button>
//     </div>
//   )