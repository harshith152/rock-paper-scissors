document.addEventListener("DOMContentLoaded", function() {
    const choices = document.querySelectorAll(".choice");
    const playerScoreElem = document.querySelector("#player-score .score-number");
    const computerScoreElem = document.querySelector("#computer-score .score-number");
    let playerScore = 0;
    let computerScore = 0;

    choices.forEach(choice => {
        choice.addEventListener("click", function() {
            const playerChoice = this.id;
            const computerChoice = getComputerChoice();
            const result = determineWinner(playerChoice, computerChoice);

            if (result === "player") {
                playerScore++;
            } else if (result === "computer") {
                computerScore++;
            }

            playerScoreElem.textContent = playerScore;
            computerScoreElem.textContent = computerScore;

            displayChoices(playerChoice, computerChoice, result);
            hideOriginalChoices();
            showResultButtons(result);
        });
    });

    const rulesButtons = document.querySelectorAll(".rules-button");
    const rules = document.querySelector(".rules");
    const closeButton = document.querySelector(".close-button");
    const nextButton = document.querySelector(".next-button");
    const winScreenPlayAgainButton = document.querySelector("#win-screen .play-again-button");

    rulesButtons.forEach(button => {
        button.addEventListener("click", function() {
            rules.style.display = "block";
        });
    });

    closeButton.addEventListener("click", function() {
        rules.style.display = "none";
    });

    nextButton.addEventListener("click", function() {
        showWinScreen();
    });

    winScreenPlayAgainButton.addEventListener("click", function() {
        goBackToChoices();
    });

    function getComputerChoice() {
        const choices = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "draw";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            return "player";
        } else {
            return "computer";
        }
    }

    function displayChoices(playerChoice, computerChoice, result) {
        const imageSources = {
            rock: "icons8-fist-67 1rock.png",
            paper: "icons8-hand-64 1paper.png",
            scissors: "17911 1scissors.png"
        };

        const playerChoiceDisplay = document.createElement("div");
        playerChoiceDisplay.classList.add("choice-display", "player-choice");
        playerChoiceDisplay.innerHTML = `
            <div class="choice-text">You Picked</div>
            <div class="outer-circle ${result === 'player' ? 'winner' : result === 'draw' ? 'draw' : 'loser'}">
                <div class="choice" id="${playerChoice}">
                    <img src="${imageSources[playerChoice]}" alt="${playerChoice}">
                </div>
            </div>
        `;

        const computerChoiceDisplay = document.createElement("div");
        computerChoiceDisplay.classList.add("choice-display");
        computerChoiceDisplay.innerHTML = `
            <div class="choice-text">PC Picked</div>
            <div class="outer-circle ${result === 'computer' ? 'winner' : result === 'draw' ? 'draw' : 'loser'}">
                <div class="choice" id="${computerChoice}">
                    <img src="${imageSources[computerChoice]}" alt="${computerChoice}">
                </div>
            </div>
        `;

        const resultText = document.createElement("div");
        resultText.classList.add("result-text");
        const resultHeading = document.createElement("h2");
        const resultParagraph = document.createElement("p");

        if (result === 'draw') {
            resultHeading.textContent = "It's a Draw!";
            resultParagraph.textContent = "Both players chose the same.";
        } else if (result === 'player') {
            resultHeading.textContent = "You Win!";
            resultParagraph.textContent = `Your ${playerChoice} beats ${computerChoice}.`;
        } else {
            resultHeading.textContent = "You Lose!";
            resultParagraph.textContent = `Computer's ${computerChoice} beats your ${playerChoice}.`;
        }

        resultText.appendChild(resultHeading);
        resultText.appendChild(resultParagraph);

        const choiceContainer = document.createElement("div");
        choiceContainer.classList.add("choice-container");
        choiceContainer.appendChild(playerChoiceDisplay);
        choiceContainer.appendChild(resultText);
        choiceContainer.appendChild(computerChoiceDisplay);

        const gameContainer = document.querySelector(".container");
        gameContainer.appendChild(choiceContainer);
    }

    function hideOriginalChoices() {
        const originalChoices = document.querySelector(".choices");
        originalChoices.style.display = "none";
    }

    function showResultButtons(result) {
        const playAgainButton = document.createElement("button");
        playAgainButton.textContent = "Play Again";
        playAgainButton.classList.add("play-again-button");

        if (result === 'player') {
            const nextButton = document.querySelector(".next-button");
            nextButton.style.display = "block";
        }

        playAgainButton.addEventListener("click", function() {
            resetChoices();
        });

        const gameContainer = document.querySelector(".container");
        gameContainer.appendChild(playAgainButton);
    }

    function resetChoices() {
        const choiceContainers = document.querySelectorAll(".choice-container");
        choiceContainers.forEach(container => container.remove());

        const playAgainButton = document.querySelector(".play-again-button");
        if (playAgainButton) playAgainButton.remove();
        const nextButton = document.querySelector(".next-button");
        nextButton.style.display = "none";

        const originalChoices = document.querySelector(".choices");
        originalChoices.style.display = "flex";
    }

    function showWinScreen() {
        const gameContainer = document.querySelector(".container");
        const winScreen = document.querySelector("#win-screen");
        gameContainer.style.display = "none";
        winScreen.style.display = "flex";
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreElem.textContent = playerScore;
        computerScoreElem.textContent = computerScore;

        resetChoices();
        const gameContainer = document.querySelector(".container");
        const winScreen = document.querySelector("#win-screen");
        gameContainer.style.display = "block";
        winScreen.style.display = "none";
    }

    function goBackToChoices() {
        const gameContainer = document.querySelector(".container");
        const winScreen = document.querySelector("#win-screen");
        gameContainer.style.display = "block";
        winScreen.style.display = "none";

        resetChoices(); 
    }
});
