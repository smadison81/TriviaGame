
var game = {

    currentQuestion: 0,
    selectedAnswer: '',
    correctAnswer: '',

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
            'question': 'Name a bird that can\'t fly.',
            'answers': ['eagle', 'chicken', 'dove'],
            'correct': ['chicken']
        }
    ],

    loadQuestion: function(questionElementId,responsesElementId) {

        var qElement = $(`#${questionElementId}`);
        var rElement = $(`#${responsesElementId}`);

        // qElement.innerHTML = this.questions[this.currentQuestion].question;

        $(qElement).html(this.questions[this.currentQuestion].question)

        rElement.empty();

        for(var i = 0; i < this.questions[this.currentQuestion].answers.length; i++){
            $(rElement).append(`<li>${this.questions[this.currentQuestion].answers[i]}</li>`);
        }
    }

    
    
};

game.loadQuestion("question-text","responses");