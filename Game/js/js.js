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

var player;
var stars;
var bombs;
var platforms;
var walls;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var launchButton;
var restartButton; // New restart button variable
var thrust = -800;
var wings;

var bombTimer;
var bombInterval = 500; // Interval between bomb spawns in milliseconds
var bombDuration = 3000; // Duration for which bombs are visible in milliseconds


//<----------------------------------------------------------------------( Preload Assets )--------------------------------------------------------------------------------------------------------------->
function preload () {
    this.load.image('sky', 'assets/skybig.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('walls', 'assets/wall.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('wings', 'assets/wings.png');
}
//<----------------------------------------------------------------------( Create Game Elements )---------------------------------------------------------------------------------------------------------->
function create () {

// <---------------------------------( Background )--------------------------------------------->
    this.add.image(400, 300, 'sky').setDepth(-10);
// <---------------------------------( Platforms )--------------------------------------------->
    platforms = this.physics.add.staticGroup();
    platforms.create(-100, 400, 'ground').setScale(2).refreshBody();
    platforms.create(100, 400, 'ground').setScale(2).refreshBody();
    platforms.create(-500, 0, 'walls');
    platforms.create(500, 0, 'walls');
    //.setScale(2).refreshBody()

// <---------------------------------( Walls )--------------------------------------------->
    const wall = platforms.create(500, 0, 'walls');
    wall.displayHeight = 2000 * wall.height; // Set the display height to 20 times the original height
    wall.refreshBody(); // Refresh the body to apply changes

    const leftWall = platforms.create(-500, 0, 'walls'); // Create the left wall
leftWall.displayHeight = 2000 * leftWall.height; // Set the display height to 20 times the original height
leftWall.refreshBody(); // Refresh the body to apply changes




// <---------------------------------( Player )--------------------------------------------->
    player = this.physics.add.sprite(100, 300, 'dude');
    player.setBounce(0.2);
    this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true);

        launchButton = this.add.text(100, 100, 'Launch', { fill: 'brown' }).setInteractive();
        launchButton.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' });
        
        launchButton.on('pointerdown', function() {
            console.log('You pressed the launch button');
            //launchButton.setStyle({ backgroundColor: '#f00' });
            //launchButton.setText('Launch');
            player.setVelocityY(thrust);
            // Start spawning bombs
            console.log("bomb has been crerated");
            bombTimer = setInterval(spawnBomb, bombInterval);
            console.log("after the bomb has been crerated");
            setTimeout(function() {
            }, 1000);
        });
//<--------------------------------------------------( Player Accessories )--------------------------------------------->

wings = this.add.image(player.x, player.y, 'wings');
wings.setDepth(-0.1); // Ensure wings are behind the player
// wings = this.physics.add.image(player.x, player.y, 'wings');
// wings.setOrigin(0.5, 0.5);
// wings.setGravityY(0); // Disable gravity for the wings
    //wings.setDisplaySize(50, 50);
    //wings.setTint(0xff0000);
    // wings.setAngle(45);
    // wings.setAlpha(0.5);
    // wings.setDepth(1);
    //wings.setOrigin(0.5, 0.5);
    //wings.setFlipX(true);
    //wings.setFlipY(true);

// <---------------------------------( Display player coordinates )--------------------------------------------->
    let coordinatesText = this.add.text(player.x + 50, player.y - 50, '', { fontSize: '12px', fill: '#fff' });
    let thrustInfoText = this.add.text(player.x + 50, player.y - 30, '', { fontSize: '12px', fill: '#fff' });

// <---------------------------------( Update player coordinates )--------------------------------------------->
    this.events.on('update', function () {
        coordinatesText.setText('Player Coordinates: ' + Math.floor(player.x) + ', ' + Math.floor(player.y));
        coordinatesText.setPosition(player.x + 50, player.y - 50);
        
        thrustInfoText.setText('Thrust: ' + thrust);
        thrustInfoText.setPosition(player.x + 50, player.y - 30); // Update the position
                // Attach the button to the player
                restartButton.setPosition(player.x - 35, player.y + 30);


                wings.setPosition(player.x, player.y); // Update wings position to follow the player
                wings.setAngle(player.angle); // Update wings angle to match the player's angle
    });


// <---------------------------------( Player animations )--------------------------------------------->
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });


// <---------------------------------( Input events )--------------------------------------------->
    cursors = this.input.keyboard.createCursorKeys();


// <---------------------------------( Stars )--------------------------------------------->
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

// <---------------------------------( Bombs )--------------------------------------------->
    bombs = this.physics.add.group();


// <---------------------------------( Score text )--------------------------------------------->
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

// <---------------------------------( Collisions )--------------------------------------------->
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);


