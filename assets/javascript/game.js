 // JavaScript function that wraps everything

 $(document).ready(function() {
    // --------------------------------------------- //
    // ------  Initialize Global Variables --------  //

    //  Set multidimensional array  //
    var castArray = [
        ["Luke", "Jedi", "assets/images/Luke.jpg", 0, 0, true, true, false],
        ["Vader", "Sith", "assets/images/Vader.jpg", 0, 0, true, true, false],
        ["Yoda", "Jedi", "assets/images/Yoda.png", 0, 0, true, true, false],
        ["Maul", "Sith", "assets/images/Maul.jpg", 0, 0, true, true, false],
        ["Mace", "Jedi", "assets/images/Mace.jpg", 0, 0, true, true, false],
        ["Anakin", "Sith", "assets/images/Anakin.jpg", 0, 0, true, true, false],
        ["Rey", "Jedi", "assets/images/Rey.jpg", 0, 0, true, true, false],
        ["Kylo", "Sith", "assets/images/Kylo.jpg", 0, 0, true, true, false]
    ];

    // Stage building variables  //
    var buildClass = "";
    var ib = 0;

    // Selected hero variables   //
    var heroSelected = false;
    var heroName = "";
    var heroTeam = "";
    var heroImg = "";
    var heroMidiScore = 0;
    var heroAttackScore = 0;
    
    // Selected Villian variables  //
    var villainSelected = false;
    var villainName = "";
    var villainTeam = "";
    var villainImg = "";
    var villainMidiScore = 0;
    var villainAttackScore = 0;
    

    // --------------------------------------------- //
    //  --------   Declare global functions ------   //

    //Get random MidiChlorian and Attack scores//
    function getRandomScores() {
            //console.log("The array before scores is: " + castArray);
        for (var i = 0; i < castArray.length; i++) {
            var randomMidi = Math.floor(Math.random()*99) + 10
            var randomAttack = Math.floor(Math.random()*19) + 1;
            castArray[i][3] = randomMidi;
            castArray[i][4] = randomAttack;
        };
            console.log("The array with scores is: " + castArray);
    };


    // Build the cast, villain and battle stages //
    function buildStage (){
            //console.log("Start build " + buildClass + " stage. Repeat: " + castArray.length );
        for (var i = 0; i < castArray.length; i++) {
                //console.log("Start loop. Index: " + i + " second index: " + ib);
            if (castArray[i][ib]) {
                var mainCol = $("<div>");
                var colClass = "col" + buildClass + i ;
                mainCol.addClass("col-md-1");
                mainCol.addClass(colClass);
                    //console.log("Built class name: " + colClass);
                    //console.log("Create column. Index:" + i);
                $("#"+buildClass+"-stage").append(mainCol);
                
                var mainThumb = $("<div>");
                var thumbClass = "thumb"+ buildClass + i;
                mainThumb.addClass("thumbnail");
                mainThumb.addClass("thumb"+buildClass+"Click");
                mainThumb.addClass(thumbClass);
                mainThumb.attr("data-name", castArray[i][0]);
                mainThumb.attr("data-team", castArray[i][1]);
                    //console.log("Built class name: " + colClass);
                    //console.log("Create thumbnail div. Index: " + i);
                $("."+colClass).append(mainThumb);

                var mainImg = $("<img>");
                mainImg.attr("src", castArray[i][2]);
                    //console.log("Create image. Index: " + i + " " + castArray[i][2]);
                $("."+thumbClass).append(mainImg);

                var mainCaption = $("<div>");
                var captionClass = "caption"+ buildClass + i;
                mainCaption.addClass("caption");
                mainCaption.addClass(captionClass);
                    //console.log("Built class name: " + captionClass);
                    //console.log("Create Caption div. Index: " + i );
                $("."+thumbClass).append(mainCaption);


                var mainName = $("<p>");
                mainName.text(castArray[i][0]);
                    //console.log("Create name: Index: " + i + " " + castArray[i][0]);
                $("."+captionClass).append(mainName);

                var mainScore = $("<h3>");
                mainScore.addClass("score"+buildClass);
                mainScore.text(castArray[i][3]);
                    //console.log("Create score: Index: " + i + " " + castArray[i][3]);
                $("."+captionClass).append(mainScore);
            };
        };
    };

    // Check for battle wins  //
    function checkWin(){
            if (heroMidiScore <= 0)  { 
                console.log("You lost...");
                $("#headerBattle").html("You lost the game");
            } 
            else if (villainMidiScore <= 0) {
                console.log("You won!");
                $("#Battle-stage").empty();
                var battleHeader = "";
                var villainLeft = false;
                for (var i=0; i < castArray.length; i++) {
                    // reset the selected battle villain  //
                    if (castArray[i][0] == villainName) {
                        castArray[i][6] = false;
                         castArray[i][7] = false;
                        console.log("Reset the villain");
                        resetVillain();
                    }
                };

                for (var i=0; i < castArray.length; i++) {

                    if (castArray[i][6]) {
                        console.log("Found a villain");  
                        villainLeft = true;
                        battleHeader = "Choose your next battle opponent!";
                    }  
                };

                if (villainLeft) {
                    battleHeader = "Choose your next battle opponent!";
                }
                else {
                    battleHeader = "You have defeated all enemies and won the battle!!!";
                };

                $("#headerBattle").html(battleHeader);
                //console.log("Cast Array after checkWin: " + castArray);
            }
            else {
                console.log("The battle continues");
            }
        };


    //  Reset the villain functions  //
    function resetVillain() {
        villainSelected = false;
        villainName = "";
        villainTeam = "";
        villainImg = "";
        villainMidiScore = 0;
        villainAttackScore = 0;   
    };
    
    // --------------------------------------------- //
    //  --------   Declare event listeners  ------   //

    // Listen for selection of main character   //
     $("#Main-stage").on("click", ".thumbMainClick", function() {
        if (heroSelected) {
            console.log("You have already selected a hero: " + heroSelected);
        } else {        
            heroSelected = true;
            heroName = ($(this).attr("data-name"));
            heroTeam = ($(this).attr("data-team"));
            for (var i = 0; i < castArray.length; i++) {
                if (castArray[i][0] == heroName) {
                    heroImg = castArray[i][2];
                    heroMidiScore = castArray[i][3]; 
                    heroAttackScore = castArray[i][4];
                    castArray[i][6] = false;
                    console.log ("The hero is: " + heroName + " " + heroImg + " " + heroMidiScore + " " + heroAttackScore);
                }
                else if (castArray[i][1] == heroTeam)
                    {   console.log("Array team: " + castArray[i][1] + " hero team: " + heroTeam);
                        castArray[i][5] = false;
                        castArray[i][6] = false;
                    }
                else { castArray[i][5] = false;  }
            }
            console.log("The array after select is: " + castArray);
            console.log("Rebuild main stage with just selected");
        $("#Main-stage").empty();

        buildClass = "Main";
        ib = 5;
        buildStage();
            console.log("Build villian stage with the opposite team");
        buildClass = "Villain";
        ib = 6;
        buildStage();
        }         
     });

 
    // Listen for selection of villain    //
    $("#Villain-stage").on("click", ".thumbVillainClick", function() {
        console.log("You Clicked a villain");   
        if (villainSelected) {
                console.log("You have already selected a villain: " + villainSelected);
        } else {        
            villainSelected = true;
            villainName = ($(this).attr("data-name"));
            villainTeam = ($(this).attr("data-team"));
            for (var i = 0; i < castArray.length; i++) {
                if (castArray[i][0] == villainName) {
                    villainMidiScore = castArray[i][3]; 
                    villainAttackScore = castArray[i][4];
                    castArray[i][6] = false;
                    castArray[i][7] = true;
                    console.log ("The battle villain is: " + villainName + " " + villainImg + " " + villainMidiScore + " " + villainAttackScore);
                }
            }
                
            console.log("The array after select is: " + castArray);
            console.log("Rebuild villain stage without the just selected");
       $("#Villain-stage").empty();
        buildClass = "Villain";
        ib = 6;
        buildStage();

             console.log("Build battle stage just selected");
        $("#headerBattle").html("Prepare to battle!");
        buildClass = "Battle";
        ib = 7;
        buildStage();
        }       
    });

    
    // Listen for Attack buttons  //
    $(".btnAttack").on("click", function(){
        if (heroMidiScore > 0 && villainMidiScore > 0) {
            console.log("Arrrrgh  Attack!!! Hero attack: " + heroAttackScore + " villain attack: " + villainAttackScore);
       
            heroMidiScore = heroMidiScore - villainAttackScore;
            villainMidiScore = villainMidiScore - heroAttackScore;
            heroAttackScore = heroAttackScore + heroAttackScore;
                console.log("Attack complete.  Hero midi: " + heroMidiScore + " hero attack: " + heroAttackScore 
                    + " villain midi: " + villainMidiScore + " villain attack: " + villainAttackScore)
           $(".scoreMain").html(heroMidiScore);
           $(".scoreBattle").html(villainMidiScore);
            checkWin(); 
        } else {
            console.log("Someone has already lost.  Hero: " + heroMidiScore + " Villain: " + villainMidiScore)
        }
    });    

     // Listen for Reset buttons  //
    $(".btnReset").on("click", function(){
        console.log("Oooops I did it again..Reset!!!");
        for(var i=0; i< castArray.length; i++) {
            castArray[i][3] = 0;
            castArray[i][4] = 0;
            castArray[i][5] = true;
            castArray[i][6] = true;
            castArray[i][7] = false;
        };
        buildClass = "";
         ib = 0;

        // Reset Selected hero variables   //
        heroSelected = false;
        heroName = "";
        heroTeam = "";
        heroImg = "";
        heroMidiScore = 0;
        heroAttackScore = 0;
    
        // reset Selected Villian variables  //
        villainSelected = false;
        villainName = "";
        villainTeam = "";
        villainImg = "";
        villainMidiScore = 0;
        villainAttackScore = 0;

        // Empty all stages  //
         $("#Main-stage").empty();
         $("#Villain-stage").empty();
         $("#Battle-stage").empty();
         $("#headerBattle").html("Prepare to battle!");

        // Rebuild the main stage  // 
         getRandomScores();
            console.log("Build stage for first time");
        buildClass = "Main";
        ib = 5;
        buildStage ();
    });  


// --------------------------------------------- //
// ----------  Main program function  ---------  //
        getRandomScores();
            console.log("Build stage for first time");
        buildClass = "Main";
        ib = 5;
        buildStage ();


})  // end document.ready

