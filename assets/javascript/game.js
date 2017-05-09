$(document).ready(function () {
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
    var textdiv = $("<div class='col-md-3 box'><p class='characterAttack'>Press Attack to Strike!</p><p class='enemyAttack'></p></div>")
    herosContainer.after(textdiv)
    textdiv.hide();


    // Instructions box, works on second click for some reason
    instructions.click(function () {
        instructionsBox.html("<div class='introBox'>Welcome to my Star Wars RPG!! The objective of the game is to defeat all enemies with your\
                             hero. Start by picking your hero, then pick one enemy and defeat him/her. Do the same with the other two enemies\
                             and you win the game. May the Force be with you.</div>").toggle();
    });

    //Sets the main themes Volume, need to convert this to Jquery
    function setHalfVolume() {
        var myAudio = document.getElementById("audio1");
        myAudio.volume = 0.1;
    }
    setHalfVolume();

    // Characters Object
    var characters = {
        anaken: { name: "Anakin Skywalker", health: 100, defenderAttack: 25, image: "assets/images/anaken.png", attack: 10, increased: 10 },
        rey: { name: "Rey", health: 120, defenderAttack: 10, image: "assets/images/rey.png", attack: 8, increased: 8 },
        kylo: { name: "Kylo Ren", health: 150, defenderAttack: 20, image: "assets/images/kylo.png", attack: 7, increased: 7 },
        maul: { name: "Darth Maul", health: 180, defenderAttack: 5, image: "assets/images/darthmaul.png", attack: 5, increased: 5 }
    };


// select div with class .char and run a function for each
$(".char").each(function () {
        //assigns each character the own value
        var characterDiv = $(this);
        var value = characterDiv.attr('value');
        //Places all stats and info of character to the proper Div
        var characterState = "<p>" + characters[value].name + "</p>" +
            "<img class='img' src=" + characters[value].image + " alt=" + characters[value].name + " />" +
            "<p  >Health: " + characters[value].health + "</p>" +
            "<p>Attack: " + characters[value].attack + "</p>" 
         characterDiv.html(characterState);
    })


 
// Click function on every div with class .char// Main Area that assigns charcters to proper places on the page-------------------------------------------
$(".char").click(function () {

        mainArea.css("text-align", "center");
        herosContainer.removeClass("col-md-7");
        herosContainer.addClass("col-md-4");


 // if the enemies section is empty do this....
        if ($("#enemies").is(":empty")) {
            // the div clicked on becomes your hero and is assigned a class hero
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
        $(".enemy").click(function () {
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
                textdiv.show();

            }
        })
        //play initial lightsaber sound
        audio.play();
    });



//When attack button clicked, do this...MAIN ATTACKING SECTION----------------------------------------------------------
    $(".attack").click(function () {
        //new variable to asign the value to the hero class
        var value = $(".hero").attr('value');
        // Uses the[value] of the hero to determine the attck, health and attack is increased by this every time you attack
        var attackPower = characters[value].attack;
        var increased = characters[value].increased;
        var heroHealth = characters[value].health



        //New variable for the Defender
        var value2 = $(".defender").attr('value');
        // Uses the[value2] of the defender to determine the attack, health 
        var defenderattackPower = characters[value2].defenderAttack;
        var defenderHealth = characters[value2].health
        //Have to figure out when both hero and defender hit 0 health
        if (heroHealth < 0 && defenderHealth < 0) {
            console.log("hello")
        }



        //The defender section-------------------------------------------
        $(".defender").each(function () {
            //this is the defender currently selected
            var value = $(this).attr('value');


            //Targets the textbox and displays the amout of damage the defender has dealt
            $(".enemyAttack").html("<p>" + characters[value].name + " attacks you for " + characters[value].defenderAttack + " damage!</p>");
            //Subtracts the heros health by the attackPower of the defender
            characters[value].health -= attackPower;
            //character state defines the defender section and updates stats and health, this is the defender div
            var characterState = $(this);
            characterState.html("<p>" + characters[value].name + "</p>" +
                "<img class='img' src=" + characters[value].image + " alt=" + characters[value].name + " />" +
                "<p>Health: " + characters[value].health + "</p>" +
                "<p>Attack: " + characters[value].attack + "</p>" );

            // defender health is less than or equal to 0 remove him from that section
            if (characters[value].health <= 0) {
                $(".defender").remove();
            }
            // If the no enemies with the class char are left the game is over
            if ($(".char").length <= 0) {
                //hide all titles, buttons, textbox
                $(".attack, .defend, .enemyTitle").hide()
                textdiv.hide();
                //animates the hero container to center stage
                herosContainer.animate({
                    left: '400px'
                });

                $(".choose").html("<h1>The Champion!</h1>")
                //targets the restart button and reloads the pag on click
                $(".restart").show();
                $(".restart").click(function () { location.reload() });
            }

        })

        //The hero section --------------------------------------------------------
        $(".hero").each(function () {
            //the value is the hero
            var value = $(this).attr('value');


           //UPdates the textbox with the heros attack
            $(".characterAttack").html("<p>" + characters[value].name + " attacks you for " + characters[value].attack + " damage!</p>");
             ////Subtracts the heros health by the attackPower of the defender
            characters[value].health -= defenderattackPower;
            //character state defines the hero section and updates stats and health, this is the defender div
            var characterState = $(this);
            characterState.html("<p>" + characters[value].name + "</p>" +
                "<img class='img' src=" + characters[value].image + " alt=" + characters[value].name + " />" +
                "<p>Health: " + characters[value].health + "</p>" +
                "<p>Attack: " + characters[value].attack + "</p>" );


            //If ther hero health is 0 or less do this...
            if (characters[value].health <= 0) {
                //play dark theme
                 audio3.play();
                //  $(".source").attr("src", '#') // trying to figure out how to stop the main theme to stop playing
                //removes the herp container, hides the textbox and the attack button
                $(".heros").remove();
                textdiv.hide();
                $(".attack").hide();
                //Appends a h1 tag to the beginning of the defender Container
                defenderContainer.before("<h1>Enemies Win!</h1>")
                //   defenderContainer.animate({right: '535px', top: '42px'})
                $(".defeated").hide();

                //   $("#enemies").animate({bottom: '359px', left: '92px'})
                $(".enemyTitle").hide();
                  //targets the restart button and reloads the pag on click
                $(".restart").show();
                $(".restart").click(function () { location.reload() });

            }
        })

        //increases the heros attack by an certain amount after every click
        characters[value].attack += increased;
        //light saber sound
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










