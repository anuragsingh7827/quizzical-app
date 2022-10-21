import React from "react";
import styles from '../css/StartQuiz.module.css';
import quizzical from '../imgs/quizzical.png'

function StartQuiz(props){
    return (
        <section className={styles.container}>
            <img className={styles.quizzical} src={quizzical} alt="quizzical-logo"/>
            <h2 className={styles.title}>Quizzical</h2>
            <p className={styles.moto}>A one stop platform to test your knowledge.</p>
            <button onClick={props.startHandle} className={styles.startQuizBtn}>Start quiz</button>
        </section>
    )
}

export default StartQuiz;