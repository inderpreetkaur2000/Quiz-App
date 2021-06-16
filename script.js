const quizQuestions = [

    {
        question: "Q1: The reason for using pointers in a Cprogram is",
        a: " Pointers allow different functions to share and modify their local variables.",
        b: " To pass large structures so that complete copy of the structure can be avoided.",
        c: "Pointers enable complex “linked” data structures like linked lists and binary trees.",
        d: "All of the above",
        ans: "ans4"
    },
    {
        question: "2. What does the following C-statement declare? int ( * f) (int * ) ;",
        a: "A function that takes an integer pointer as argument and returns an integer.",
        b: "A function that takes an integer as argument and returns an integer pointer.",
        c: "A pointer to a function that takes an integer pointer as argument and returns an integer.",
        d: "A function that takes an integer pointer as argument and returns a function pointer",
        ans: "ans3"
    },
    {
        question: "3. In the below statement, ptr1 and ptr2 are uninitialized pointers to int i.e. they are pointing to some random address that may or may not be valid address :- int* ptr1, ptr2;",
        a: "True",
        b: "False",
        c: "Invalid syntax",
        d: "Both b and c",
        ans: "ans2"
    }
    ,
    {
        question: `4. What does the following expression means ? char ∗(∗(∗ a[N]) ( )) ( );`,
        a: " a pointer to a function returning array of many pointers to function returning character pointers.",
        b: "a function return array of N pointers to functions not returning pointers to characters",
        c: "an array of n pointers to function returning pointers to characters",
        d: " an array of n pointers to function returning pointers to functions returning pointers to string.",
        ans: "ans3"
    }
];

const infoBox = document.querySelector(".info_box");
const continueBtn = document.querySelector(".buttons .continue");
const quizBox = document.querySelector(".inner-container");
const timeCount = quizBox.querySelector(".timer .timer_sec");

const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector("#submit");
const resultBox = document.querySelector(".result-box");
const restartQuiz = document.querySelector(".result-box-buttons .restart");


const answers = document.querySelectorAll(".answer");
const showScore = document.querySelector ("#showScore");
let questionCount = 0;
let score = 0;
let counter;
let timeValue = 60;


// If continue button clicked
continueBtn.onclick = ()=>{
    quizBox.classList.add("activequiz"); // show the quizbox
    infoBox.classList.add("hide");
    startTimer(60);
    
} 

const loadQuestion = () => {
    const questionList = quizQuestions[questionCount];
    question.innerText = questionList.  question;
    
    option1.innerText= questionList.a;
    option2.innerText= questionList.b;
    option3.innerText= questionList.c;
    option4.innerText= questionList.d; 
}
loadQuestion();

const getCheckAnswer = () => {
    let answer;
    answers.forEach((curAnsElem) =>{
        if(curAnsElem.checked){
            answer = curAnsElem.id;
        }
    });
    return answer;
};

const deselectAll = () => {
    answers.forEach((curAnsElem) => curAnsElem.checked = false );
}

submit.addEventListener("click", () => {
    const checkedAnswer = getCheckAnswer();
    console.log(checkedAnswer);

    if(checkedAnswer === quizQuestions[questionCount].ans){
        score++;
    };
    
    questionCount++;

    deselectAll(); 

    if(questionCount < quizQuestions.length){
        loadQuestion();
        clearInterval(counter);
        startTimer(timeValue);
        
    }
    else{
       resultBox.classList.add("activeresult");
       quizBox.classList.remove("activequiz");
       finalResult();
    }
});
restartQuiz.addEventListener("click",function(){
    location.reload();
})

function finalResult(){
    
    resultBox.querySelector(".total-question").innerHTML = quizQuestions.length;
    resultBox.querySelector(".total-correct").innerHTML = score;
    resultBox.querySelector(".total-wrong").innerHTML = quizQuestions.length - score;
    const percentage = (score/quizQuestions.length)*100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed() + "%";
    resultBox.querySelector(".total-score").innerHTML = score + "/" + quizQuestions.length;
}
function startTimer(time){
    counter= setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time<0){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}