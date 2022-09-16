const cards = document.querySelectorAll('.cards')
const resetBtn = document.getElementById('reset-btn')
let card1 = null
let card2 = null
let flipCard1 = false
let flipCard2 = true //it will be changed to false when we flip card1
let is_timer_on = false // prevent flipping more than 2 cards
let winnerCounter = 0 //it should reach 3 to score 6 point
let score = 0
let displayScore = document.getElementById('display-score')

cards.forEach((card) => {
    card.addEventListener('click', () => {
        if(is_timer_on) return
        if(card.classList.contains('matched')) return

        const frontCard = card.firstChild.nextSibling
        const backCard = card.lastChild.previousSibling
        backCard.classList.toggle('flip')
        backCard.classList.toggle('view-hidden')
        
        if(!flipCard1) {
            flipCard1 = true
            card1 = {
                "container": card,
                "front": frontCard,
                "back": backCard
            }
            flipCard2 = false
            console.log("flipCard1::: ", card1)
            return
        }
        if(!flipCard2) {
            card2 = {
                "container": card,
                "front": frontCard,
                "back": backCard
            }
            if(card2.front.isSameNode(card1.front)) {
                console.log("same node")
                console.log("flipCard1::: ", card1)
                console.log("flipCard2::: ", card2)
                flipCard1 = false
                return
            }
            
            flipCard2 = true
        }

        if(card2.front.isEqualNode(card1.front)) {
            console.log("We got a match")
            card1.container.classList.add('matched')
            card2.container.classList.add('matched')
            winnerCounter++
        }else {

            
            is_timer_on = true
            setTimeout(() => {  
                card1.back.classList.remove('flip')
                card2.back.classList.remove('flip') 
                card1.back.classList.remove('view-hidden')
                card2.back.classList.remove('view-hidden')
                card1.front.classList.add('view-hidden')
                card2.front.classList.add('view-hidden')
                is_timer_on = false
            }, 1000)
        }
        
        console.log("card1", card1.container)
        console.log("card2", card2.container)
        card1.front = document.createElement('div') //equivalent to null
        card2.front = document.createElement('p') //because isEqualNode gives error if card1 or card2 = null
        flipCard1 = false
        flipCard2 = true
        // console.log("card1", card1)
        // console.log("card2", card2)
        if(winnerCounter === 3) {
            score++
            displayScore.textContent = score
        }
        
    })
})

resetBtn.addEventListener('click', () => {
    winnerCounter = 0
    cards.forEach((card) => {
        card.classList.remove('matched')
        card.lastChild.previousSibling.classList.remove('view-hidden')
        card.lastChild.previousSibling.classList.remove('flip')
    })
})