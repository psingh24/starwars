$( document ).ready(function() {
var mainArea = $("#main-game-section");
var instructions = $("#instructions");
var instructionsBox = $("#instructionBox");
var herosContainer = $(".heros");
var defenderContainer = $(".defend");

var audio = new Audio('assets/sounds/Lightsaberstart.wav');

var audio2 = new Audio('assets/sounds/Lightsaberclash.wav');

var audio3 = new Audio('assets/sounds/Defenderstheme.mp3');

$(".attack").hide()
$(".restart").hide();
 $(".defend").hide()
 $(".enemyTitle").hide()

//Text Box to show Damage, orginally hidden
var div = $("<div class='col-md-3 box'><p class='characterAttack'>Press Attack to Strike!</p><p class='enemyAttack'></p></div>")
herosContainer.after(div)
div.hide();


// Instructions box, works on second click for some reason
instructions.click(function() {
    instructionsBox.html("<div class='introBox'>Welcome to my Star Wars RPG!! The objective of the game is to defeat all enemies with your\
     hero. Start by picking your hero, then pick one enemy and defeat him/her. Do the same with the other two enemies and you win the game. May the Force be with you.</div>").toggle();
});


function setHalfVolume() {
    var myAudio = document.getElementById("audio1");  
    myAudio.volume = 0.1; 
}
setHalfVolume();

// Characters Object
var characters = {
		anaken: { name: "Anakin Skywalker", health: 100, defenderAttack: 25, image: "assets/images/anaken.png", attack: 10, constant: 10},
		rey: { name: "Rey", health: 120, defenderAttack: 10, image: "assets/images/rey.png", attack: 8, constant: 8},
		kylo: { name: "Kylo Ren", health: 150, defenderAttack: 20, image: "assets/images/kylo.png", attack: 7, constant: 7 },
		maul: { name: "Darth Maul", health: 180, defenderAttack: 20, image: "assets/images/darthmaul.png", attack: 7, constant: 7 }
	};




// select div with class .char and run a function for each
$(".char").each(function() {

    var characterDiv = $(this);

    var value = characterDiv.attr('value');

    var characterState = "<p>" + characters[value].name + "</p>" +
 			"<img class='img' src=" + characters[value].image + " alt=" + characters[value].name + " />" +
 			"<p  >Health: " + characters[value].health + "</p>" + 
 			"<p>Attack: " + characters[value].attack + "</p>" +
            "<p>Counter Attack: " + characters[value].defenderAttack + "</p>"
 			

characterDiv.html(characterState);


	})


 $(".attack").hide()
 $(".defend").hide()
 $(".enemyTitle").hide()


// Click function on every div with class .char
$(".char").click(function() {

    mainArea.css("text-align", "center");
    herosContainer.removeClass("col-md-7");
    herosContainer.addClass("col-md-4");

   
        // if the enemies section is empty do this....
        if ($("#enemies").is(":empty")) {
            // the div click on becomes your hero and is assigned a class hero
            var hero = $(this).addClass("hero");
            //remove the class start from hero div
            hero.removeClass("start");
            hero.removeClass("char");
            $(".choose").html("<h2>Your Hero!</h2>")
           

        }
        // divs with class .char do not have a class of hero do this...
        if ($(".char").not(".hero")) {
            //add the class enemy to these divs
            var enemies = $(".start").addClass("enemy");
            //append these divs to the ememies section
            $("#enemies").append(enemies);
             $(".enemyTitle").show()
            
            

        } 
   
        // div with class enemy is clicked       
        $(".enemy").click(function() {
            //if the defender section is empty do this..
            if ($("#defender").is(":empty")) {
                // the div clicked add class defender
                var defender = $(this).addClass("defender");
                //remove classes of enemy and start
                defender.removeClass("enemy start")
                //append the defender to the defender section
                $("#defender").append(defender);
                $(".attack").show()
                $(".defend").show()
               
                defenderContainer.css("float", "right");

                div.show();
                
            }
        })

        audio.play();
});



//When attack button clicked, do this...
$(".attack").click(function() {



        var value = $(".hero").attr('value');
        
        var attackPower = characters[value].attack;
        var constant = characters[value].constant;
        var heroHealth = characters[value].health
    
        
        
       
        var value2 = $(".defender").attr('value');
        
        var defenderattackPower = characters[value2].defenderAttack;
        console.log(defenderattackPower)
        var defenderHealth = characters[value2].health
    
        if (heroHealth < 0 && defenderHealth < 0) {
            console.log("hello")
        }
       
       


        $(".defender").each(function(){
                  
					var value = $(this).attr('value');
					
					
					//Will display how much damage the defender has given and update the characters stats accordingly
					$(".enemyAttack").html("<p>" + characters[value].name + " attacks you for " + characters[value].defenderAttack + " damage!</p>");
					characters[value].health -= attackPower;
					
					var characterState  = $(this);
 				characterState.html("<p>" + characters[value].name + "</p>" +
 					"<img class='img' src=" + characters[value].image + " alt=" + characters[value].name + " />" +
 					"<p>Health: " + characters[value].health + "</p>" + 
 					"<p>Attack: " + characters[value].attack + "</p>" +
                      "<p>Counter Attack: " + characters[value].defenderAttack + "</p>");
 					

                    if (characters[value].health <= 0) {
                       $(".defender").remove();

                    }

                        if ( $(".char").length <= 0){
                                    $(".attack, .defend, .enemyTitle").hide()
                                    div.hide();
                                //    herosContainer.removeClass("col-md-4");
                                herosContainer.animate({
                                            left: '400px'
                                        });
                                        $(".choose").html("<h1>The Champion!</h1>")

                            

            
        }
                    
        })


                $(".hero").each(function(){
					var value = $(this).attr('value');
					
					
					//Will display how much damage the defender has given and update the characters stats accordingly
					$(".characterAttack").html("<p>" + characters[value].name + " attacks you for " + characters[value].attack + " damage!</p>");
					characters[value].health -= defenderattackPower;
				
					var characterState  = $(this);
 					characterState.html("<p>" + characters[value].name + "</p>" +
 					"<img class='img' src=" + characters[value].image + " alt=" + characters[value].name + " />" +
 					"<p>Health: " + characters[value].health + "</p>" + 
 					"<p>Attack: " + characters[value].attack + "</p>" +
                      "<p>Counter Attack: " + characters[value].defenderAttack + "</p>");
 			


                     if (characters[value].health <= 0) {
                        //  audio3.play();
                          $(".heros").remove();
                          div.hide();
                          $(".attack").hide();
                         
                        defenderContainer.before("<h1>Enemies Win!</h1>")
                        //   defenderContainer.animate({right: '535px', top: '42px'})
                           $(".defeated").hide();
                          
                        //   $("#enemies").animate({bottom: '359px', left: '92px'})
                          $(".enemyTitle").hide();


                        }
                    })


       characters[value].attack += constant;

        audio2.play();
        audio2.volume = 0.2;
    //    characters[value2].attack += 2;
        // var value2 = $(".defender").attr('value');

        // var defenderAttack = characters[value2].counter;
        // var defenderHealth = characters[value2].health;
        // console.log(defenderHealth)
        // $(".enemyAttack").text("Defender attacked for "+ defenderAttack + "!")
        //     defenderHealth -= attackPower;


        
})    
       













       

    // }
// })





// // function rendorCharacter



// function showCharacters() {
//     mainArea.append("<div class='row'><div class='col-md-3 character'><h2>"+characters.anaken.name+"</h2><img src="+characters.anaken.image+" alt='' class='anaken'><h2 class='anakenhealth'>"+characters.anaken.health+"</h2></div>"+
//           "<div class='col-md-3 character'><h2>"+characters.rey.name+"</h2><img src="+characters.rey.image+" alt='' class='rey'><h2 class='reyhealth'>"+characters.rey.health+"</h2></div>"+
//           "<div class='col-md-3 character'><h2>"+characters.kylo.name+"</h2><img src="+characters.kylo.image+" alt='' class='kylo'><h2 class='kylohealth'>"+characters.kylo.health+"</h2></div>"+
//           "<div class='col-md-3 character'><h2>"+characters.maul.name+"</h2><img src="+characters.maul.image+" alt='' class='darthmaul'><h2 class='darthhealth'>"+characters.maul.health+"</h2></div></div>");
// }
// showCharacters();


// $(".character").click(function() {
//     var hero = $(this).addClass("hero");
//     $(this).removeClass("character");

//         mainArea.html("<div class='row'><div class='hero'><img src="+characters.anaken.image+" alt='' class='anaken'></div></div>"+
// 		"<div class='row verus'><button>Attack</button></div>"+
// 		"<div class='row'><div class='enemies'></div></div>")



// })




});










