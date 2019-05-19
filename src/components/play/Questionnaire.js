import React, { Component } from "react";
// import { Bar, Line, Pie, Polar } from "react-chartjs-2";
import Chart from "../chart/Chart";
import "./style.css";

class Questionnaire extends Component {
  state = {
    correctCount: 0,
    wrongCount: 0,
    answers: []
  };
  answerArr = [];
  data = [
    {
      id: 0,
      question: " What is factorial of 0 (Zero) ?",
      choice1: 1,
      choice2: 0,
      choice3: 2,
      choice4: -1,
      answer: 1
    },
    {
      id: 1,
      question: "What is 100+2 ?",
      choice1: 100,
      choice2: 201,
      choice3: 102,
      choice4: 10,
      answer: 102
    },
    {
      id: 2,
      question: " Find the product of 2 × 3?",
      choice1: 3,
      choice2: 2,
      choice3: 6,
      choice4: 5,
      answer: 6
    },
    {
      id: 3,
      question: "Solve : 24 + 4 - 4",
      choice1: 24,
      choice2: 4,
      choice3: 0,
      choice4: 44,
      answer: 24
    }
  ];

  LoopQuestions = data => {
    const ListItems = data.map((item, index) => (
      <div className="QuestionBlock" key={index}>
        <div>
          <div>
            {item.id + 1}: {item.question}
          </div>
          <select
            className="Question-Select"
            ref={input => {
              this[`textInput${index}`] = input;
            }}
            defaultValue=""
            onChange={event => this.handleChange(event, item.id)}
          >
            <option value="">Select an answer</option>
            <option value={item.choice1}>{item.choice1}</option>
            <option value={item.choice2}>{item.choice2}</option>
            <option value={item.choice3}>{item.choice3}</option>
            <option value={item.choice4}>{item.choice4}</option>
          </select>
        </div>
        {/* <hr className="line" /> */}
      </div>
    ));

    return <div>{ListItems}</div>;
  };

  shouldSubmit = () => {
    this.data.forEach((item, index) => {
      if (this[`textInput${index}`].value === "") {
        this[`textInput${index}`].style.border = "solid 2px red ";
      } else {
        this[`textInput${index}`].style.border = "solid 2px yellow";
      }
    });
  };

  validateAfterChange = index => {
    if (this[`textInput${index}`].value === "") {
      this[`textInput${index}`].style.border = "solid 2px red ";
    } else {
      this[`textInput${index}`].style.border = "solid 2px yellow";
    }
  };

  validateSubmit = () => {
    let check = true;
    this.data.forEach((item, index) => {
      if (this[`textInput${index}`].value === "") {
        check = false;
      }
    });
    return check;
  };

  handleClearButton = () => {
    this.answerArr = [];
    this.setState({
      correctCount: 0,
      wrongCount: 0,
      answerArr: []
    });
    this.data.forEach((item, index) => {
      this[`textInput${index}`].value = "";
      this[`textInput${index}`].style.border = "solid 2px lightblue";
    });
  };
  handleSubmitButton = () => {
    let correctCount = 0;
    let totalQuestionsCount = 0;

    this.shouldSubmit();
    let validation = this.validateSubmit();

    if (validation) {
      this.state.answers.forEach((item, index) => {
        this.data.forEach(element => {
          if (JSON.parse(element.id) === JSON.parse(item.questionID)) {
            totalQuestionsCount = totalQuestionsCount + 1;
            if (JSON.parse(element.answer) === JSON.parse(item.answer)) {
              correctCount = correctCount + 1;
            }
          }
        });
      });
    }

    this.setState({
      correctCount: correctCount,
      wrongCount: totalQuestionsCount - correctCount
    });
  };

  handleChange = (event, id) => {
    this.validateAfterChange(id);
    if (this.find(id) === -1) {
      this.answerArr.push({
        questionID: id,
        answer: event.target.value
      });
    } else {
      this.answerArr = this.filterItem(id);

      this.answerArr.push({
        questionID: id,
        answer: event.target.value
      });
    }

    this.setState({
      answers: this.answerArr
    });
  };

  //FIND
  find(id) {
    let index = -1;

    index = this.answerArr.find(function(item, i) {
      if (item.questionID === id) {
        index = i;
      }
      return index;
    });
    return index;
  }

  filterItem(id) {
    let filteredlist = this.answerArr.filter(item => item.questionID !== id);
    return filteredlist;
  }

  render() {
    return (
      <div className="Questionnaire-Maincontainer">
        <div className="Questionnaire-container-1">
          {this.LoopQuestions(this.data)}
          <button className="button" onClick={this.handleSubmitButton}>
            Submit
          </button>
          <button className="button" onClick={this.handleClearButton}>
            Clear
          </button>
        </div>

        <div className="Questionnaire-container-2">
          <Chart
            correct={this.state.correctCount}
            wrong={this.state.wrongCount}
            data={this.state.chartData}
          />
        </div>
      </div>
    );
  }
}

export default Questionnaire;
