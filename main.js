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

let data = {}; // تعريف المتغير الذي ستخزن فيه البيانات

async function fetchData() {
  try {
    const response = await fetch('words.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json(); // تخزين البيانات في المتغير
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
    let matchingLetters = document.querySelectorAll(".matching-area span")
    let flaseTries = 0
    let tureTries = 0

    clickableLetters.forEach((letter) => {
        letter.addEventListener("click",(e)=> {
            let choice = false

            e.target.classList.add("unclicking")
            let theclicked = e.target.innerHTML.toLowerCase()
            console.log(matchingLettersArray)
            console.log(matchingLettersArray)
            matchingLettersArray.forEach((theLett, index)=> {
                if (theclicked.toLowerCase() == theLett.toLowerCase()) {
                    choice = true
                    matchingLetters.forEach((e,i)=>{
                        if (index === i) {
                            console.log(theLett)
                            e.innerHTML = theclicked
                            // matchingLetters[i].innerHTML = matchingLettersArray[index]
                            tureTries++
                        }
                    })
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
        if (tureTries == document.querySelectorAll(".matching-area .letter").length || flaseTries == 7) {
            document.querySelector(".playing-area").classList.add("unclicking")

            let finishdiv = document.createElement("div")
            finishdiv.classList.add("finish")

            let div = document.createElement("div")
            if (flaseTries == 7) {
                div.appendChild(document.createTextNode(`I lost, try agine`))
            }
            if (tureTries == document.querySelectorAll(".matching-area .letter").length) {
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

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// استدعاء الدالة لجلب البيانات
fetchData();
