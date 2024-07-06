const question = [
    {
        num: 1,
        quiz: 'What Is Null in JavaScript?',
        answer: 'Null means absence of a value.',
        option: [
            'Null means empty string value.',
            'Null means absence of a value.',
            'Null means unknown value.',
            'Null means zero value.'
        ]
    },
    {
        num: 2,
        quiz: 'Console.log(typeof typeof 1)',
        answer: 'String',
        option: [
            'String',
            'Number',
            '1',
            'True',
        ]
    },
    {
        num: 3,
        quiz: 'const isTrue=true==[]</br>const isFalse=true==![]</br>console.log(isTrue+isFalse)',
        answer: '0',
        option: [
            'false',
            '0',
            'true',
            '1',
        ]
    },
    {
        num: 4,
        quiz: 'Console.log(018 - 015)',
        answer: '5',
        option: [
            '3',
            'NaN',
            '13',
            '5',
        ]
    },
    {
        num: 5,
        quiz: 'let array=[1,2,3]</br>array[6]=9</br>console.log(array[5])',
        answer: 'undefined',
        option: [
            '1',
            '2',
            '9',
            'undefined',
        ]
    },
    {
        num: 6,
        quiz: 'Console.log(0.1 + 0.2 == 0.3)',
        answer: 'false',
        option: [
            'true',
            '0.3',
            'false',
            'NaN',
        ]
    },
    {
        num: 7,
        quiz: 'function sayHi(){</br>console.log(name)</br>console.log(age)</br>let name="Sarah"</br>let age=21</br>}</br>sayHi()',
        answer: 'undefined and referenceError',
        option: [
            'Sarah and undefined',
            'undefined and referenceError',
            'referenceError and 21',
            'Sarah and referenceError',
        ]
    },
    {
        num: 8,
        quiz: 'Which of the following is Not a JavaScript object?',
        answer: 'const obj = {name = "Tina"}',
        option: [
            'const obj = {name : "Tina"}',
            'const obj = {}',
            'const obj = {name = "Tina"}',
            'const obj = new Object()',
        ]
    },
]
const start = document.querySelector('.start')
const startbox = document.querySelector('.startbox')
const exitbtn = document.querySelector('#exit')
const startquizbtn = document.querySelector('#startquiz')
const quizbox = document.querySelector('.box')
const sptimer = document.querySelector('.timer>span')
const widthline = document.querySelector('.widthtime')
const quiztextbox = document.querySelector('.quiztext')
const quizoptionbox = document.querySelector('.quizoption')
const spcounter = document.querySelector('.counter>p>span')
const nextbtn = document.getElementById('nextbtn')
const resultbox = document.querySelector('.resultbox')
const txt = document.querySelector('.txt')
const btnagain = document.querySelector('.btnagain')
const btnquit = document.querySelector('.btnquit')
let intervaltime = ''
let intervaltimeline = ''
let flag = 0
let numquestion = 1
let CorrectAnswer = 0
//////////// Show Start Box /////////////////
start.addEventListener('click', (e) => {
    startbox.style.display = 'flex'
})
//////////// Show Start Box /////////////////
exitbtn.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.style.display = 'none'
})
startquizbtn.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.style.display = 'none'
    quizbox.style.display = 'flex'
    ///////////////// ADD First Question ///////////////
    timer(15)
    timerline(0)
    quizdata(0)
    questioncounter(1)
})
///////////////// Timer //////////////////////
function timer(time) {
    intervaltime = setInterval(() => {
        sptimer.innerHTML = time
        time--
        if (time > 0) {
            sptimer.innerHTML = time
        }
        else if (time == 0) {
            sptimer.innerHTML = '00'
            clearInterval(intervaltime)
            ///////////////////////////
            let correctAns = question[flag].answer
            const allAns = quizoptionbox.children.length
            for (i = 0; i < allAns; i++) {
                if (quizoptionbox.children[i].textContent == correctAns) {
                    quizoptionbox.children[i].style.backgroundColor = 'rgb(0, 194, 113)'
                    quizoptionbox.children[i].style.border = 'none'
                    console.log('Auto Correct Answer');
                }
                else {
                    quizoptionbox.children[i].style.opacity = '50%'
                }

            }
            for (i = 0; i < allAns; i++) {
                quizoptionbox.children[i].style.pointerEvents = 'none'
            }
            nextbtn.style.display = 'flex'
        }

    }, 1000);
}
///////////// Timer Line ///////////////////
function timerline(timewidth) {
    intervaltimeline = setInterval(() => {
        timewidth += 1
        widthline.style.width = timewidth + 'px'
    }, 28);
}
/////////////// Number Of Questions ////////////////
function questioncounter(index) {
    spcounter.innerHTML = '' + index + ' of ' + question.length + ''
}
////////////////// Fetch Questions //////////////
function quizdata(index) {
    let quiztext = `<span>${question[index].quiz}</span>`
    quiztextbox.innerHTML = quiztext
    let quizoption = `<p>${question[index].option[0]}</p><p>${question[index].option[1]}</p><p>${question[index].option[2]}</p><p>${question[index].option[3]}</p>`
    quizoptionbox.innerHTML = quizoption
    /////////////// active Click Options ////////////////
    const quizanswer = quizoptionbox.querySelectorAll('p')
    quizanswer.forEach((val) => {
        val.addEventListener('click', selectAnswer)
    })
    /////////////// active Click Options ////////////////
}
////////////////// Select Answer ////////////////////////
function selectAnswer() {
    clearInterval(intervaltime)
    clearInterval(intervaltimeline)
    let clickAns = this.textContent
    let correctAns = question[flag].answer
    let allAns = quizoptionbox.children.length
    if (clickAns == correctAns) {
        CorrectAnswer += 1
        this.style.backgroundColor = 'rgb(0, 194, 113)'
        this.style.border = 'none'
        console.log('Correct Answer');
    }
    else {
        this.style.backgroundColor = 'rgb(225, 73, 73)'
        this.style.border = 'none'
        console.log('Incorrect Answer');
        for (i = 0; i < allAns; i++) {
            if (quizoptionbox.children[i].textContent == correctAns) {
                quizoptionbox.children[i].style.backgroundColor = 'rgb(0, 194, 113)'
                quizoptionbox.children[i].style.border = 'none'
                console.log('next select incorret: Correct Answer!');
            }
        }
    }
    for (i = 0; i < allAns; i++) {
        quizoptionbox.children[i].style.pointerEvents = 'none'
    }
    nextbtn.style.display = 'flex'
}
////////////////// Select Answer ////////////////////////
//////////////// Next Click To Next Question //////////////////////
nextbtn.addEventListener('click', (e) => {
    if (flag < question.length - 1) {
        flag++
        numquestion++
        quizdata(flag)
        questioncounter(numquestion)
        clearInterval(intervaltime)
        clearInterval(intervaltimeline)
        timer(16)
        timerline(0)
        e.target.style.display = 'none'
    }
    else {
        clearInterval(intervaltime)
        clearInterval(intervaltimeline)
        showEnd()
    }
})
//////////////// Next Click To Next Question //////////////////////
//////////////// Result Box //////////////////////
function showEnd() {
    resultbox.style.display = 'flex'
    quizbox.style.display = 'none'
    if (CorrectAnswer > 4) {
        txt.innerHTML = 'End Of Quiz<br/> Congrats 🤩, You Answered ' + CorrectAnswer + ' of ' + question.length + ''
    }
    else if (CorrectAnswer > 2) {
        txt.innerHTML = 'End Of Quiz</br>Good Word 😊, You Answered ' + CorrectAnswer + ' of ' + question.length + ''
    }
    else {
        txt.innerHTML = 'End Of Quiz</br>Oh Sorry 😒, You Answered ' + CorrectAnswer + ' of ' + question.length + ''
    }
}
btnagain.addEventListener('click', (e) => {
    e.target.parentElement.style.display = 'none'
    quizbox.style.display = 'flex'
    flag = 0
    quizdata(flag)
    numquestion = 1
    clearInterval(intervaltime)
    clearInterval(intervaltimeline)
    timer(15)
    timerline(0)
    questioncounter(numquestion)
    CorrectAnswer = 0
    nextbtn.style.display = 'none'
})
btnquit.addEventListener('click', () => {
    window.location.reload()
})
//////////////// Result Box //////////////////////