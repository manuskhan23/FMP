      const firebaseConfig = {
        apiKey: "AIzaSyB2rDaq_INH9u9nSWc5EScCSr0lEwvhNJc",
        authDomain: "add-to-cart-31355.firebaseapp.com",
        databaseURL: "https://add-to-cart-31355-default-rtdb.firebaseio.com",
        projectId: "add-to-cart-31355",
        storageBucket: "add-to-cart-31355.firebasestorage.app",
        messagingSenderId: "222810400449",
        appId: "1:222810400449:web:98f8daca88d3e79c779640",
        measurementId: "G-5E4R6VX5EF"
      };
      firebase.initializeApp(firebaseConfig);
      const db = firebase.database();
      var questions = [
        { question: "Q1: HTML Stands for?", option1: "Hyper Text Markup Language", option2: "Hyper Tech Markup Language", option3: "Hyper Touch Markup Language", corrAnswer: "Hyper Text Markup Language" },
        { question: "CSS Stands for", option1: "Cascoding Style Sheets", option2: "Cascading Style Sheets", option3: "Cascating Style Sheets", corrAnswer: "Cascading Style Sheets" },
        { question: "Which tag is used for most large heading", option1: "<h6>", option2: "<h2>", option3: "<h1>", corrAnswer: "<h1>" },
        { question: "Which tag is used to make element unique ", option1: "id", option2: "class", option3: "label", corrAnswer: "id" },
        { question: "Any element assigned with id, can be get in css ", option1: "by # tag", option2: "by @ tag", option3: "by & tag", corrAnswer: "by # tag" },
        { question: "CSS can be used with ______ methods ", option1: "8", option2: "3", option3: "4", corrAnswer: "3" },
        { question: "In JS variable types are ____________ ", option1: "6", option2: "3", option3: "8", corrAnswer: "8" },
        { question: "In array we can use key name and value ", option1: "True", option2: "False", option3: "None of above", corrAnswer: "False" },
        { question: "toFixed() is used to define length of decimal ", option1: "True", option2: "False", option3: "None of above", corrAnswer: "True" },
        { question: "push() method is used to add element in the start of array ", option1: "True", option2: "False", option3: "None of above", corrAnswer: "False" },
      ];
      var quesElement = document.getElementById("ques");
      var option1 = document.getElementById("opt1");
      var option2 = document.getElementById("opt2");
      var option3 = document.getElementById("opt3");
      var nextBtn = document.getElementById("btn");
      var timeElement = document.getElementById("time");
      var index = 0;
      var score = 0;
      var min = 1;
      var sec = 59;
      function timer() {
        timeElement.innerHTML = `${min}:${sec < 10 ? "0" + sec : sec}`;
        sec--;
        if (sec < 0) {
          min--;
          sec = 59;
          if (min < 0) nextQuestion();
        }
      }
      setInterval(timer, 1000);
      function loadQuestion() {
        var q = questions[index];
        quesElement.innerText = q.question;
        option1.innerText = q.option1;
        option2.innerText = q.option2;
        option3.innerText = q.option3;
      }
      loadQuestion();
      function trigger() {
        nextBtn.disabled = false;
      }
      function nextQuestion() {
        var allInputs = document.querySelectorAll("input[name='options']");
        var userSelectedValue = null;
        allInputs.forEach((input) => {
          if (input.checked) {
            userSelectedValue = input.value;
            input.checked = false;
          }
        });
        if (userSelectedValue) {
          var selectedOption = questions[index]["option" + userSelectedValue];
          var correctAnswer = questions[index]["corrAnswer"];
          db.ref("QuizData").push({
            question: questions[index].question,
            userAnswer: selectedOption,
            correctAnswer: correctAnswer
          });
          if (selectedOption === correctAnswer) score++;
        }
        index++;
        nextBtn.disabled = true;
        min = 1;
        sec = 59;
        if (index < questions.length) {
          loadQuestion();
        } else {
          saveResult();
        }
      }
      function saveResult() {
        const total = questions.length;
        const wrong = total - score;
        const percentage = ((score / total) * 100).toFixed(2) + "%";
        db.ref("QuizResults").push({
          totalQuestions: total,
          correct: score,
          wrong: wrong,
          percentage: percentage,
          date: new Date().toLocaleString()
        });
        if (score >= 8){
          Swal.fire({
          title: "Exellent!",
          html: `
            <b>Total:</b> ${total}<br>
            <b>Correct:</b> ${score}<br>
            <b>Wrong:</b> ${wrong}<br>
            <b>Percentage:</b> ${percentage}
          `,
          icon: "success"
        });
        }else if(score < 8 && score >= 5){
          Swal.fire({
          title: "Need Improvement!",
          html: `
            <b>Total:</b> ${total}<br>
            <b>Correct:</b> ${score}<br>
            <b>Wrong:</b> ${wrong}<br>
            <b>Percentage:</b> ${percentage}
          `,
          icon: "warning"
        });
        }else{
          Swal.fire({
          title: "Failed!",
          html: `
            <b>Total:</b> ${total}<br>
            <b>Correct:</b> ${score}<br>
            <b>Wrong:</b> ${wrong}<br>
            <b>Percentage:</b> ${percentage}
          `,
          icon: "error"
        });
        }
      }