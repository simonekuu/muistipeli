const startPage = document.getElementById('start-page');
    const gamePage = document.getElementById('game-page');
    const startForm = document.getElementById('start-form');
    const gameGrid = document.getElementById('game-grid');
    const turnIndicator = document.getElementById('turn-indicator');
    const scorePlayer1 = document.getElementById('score-player1');
    const scorePlayer2 = document.getElementById('score-player2');
    const restartButton = document.getElementById('restart-game');
    const theme = document.getElementById('theme');
    const modal = document.getElementById('winners-modal');
    const closeModalButton = document.getElementById('close-modal');
    const showWinnersButton = document.getElementById('show-winners');
    const winnersListElement = document.getElementById('winners');
    let click = document.getElementById('click');
    let gotit = document.getElementById('gotit');
    let player1 = '';
    let player2 = '';
    let currentTurn = 1;
    let score = { 1: 0, 2: 0 };
    let firstCard = null;
    let secondCard = null;
    let pairCount = 6;
    let matchedPairs = 0;
    


    const imagesJoulu = [
      'muistipeli_images/Joulu/joulu1.jpeg',
      'muistipeli_images/Joulu/joulu2.jpeg',
      'muistipeli_images/Joulu/joulu3.jpeg',
      'muistipeli_images/Joulu/joulu4.jpeg',
      'muistipeli_images/Joulu/joulu5.jpeg',
      'muistipeli_images/Joulu/joulu6.jpeg',
      'muistipeli_images/Joulu/joulu7.jpeg',
      'muistipeli_images/Joulu/joulu8.jpeg',
      'muistipeli_images/Joulu/joulu9.jpeg',
      'muistipeli_images/Joulu/joulu10.jpeg',
      'muistipeli_images/Joulu/joulu11.jpeg',
      'muistipeli_images/Joulu/joulu12.jpeg',
      'muistipeli_images/Joulu/joulu13.jpeg',
      'muistipeli_images/Joulu/joulu14.jpeg',
      'muistipeli_images/Joulu/joulu15.jpeg',
      'muistipeli_images/Joulu/joulu16.jpeg',
      'muistipeli_images/Joulu/joulu17.jpeg',
      'muistipeli_images/Joulu/joulu18.jpeg',
      'muistipeli_images/Joulu/joulu19.jpeg',
      'muistipeli_images/Joulu/joulu20.jpeg'
    ];
    
    const imagesFantasia = [
      'muistipeli_images/Fantasia/fantasia1.jpeg',
      'muistipeli_images/Fantasia/fantasia2.jpeg',
      'muistipeli_images/Fantasia/fantasia3.jpeg',
      'muistipeli_images/Fantasia/fantasia4.jpeg',
      'muistipeli_images/Fantasia/fantasia5.jpeg',
      'muistipeli_images/Fantasia/fantasia6.jpeg',
      'muistipeli_images/Fantasia/fantasia7.jpeg',
      'muistipeli_images/Fantasia/fantasia8.jpeg',
      'muistipeli_images/Fantasia/fantasia9.jpeg',
      'muistipeli_images/Fantasia/fantasia10.jpeg',
      'muistipeli_images/Fantasia/fantasia11.jpeg',
      'muistipeli_images/Fantasia/fantasia12.jpeg',
      'muistipeli_images/Fantasia/fantasia13.jpg',
      'muistipeli_images/Fantasia/fantasia14.jpg',
      'muistipeli_images/Fantasia/fantasia15.jpeg',
      'muistipeli_images/Fantasia/fantasia16.jpeg',
      'muistipeli_images/Fantasia/fantasia17.jpeg',
      'muistipeli_images/Fantasia/fantasia18.jpeg',
      'muistipeli_images/Fantasia/fantasia19.jpg',
      'muistipeli_images/Fantasia/fantasia20.jpg'
    ];
    
    const imagesGals = [
      'muistipeli_images/Gals/mh1.jpeg',
      'muistipeli_images/Gals/mh2.jpeg',
      'muistipeli_images/Gals/mh3.jpeg',
      'muistipeli_images/Gals/mh4.jpeg',
      'muistipeli_images/Gals/mh5.jpeg',
      'muistipeli_images/Gals/mh6.jpeg',
      'muistipeli_images/Gals/mh7.jpeg',
      'muistipeli_images/Gals/mh8.jpeg',
      'muistipeli_images/Gals/mh9.jpeg',
      'muistipeli_images/Gals/mh10.jpeg',
      'muistipeli_images/Gals/mh11.jpeg',
      'muistipeli_images/Gals/mh12.jpeg',
      'muistipeli_images/Gals/mh13.jpeg',
      'muistipeli_images/Gals/mh14.jpeg',
      'muistipeli_images/Gals/mh15.jpeg',
      'muistipeli_images/Gals/mh16.jpeg',
      'muistipeli_images/Gals/mh17.jpeg',
      'muistipeli_images/Gals/mh18.jpeg',
      'muistipeli_images/Gals/mh19.jpeg',
      'muistipeli_images/Gals/mh20.jpeg',
    ];


    const backgroundImageSelect = document.getElementById('theme');

    
    const backgroundImages = {
      image1: 'muistipeli_images/Taustat/Pink_Christmas.jpg',
      image2: 'muistipeli_images/Taustat/sunset.jpg',
      image3: 'muistipeli_images/Taustat/pink_smoke.jpg',
      
    };
    
    window.onload = () => {
      document.body.style.backgroundImage = ''; 
    };
    
    function updateBackgroundImage(selectedValue) {
      if(!selectedValue) return;
      const imageUrl = backgroundImages[selectedValue];
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }
    
    
    backgroundImageSelect.addEventListener('change', (event) => {
      updateBackgroundImage(event.target.value);
    });
    
   
    updateBackgroundImage(backgroundImageSelect.value);
    

   
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    
    function generateCards(pairCount) {
      const values = Array.from({ length: pairCount }, (_, i) => i);
      const cards = [...values, ...values];
      shuffle(cards);
      return cards;
    }
    
    function updateTurnIndicator() {
      turnIndicator.textContent = `Vuoro: ${currentTurn === 1 ? player1 : player2}`;
    }
   
    function renderGrid(cards) {
      gameGrid.innerHTML = '';
      const columns = Math.ceil(Math.sqrt(cards.length));
      gameGrid.style.gridTemplateColumns = ''; 
        
      cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;//
        card.dataset.index = index;//

      const img = document.createElement('img');
        switch (theme.value) {
          case 'image2':
            img.src = imagesFantasia[value];
            break;
          case 'image3':
            img.src = imagesGals[value];
            break;
          default:
            img.src = imagesJoulu[value];
            break;
        }
        
        
        card.appendChild(img);

        card.addEventListener('click', onCardClick); 
        gameGrid.appendChild(card);
      });
    }

    function onCardClick(event) {
      const card = event.target.closest('.card');


      if (card.classList.contains('flipped') || secondCard) return; 
      click.play();
      card.classList.add('flipped');

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        checkMatch();
      }
    }
   
    function checkMatch() {
      const value1 = firstCard.dataset.value;
      const value2 = secondCard.dataset.value;

      if (value1 === value2) {
        score[currentTurn]++;
        matchedPairs++; 
        gotit.play();
        updateScoreboard();
        setTimeout(() =>{
            checkWinner();
        },1000);
        
        firstCard = null;
        secondCard = null;
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          firstCard = null;
          secondCard = null;
          currentTurn = currentTurn === 1 ? 2 : 1;
          updateTurnIndicator();
        }, 2000);
      }
    }

    function updateScoreboard() {
      scorePlayer1.textContent = `${player1}: ${score[1]}`;
      scorePlayer2.textContent = `${player2}: ${score[2]}`;
    }
    
    startForm.addEventListener('submit', (event) => {
      if(theme.value === "") alert("Valitse ensin teema!")
      else{
          event.preventDefault();
          player1 = document.getElementById('player1').value;
          player2 = document.getElementById('player2').value;
          pairCount = parseInt(document.getElementById('pair-count').value, 10);
    
          startPage.classList.add('hidden');
          gamePage.classList.remove('hidden');
    
          const cards = generateCards(pairCount);
          renderGrid(cards);
          updateTurnIndicator();
          updateScoreboard();
          }
      
    });

    restartButton.addEventListener('click', () => {
      document.querySelector("form").reset();
      location.reload();
    });

    
    function checkWinner() {
      if (matchedPairs === pairCount) {
        setTimeout(() => {
          const winner = score[1] > score[2] ? player1 : score[1] < score[2] ? player2 : 'Tasapeli';
          const winnerScore = Math.max(score[1], score[2]);
          const cheer = document.getElementById('cheer');
          cheer.play();
          const winnerAnnounce = document.createElement("h1");
          winnerAnnounce.className = "voittoilmoitus";
          let winnerName;
          if(score[1] === score[2]){
            winnerName = document.createTextNode('Tasapeli!');
          }
          else {
            winnerName = document.createTextNode(`${winner} on voittaja!`);//
          }
          saveWinner(winner,winnerScore)
          winnerAnnounce.appendChild(winnerName);
          document.body.appendChild(winnerAnnounce);
        }
      )}
  };
    function saveWinner(name, points) {
      const winners = JSON.parse(localStorage.getItem('winners')) || [];
      winners.push({ name, points });
      localStorage.setItem('winners', JSON.stringify(winners));
    }
    function displayWinners() {
      const winnersListElement = document.getElementById('winners');
      const winners = JSON.parse(localStorage.getItem('winners')) || [];
      
      winnersListElement.innerHTML = '';
      winners.forEach((winner, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${winner.name}  ${winner.points} pistettä`;
        winnersListElement.appendChild(listItem);
      });
    }
    
   
    displayWinners();
    
function showWinnersModal() {
  displayWinners(); 
  modal.classList.remove('hidden');
}


function closeWinnersModal() {
  modal.classList.add('hidden');
}


function displayWinners() {
  const winners = JSON.parse(localStorage.getItem('winners')) || [];
  
  winnersListElement.innerHTML = '';
  winners.forEach((winner, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${winner.name} - ${winner.points} pistettä`;
    winnersListElement.appendChild(listItem);
  });
}


showWinnersButton.addEventListener('click', showWinnersModal);
closeModalButton.addEventListener('click', closeWinnersModal);


window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeWinnersModal();
  }
});
