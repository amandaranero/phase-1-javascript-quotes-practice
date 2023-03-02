
document.addEventListener("DOMContentLoaded", ()=>{

//add form
const newQuoteForm = document.getElementById("new-quote-form")

newQuoteForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const newQuoteObj ={
        quote: newQuoteForm.quote.value,
        author: newQuoteForm.author.value
    }
    addQuote(newQuoteObj)
})

fetch("http://localhost:3000/quotes?_embed=likes")
        .then((resp)=> resp.json())
        .then((quotes)=> {
            quotes.forEach(addQuote)
        })

function addQuote(quote){
    //add quote
    const quoteList = document.getElementById("quote-list")
    const quoteCard = document.createElement("li")
    quoteCard.className = "quote-card"
    quoteList.append(quoteCard)
    
    //add blockquote
    const blockquoteElement = document.createElement("blockquote")
    blockquoteElement.className = "blockquote"
    quoteList.append(blockquoteElement)

    //add quote
    const quoteContent = document.createElement("p")
    quoteContent.className = "mb-0"
    quoteContent.innerText = quote.quote
    quoteCard.append(quoteContent)

    //add footer
    const quoteFooter = document.createElement("footer")
    quoteFooter.className = "blockquote-footer"
    quoteFooter.innerText = quote.author
    blockquoteElement.append(quoteFooter)

    //add break?
    const blockBreak = document.createElement("br")
    blockquoteElement.append(blockBreak)

    //add button and span
    const likeButton = document.createElement("button")
    likeButton.className = "btn-success"
    likeButton.innerText = "Likes:"
    blockquoteElement.append(likeButton)
    const likeNumber = document.createElement("span")
    likeNumber.innerText = 0 //always MAKES a string, a number that then makes into a string through HTML
    likeButton.append(likeNumber)
    
    //add delete button
    const deleteButton = document.createElement("button")
    deleteButton.className = "btn-danger"
    deleteButton.innerText = "Delete"
    blockquoteElement.append(deleteButton)

    //CLICK LIKE AND DELETE BUTTONE VENTS

    //increase likes// ONLY ADDING ONE!
    likeButton.addEventListener("click", ()=>{
        const currentNumber = parseInt(likeNumber.innerText) //have to parseInt bc it is a string from the innerText = number
                                                            //not variable from an array (i.e quote.id)
        likeNumber.innerText = currentNumber + 1
    })  
    //delete Button
    deleteButton.addEventListener("click", ()=>{
        quoteCard.remove() 
    })

   //THINK I ADDED QUOTE TO WRONG PLACE, BUT LETS ADD THE FORM FIRST!!!! THEN TRYING THE DELETE AGAIN

}



})