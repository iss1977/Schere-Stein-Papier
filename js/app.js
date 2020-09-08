var computerScore = 0;
var humanScore =0 ;

var human_choise = "";
var computer_choise = "";


$( document ).ready(function() {
    displayScore();
    console.log( "ready!" );

   
    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
          console.log(modal, trigger);
        },
        complete: function() { 
            computerScore= 0; 
            humanScore =0 ;

            displayScore();

         } // Callback for Modal close
      }); //  init the modal window
    
    // initialy hide the 2 win logos
    $("#computer-wins").hide();
    $("#human-wins").hide();   


});

$( "#player-schere" ).click( ()=> playerChoosesAItem("schere"));
$( "#player-stein" ).click( ()=> playerChoosesAItem("stein"));
$( "#player-papier" ).click( ()=> playerChoosesAItem("papier"));


function displayScore(){
    $("#computer-score").html(computerScore);
    $("#human-score").html(humanScore);

    if (computerScore>=3 || humanScore>=3){
        if (computerScore>humanScore){
            $("#modal-win-header").html("Computer wins !!!!");
            $("#modal-win-text").html("You are a loser ....");
        }
        if (computerScore<humanScore){
            $("#modal-win-header").html("YOU WON !!!!");
            $("#modal-win-text").html("Congratulations....");
        }
        
        $('#modal1').modal('open');
    }
    
}

function playerChoosesAItem(item){
    $("body").css("pointer-events","none");

    human_choise = item;
    console.log(item);

    if(item =="schere"){
        $("#player-schere").addClass("active-choice");
        $("#player-stein").removeClass("active-choice");
        $("#player-papier").removeClass("active-choice");
    }
    if(item =="stein"){
        $("#player-schere").removeClass("active-choice");
        $("#player-stein").addClass("active-choice");
        $("#player-papier").removeClass("active-choice");
    }
    if(item =="papier"){
        $("#player-schere").removeClass("active-choice");
        $("#player-stein").removeClass("active-choice");
        $("#player-papier").addClass("active-choice");
    }

    // computer may also choose schere, stein, papier ....

    let choise = Math.floor(Math.random() * 3)+1;

    switch(choise) {
        case 1:
            var computer_choise = "schere";
            $("#computer-schere").addClass("active-choice");
            $("#computer-stein").removeClass("active-choice");
            $("#computer-papier").removeClass("active-choice");
          break;
        case 2:
            var computer_choise = "stein";
            $("#computer-schere").removeClass("active-choice");
            $("#computer-stein").addClass("active-choice");
            $("#computer-papier").removeClass("active-choice");
          break;
        case 3:
            var computer_choise = "papier";
            $("#computer-schere").removeClass("active-choice");
            $("#computer-stein").removeClass("active-choice");
            $("#computer-papier").addClass("active-choice");
            break;
        default:
            computer_choise = "error"
    }

    console.log(computer_choise);


// Regel:
// Schere gewinnt gegen Papier
// Papier gewinnt gegen Stein
// Stein gewinnt gegen die Schere
// Hat einer drei Mal gewonnen, wird das Spiel beendet

let winner = -1 ; /* 0 - tie ; 1 - computer wins ; 2 - human wins*/

switch(human_choise){
    case "schere":
        switch(computer_choise){
            case "schere":
                winner = 0;
                break;
            case "stein": // computer wins
                winner = 1;
                break;
            default:  // computer loses
                winner = 2;
        }
        break;
    case "stein":
        switch(computer_choise){
            case "stein":
                winner = 0;
                break;
            case "papier": // computer wins
                winner = 1;
                break;
            default:  // computer loses
                winner = 2;
        }
        break;
    case "papier":
            switch(computer_choise){
                case "papier":
                    winner = 0;
                    break;
                case "schere": // computer wins
                    winner = 1;
                    break;
                default:  // computer loses
                    winner = 2;
            }
            break;
}

switch(winner){
    case 0:
        console.log("TIE!");
        $("#computer-wins").hide();
        $("#human-wins").hide();
        break;
    case 1:
        console.log("Computer wins!");
        computerScore++;
        $("#computer-wins").show();
        $("#human-wins").hide();
        break;

    case 2:
        console.log("Human wins!");
        humanScore++;
        $("#computer-wins").hide();
        $("#human-wins").show();
        break;
    default:
        console.log("Error at establishing the winner");
}   

displayScore();

    setTimeout(
        function() 
        {
            console.log("1 second")
            $("body").css("pointer-events","auto");

            $("#computer-wins").hide();
            $("#human-wins").hide();

            $("#computer-schere").removeClass("active-choice");
            $("#computer-stein").removeClass("active-choice");
            $("#computer-papier").removeClass("active-choice");

            $("#player-schere").removeClass("active-choice");
            $("#player-stein").removeClass("active-choice");
            $("#player-papier").removeClass("active-choice");

        }, 500);
    
      

}




