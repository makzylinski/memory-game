var players = ["hernandez.png","lewandowski.png","messi.png","neymar.png","pogba.png","ronaldo.png",
"messi.png","pogba.png","ronaldo.png","neymar.png","hernandez.png","lewandowski.png"];    // 12 items

// ************* Shuffling the players **********

Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

var shuffled = []; 
shuffled = players.shuffle();
//console.log("Po mieszaniu: " + shuffled);



var roundCount = 0;
var counter = 0;
var card1;
var card2;
var lock = false;
var cardsLeft = players.length;

$("#c0").on("click", function(){ revealCard(0); });
$("#c1").on("click", function(){ revealCard(1); });
$("#c2").on("click", function(){ revealCard(2); });
$("#c3").on("click", function(){ revealCard(3); });

$("#c4").on("click", function(){ revealCard(4); });
$("#c5").on("click", function(){ revealCard(5); });
$("#c6").on("click", function(){ revealCard(6); });
$("#c7").on("click", function(){ revealCard(7); });

$("#c8").on("click", function(){ revealCard(8); });
$("#c9").on("click", function(){ revealCard(9); });
$("#c10").on("click", function(){ revealCard(10); });
$("#c11").on("click", function(){ revealCard(11); });

function revealCard(nr)
{
    if(lock == false)
    {
        if(counter % 2 == 0)     // first card
        {
            card1 = shuffled[nr];
            card1Inx = nr;
            $("#c"+nr).html('<img src="img/'+card1+'" />');
            counter++;
            roundCount++;
        }
        else if(counter % 2 != 0)                 // second card
        {
            lock = true;
            card2 = shuffled[nr];                   // name of the player
            var card2Inx = nr;                     // index

            $("#c"+nr).html('<img src="img/'+card2+'" />');
            counter++;
            if(card1 == card2) pair(card1, card2);
            else noPair(card1Inx, card2Inx);
        }    
    }
    $("#footer").html("Current turn: " + roundCount);
}

function isWin()
{
    if(cardsLeft <= 0) $("#welcome").html('<div id="win" style="color:green;">Congratulations, you win!</div>');
}

function pair(c1, c2)
{
    var indexNumber = [2];
    indexNumber[0] = false;
    indexNumber[1] = false;
    cardsLeft = cardsLeft-2;
    isWin();
    for(i=0; i<12; i++)
    {
        if(shuffled[i] == c1)
        {
            if(indexNumber[0] == false) indexNumber[0] = i;
            else indexNumber[1] = i;
        } 

        $("#c"+indexNumber[0]).fadeTo("slow", 0.2);
        $("#c"+indexNumber[0]).addClass("disactive");
        $("#c"+indexNumber[1]).fadeTo("slow", 0.2);
        $("#c"+indexNumber[1]).addClass("disactive");
        lock = false;
        //console.log("indexNumber[0] == " + indexNumber[0] + " indexNumber[1] == " + indexNumber[1]);
    }
    
}

function noPair(c1, c2)
{
    //console.log("noPair, c1 " + c1 + " c2 " + c2);
    setTimeout(function(){ $("#c"+c1).html('<img src="img/card.png" />', lock = false ) }, 2000);
    setTimeout(function(){ $("#c"+c2).html('<img src="img/card.png" />', lock = false ) }, 2000);
   
}

function reload()
{
    document.location.reload()
}