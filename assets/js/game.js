var fightOrSkip = function () {
    var promptFight = window.prompt(" Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // conditional Recursive function call 

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        // confirm that the player wants to skip
        var confirmSkip = window.confirm("Are you sure you want to skip?");
        // if yes, leave fight

        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
            //  subtract money for skipping 
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            // return true if player wants to leave
            return true;
        }
    }
    return false;
}

var fight = function (enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using thr fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop 
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)
            enemy.health = Math.max(0, enemy.health - playerInfo.attack);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + "attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // Checks enemys health 
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left."); 
            }
            
            // player gets attacked first 
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            )

            // Check player health 
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round 
        isPlayerTurn = !isPlayerTurn;
    }
};

var startGame = function () {
    // reset player stats 
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            // generate random damage value based on player's attack power
            pickedEnemyObj.health = randomNumber(40, 60);

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, would you like to visit the store before the next round?");

                // if yes, take them to the store() function 
                if (storeConfirm) {
                    shop();
                }
            }

        } else {
            window.alert("You have lost your robot in battle! Game over!");
            break;
        }
    }

    endGame();

};

// function to end the entire game
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");
    // check localStorage for high score, if its not there, use 0
    var highscore = localStorage.getItem("highscore");
    if (highscore === null) {
        highscore = 0;
    }
    // if player has more money than the highscore, player has new high score 
    if (playerInfo.money > highscore) {
        localStorage.setItem("Highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the highscore of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the highscore of " + highscore + ". Maybe next time!" );
    }

    var playAgainConfirm = window.confirm("Would you like to play again?")

    // restart the game
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: '1 for REFILL', '2 for UPGRADE','3 for LEAVE' to make a choice."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action 
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;

    }

    // use switch to carry pout action

};

var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// function to set name  
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log(" Your robot's name is" + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");

            this.health += 20;
            this.money -= 7;

        } else {
            window.alert("You dont have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 7 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;

        } else {
            window.alert("You dont have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Tumble",
        attack: randomNumber(10, 14)
    }
];

startGame();


