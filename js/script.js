const cards = document.querySelectorAll('.cards')
let card1 = null
let card2 = null
let flipCard1 = false
let flipCard2 = true //it will be changed
cards.forEach((card) => {
    card.addEventListener('click', () => {
        const frontCard = card.firstChild.nextSibling
        const backCard = card.lastChild.previousSibling
        backCard.classList.toggle('flip')
        frontCard.classList.toggle('view-hidden')
        // frontCard.classList.toggle('flip')
        backCard.classList.toggle('view-hidden')
        
        if(!flipCard1) {
            flipCard1 = true
            card1 = frontCard
            flipCard2 = false
            return
        }
        if(!flipCard2) {
            card2 = frontCard
            if(card2.isSameNode(card1)) {
                console.log("same node")
                return
            }
            
            flipCard2 = true
        }

        if(card2.isEqualNode(card1)) {
            console.log("We got a match")
            card1.classList.add('view-hidden')
        }
        console.log("card1", card1)
        console.log("card2", card2)
        
    })
})