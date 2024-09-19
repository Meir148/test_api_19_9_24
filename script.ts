// HTML elements
const positionSelect = document.getElementById('position') as HTMLSelectElement;
const pointsSlider = document.getElementById('points') as HTMLInputElement;
const twoPercentSlider = document.getElementById('two-percent') as HTMLInputElement;
const threePercentSlider = document.getElementById('three-percent') as HTMLInputElement;
const form = document.getElementById('search-form') as HTMLFormElement;
const resultsTable = document.getElementById('results-body') as HTMLElement;
const teamContainer = document.getElementById('team-container') as HTMLElement;

// interface
interface Player {
  playerName: string;      
  position: string;
  points: number;
  twoPercent: number;        
  threePercent: number;
  team: string;
  
}

// listener 
form.addEventListener('submit', async (event: Event) => {
  event.preventDefault();

  //input values
  const position = String(positionSelect.value);
  const points = Number(pointsSlider.value);
  const twoPercent = Number(twoPercentSlider.value);
  const threePercent = Number(threePercentSlider.value);

  // request body
  const body = JSON.stringify({
    position: position,
    twoPercent: twoPercent,  
    threePercent: threePercent,
    points: points
  });

  try {
  
    const response = await fetch('https://nbaserver-q21u.onrender.com/api/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    if (!response.ok) {
      throw new Error(`error: ${response.status}`);
    }

    const players: Player[] = await response.json();
    displayResults(players);
    console.log(players);
    

  } catch (error) {
    console.error("error", error);
  }
});

//display results in table
function displayResults(players: Player[]) {
  resultsTable.innerHTML = ''; 

  players.forEach(player => {
    const row = document.createElement('tr');
   
    const playerName = document.createElement('td');
    playerName.textContent = player.playerName;

    const position = document.createElement('td');
    position.textContent = player.position;

    const points = document.createElement('td');
    points.textContent = player.points.toString();

    const twoPercent = document.createElement('td');
    twoPercent.textContent = player.twoPercent.toString() + '%';

    const threePercent = document.createElement('td');
    threePercent.textContent = player.threePercent.toString() + '%';

    const main = document.createElement('td');
    const addButton = document.createElement('button');

    addButton.textContent = 'Add to Team';

    addButton.addEventListener('click', () => addToTeam(player.position, player.playerName, player.points));
    main.appendChild(addButton);

    row.appendChild(playerName);
    row.appendChild(position);
    row.appendChild(points);
    row.appendChild(twoPercent);
    row.appendChild(threePercent);
    row.appendChild(main);


    resultsTable.appendChild(row);
  });
}

//  add player to team
function addToTeam(position: string, playerName: string, points: number) {
  const positionDiv = document.getElementById(position.toLowerCase());
  if (positionDiv) {
   
    //clear the boxes , to prevent duplicate players
     positionDiv.textContent = ''

    const positionStrong = document.createElement('strong');
    positionStrong.textContent = position;

    const playerNameP = document.createElement('p');
    playerNameP.textContent = playerName;

    const pointsP = document.createElement('p');
    pointsP.textContent = `Points: ${points}`;

    positionDiv.appendChild(positionStrong);
    positionDiv.appendChild(playerNameP);
    positionDiv.appendChild(pointsP);

  }
}
