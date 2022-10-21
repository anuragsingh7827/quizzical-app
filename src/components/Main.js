import React, { useState } from "react";
import yellowBlob from '../imgs/yellowBlob.png';
import blueBlob from '../imgs/blueBlob.png';
import styles from '../css/Main.module.css';
import StartQuiz from "./StartQuiz";
import AllQuestions from "./AllQuestions";


function Main(){
    const [isStarted,setIsStarted] = useState(false);

    function startHandle(){
        setIsStarted(true);
    }

    return (
        <main className={styles.mainContent}>
            <img className={styles.yellowBlob} src={yellowBlob} alt="yellowBlob"/>
            {isStarted ? <AllQuestions/> : <StartQuiz startHandle={startHandle}/>}
            <img className={styles.blueBlob} src={blueBlob} alt="blueBlob"/>
        </main>
    )
}

export default Main;