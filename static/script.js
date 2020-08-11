document.addEventListener("DOMContentLoaded", function () {

    const baseAPI = "https://deckofcardsapi.com/api/deck";
    let deckId = null;
    let draw = $("#draw");
    let cards = $("#cards");


    // request a single card from a newly shuffled deck

    let shuffleDraw1 = axios.get(`${baseAPI}/new/draw/?count=1`);
    shuffleDraw1
        .then((res) => {
            let suit = res.data.cards[0].suit;
            let cardNum = res.data.cards[0].value;
            console.log(cardNum + " of " + suit);
        })
        .catch((err) => console.log(err));

    // request a single card from a newly shuffled deck - then make a
    // request to get one more card from the same deck

    let shuffleDraw2 = axios.get(`${baseAPI}/new/draw/?count=2`);
    shuffleDraw2
        .then((res) => {
            let suit1 = res.data.cards[0].suit;
            let cardNum1 = res.data.cards[0].value;
            let deckID = res.data.deck_id;
            console.log(cardNum1 + " of " + suit1);
            return axios.get(`${baseAPI}/${deckID}/draw/?count=1`);
        })
        .then((res) => {
            console.log(res.data);
            let suit2 = res.data.cards[0].suit;
            let cardNum2 = res.data.cards[0].value;
            console.log(cardNum2 + " of " + suit2);
        });


        let shuffle = axios.get(`${baseAPI}/new/shuffle/`);
        shuffle
        .then((res) => {
            let deckId = res.data.deck_id;
            draw.show();
        })

    $.getJSON(`${baseAPI}/new/shuffle/`).then((data) => {
      deckId = data.deck_id;
      draw.show();
    });



    // create game

    let deck = axios.get(`${baseAPI}/new/shuffle/`);
    deck 
    .then((res) => {
        res.data.deck_id;
        draw.show()
    })

    draw.on("click", function () {
        $.getJSON(`${baseAPI}/${deckId}/draw/`).then((data) => {
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        cards.append(
            $("<img>", {
            src: cardSrc,
            css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
            },
            })
        );
        if (data.remaining === 0) draw.remove();
        });
    });
})
