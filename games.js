let menu=document.querySelector('.menu-icon');
let navbar=document.querySelector('.menu');
menu.onclick=()=>{
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
}
var swiper = new Swiper(".trending-content", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1068: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
const favoriteButtons = document.querySelectorAll('.favorite-button');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', addToFavorites);
  });

  function addToFavorites(event) {
    const gameId = event.target.dataset.gameId;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/favorites', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ gameId }));
  }



// Define an array to store recently played games
const recentlyPlayedGames = [];

// Function to add a game to the recently played list
function addGameToRecentlyPlayed(name, imageSrc, url) {
    recentlyPlayedGames.unshift({ name, imageSrc, url });
    // Limit the recently played list to a certain number of games, if needed
    const maxRecentlyPlayedGames = 5; // Adjust this value as per your preference
    if (recentlyPlayedGames.length > maxRecentlyPlayedGames) {
        recentlyPlayedGames.pop(); // Remove the last game
    }
    displayRecentlyPlayedGames();
}

// Function to display recently played games
function displayRecentlyPlayedGames() {
    const recentlyPlayedContainer = document.querySelector('.recently-played-games');
    recentlyPlayedContainer.innerHTML = ''; // Clear the container

    recentlyPlayedGames.forEach((game) => {
        // Create elements to display each game
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('recent-game');

        const gameImage = document.createElement('img');
        gameImage.src = game.imageSrc;

        const gameName = document.createElement('p');
        gameName.textContent = game.name;

        const gameLink = document.createElement('a');
        gameLink.href = game.url;
        gameLink.appendChild(gameImage);
        gameLink.appendChild(gameName);

        // Append the game link to the recently played container
        gameContainer.appendChild(gameLink);
        recentlyPlayedContainer.appendChild(gameContainer);
    });
}

// Attach a click event listener to each game link
const gameLinks = document.querySelectorAll(".box-text a");
gameLinks.forEach((gameLink) => {
    gameLink.addEventListener("click", handleGameLinkClick);
});

// Function to handle game link clicks
function handleGameLinkClick(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    const gameLink = event.currentTarget;
    const gameInfo = {
        name: gameLink.querySelector('h2').textContent,
        imageSrc: gameLink.querySelector('img').src,
        url: gameLink.href,
    };
    addGameToRecentlyPlayed(gameInfo.name, gameInfo.imageSrc, gameInfo.url);
}
