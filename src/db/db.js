


const  MathsQues = [
    {
        question: "Which of the following triangles have the same side lengths?",
        options: [
            { answer: "Scalene", isCorrect: false },
            { answer: "Isosceles", isCorrect: false },
            { answer: "Equilateral", isCorrect: true },
            { answer: "None of these", isCorrect: false }
        ]
    },
    {
        question: "Area of an equilateral triangle with side length a is equal to:",
        options: [
            { answer: "√3/2a", isCorrect: false },
            { answer: "√3/2a2", isCorrect: false },
            { answer: "√3/4 a2", isCorrect: true },
            { answer: "√3/4 a", isCorrect: false }
        ]
    },

    {
        question: " The diagonals of a rhombus are 16 cm and 12 cm, in length. The side of rhombus in length is:",
        options: [
            { answer: "10 cm", isCorrect: true },
            { answer: "8 cm", isCorrect: false },
            { answer: "20 cm", isCorrect: false },
            { answer: "9 cm", isCorrect: false }
        ]
    },
    {
        question: "If perimeter of a triangle is 100 cm and the length of two sides are 30 cm and 40 cm, the length of third side will be:",
        options: [
            { answer: "30 cm", isCorrect: true },
            { answer: "40 cm", isCorrect: false },
            { answer: "50 cm", isCorrect: false },
            { answer: "60 cm", isCorrect: false }
        ]
    },
    {
        question: "A circle has a number of tangents equal to",
        options: [
            { answer: 0, isCorrect: false },
            { answer: 1, isCorrect: false },
            { answer: 2, isCorrect: false },
            { answer: "infinite", isCorrect: true }
        ]
    },
    {
        question: " A circle can have _____parallel tangents at a single time.",
        options: [
            { answer: 1, isCorrect: false },
            { answer: 2, isCorrect: true },
            { answer: 3, isCorrect: false },
            { answer: 4, isCorrect: false }
        ]
    },
    {
        question: "A line intersecting a circle in two points is called a _______.",
        options: [
            { answer: "Secant", isCorrect: true },
            { answer: "Chord", isCorrect: false },
            { answer: "Diameter", isCorrect: false },
            { answer: "Tangent", isCorrect: false }
        ]
    },
    {
        question: "The sum of two numbers is 27 and product is 182. The numbers are:",
        options: [
            { answer: "12 and 13", isCorrect: false },
            { answer: "13 and 14", isCorrect: true },
            { answer: "12 and 15", isCorrect: false },
            { answer: "13 and 24", isCorrect: false }
        ]
    },
    {
        question: " In an Arithmetic Progression, if a = 28, d = -4, n = 7, then an is:",
        options: [
            { answer: 4, isCorrect: true },
            { answer: 5, isCorrect: false },
            { answer: 3, isCorrect: false },
            { answer: 7, isCorrect: false }
        ]
    },
    {
        question: " sin 2A = 2 sin A is true when A =",
        options: [
            { answer: "30°", isCorrect: false },
            { answer: "45°", isCorrect: false },
            { answer: "0", isCorrect: true },
            { answer: "60°", isCorrect: false }
        ]
    }

]

