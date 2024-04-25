//<----------------------------------------------------------------------( Game Configuration )----------------------------------------------------------------------------------------------------------->

var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Set gravity
            debug: false // Set debug mode for physics
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//<----------------------------------------------------------------------( Game Initialization )---------------------------------------------------------------------------------------------------------->

var game = new Phaser.Game(config);

//<----------------------------------------------------------------------( Global Variables )------------------------------------------------------------------------------------------------------------->
let sky;
let bg1, bg2, bg3, bg4;


var duck;
var stars;
var bombs;
var platforms;
var walls;
var cursors;
let keyA, keyS, keyD, keyW;
var score = 0;
var gameOver = false;
var scoreText;
var launchButton;
var restartButton; // New restart button variable
var thrust = -800;

var day = 0;
var signPost;
var dayText;

//<----------------------------------------------------------------------( wings )------------------------------------------------------------------------------------------------------------->
var wings; // Initialize wings variable
var wingBut; // Initialize wingBut variable
var wingButstate = false; // Set wingBut state to false

var wings1; // Initialize wings variable
var wingBut1; // Initialize wingBut variable
var wingBut1state = false; // Set wingBut state to false

var wings2; // Initialize wings variable
var wingBut2; // Initialize wingBut variable
var wingBut2state = false; // Set wingBut state to false

var wings3; // Initialize wings variable
var wingBut3; // Initialize wingBut variable
var wingBut3state = false; // Set wingBut state to false

//<----------------------------------------------------------------------( Pads )------------------------------------------------------------------------------------------------------------->

//<----------------------------------------------------------------------( Pads )------------------------------------------------------------------------------------------------------------->
var padBut1; // Initialize wingBut variable
var padBut1state = false; // Set wingBut state to false
var padBut2; // Initialize wingBut variable
var padBut2state = false; // Set wingBut state to false
var padBut3; // Initialize wingBut variable
var padBut3state = false; // Set wingBut state to false


//<----------------------------------------------------------------------( Shops )------------------------------------------------------------------------------------------------------------->
var shop1; // Initialize vendors variable
var coin; // Initialize coin variable
var currencyText;
var currency = 0; // Initialize currency variable
var launchPad; // Initialize launch pad variable
var launchPad2; // Initialize launch pad variable
var catchingNet; // Initialize catching net variable


var bombTimer;
var bombInterval = 1000; // Interval between bomb spawns in milliseconds
var bombDuration = 3000; // Duration for which bombs are visible in milliseconds
var bombToggler = false;

var starInterval = 1500; // Interval between star spawns in milliseconds
var starTimer;
var duckStop = true;
var dayStop = true;

//<-----------------------------------------------------------------(Change costs easy from here)-------------------------------------------->
var wingsCost =  13; // Set wings cost to 25
var wings1Cost = 300; // Set wings cost to 25
var wings2Cost = 600; // Set wings cost to 25
var wings3Cost = 2000; // Set wings cost to 25
var launchPad1Cost = 75; // Set launch pad cost to 100
var launchPad2Cost = 1000; // Set launch pad cost to 100
var launchPad3Cost = 4000; // Set launch pad cost to 100

thrustWing1 = -500;
thrustWing2 = -1000;
thrustWing3 = -2000;
thrustPad1 = -1000;
thrustPad2 = -2000;
thrustPad3 = -10000;


var bombHit = 100;
var starHit = 100;


var song1;
var song2;
var song3;
var songChanger = false;

var coords = false;
var coordsbutton;
var coordsclicks = 0;

