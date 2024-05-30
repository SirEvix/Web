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

var player;
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
var wings; // Initialize wings variable
var button1; // Initialize button1 variable
var button1state = false; // Set button1 state to false
var button2; // Initialize button1 variable
var button2state = false; // Set button1 state to false

var shop1; // Initialize vendors variable
var coin; // Initialize coin variable
var currencyText;
var currency = 0; // Initialize currency variable
var launchPad; // Initialize launch pad variable
var catchingNet; // Initialize catching net variable


var bombTimer;
var bombInterval = 1000; // Interval between bomb spawns in milliseconds
var bombDuration = 3000; // Duration for which bombs are visible in milliseconds
var bombToggler = false;

var starInterval = 1500; // Interval between star spawns in milliseconds
var starTimer;


//<----------------------------------------------------------------------(Change costs easy from here)------------------------------------------------------------------------------------------------------------->
var wings1Cost = -1; // Set wings cost to 25
var launchPad1Cost = -2; // Set launch pad cost to 100
var playerStop = true; 


//<----------------------------------------------------------------------( Preload Assets )------------------------------------------------------------------------------------#FFFF00------#FFFF00-------->
function preload () {
    //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('dude', 'assets/spritesheets/walk.png', { frameWidth: 64, frameHeight: 64 });

    this.load.image('sky', 'assets/skybig.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('walls', 'assets/wall.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image("shop1", "assets/shop1.png");
    this.load.image('wings', 'assets/wings.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('launchPad', 'assets/launchPad.png');
    this.load.image('launchPad1', 'assets/launchPad1.png');
    this.load.image('catchingNet', 'assets/catchingNet.png');
    this.load.atlas('duck', 'assets/duck/duckSpriteSheet.png', 'assets/duck/duckSpriteSheet.json');
}
//<00000000000000000000000000000000000000000000000000000000000000000000000000000000000( Create Game Elements  )00000000000000000000000000000000000000000000000000000000 #00E1FF 0000000000 #00E1FF 00000000>
function create () {
    duck = this.physics.add.sprite(400, 300, 'duck').play('idle');

// <---------------------------------( Background )--------------------------------------------->
    //this.add.image(400, 300, 'sky').setDepth(-10);
    sky = this.add.tileSprite(0, 0, 900, 1000, 'sky');
    sky.setDepth(-10); // Set the depth of the sky to -10 to ensure it's behind everything else

    // <---------------------------------( Platforms )--------------------------------------------->
    platforms = this.physics.add.staticGroup();
    platforms.create(-100, 400, 'ground').setScale(2).refreshBody();
    platforms.create(100, 400, 'ground').setScale(2).refreshBody();
    platforms.create(-500, 0, 'walls');
    platforms.create(500, 0, 'walls');
    catchingNet = this.physics.add.staticGroup();
    catchingNet.create(407, 200, 'catchingNet');

    coin = this.add.image(-200, 400, 'coin');
    shop1 = this.add.image(-370, 270, 'shop1');
    //.setScale(2).refreshBody()
    //<----------------------------------(launchPads)-------------------------------------------->
    launchPad = this.physics.add.staticGroup();
    launchPad.create(0, 343, 'launchPad');

// <---------------------------------( Walls )--------------------------------------------->
    const wall = platforms.create(500, 0, 'walls');
    wall.displayHeight = 2000 * wall.height; // Set the display height to 20 times the original height
    wall.refreshBody(); // Refresh the body to apply changes

    const leftWall = platforms.create(-500, 0, 'walls'); // Create the left wall
leftWall.displayHeight = 2000 * leftWall.height; // Set the display height to 20 times the original height
leftWall.refreshBody(); // Refresh the body to apply changes




// <---------------------------------( Player )--------------------------------------------->
   // player = this.physics.add.sprite(400, 100, 'dude');
    //player.setBounce(0.2);
    this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true);
  //  this.physics.world.setBounds();

        launchButton = this.add.text(-25, 370, 'Launch', { fill: 'brown' }).setInteractive();
        launchButton.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
        launchButton.setVisible(false);
        
        launchButton.on('pointerdown', function() {
            launching();
        });


//<--------------------------------------------------( Player Accessories )--------------------------------------------->
//<----------------------------------(wings)-------------------------------------------->
//wings = this.add.image(player.x, player.y, 'wings');
wings = this.add.image(duck.x, duck.y, 'wings');
wings.setDepth(-0.1); // Ensure wings are behind the player


// <---------------------------------( Display player coordinates )--------------------------------------------->
    let coordinatesText = this.add.text(duck.x + 50, duck.y - 50, '', { fontSize: '12px', fill: '#fff' });
    let thrustInfoText = this.add.text(duck.x + 50, duck.y - 30, '', { fontSize: '12px', fill: '#fff' });
    // let coordinatesText = this.add.text(player.x + 50, player.y - 50, '', { fontSize: '12px', fill: '#fff' });
    // let thrustInfoText = this.add.text(player.x + 50, player.y - 30, '', { fontSize: '12px', fill: '#fff' });

    
// <---------------------------------( Update player coordinates )--------------------------------------------->
this.events.on('postupdate', function () {
        coordinatesText.setText('Player Coordinates: ' + Math.floor(duck.x / 10) + ', ' + Math.floor(duck.y / 10));
        coordinatesText.setPosition(duck.x + 50, duck.y - 50);
        thrustInfoText.setText('Thrust: ' + thrust);
        thrustInfoText.setPosition(duck.x + 50, duck.y - 30); // Update the position
                // Attach the button to the player
                restartButton.setPosition(duck.x - 35, duck.y + 30);

                wings.setPosition(duck.x, duck.y); // Update wings position to follow the player
                wings.setAngle(duck.angle); // Update wings angle to match the player's angle
    });
// this.events.on('postupdate', function () {
//         coordinatesText.setText('Player Coordinates: ' + Math.floor(player.x / 10) + ', ' + Math.floor(player.y / 10));
//         coordinatesText.setPosition(player.x + 50, player.y - 50);
//         thrustInfoText.setText('Thrust: ' + thrust);
//         thrustInfoText.setPosition(player.x + 50, player.y - 30); // Update the position
//                 // Attach the button to the player
//                 restartButton.setPosition(player.x - 35, player.y + 30);

//                 wings.setPosition(player.x, player.y); // Update wings position to follow the player
//                 wings.setAngle(player.angle); // Update wings angle to match the player's angle
//     });


// <---------------------------------( Player animations )--------------------------------------------->
    // this.anims.create({
    //     key: 'left',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 0 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.anims.create({
    //     key: 'turn',
    //     frames: [ { key: 'dude', frame: 4 } ],
    //     frameRate: 20
    // });

    // this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 0 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    
    this.anims.create({ key: 'idle', frames: this.anims.generateFrameNames('duck', { prefix: 'idle', end:3, zeroPad:2}), repeat: -1 });
    this.anims.create({ key: 'walking', frames: this.anims.generateFrameNames('duck', { prefix: 'walk', end:3, zeroPad:3}), repeat: -1 });
    duck = this.physics.add.sprite(400, 300, 'duck').play('idle');
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
    //this.physics.add.collider(player, bombs, hitBomb, null, this);

    duck.previousY = player.y;

    // player.previousY = player.y;

// <---------------------------------( Score text )--------------------------------------------->
    //scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    currencyText = this.add.text(-180, 385, '0', { fontSize: '32px', fill: '#000' });
    scoreText = this.add.text(16, 16, 'Height: 0', { fontSize: '32px', fill: '#000' });


// <---------------------------------( Collisions )--------------------------------------------->
    this.physics.add.collider(player, platforms,);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    // this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(player, launchPad);
    this.physics.add.collider(stars, launchPad);
    this.physics.add.collider(bombs, launchPad);
    this.physics.add.collider(player, catchingNet);
    this.physics.add.collider(stars, catchingNet);
    this.physics.add.collider(bombs, catchingNet);


// <---------------------------------( Camera follow )--------------------------------------------->
    this.cameras.main.startFollow(player);


        // <---------------------------------( Restart Button )--------------------------------------------->
        restartButton = this.add.text(player.x + 100, player.y - 100, 'Restart', { fill: '#0f0' }).setInteractive(); // Create restart button
        restartButton.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' }); // Set button style
        restartButton.setVisible(false);
        // Add event listener for restart button
        restartButton.on('pointerdown', function() {
            //makeRestartButtonDissapear();
            restartButton.setVisible(false);
            player.clearTint(); 
            this.physics.resume(); // Resume physics
            gameOver = false; 
            launchButton.setStyle({ backgroundColor: '#0f0' }); // Reset launch button color

            let currencyEarned = Math.floor(score / 100);
            currency += currencyEarned;
            score = 0;
            scoreText.setText('Height: ' + score);
            updateCurrency();
            restartButton.setVisible(false);

        }, this); // Bind 'this' context to the current scene

        this.events.on('update', function () {
            coordinatesText.setText('Player Coordinates: ' + Math.floor(player.x) + ', ' + Math.floor(player.y));
            coordinatesText.setPosition(player.x + 50, player.y - 50);
            
            thrustInfoText.setText('Thrust: ' + thrust);
            thrustInfoText.setPosition(player.x + 50, player.y - 30); // Update the position  

        });
            button1 = this.add.text(-398, 180, 'testWings', { fill: '#0f0' }).setInteractive();
            // Customize button style
            button1.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
            button1.setVisible(false); // Show button initially
            wings.setVisible(false); // Hide wings initially
            // Add event listener for button click
            button1.on('pointerdown', function() {
                // Your button click logic here
                makewings();
                button1state = true; // button has been pressed so - Set button1 state to true
            });
            button2 = this.add.text(-398, 202, 'testPlatform', { fill: '#0f0' }).setInteractive();
            // Customize button style
            button2.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
            button2.setVisible(false); // Show button initially
            wings.setVisible(false); // Hide wings initially
            // Add event listener for button click
            button2.on('pointerdown', function() {
                // Your button click logic here
                makePad();
                button2state = true; // button has been pressed so - Set button1 state to true
            });


}

// Function to update the score based on the player's height
function updateScore() {
    if (player.y < 0) {
        // Calculate the change in player's height since the previous frame
        let heightChange = Math.floor(player.y) - Math.floor(player.previousY);

        // Check if the player is moving upwards (velocity is negative)
        if (player.body.velocity.y < 0) {
            // If so, increase the score by the absolute value of the height change
            score += Math.abs(heightChange);
        }
    }
}


function updateCurrency() {
    currencyText.setText(currency);
}



//<00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000( Update Game State )000000000000000000000000000000000000000000000000 #FF0000 000000000 #FF0000 000>

function update () {
    
    //sky.tilePositionY -= 0.5;

    updateScore();
    scoreText.setText('Height: ' + score);

    if (player.x < -270 && player.x > -460 && button1state === false && currency > wings1Cost ){  // add money requirement here to buy wings<-----------------------------------------------------
        button1.setVisible(true); // Show the button
    } else {
        button1.setVisible(false); // Hide the button
    }
    if (player.x < -270 && player.x > -460 && button2state === false && currency > launchPad1Cost ){  // add money requirement here to buy wings<-----------------------------------------------------
        button2.setVisible(true); // Show the button
    } else {
        button2.setVisible(false); // Hide the button
    }
    // if (gameOver) {
    //     //return;
    // }
    if (player.x > -91 && player.x < 91){ 
        launchButton.setVisible(true); 
    }else{
        launchButton.setVisible(false);
    }
    
    
    if (cursors.left.isDown || keyA.isDown) {
        duck.setVelocityX(-160);
        // player.setVelocityX(-160);
        // player.anims.play('left', true);
        duck.anims.play('walking', true);
    } else if (cursors.right.isDown || keyD.isDown) {
        duck.setVelocityX(160);
        // player.setVelocityX(160);
        // player.anims.play('right', true);
        duck.anims.play('walking', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
        duck.anims.play('idle', true);
        duck.setVelocityX(0);
    }
    


    if (cursors.up.isDown && player.body.touching.down || keyW.isDown && player.body.touching.down)
    {
        player.setVelocityY(-200); // this goes down every second, if player touches something midFlight, it will substract points from the velocity, if velocity 0 game ends. 
    }
    //updateScore();
    updateCurrency();

    wings.setPosition(player.x, player.y);
//<----------------------------------------------------------------------------------------(game restart when falling )------------------------------------->
if (player.body.velocity.y > 0 && player.y < -50 && playerStop === false) {
    playerStop = true;
    // Check if the player is moving downwards - Check every 100 milliseconds if the player has stopped moving downwards
    bombToggler = false; // Reset bomb toggler
    setTimeout(() => {
        let scene = this; // Capture the Phaser scene context
        scene.physics.pause();
        player.setTint(0xff0000);
        setTimeout(() => {
        player.setPosition(400, 150); 
        theRestart();

        }, 2000);
        
        // Create a tween to fade out the player over 1 second
        scene.tweens.add({
            targets: player,
            alpha: 0.3, // Set alpha to 0 (fully transparent)
            duration: 800, // Duration of the tween in milliseconds
            onComplete: function () {
                
                // Create a tween to fade in the player over 1 second
                scene.tweens.add({
                    targets: player,
                    alpha: 1, // Set alpha to 1 (fully opaque)
                    duration: 1000, // Duration of the tween in milliseconds
                    delay: 2500, // Delay before starting the tween in milliseconds
                    // onComplete: function () {
                    //     player.setPosition(100, 300); // Reset player's position
                    // }
                });
            }
        });
    }, 2500);
}

    // if (!player.body.onFloor() && cursors.left.isDown || !player.body.onFloor() && keyA.isDown ) { // Check if the player is not on the floor and the left arrow key is pressed
    //     player.setAngle(-45); // Rotate the player sprite 90 degrees
    // } else if (!player.body.onFloor() && cursors.right.isDown || !player.body.onFloor() && keyD.isDown ) { // Check if the player is not on the floor and the right arrow key is pressed
    //     player.setAngle(45); // Rotate the player sprite -90 degrees
    // } else {
    //     player.setAngle(0); // Reset the player sprite angle
    // }

   
    player.previousY = player.y;

    // if (player.x < -20) {
    //     launchButton.setVisible(true);
    // }
    const cameraScrollX = this.cameras.main.scrollX;
    const cameraScrollY = this.cameras.main.scrollY;

    // Set the position of the sky background to match the camera's position
    sky.tilePositionX = cameraScrollX * 0.3; // Adjust the speed as needed
    sky.tilePositionY = cameraScrollY * 0.3; // Adjust the speed as needed
    sky.x = 200 + cameraScrollX;
    sky.y = 400 + cameraScrollY;

    // Check for overlap between player and bombs
    var bombCollisionOccurred = false; // Flag to track bomb collision

    this.physics.add.collider(player, bombs, function(player, bomb) {
        if (!bombCollisionOccurred) { // Check if collision hasn't occurred yet
            currency -= 10; // Subtract 100 from the currency
            //bombCollisionOccurred = true; // Set flag to true to indicate collision occurred
        }
    });
    
}//<---------------------------------------------------------------------------------------------------( Update Ends )----------------------------------#FF0000 ----------- #FF0000---------------------->


//<---------------------------------------------------( Collect Stars )------------------------------>
function collectStar (player, star) {
    star.disableBody(true, true);
    score += 50;
    }

//<------------------------------------------( have no idea what this is )----------------------------->

    // Initialize the currentScene variable when the Phaser game starts
    window.onload = function () {
        currentScene = game.scene.scenes[0];
    };


    function makewings() {
        // Update wings position to follow the player with a slight offset
        wings.setPosition(player.x - 10, player.y + 10);
        wings.setAngle(player.angle); // Update wings angle to match the player's angle
        wings.setVisible(true); // Show the wings
        thrust -= 100; // Increase the score by 100
        currency -= wings1Cost; // Subtract the cost of the wings from the currency
        button1.setVisible(false); // Hide the button
    }
    function makePad() {
        // Update wings position to follow the player with a slight offset
        // Update the texture of the launchPad group
        launchPad.getChildren().forEach(function(child) {
            child.setTexture('launchPad1');
        });
        thrust -= 2000; // Increase the score by 100
        currency -= launchPad1Cost; // Subtract the cost of the wings from the currency
        button2.setVisible(false); // Hide the button
    }


    function spawnBomb() {
        if (bombToggler === true) {
            // Randomize x position around the player
            var x = Phaser.Math.Between(player.x - 100, player.x + 100);
            // Randomize y position above the player
            var y = Phaser.Math.Between(player.y - 500, player.y - 200);
            // Get the player's vertical velocity (thrust)
            var playerThrust = player.body.velocity.y + 200;
            // Create a bomb at the updated position
            var bomb = bombs.create(x, y, 'bomb');
            bomb.setBounce(1);
            bomb.allowGravity = false;
            // Set horizontal velocity randomly between -200 and 200
            // Set the vertical velocity to match the player's thrust
            bomb.setVelocity(Phaser.Math.Between(-200, 200), playerThrust);
            // Schedule bomb removal after duration
            setTimeout(function() {
                bomb.destroy();
            }, bombDuration);
        }
    }


    //<------------------------------------------( Working on this ----- Spawn Stars )------------------------------>
    function spawnStar () {
        if (bombToggler === true) {
            // Randomize x position around the player
            var x = Phaser.Math.Between(player.x - 100, player.x + 100);
            // Randomize y position above the player
            var y = Phaser.Math.Between(player.y - 500, player.y - 200);
            // Get the player's vertical velocity (thrust)
            var playerThrust = player.body.velocity.y + 200;

            // Create a bomb at the updated position
            var star = stars.create(x, y, 'star');
            star.setBounce(1);
            star.allowGravity = false;
        
            // Set horizontal velocity randomly between -200 and 200
            // Set the vertical velocity to match the player's thrust
            star.setVelocity(Phaser.Math.Between(-200, 200), playerThrust);
            
            // Schedule bomb removal after duration
            setTimeout(function() {
                star.destroy();
            }, bombDuration);
        }
    }

    function launching() {
        launchButton.setStyle({ backgroundColor: '#f00' });
        launchButton.setText('Launch');
        player.setVelocityY(thrust);
        bombTimer = setInterval(spawnBomb, bombInterval);
        starTimer = setInterval(spawnStar, starInterval);
        bombToggler = true;
        playerStop = false;
    }


    function theRestart() {
        clearInterval(bombTimer);
        clearInterval(starTimer);
        if (restartButton.visible === false){
            restartButton.setVisible(true);
        };
    }