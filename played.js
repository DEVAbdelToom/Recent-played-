document.addEventListener("DOMContentLoaded", function () {
    // Define an array to store recently played games
    const recentlyPlayedGames = [];
    const maxRecentlyPlayedGames = 10; // Maximum number of recently played games to display

    // Function to add a game to the recently played list
    function addGameToRecentlyPlayed(name, imageSrc, url) {
        // Check if the game is already in the recently played list
        const isAlreadyPlayed = recentlyPlayedGames.some((game) => game.url === url);

        if (!isAlreadyPlayed) {
            recentlyPlayedGames.unshift({ name, imageSrc, url });
            // Limit the recently played list to a certain number of games, if needed
            if (recentlyPlayedGames.length > maxRecentlyPlayedGames) {
                recentlyPlayedGames.pop(); // Remove the last game
            }
            displayRecentlyPlayedGames();
        }
    }

    // Function to display recently played games
    function displayRecentlyPlayedGames() {
        const recentlyPlayedContent = document.querySelector(".recently-played-content");

        // Clear the existing content
        recentlyPlayedContent.innerHTML = "";

        // Loop through the recently played games and create HTML elements
        recentlyPlayedGames.forEach((game) => {
            const gameCard = document.createElement("div");
            gameCard.classList.add("recent-game");

            const gameImage = document.createElement("img");
            gameImage.src = game.imageSrc;

            const gameName = document.createElement("h3");
            gameName.textContent = game.name;

            const playButton = document.createElement("a");
            playButton.textContent = "Play";
            playButton.href = game.url;
            playButton.target = "_blank";

            gameCard.appendChild(gameImage);
            gameCard.appendChild(gameName);
            gameCard.appendChild(playButton);

            recentlyPlayedContent.appendChild(gameCard);
        });
    }

    // Attach a click event listener to each game link
    const gameLinks = document.querySelectorAll(".swiper-slide");
    gameLinks.forEach((gameLink) => {
        gameLink.addEventListener("click", handleGameLinkClick);
    });

    // Function to handle game link clicks
    function handleGameLinkClick(event) {
        event.preventDefault(); // Prevent the default behavior of the link
        const gameLink = event.currentTarget;
        const gameInfo = {
            name: gameLink.querySelector("h2").textContent,
            imageSrc: gameLink.querySelector("img").src,
            url: gameLink.querySelector("a").href,
        };
        addGameToRecentlyPlayed(gameInfo.name, gameInfo.imageSrc, gameInfo.url);
    }
});

// Function to handle the click event on the "Download" buttons
function handleDownloadButtonClick(event) {
    event.preventDefault(); // Prevent the default link behavior
    const button = event.currentTarget;
    const url = button.getAttribute('data-url');

    // Open the URL in a new tab or window
    if (url) {
        window.open(url, '_blank');
    }
}

// Attach the click event listener to all "Download" buttons
const downloadButtons = document.querySelectorAll('.box-btn');
downloadButtons.forEach((button) => {
    button.addEventListener('click', handleDownloadButtonClick);
});