// <---------------------------------( Camera follow )--------------------------------------------->
    this.cameras.main.startFollow(player);


        // <---------------------------------( Restart Button )--------------------------------------------->
        restartButton = this.add.text(player.x + 100, player.y - 100, 'Restart', { fill: '#0f0' }).setInteractive(); // Create restart button
        restartButton.setStyle({ backgroundColor: '#ff0', borderRadius: '15px' }); // Set button style
        restartButton.setVisible(false);
        // Add event listener for restart button
        restartButton.on('pointerdown', function() {
                        // Button to stop the counter
            stopCounterButton.on('pointerdown', function() {
                clearInterval(bombTimer); // Stop the bomb spawning interval
            });
            restartButton.setVisible(false);
            //console.log('You pressed the restart button');
            player.clearTint(); // Remove any tint that was applied
            this.physics.resume(); // Resume physics
            //player.setVelocity(0); // Reset player's velocity to zero
            gameOver = false; // Reset game over state
            launchButton.setStyle({ backgroundColor: '#ff0' }); // Reset launch button color
        }, this); // Bind 'this' context to the current scene

        this.events.on('update', function () {
            coordinatesText.setText('Player Coordinates: ' + Math.floor(player.x) + ', ' + Math.floor(player.y));
            coordinatesText.setPosition(player.x + 50, player.y - 50);
            
            thrustInfoText.setText('Thrust: ' + thrust);
            thrustInfoText.setPosition(player.x + 50, player.y - 30); // Update the position
        
            // Update wings position to follow the player with a slight offset
            wings.setPosition(player.x - 10, player.y + 10);
            wings.setAngle(player.angle); // Update wings angle to match the player's angle
        });
        

}

function updateScore() {
    thrust = score; // Update the score based on the current value of thrust
}



//<----------------------------------------------------------------------( Update Game State )------------------------------------------------------------------------------------------------------------>

function update () {
    if (gameOver) {
        //return;
        setTimeout(() => {
        restartButton.setVisible(true);
        }, 3000); 
    }
  
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330); // this goes down every second, if player touches something midFlight, it will substract points from the velocity, if velocity 0 game ends. 
    }
    updateScore();

    wings.setPosition(player.x, player.y);
//<------------------------------------------------00000000000000000000000000000000000000000000000000(game restart when falling )00000000000000000000000000000000000--------------->
if (player.body.velocity.y > 0 && player.y < -20) {
    // Check if the player is moving downwards
    // Check every 100 milliseconds if the player has stopped moving downwards
    setTimeout(() => {
        console.log('Player has stopped moving downwards');
        let scene = this; // Capture the Phaser scene context
        scene.physics.pause();
        player.setTint(0xff0000);
        //player.anims.play('turn');
        player.setPosition(100, 300); // Reset player's position
        // Create a tween to fade out the player over 1 second
        scene.tweens.add({
            targets: player,
            alpha: 0, // Set alpha to 0 (fully transparent)
            duration: 800, // Duration of the tween in milliseconds
            onComplete: function () {
                setTimeout(() => {
                    gameOver = true;
                }, 3500); // 3 seconds countdown
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

    if (!player.body.onFloor() && cursors.left.isDown) { // Check if the player is not on the floor and the left arrow key is pressed
        player.setAngle(-45); // Rotate the player sprite 90 degrees
    } else if (!player.body.onFloor() && cursors.right.isDown) { // Check if the player is not on the floor and the right arrow key is pressed
        player.setAngle(45); // Rotate the player sprite -90 degrees
    } else {
        player.setAngle(0); // Reset the player sprite angle
    }

    

}


//<----------------------------------------------------------------------( Collect Stars )-------------------------------------------------------------------------------------------------------------->
function collectStar (player, star) {
    star.disableBody(true, true);
    score -= 550;
    scoreText.setText('Score: ' + Math.abs(score)); // Displaying the absolute value of the score

//     if (stars.countActive(true) === 0) {
//         stars.children.iterate(function (child) {
//             child.enableBody(true, child.x, 0, true, true);
//         });

//         var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
//         var bomb = bombs.create(x, 16, 'bomb');
//         bomb.setBounce(1);
//         bomb.setCollideWorldBounds(true);
//         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
//         bomb.allowGravity = false;
//     }
// }

//<----------------------------------------------------------------------( have no idea what this is )------------------------------------------------------------------------------------------------------->

    // Initialize the currentScene variable when the Phaser game starts
    window.onload = function () {
        currentScene = game.scene.scenes[0];
    };


    function spawnBomb() {
        console.log("bomb has been crerated");
        var x = Phaser.Math.Between(player.x - 100, player.x + 100); // Randomize x position around the player
        var y = Phaser.Math.Between(player.y - 500, player.y - 100); // Randomize y position above the player
        var bomb = bombs.create(x, y, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 0); // Set horizontal velocity only
        bomb.allowGravity = false;
    
        // Schedule bomb removal after duration
        setTimeout(function() {
            bomb.destroy();
        }, bombDuration);
    }};