const ReactQues = [
    {
        question: "What of the following is used in React.js to increase performance?",
        options: [
            { answer: "Original DOM", isCorrect: false },
            { answer: "Virtual DOM", isCorrect: true },
            { answer: "Both A and B", isCorrect: false },
            { answer: "None of the Above", isCorrect: false }
        ]
    },

    {
        question: "How many ways of defining your variables in ES6?",
        options: [
            { answer: 1, isCorrect: false },
            { answer: 3, isCorrect: true },
            { answer: 4, isCorrect: false },
            { answer: 5, isCorrect: false }
        ]
    },

    {
        question: "What is a state in React?",
        options: [
            { answer: "A permanent storage", isCorrect: false },
            { answer: "Internal storage of the component", isCorrect: true },
            { answer: "External storage of the component", isCorrect: false },
            { answer: "None of the Above", isCorrect: false }
        ]
    },

    {
        question: " What are the two ways to handle data in React?",
        options: [
            { answer: "State & Props", isCorrect: true },
            { answer: "Services & Components", isCorrect: false },
            { answer: "State & Services", isCorrect: false },
            { answer: "State & component", isCorrect: false }
        ]
    },

    {
        question: "In which of the following directory React.js components are saved?",
        options: [
            { answer: "Inside the js/components/", isCorrect: true },
            { answer: "Inside the vendor/components/", isCorrect: false },
            {
                answer: "Inside the external/components/" , isCorrect:false},
            { answer: "Inside the vendor/", isCorrect: false }
        ]
    },

    {
        question:" Which of the following is a must API for every React.js component?",
        options:[
            {answer:"SetinitialComponent",isCorrect:false},
            {answer:"renderComponent",isCorrect:true},
            {answer:"render",isCorrect:false},
            {answer:"All Of the Above", isCorrect:false}
        ]
    },

    {
        question:" Does React.js create a VIRTUAL DOM in the memory?",
        options:[
            {answer:"True",isCorrect:true},
            {answer:"False",isCorrect:false},
            {answer:"Can be true or false",isCorrect:false},
            {answer:"cannot say",isCorrect:false},
        ]
    },

    {
        question:" Which of the following is used to pass data to a component from outside in React.js?",
        options:[
            {answer:"SetState",isCorrect:false},
            {answer:"Render with arguments",isCorrect:false},
            {answer:"Props",isCorrect:true},
            {answer:"PropTypes",isCorrect:false},
        ]
    },

    {
        question:"What does ES6 stand for?",
        options:[
            {answer:"ECMAScript 6",isCorrect:true},
            {answer:"ECMA 6",isCorrect:false},
            {answer:"ECMAJavaScript 6",isCorrect:false},
            {answer:"EJavaScript 6",isCorrect:false},
        ]
    },

    {
        question:"What is true for the keys given to a list of elements in React?",
        options:[
            {answer:"Unique in the DOM.",isCorrect:false},
            {answer:"Unique among the siblings only.",isCorrect:true},
            {answer:"Do not require to be unique.",isCorrect:false},
            {answer:"None of the above.",isCorrect:false},
        ]
    }


]

const JSQues=[
    {
        question:"Javascript is an _______ language?"
        ,
        options:[
            {answer:"Object-Oriented",isCorrect:true},
            {answer:"Object-Based",isCorrect:false},
            {answer:"Procedural",isCorrect:false},
            {answer:"None of the above",isCorrect:false},
        ]
    },

    {
        question:" Which of the following keywords is used to define a variable in Javascript?"
        ,
        options:[
            {answer:"var",isCorrect:false},
            {answer:"let",isCorrect:false},
            {answer:"both var and let",isCorrect:true},
            {answer:"None of the above",isCorrect:false},
        ]
    },

    {
        question:"Which of the following methods can be used to display data in some form using Javascript?"
        ,
        options:[
            {answer:"document.write()",isCorrect:false},
            {answer:"console.log()",isCorrect:false},
            {answer:"window.alert()",isCorrect:false},
            {answer:"All of the above",isCorrect:true},
        ]
    },

    {
        question:"A page designed in HTML is called _____"
        ,
        options:[
            {answer:"Application",isCorrect:false},
            {answer:" Cover page",isCorrect:false},
            {answer:"Front-end",isCorrect:false},
            {answer:"Web Page",isCorrect:true},
        ]
    },

    {
        question:" An HTML document is saved with the ____ extension."
        ,
        options:[
            {answer:".htl",isCorrect:false},
            {answer:".html",isCorrect:true},
            {answer:".hml",isCorrect:false},
            {answer:".htnl",isCorrect:false},
        ]
    },

    {
        question:"The HTML document contains a root tag called ____"
        ,
        options:[
            {answer:"HEAD",isCorrect:false},
            {answer:"Title",isCorrect:false},
            {answer:"Body",isCorrect:false},
            {answer:"HTML",isCorrect:true},
        ]
    },

    {
        question:"If we want to place text around an image, which CSS property should we use?"
        ,
        options:[
            {answer:"push",isCorrect:false},
            {answer:"float",isCorrect:true},
            {answer:"align",isCorrect:false},
            {answer:"wrap",isCorrect:false},
        ]
    },

    {
        question:"Choose the correct HTML tag for a large title."
        ,
        options:[
            {answer:"H1",isCorrect:true},
            {answer:"Heading",isCorrect:false},
            {answer:"head",isCorrect:false},
            {answer:"H6",isCorrect:false},
        ]
    },

    {
        question:"The first page of a website is called _____."
        ,
        options:[
            {answer:"Design page",isCorrect:false},
            {answer:"Home page",isCorrect:true},
            {answer:"Front page",isCorrect:false},
            {answer:"Main page",isCorrect:false},
        ]
    },

    {
        question:"Which of the following selectors selects the checkboxes that is checked or enabled?"
        ,
        options:[
            {answer:"E ~ F",isCorrect:false},
            {answer:" ::after",isCorrect:false},
            {answer:" ::checked",isCorrect:true},
            {answer:"none of the above",isCorrect:false},
        ]
    },
]


export {MathsQues,ReactQues,JSQues}

