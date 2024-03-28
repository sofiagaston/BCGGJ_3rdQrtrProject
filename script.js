 // Add event listeners for button clicks
    document.getElementById('TossButton').addEventListener('click', tossCoin);
    document.getElementById('attackButton').addEventListener('click', playerAttack);
    document.getElementById('defendButton').addEventListener('click', playerDefend);
    document.getElementById('restartButton').addEventListener('click', resetGame);

    // Initialize player and opponent health and turn status
    let playerHP = 100;
    let opponentHP = 100;
    let turn = false;

    // Function to simulate flipping a coin and determining player's turn
    function tossCoin() {
        const outcome = Math.random() < 0.5 ? 'Head' : 'Tail'; // Determine coin outcome
        const playerDecision = document.getElementById('heads-tales').value; // Get player's choice
        const outcomeText = "Coin is " + outcome + ". You chose " + playerDecision + "!"; // Construct outcome message

        // Determine turn based on player's choice and coin outcome
        if (outcome === playerDecision) {
            turn = true;
            document.getElementById('attackButton').classList.remove('disabled'); // Enable attack button
            document.getElementById('defendButton').classList.add('disabled'); // Disable defend button
        } else {
            turn = false;
            document.getElementById('attackButton').classList.add('disabled'); // Disable attack button
            document.getElementById('defendButton').classList.remove('disabled'); // Enable defend button
        }

        // Update game result display
        document.getElementById('gameWinner').innerText = outcomeText;
        document.getElementById('TossButton').classList.add('disabled'); // Disable coin toss button
        document.getElementById('restartButton').classList.remove('disabled'); // Enable restart button
    }

    // Function to calculate damage dealt by player or opponent
    function calculateDamage() {
        return Math.floor(Math.random() * 5) + 1; // Randomly generate damage between 1 and 5
    }

    // Function to handle player's attack action
    function playerAttack() {
        const damage = calculateDamage(); // Calculate damage
        opponentHP -= damage; // Apply damage to opponent's health
        document.getElementById('opponentH').innerText = Math.max(opponentHP, 0); // Update opponent's health display
        document.getElementById('gameWinner').innerText = "You inflict " + damage + " damage."; // Display attack result
        checkHealth(); // Check game status
        if (opponentHP > 0) {
            turn = false; // Switch turn to opponent            opponentTurn(); // Opponent's turn
        }
        document.getElementById('defendButton').classList.remove('disabled'); // Enable defend button
    }

    // Function to handle player's defend action
    function playerDefend() {
        document.getElementById('gameWinner').innerText = 'You will defend.'; // Display defend action
        checkHealth(); // Check game status
        if (opponentHP > 0) {
            turn = false; // Switch turn to opponent
            opponentTurn(); // Opponent's turn
        }
        document.getElementById('attackButton').classList.remove('disabled'); // Enable attack button
    }

    // Function to determine opponent's action (attack or defend)
    function opponentAction() {
        const action = Math.random() < 0.5 ? 'attack' : 'defend'; // Randomly choose action
        if (action === 'attack') {
            const damage = calculateDamage(); // Calculate damage
            playerHP -= damage; // Apply damage to player's health
            document.getElementById('playerH').innerText = Math.max(playerHP, 0); // Update player's health display
            document.getElementById('gameWinner').innerText = "Opponent inflicts " + damage + " damage."; // Display attack result
        } else {
            document.getElementById('gameWinner').innerText = 'Opponent defends.'; // Display defend action
        }
        checkHealth(); // Check game status
    }

    // Function to handle opponent's turn
    function opponentTurn() {
        opponentAction(); // Opponent's action
    }

    // Function to check game health and determine game status
    function checkHealth() {
        if (playerHP <= 0) {
            document.getElementById('gameWinner').innerText = 'Opponent wins.'; // Display game result
            disableButtons(); // Disable buttons
        } else if (opponentHP <= 0) {
            document.getElementById('gameWinner').innerText = 'Player wins.'; // Display game result
            disableButtons(); // Disable buttons
        }
    }

    // Function to reset game state
    function resetGame() {
        playerHP = 100; // Reset player health
        opponentHP = 100; // Reset opponent health
        document.getElementById('playerH').innerText = playerHP; // Update player's health display
        document.getElementById('opponentH').innerText = opponentHP; // Update opponent's health display
        document.getElementById('gameWinner').innerText = ''; // Clear game result display
        document.getElementById('attackButton').classList.add('disabled'); // Disable attack button
        document.getElementById('defendButton').classList.add('disabled'); // Disable defend button
        document.getElementById('restartButton').classList.remove('disabled'); // Enable restart button
        document.getElementById('TossButton').classList.remove('disabled'); // Enable coin toss button
    }

    // Function to disable all buttons
    function disableButtons() {
        document.getElementById('attackButton').classList.add('disabled'); // Disable attack button
        document.getElementById('defendButton').classList.add('disabled'); // Disable defend button
        document.getElementById('restartButton').classList.remove('disabled'); // Enable restart button
    }