//<----------------------------------------------------------------------( Preload Assets ) #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00 #FFFF00 >
function preload () {
    //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('dude', 'assets/spritesheets/walk.png', { frameWidth: 64, frameHeight: 64 });
 
    this.load.image('sky', 'assets/background1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('walls', 'assets/wall.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image("shop1", "assets/shop1.png");
    this.load.image('wings', 'assets/wings.png');
    this.load.image('wings1', 'assets/wings1.png');
    this.load.image('wings2', 'assets/wings3.png');
    this.load.image('wings3', 'assets/wings2.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('launchPad', 'assets/launchPad.png');
    this.load.image('launchPad1', 'assets/launchPad1.png');
    this.load.image('launchPad2', 'assets/launchPad2.png');
    this.load.image('launchPad3', 'assets/launchPad3.png');
    this.load.image('catchingNet', 'assets/catchingNet.png');
    this.load.atlas('duck', 'assets/duck/duckSpriteSheet.png', 'assets/duck/duckSpriteSheet.json');
    this.load.image('signPost', 'assets/signPost.png');
    this.load.audio('song1', 'assets/audio/song1.mp3');
    this.load.audio('song2', 'assets/audio/song2.mp3');
    this.load.audio('song3', 'assets/audio/song3.mp3');


    this.load.image('bg1', 'assets/bg1.png');
    this.load.image('bg2', 'assets/bg2.png');
    this.load.image('bg3', 'assets/bg3.png');
    this.load.image('bg4', 'assets/bg4.png');

}
//<00000000000000000000000000000000000000000000000000000000000000000000000000000000000( Create Game Elements  )0 #00E1FF  #00E1FF  #00E1FF  #00E1FF  #00E1FF  #00E1FF  #00E1FF  #00E1FF  #00E1FF  #00E1FF >
function create () {
    bg1 = this.add.image(400, 300, 'bg1').setDepth(-10).setVisible(false);
    bg2 = this.add.image(400, 300, 'bg2').setDepth(-10).setVisible(false);
    bg3 = this.add.image(400, 300, 'bg3').setDepth(-10).setVisible(false);
    bg4 = this.add.image(400, 300, 'bg4').setDepth(-10).setVisible(false);



    duck = this.physics.add.sprite(190, 290, 'duck');
    this.add.image(480, 274, 'ground').setScale(0.5) .angle = 90;
// <---------------------------------( Background )--------------------------------------------->
    //this.add.image(400, 300, 'sky').setDepth(-10);
    sky = this.add.tileSprite(0, 0, 900, 1000, 'sky');
    sky.setDepth(-10); // Set the depth of the sky to -10 to ensure it's behind everything else

    // <---------------------------------( Platforms )--------------------------------------------->
    platforms = this.physics.add.staticGroup();
    platforms.create(-700, 560, 'ground').setScale(12).refreshBody();
    platforms.create(700, 560, 'ground').setScale(12).refreshBody();
    platforms.create(-1000, 0, 'walls');
    platforms.create(1000, 0, 'walls');
    catchingNet = this.physics.add.staticGroup();
    catchingNet.create(407, 200, 'catchingNet');

    coin = this.add.image(-200, 400, 'coin');
    shop1 = this.add.image(-300, 200, 'shop1').setScale(1);
    shop1.setDepth(-0.1); // Ensure wings are behind the duck #FF0000
    shop1 = this.add.image(-700, 200, 'shop1').setScale(1);
    shop1.setDepth(-0.1); // Ensure wings are behind the duck #FF0000
    //.setScale(2).refreshBody()
    //<----------------------------------(launchPads)-------------------------------------------->
    launchPad = this.physics.add.staticGroup();
    launchPad.create(0, 343, 'launchPad');
    // launchPad2 = this.physics.add.staticGroup();
    // launchPad2.create(0, 343, 'launchPad2');

// <---------------------------------( Walls )--------------------------------------------->
    const wall = platforms.create(1000, 0, 'walls');
    wall.displayHeight = 2000 * wall.height; // Set the display height to 20 times the original height
    wall.refreshBody(); // Refresh the body to apply changes

    const leftWall = platforms.create(-1000, 0, 'walls'); // Create the left wall
    leftWall.displayHeight = 2000 * leftWall.height; // Set the display height to 20 times the original height
    leftWall.refreshBody(); // Refresh the body to apply changes




// <---------------------------------( duck )--------------------------------------------->
    this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true);
  //  this.physics.world.setBounds();

        launchButton = this.add.text(-25, 370, 'Launch', { fill: 'brown' }).setInteractive();
        launchButton.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
        launchButton.setVisible(false);
        
        launchButton.on('pointerdown', function() {
            launching();
            song1.stop();
            if (songChanger === false) {
            song2.play();
            }else{
                song3.play();
            }
        });

        coordsbutton = this.add.text(310, 290, '       \n      ', { fill: 'brown' }).setInteractive();
        coordsbutton.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
        coordsbutton.setDepth(-0.2); // Ensure wings are behind the duck #FF0000
        coordsbutton.on('pointerdown', function() {
            coordsclicks += 1;
            if (coordsclicks > 9) {
                coords = true;
            }else{
                coords = false;
            }});

//<--------------------------------------------------( duck Accessories )--------------------------------------------->
//<----------------------------------(wings)-------------------------------------------->
wings = this.add.image(duck.x, duck.y, 'wings');
wings.setDepth(-0.1); // Ensure wings are behind the duck #FF0000
wings1 = this.add.image(duck.x, duck.y, 'wings1');
wings1.setDepth(-0.1); // Ensure wings are behind the duck #FF0000
wings2 = this.add.image(duck.x, duck.y, 'wings2');
wings2.setDepth(-0.1); // Ensure wings are behind the duck #FF0000
wings3 = this.add.image(duck.x, duck.y, 'wings3');
wings3.setDepth(-0.1); // Ensure wings are behind the duck #FF0000

wingBut = this.add.text(-420, 150, 'Buy', { fill: '#0f0' }).setInteractive();
wingBut1 = this.add.text(-420, 210, 'Buy', { fill: '#0f0' }).setInteractive();
wingBut2 = this.add.text(-420, 270, 'Buy', { fill: '#0f0' }).setInteractive();
wingBut3 = this.add.text(-420, 320, 'Buy', { fill: '#0f0' }).setInteractive();// Add description text



wingdescriptionText = this.add.text(-458, 50, '', { fill: '#fff' });
wingdescriptionText.setVisible(false);

var wingtext = this.add.text(-380, 150, 'Cardboard Cut-Out Wings\n' + wingsCost + "€", { fill: '#fff' }).setInteractive();
wingtext.on('pointerover', function () {
    wingdescriptionText.setText('While studying the complex design\nof bird wings\nYou figured out how to make\nyour own wings\nout of cardboard and duct tape');
    wingdescriptionText.setVisible(true);
});
wingtext.on('pointerout', function () {
    wingdescriptionText.setVisible(false);
});
var wing1text = this.add.text(-380, 210, 'Tin-Foil Wings\n' + wings1Cost + "€", { fill: '#fff' }).setInteractive();
wing1text.on('pointerover', function () {
    wingdescriptionText.setText('Okay the cardboard wings\nwere a bit of a disaster\nBut you have a good feeling\nabout these ones\nThey are shiny after all');
    wingdescriptionText.setVisible(true);
});
wing1text.on('pointerout', function () {
    wingdescriptionText.setVisible(false);
});
var wing2text = this.add.text(-380, 270, 'Super-Cool Wings\n' + wings2Cost + "€", { fill: '#fff' }).setInteractive();
wing2text.on('pointerover', function () {
    wingdescriptionText.setText('You have been saving up for\nthese wings for a while\nThey are the best wings\nmoney can buy\nYou are sure of it');
    wingdescriptionText.setVisible(true);
});
wing2text.on('pointerout', function () {
    wingdescriptionText.setVisible(false);
});
var wing3text = this.add.text(-380, 320, 'Real Wings\n' + wings3Cost + "€", { fill: '#fff' }).setInteractive();
wing3text.on('pointerover', function () {
    wingdescriptionText.setText('Okay maybe the last wings\nwere a bit of a rip off\nBut these are the real deal\nYou are sure of it');
    wingdescriptionText.setVisible(true);
});
wing3text.on('pointerout', function () {
    wingdescriptionText.setVisible(false);
});







padBut1 = this.add.text(-800, 150, 'Buy', { fill: '#0f0' }).setInteractive();
padBut2 = this.add.text(-800, 210, 'Buy', { fill: '#0f0' }).setInteractive();
padBut3 = this.add.text(-800, 270, 'Buy', { fill: '#0f0' }).setInteractive();


paddescriptionText = this.add.text(-830, 40, '', { fill: '#fff' });
paddescriptionText.setVisible(false);

var padtext = this.add.text(-700, 150, 'Fireworks\n' + launchPad1Cost + "€", { fill: '#fff' }).setInteractive();
padtext.on('pointerover', function () {
    paddescriptionText.setText('Sure, why not\nPlacing fireworks\nunder your feet\nIs a GREAT idea\nto make You fly\nWhat could go wrong?');
    paddescriptionText.setVisible(true);
});
padtext.on('pointerout', function () {
    paddescriptionText.setVisible(false);
});
var pad1text = this.add.text(-700, 210, 'TnT\n' + launchPad2Cost + "€", { fill: '#fff' }).setInteractive();
pad1text.on('pointerover', function () {
    paddescriptionText.setText("Ok maybe fireworks were not\nas powerful as you thought\nMaybe this time we should\ntry the real explosives\nLet's try the real deal");
    paddescriptionText.setVisible(true);
});
pad1text.on('pointerout', function () {
    paddescriptionText.setVisible(false);
});
var pad2text = this.add.text(-700, 270, 'More TnT\n' + launchPad3Cost + "€", { fill: '#fff' }).setInteractive();
pad2text.on('pointerover', function () {
    paddescriptionText.setText("If TnT are not enough,\nThe next logical step is to...\n\nAdd More TnT.\nOf course\nThis time we are going,\nTo The Moon!");
    paddescriptionText.setVisible(true);
});
pad2text.on('pointerout', function () {
    paddescriptionText.setVisible(false);
});






// Customize button style
wingBut.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
wingBut.setVisible(false); // Show button initially
wingBut1.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
wingBut1.setVisible(false); // Show button initially
wingBut2.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
wingBut2.setVisible(false); // Show button initially
wingBut3.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
wingBut3.setVisible(false); // Show button initially
wings.setVisible(false); // Hide wings initially
wings1.setVisible(false); // Hide wings initially
wings2.setVisible(false); // Hide wings initially
wings3.setVisible(false); // Hide wings initially
// <---------------------------------( Display duck coordinates )--------------------------------------------->
    let coordinatesText = this.add.text(duck.x + 50, duck.y - 50, '', { fontSize: '12px', fill: '#fff' });
    coordinatesText.setVisible(false); // Hide coordinates text initially
    let thrustInfoText = this.add.text(duck.x + 50, duck.y - 30, '', { fontSize: '12px', fill: '#fff' });
    thrustInfoText.setVisible(false); // Hide coordinates text initially
    let velocityInfoText = this.add.text(duck.x + 50, duck.y - 10, '', { fontSize: '12px', fill: '#fff' });
    velocityInfoText.setVisible(false); // Hide coordinates text initially

    
// <---------------------------------( Update duck coordinates )--------------------------------------------->
this.events.on('postupdate', function () {
    if (coords === true) {
        coordinatesText.setVisible(true);
        thrustInfoText.setVisible(true);
        velocityInfoText.setVisible(true);

        coordinatesText.setText('duck Coordinates: ' + Math.floor(duck.x / 10) + ', ' + Math.floor(duck.y / 10));
        coordinatesText.setPosition(duck.x + 50, duck.y - 50);
        thrustInfoText.setText('Thrust: ' + thrust);
        thrustInfoText.setPosition(duck.x + 50, duck.y - 30); // Update the position
        velocityInfoText.setText('Velocity: ' + Math.abs(duck.body.velocity.y));
        velocityInfoText.setPosition(duck.x + 50, duck.y - 10); // Update the position
    }else{
        coordinatesText.setVisible(false);
        thrustInfoText.setVisible(false);
        velocityInfoText.setVisible(false);
    }
        // Attach the button to the duck
        restartButton.setPosition(duck.x - 35, duck.y + 30);

        wings.setPosition(duck.x, duck.y - 8); // Update wings position to follow the duck
        wings.setAngle(duck.angle); // Update wings angle to match the duck's angle
        wings1.setPosition(duck.x, duck.y); // Update wings position to follow the duck
        wings1.setAngle(duck.angle); // Update wings angle to match the duck's angle
        wings2.setPosition(duck.x, duck.y); // Update wings position to follow the duck
        wings2.setAngle(duck.angle); // Update wings angle to match the duck's angle
        wings3.setPosition(duck.x, duck.y); // Update wings position to follow the duck
        wings3.setAngle(duck.angle); // Update wings angle to match the duck's angle
    });

    this.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('duck', { prefix: 'idle', end:3, zeroPad:2}), repeat: -1, frameRate: 7 });
    this.anims.create({ key: 'walking', frames: this.anims.generateFrameNames('duck', { prefix: 'walk', end:3, zeroPad:3}), repeat: -1, frameRate: 7});
    this.anims.create({ key: 'jump', frames: this.anims.generateFrameNames('duck', { prefix: 'floating_flap', start: 0, end:1, zeroPad:3}), frameRate: 7, repeat: -1});
    this.physics.add.collider(duck, platforms);

