var game = {

    // the current question index
    currentQuestion: 0,

    // the selected answer text.
    selectedAnswer: '',

    // the correct answer text.
    correctAnswer: '',

    // the id for the question element.
    questionHolder:'',

    // the id for the answer element.
    answerHolder:'',

    // collection of question objects.
    questions: [{
            'question': 'how are you?',
            'answers': ['good', 'super', 'okay'],
            'correct': ['good']
        },
        {
            'question': 'Is the earth round?',
            'answers': ['maybe', 'no', 'yes'],
            'correct': ['yes']
        },
        {
            'question': 'Did I spend enough time on this project',
            'answers': ['maybe', 'no', 'yes'],
            'correct': ['no']
        },
        {
            'question': 'Did i find out what a Promise is',
            'answers': ['no', 'no', 'a lil'],
            'correct': ['a lil']
        },
        {
            'question': 'Did i forget to put a timer on the questions?',
            'answers': ['maybe', 'no', 'yes'],
            'correct': ['yes']
        },
        {
            'question': 'What grade do i deserve,',
            'answers': ['A', 'B', 'C'],
            'correct': ['C']
        },
        {
            'question': 'Is this going to loop to the first question without giving a results area?',
            'answers': ['maybe', 'no', 'definetly'],
            'correct': ['definetly']
        }
    ],

    // load the question details into the display elements.
    loadQuestion:function(questionElementId,responsesElementId) {

        // obtain a reference to the game elements.
        this.questionHolder = questionElementId;
        this.answerHolder = responsesElementId;

        // the question element will display each question text.
        var qElement = $(`#${questionElementId}`);
        
        // the option list will hold potential answers.
        var rElement = $(`#${responsesElementId}`);

        /*
            jQuery stores elements in an array, so the first element in the array
            is the display element that we want to update.
        */
        qElement[0].innerHTML = this.questions[ this.currentQuestion ].question;

        // clear current answers.
        rElement.empty();

        /*
            Iterate over current answers and add a radio button for each answer.
            set the value of the radio button to the index of the answer in the array.
        */
        for(var i = 0; i < this.questions[ this.currentQuestion ].answers.length; i++){

            rElement.append( `<input type='radio' onClick="game.selectAnswer(this.value);" name='answers' value='${i}'>&nbsp;&nbsp;${this.questions[ this.currentQuestion ].answers[i]}</input><br/>` );
        }
    },

    selectAnswer:function( answerIndex ){

        // the selected answer.
        this.selectedAnswer = this.questions[ this.currentQuestion ].answers[ answerIndex ];

        // the correct answer.
        this.correctAnswer = this.questions[ this.currentQuestion ].correct;

        // evaluate whether the selection and the correct answer match.
        if( this.selectedAnswer == this.correctAnswer ){
            // success message
            $('#messages').html("<div id='correctResponseAlert' class='alert alert-success hide' role='alert'><strong>Awesome!</strong> that's correct.</div>");
            
        } else {
            // failure message.
            $('#messages').html("<div id='incorrectResponseAlert' class='alert alert-danger hide' role='alert'><strong>Oops!</strong> that's incorrect.</div>");
        }
        
        // wait five seconds then proceed to the next question.
        sleep(5000).then(() => {
           this.nextQuestion();
        });
    },

    // load the next question.
    nextQuestion:function(){

        // is the current question the last question in the array?
        var startOver = this.currentQuestion == this.questions.length - 1;

        // if we've reached the last question, start over with the first question.
        // set currentQuestion to 0 (the first question in the array).
        if(startOver){
            this.currentQuestion = 0;
        } else {
            // otherwise set the currentQuestion to the next question in the array.
            this.currentQuestion = this.currentQuestion + 1;
        }

        // clear the messages element. This should be passed in and referenced.
        $('#messages').html("");

        // load the next question by referencing the saved question and answer holders..
        this.loadQuestion(this.questionHolder,this.answerHolder);
    }
};

// sleep time expects milliseconds.
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}