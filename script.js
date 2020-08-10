// const { get } = require("lodash");

document.addEventListener("DOMContentLoaded", function () {


    const baseAPI = "https://deckofcardsapi.com/api/deck"
    
// request a single card from a newly shuffled deck
    
    let shuffleDraw1 = axios.get(`${baseAPI}/new/draw/?count=1`);
    shuffleDraw1 
        .then(res => {
            let suit = res.data.cards[0].suit;
            let cardNum = res.data.cards[0].value;
            console.log(cardNum + ' of ' + suit)
        })
        .catch(err => console.log(err));

// request a single card from a newly shuffled deck - then make a
// request to get one more card from the same deck


    let shuffleDraw2 = axios.get(`${baseAPI}/new/draw/?count=2`);
    shuffleDraw2
        .then(res => {
            let suit1 = res.data.cards[0].suit;
            let cardNum1 = res.data.cards[0].value;
            let deckID = res.data.deck_id
            console.log(cardNum1 + " of " + suit1);
            return axios.get(`${baseAPI}/${deckID}/draw/?count=1`);
        })
        .then(res => {
            console.log(res.data)
            let suit2 = res.data.cards[0].suit;
            let cardNum2 = res.data.cards[0].value;
            console.log(cardNum2 + " of " + suit2);
        })


})