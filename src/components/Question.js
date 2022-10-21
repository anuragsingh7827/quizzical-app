import React from "react";
import Option from "./Option";
import styles from '../css/Question.module.css';
import jquery from 'jquery';

function Question(props){

    const allShuffledOptions = props.question.options.map(option => <Option 
                                                                optionHandle={props.optionHandle}
                                                                key={option.id}
                                                                questionId={props.question.id} 
                                                                option={option} 
                                                                showAnswers={props.showAnswers}
                                                             />);

    return (
        <section className={styles.container}>
            <p className={styles.question}>{jquery.parseHTML(props.question.questionStatement)[0].data}</p>
            <div className={styles.options}>
                {allShuffledOptions}
            </div>
            <hr className={styles.rule} />
        </section>
    )
}

export default Question;