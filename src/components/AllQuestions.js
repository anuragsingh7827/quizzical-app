import React, { useEffect, useState } from "react";
import axios from 'axios';
import { nanoid } from 'nanoid';
import styles from '../css/AllQuestions.module.css';
import Question from "./Question";

function AllQuestions(){

    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [score,setScore] = useState(0);
    const [showAnswers,setShowAnswers] = useState(false);
    const [refetch,setRefetch] = useState(true);

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    useEffect(() => {
        async function fetchQuestions(){
            const response = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple');
            setIsLoading(false);
            setData(() => {
                return response.data.results.map(questionObj => {
                    // console.log(questionObj.correct_answer);
                    const options = shuffle([...questionObj.incorrect_answers,questionObj.correct_answer])
                                    .map(option => {
                                        return {
                                            id: nanoid(),
                                            optionValue: option,
                                            isClicked: false,
                                            isCorrect: option === questionObj.correct_answer
                                        }
                                    });
                    return {
                        id: nanoid(),
                        questionStatement: questionObj.question,
                        correctAnswer: questionObj.correct_answer,
                        options: options
                    }
                });
            });
        }
        fetchQuestions();
    },[refetch]);

    function optionHandle(questionId, optionId){
        setData(prevData => {
            return prevData.map(question => {
                if(questionId === question.id){
                    const newOptions = question.options.map(option => {
                        return optionId === option.id ? 
                                {...option, isClicked: !option.isClicked}:
                                {...option, isClicked: false}
                    });
                    return {
                        ...question,
                        options: newOptions
                    }
                }else return question;
            });
        });

    }

    function checkAnswersHandle(){
        setScore(() => {
            return data.reduce((acc,curr) => {
                return acc + curr.options.some(option => option.isClicked && option.isCorrect);
            },0);
        });
        setShowAnswers(true);
    }


    function newQuizHandle(){
        setRefetch(prevFetch => !prevFetch);
        setIsLoading(true);
        setScore(0);
        setShowAnswers(false);
    }

    let showScore = null;
    if(showAnswers){
        showScore = <div className={styles.results}>
                        <span className={styles.score}>You scored {score}/5 correct answers</span>
                        <button className={styles.playAgainBtn} onClick={newQuizHandle}>Play again</button>
                    </div>
    }else{
        showScore = <button onClick={checkAnswersHandle} className={styles.checkAnswersBtn}>check answers</button>
    }

    let allQuestions = null;
    if(isLoading){
        allQuestions =  <div className={styles.container}>
                            <div className={styles.outerLoader}></div>
                            <div className={styles.innerLoader}></div>
                        </div>
    }else{
        allQuestions =  <section className={styles.allQuestions}>
                            {data.map(question => <Question 
                                                key={question.id} 
                                                question={question} 
                                                optionHandle={optionHandle}
                                                showAnswers={showAnswers}
                                        />)}
                            {showScore}
                        </section>
    }

    return (
        allQuestions
    )
}

export default AllQuestions;