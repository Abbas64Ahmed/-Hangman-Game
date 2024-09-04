let lettersErea = document.querySelector(".letters-area")
let matchingErea = document.querySelector(".matching-area")

let letters = "abcdefghijklmnopqrstuvwxyz"
let arrayOfLetter = Array.from(letters)


// creat letter and add it to dom
arrayOfLetter.forEach((letter) => {
    let span = document.createElement("span")
    span.appendChild(document.createTextNode(letter))
    span.classList.add("letter")
    lettersErea.appendChild(span)
})

const data = {
    technologies: ["JavaScript", "Python", "Java", "Swift", "React", "Angular", "Vue", "Nodejs", "TensorFlow"],
    countries: ["Egypt", "France", "Germany", "Japan", "China", "India", "Australia"],
    celebrities: ["Leonardo DiCaprio", "Meryl Streep", "Tom Hanks", "Angelina Jolie", "Robert Downey Jr", "Scarlett Johansson", "Dwayne Johnson", "Brad Pitt"],
    foods: ["Pizza", "Sushi", "Pasta", "Burger", "Tacos", "Curry", "Biryani", "Pho", "Falafel", "Sushi"]
};

let arrayOfKeys = Object.keys(data)
 
let randomNumToArray = Math.floor(Math.random() * arrayOfKeys.length)
let randomKey = arrayOfKeys[randomNumToArray]

let randomNumToValue = Math.floor(Math.random() * data[randomKey].length)
let randomValue = data[randomKey][randomNumToValue]
console.log(randomValue)

document.querySelector(".info-header .word-from span").innerHTML = randomKey;

let matchingLettersArray = Array.from(randomValue)

// add matchingLetters to dom
matchingLettersArray.forEach((letter)=> {
    let span = document.createElement("span")
    if (letter === " ") {
        span.classList.add("space")

    } else {
        span.classList.add("letter")
    }
    matchingErea.appendChild(span)
})

let clickableLetters = document.querySelectorAll(".playing-area .letters-area .letter")
let matchingLetters = document.querySelectorAll(".matching-area .letter")
let flaseTries = 0
let tureTries = 0

clickableLetters.forEach((letter) => {
    letter.addEventListener("click",(e)=> {
        let choice = false

        e.target.classList.add("unclicking")
        // console.log(e.target.innerHTML.toLowerCase())
        let theclicked = e.target.innerHTML.toLowerCase()

        matchingLettersArray.forEach((theLett, index)=> {
            if (theclicked === theLett.toLowerCase()) {
                matchingLetters[index].innerHTML = matchingLettersArray[index]
                choice = true
                tureTries++
            } 
        })

        if (choice !== true) {
            flaseTries++
            document.querySelector(".playing-area .the-hangman-img").classList.add(`the-false${flaseTries}`)
            document.querySelector(".fail-sound").play()
            gamefinish()
        } else {
            document.querySelector(".success-sound").play()
            gamefinish()
        }
    })
})

function gamefinish() {
    if (tureTries == matchingLettersArray.length || flaseTries == 7) {
        document.querySelector(".playing-area").classList.add("unclicking")

        let finishdiv = document.createElement("div")
        finishdiv.classList.add("finish")

        let div = document.createElement("div")
        if (flaseTries == 7) {
            div.appendChild(document.createTextNode(`I lost, try agine`))
        }
        if (tureTries == matchingLettersArray.length) {
            div.appendChild(document.createTextNode(`I won with ${flaseTries} mistakes.`))
        }
        div.classList.add("finish-msg")

        let span = document.createElement("span")
        span.classList.add("retry")
        span.appendChild(document.createTextNode("retry"))

        div.appendChild(span)

        finishdiv.appendChild(div)

        document.body.appendChild(finishdiv)
        document.querySelector(".retry").addEventListener("click", ()=> {
            window.location.reload()
        })
    }
}