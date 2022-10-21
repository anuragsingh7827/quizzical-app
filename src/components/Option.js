import React from "react";
import styles from '../css/Option.module.css';

function Option(props){
    let stylings = "";
    if(props.option.isClicked) stylings += `${styles.optionClicked}`;
    else stylings += `${styles.option}`;

    if(props.showAnswers){
        stylings += ` ${styles.disabledEvents}`;
        if(!props.option.isClicked && props.option.isCorrect) stylings += ` ${styles.correctNotClickedOption}`
        else if(props.option.isCorrect) stylings += ` ${styles.correctClickedOption}`; 
        else if(props.option.isClicked && (!props.option.isCorrect)) stylings += ` ${styles.incorrectOption}`;
    }
    
    return (
        <button onClick={() => props.optionHandle(props.questionId,props.option.id)} 
                className={stylings}>
            {props.option.optionValue}
        </button>
    )
}


export default Option;