// <---------------------------------( Input events )--------------------------------------------->
    cursors = this.input.keyboard.createCursorKeys();

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


// <---------------------------------( Stars )--------------------------------------------->
    stars = this.physics.add.group({
        key: 'star',
        repeat: 3,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

// <---------------------------------( Bombs )--------------------------------------------->
    bombs = this.physics.add.group();

    duck.previousY = duck.y;

// <---------------------------------( Score text )--------------------------------------------->
    //scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    currencyText = this.add.text(-180, 385, '0', { fontSize: '32px', fill: '#000' });
    scoreText = this.add.text(16, 16, 'Height: 0', { fontSize: '32px', fill: '#000' });


// <---------------------------------( Collisions )--------------------------------------------->
    this.physics.add.collider(duck, platforms,);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(duck, stars, collectStar, null, this);
    // this.physics.add.collider(duck, bombs, hitBomb, null, this);
    this.physics.add.collider(duck, launchPad);
    this.physics.add.collider(stars, launchPad);
    this.physics.add.collider(bombs, launchPad);
    this.physics.add.collider(duck, catchingNet);
    this.physics.add.collider(stars, catchingNet);
    this.physics.add.collider(bombs, catchingNet);


// <---------------------------------( Camera follow )--------------------------------------------->
    this.cameras.main.startFollow(duck);


        // <---------------------------------( Restart Button )--------------------------------------------->
        restartButton = this.add.text(duck.x + 100, duck.y - 100, 'Restart', { fill: '#0f0' }).setInteractive(); // Create restart button
        restartButton.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' }); // Set button style
        restartButton.setVisible(false);
        // Add event listener for restart button
        restartButton.on('pointerdown', function() {
            //makeRestartButtonDissapear();
            restartButton.setVisible(false);
            duck.clearTint(); 
            this.physics.resume(); // Resume physics
            gameOver = false; 
            launchButton.setStyle({ backgroundColor: '#0f0' }); // Reset launch button color

            let currencyEarned = Math.floor(score / 100);
            currency += currencyEarned;
            score = 0;
            scoreText.setText('Height: ' + score);
            updateCurrency();
            restartButton.setVisible(false);
            
            song1.play();
        }, this); // Bind 'this' context to the current scene

        this.events.on('update', function () {
            coordinatesText.setText('duck Coordinates: ' + Math.floor(duck.x) + ', ' + Math.floor(duck.y));
            coordinatesText.setPosition(duck.x + 50, duck.y - 50);
            
            thrustInfoText.setText('Thrust: ' + thrust);
            thrustInfoText.setPosition(duck.x + 50, duck.y - 30); // Update the position  

        });

        
            wingBut.on('pointerdown', function() {
                makewings();
                wingButstate = true; // button has been pressed so - Set wingBut state to true
            });
            wingBut1.on('pointerdown', function() {
                makewings1();
                wingBut1state = true; // button has been pressed so - Set wingBut state to true
            });
            wingBut2.on('pointerdown', function() {
                makewings2();
                wingBut2state = true; // button has been pressed so - Set wingBut state to true
            });
            wingBut3.on('pointerdown', function() {
                makewings3();
                wingBut3state = true; // button has been pressed so - Set wingBut state to true
            });


            // Customize button style
            padBut1.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
            padBut1.setVisible(false);
            
            padBut1.on('pointerdown', function() {
                makePad();
                padBut1state = true; // button has been pressed so - Set wingBut state to true
            });

            padBut2.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
            padBut2.setVisible(false);
            
            padBut2.on('pointerdown', function() {
                 makePad2();
                 padBut2state = true; // button has been pressed so - Set wingBut state to true
             });
             
             
             padBut3.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
             padBut3.setVisible(false);
             
             padBut3.on('pointerdown', function() {
                  makePad3();
                  padBut3state = true; // button has been pressed so - Set wingBut state to true
              });

            signPost = this.add.image(350, 325, 'signPost').setScale(1.7);
            signPost.setDepth(-0.2); // Ensure wings are behind the duck #FF0000
            dayText = this.add.text(315, 300, 'Day:' + day, { fontSize: '20px', fill: '#000' }); // Initialize dayText



            song1 = this.sound.add('song1'),song1.play(), song1.setVolume(1), song1.setLoop(true);
            song2 = this.sound.add('song2'),song2.stop(), song2.setVolume(1), song2.setLoop(true);
            song3 = this.sound.add('song3'),song3.stop(), song3.setVolume(1), song3.setLoop(true);
        }

// Function to update the score based on the duck's height
function updateScore() {
    if (duck.y < 0) {
        // Calculate the change in duck's height since the previous frame
        let heightChange = Math.floor(duck.y) - Math.floor(duck.previousY);

        // Check if the duck is moving upwards (velocity is negative)
        if (duck.body.velocity.y < 0) {
            // If so, increase the score by the absolute value of the height change
            score += Math.abs(heightChange);
        }
    }
}


function updateCurrency() {
    currencyText.setText(currency);
}



//<0000000000000000000000000000000000000000000000000( Update Game State ) #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000>

function update () {

    updateScore();
    scoreText.setText('Height: ' + score);

    if (duck.x < -140 && duck.x > -460 && wingButstate === false && currency >= wingsCost ){  // add money requirement here to buy wings<-----------------------------------------------------
        wingBut.setVisible(true); // Show the button
    } else {
        wingBut.setVisible(false); // Hide the button
    }
    
    if (duck.x < -140 && duck.x > -460 && wingBut1state === false && currency >= wings1Cost && wings.visible){  // add money requirement here to buy wings<-----------------------------------------------------
        wingBut1.setVisible(true); // Show the button
    } else {
        wingBut1.setVisible(false); // Hide the button
    }
    
    if (duck.x < -140 && duck.x > -460 && wingBut2state === false && currency >= wings2Cost && wings1.visible){  // add money requirement here to buy wings<-----------------------------------------------------
        wingBut2.setVisible(true); // Show the button
    } else {
        wingBut2.setVisible(false); // Hide the button
    }
    
    if (duck.x < -140 && duck.x > -460 && wingBut3state === false && currency >= wings3Cost && wings2.visible){  // add money requirement here to buy wings<-----------------------------------------------------
        wingBut3.setVisible(true); // Show the button
    } else {
        wingBut3.setVisible(false); // Hide the button
    }


    if (duck.x < -530 && duck.x > -870 && padBut1state === false && currency >= launchPad1Cost){  // add money requirement here to buy wings<-----------------------------------------------------
        padBut1.setVisible(true); // Show the button
    } else {
        padBut1.setVisible(false); // Hide the button
    }

    if ((duck.x < -530 && duck.x > -870 && padBut2state === false && currency >= launchPad2Cost) && padBut1state === true ){  
        // Add logic to create launchPad2 here
        //makePad2();
        padBut2.setVisible(true); // Show the button
    } else {
        padBut2.setVisible(false); // Hide the button
    }
    
    
    if ((duck.x < -530 && duck.x > -870 && padBut3state === false && currency >= launchPad3Cost) && padBut2state === true){  
        // Add logic to create launchPad2 here
        //makePad2();
        padBut3.setVisible(true); // Show the button
    } else {
        padBut3.setVisible(false); // Hide the button
    }


    if (duck.x > -91 && duck.x < 91){ 
        launchButton.setVisible(true); 
    }else{
        launchButton.setVisible(false);
    }
    
    
    if (cursors.left.isDown || keyA.isDown) {
        duck.setVelocityX(-160);
        duck.setFlipX(true);
        if (duck.body.touching.down) {
            duck.anims.play('walking', true);
        } else {
            duck.anims.play('jump', true);
        }
    } else if (cursors.right.isDown || keyD.isDown) {
        duck.setVelocityX(160);
        duck.resetFlip();
        if (duck.body.touching.down) {
            duck.anims.play('walking', true);
        } else {
            duck.anims.play('jump', true);
        }
    } else {
        duck.setVelocityX(0);
        //duck.anims.play('turn');
        if (duck.body.touching.down) {
            duck.anims.play('idle', true);
        }
    }
    
    if (duck.y >= 800) {
        duck.y = 0;
        duck.x = 0;
    }

    if (cursors.up.isDown && duck.body.touching.down || keyW.isDown && duck.body.touching.down)
    {
        duck.anims.play('jump');
        duck.setVelocityY(-200); // this goes down every second, if duck touches something midFlight, it will substract points from the velocity, if velocity 0 game ends. 
    }
    updateCurrency();

    wings.setPosition(duck.x, duck.y);
//<----------------------------------------------------------------------------------------(game restart when falling )------------------------------------->
if ((duck.body.velocity.y > 0 && duck.y < -50 && duckStop === false)) {
    duckStop = true;
    // Check if the duck is moving downwards - Check every 100 milliseconds if the duck has stopped moving downwards
    bombToggler = false; // Reset bomb toggler
    setTimeout(() => {
        let scene = this; // Capture the Phaser scene context
        scene.physics.pause();
        duck.setTint(0xff0000);
        setTimeout(() => {
        duck.setPosition(400, 150); 
        theRestart();

        }, 2000);
        
        // Create a tween to fade out the duck over 1 second
        scene.tweens.add({
            targets: duck,
            alpha: 0.3, // Set alpha to 0 (fully transparent)
            duration: 800, // Duration of the tween in milliseconds
            onComplete: function () {
                
                // Create a tween to fade in the duck over 1 second
                scene.tweens.add({
                    targets: duck,
                    alpha: 1, // Set alpha to 1 (fully opaque)
                    duration: 1000, // Duration of the tween in milliseconds
                    delay: 2500, // Delay before starting the tween in milliseconds
                });
            }
        });
        if (songChanger === false) {
            song2.stop();
        }else{
            song3.stop();
        }
    }, 2500);
}




    if (!duck.body.onFloor() && cursors.left.isDown || !duck.body.onFloor() && keyA.isDown ) { // Check if the duck is not on the floor and the left arrow key is pressed
        duck.setAngle(-45); // Rotate the duck sprite 90 degrees
    } else if (!duck.body.onFloor() && cursors.right.isDown || !duck.body.onFloor() && keyD.isDown ) { // Check if the duck is not on the floor and the right arrow key is pressed
        duck.setAngle(45); // Rotate the duck sprite -90 degrees
    } else {
        duck.setAngle(0); // Reset the duck sprite angle
    }

   
    duck.previousY = duck.y;
    const cameraScrollX = this.cameras.main.scrollX;
    const cameraScrollY = this.cameras.main.scrollY;


    this.events.on('postupdate', function () {
        // Set the position of the sky background to match the camera's position
        sky.tilePositionX = cameraScrollX * 0.3; // Adjust the speed as needed
        sky.tilePositionY = cameraScrollY * 0.3; // Adjust the speed as needed
        sky.x = 200 + cameraScrollX;
        sky.y = 315 + cameraScrollY;
    });
    // Check for overlap between duck and bombs
    var bombCollisionOccurred = false; // Flag to track bomb collision

    this.physics.add.collider(duck, bombs, function(duck, bomb) {
        if (!bombCollisionOccurred) { // Check if collision hasn't occurred yet
            score -= bombHit; // Subtract 100 from the currency
        }
    });
    dayText.setText('Day:' + day); // Update dayText

    if (day === 1 && dayStop === true) {
        dayStop = false;
        console.log('Day 1');
    }

    if (duck.y < -150 && duck.y > -75000) {
        sky.setTexture('bg1'); // Change the texture to 'bg1'
    } else if (duck.y <= -75000 && duck.y >= -100000) { //cool wings + tnt (12000m)   (16650m realwings + tnt) 
        sky.setTexture('bg2'); // Change the texture to 'bg2'
    } else if (duck.y <= -100000) {
        sky.setTexture('bg3'); // Change the texture to 'bg3'
    } else {
        sky.setTexture('sky'); // Change the texture to 'bg4'
    }
}
//<----------------------------------------------------------------------------------------------( Update Ends ) #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000 >

//<-----------------------------------( Random functions that i have created at the very bottom for some reason) #00FF00  #00FF00  #00FF00  #00FF00  #00FF00  #00FF00  #00FF00  #00FF00  #00FF00  #00FF00 >



//<------------------------------------------( have no idea what this is )----------------------------->

    // Initialize the currentScene variable when the Phaser game starts
    window.onload = function () {
        currentScene = game.scene.scenes[0];
    };


//<---------------------------------------------------( Collect Stars )------------------------------>
function collectStar (duck, star) {
    star.disableBody(true, true);
    score += starHit;
    }



//<---------------------------------------------------( spawn and position the wings )------------------------------>
    function makewings() {
        wings.setPosition(duck.x - 10, duck.y + 10);
        wings.setAngle(duck.angle); // Update wings angle to match the duck's angle
        wings.setVisible(true); // Show the wings
        thrust += thrustWing1; // Increase the score by 100
        currency -= wingsCost; // Subtract the cost of the wings from the currency
        wingBut.setVisible(false); // Hide the button
    }


//<---------------------------------------------------( spawn and position the wings1 )------------------------------>
    function makewings1() {
        wings1.setPosition(duck.x - 10, duck.y + 10);
        wings1.setAngle(duck.angle); // Update wings angle to match the duck's angle
        wings1.setVisible(true); // Show the wings
        thrust += thrustWing1; // Increase the score by 100
        currency -= wings1Cost; // Subtract the cost of the wings from the currency
        wingBut1.setVisible(false); // Hide the button

        wings.setVisible(false);



    }
    function makewings2() {
        wings2.setPosition(duck.x - 10, duck.y + 10);
        wings2.setAngle(duck.angle); // Update wings angle to match the duck's angle
        wings2.setVisible(true); // Show the wings
        thrust += thrustWing2; // Increase the score by 100
        currency -= wings2Cost; // Subtract the cost of the wings from the currency
        wingBut1.setVisible(false); // Hide the button
        wings1.setVisible(false);

        songChanger = true;
    }
    
    function makewings3() {
        wings3.setPosition(duck.x - 10, duck.y + 10);
        wings3.setAngle(duck.angle); // Update wings angle to match the duck's angle
        wings3.setVisible(true); // Show the wings
        thrust += thrustWing3; // Increase the score by 100
        currency -= wings3Cost; // Subtract the cost of the wings from the currency
        wingBut3.setVisible(false); // Hide the button

        wings2.setVisible(false);

    }


//<---------------------------------------------------( spawn and position the launchPad )------------------------------>
function makePad() {
    launchPad.getChildren().forEach(function(child) {
        child.setTexture('launchPad1');
    });
    thrust += thrustPad1;
    currency -= launchPad1Cost;
    padBut1.setVisible(false); 
}
     function makePad2() {

         launchPad.getChildren().forEach(function(child) {
             child.setTexture('launchPad2');
         });
         thrust += thrustPad2;
         currency -= launchPad2Cost;
         padBut2.setVisible(false); 
     }
     
     function makePad3() {

         launchPad.getChildren().forEach(function(child) {
             child.setTexture('launchPad3');
         });
         thrust += thrustPad3;
         currency -= launchPad3Cost;
         padBut3.setVisible(false); 
     }




//<---------------------------------------------------( Create Bombs )------------------------------>
    function spawnBomb() {
        if (bombToggler === true) {
            var x = Phaser.Math.Between(duck.x - 100, duck.x + 100);
            var y = Phaser.Math.Between(duck.y - 500, duck.y - 200);
            var duckThrust = duck.body.velocity.y + 200;
            var bomb = bombs.create(x, y, 'bomb');
            bomb.setBounce(1);
            bomb.allowGravity = false;
            bomb.setVelocity(Phaser.Math.Between(-200, 200), duckThrust);
            setTimeout(function() {
                bomb.destroy();
            }, bombDuration);
        }
    }


//<---------------------------------------------------( Create Stars )------------------------------>
    function spawnStar () {
        if (bombToggler === true) {
            var x = Phaser.Math.Between(duck.x - 100, duck.x + 100);
            var y = Phaser.Math.Between(duck.y - 500, duck.y - 200);
            var duckThrust = duck.body.velocity.y + 200;
            var star = stars.create(x, y, 'star');
            star.setBounce(1);
            star.allowGravity = false;
            star.setVelocity(Phaser.Math.Between(-200, 200), duckThrust);
            setTimeout(function() {
                star.destroy();
            }, bombDuration);
        }
    }


//<---------------------------------------------------( Launch Duck )------------------------------>
    function launching() {
        launchButton.setStyle({ backgroundColor: '#f00' });
        launchButton.setText('Launch');
        duck.setVelocityY(thrust);
        bombTimer = setInterval(spawnBomb, bombInterval);
        starTimer = setInterval(spawnStar, starInterval);
        bombToggler = true;
        duckStop = false;
        duck.anims.play('jump', true); 
    }


//<---------------------------------------------------( Restart Game )------------------------------>
    function theRestart() {
        clearInterval(bombTimer);
        clearInterval(starTimer);
        if (restartButton.visible === false){
            restartButton.setVisible(true);
        };
        day += 1;
        console.log(day);

    }