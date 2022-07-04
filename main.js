const questions = [
	{
		question: "The capital of France?",
		answers: ["Prague", "Vienna", "Budapest", "Paris"],
		correct: 4,
	},
	{
		question: "What language is spoken in Brazil?",
		answers: [
			"Brazilian",
			"Portuguese",
			"English",
			"Chinese",
		],
		correct: 2,
	},
	{
		question: "Which ocean washes the shores of Spain?",
		answers: [
			" Atlantic Ocean",
			"Pacific Ocean ",
			"Neither answer is correct",
			"Indian Ocean",
		],
		correct: 1,
	},
	{
		question: "In what year did World War II start?",
		answers: ["1935", "1945", "1939", "Neither answer is correct"],
		correct: 3,
	},
];

//Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные игры
let score = 0; // Number of correct answers at the beginning.
let questionIndex = 0; //Question number on the list.

clearPage();
showQuestions()
submitBtn.onclick = checkAnswer;

function clearPage (){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestions(){
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace("%title%" , questions[questionIndex]['question'])
	headerContainer.innerHTML = title

	//Варианты ответов ->
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']){

		const questionTemplate = `
				<li>
					<label>
						<input value =%numberValue% type="radio" class="answer" name="answer" />
							<span>%answer%</span>
					</label>
				</li>`

		const answerHTML = questionTemplate
										.replace('%answer%', answerText )	
										.replace('%numberValue%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}

	
}

function checkAnswer (){

	// находим выбранную радиокнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	if (!checkedRadio) {
		submitBtn.blur();
	}else {
		//Узнаем номер ответа пользователя
		const userAnswer = +checkedRadio.value;

		// Сравниваем ответ пользователя с истинным ответом.
		if(userAnswer === questions[questionIndex]['correct']){
			score++;
		}

		if(questionIndex !== questions.length - 1){
			questionIndex++;
			clearPage();
			showQuestions();
		}else{
			clearPage();
			showResults();
		}

	}



}

function showResults (){

	const resultsTemplate = `
						<h2 class="title">%title%</h2>
						<h3 class="summary">%message%</h3>
						<p class="result">%result%</p>
							`;

	let title, message;

	if(score === questions.length){
		title = 'Great'
		message = 'You answered all the questions correctly'
	} else if((score * 100) / questions.length >= 50) {
		title = 'Good '
		message =' There is an opportunity to learn more'
	} else {
		title = 'Bad result'
		message = 'You performed poorly'
	}

	let result = `${score} correct answers from  ${questions.length}`;

	//Фин ответ
	const finalMessage = resultsTemplate
										.replace ('%title%', title)
										.replace ('%message%', message)
										.replace ('%result%', result)

	headerContainer.innerHTML = finalMessage;
	submitBtn.blur()
	submitBtn.innerText = 'Start over';
	submitBtn.onclick = () => history.go()
}



