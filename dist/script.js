"use strict";
const positionSelect = document.getElementById('position');
const pointsSlider = document.getElementById('points');
const pointsValue = document.getElementById('points-value');
const twoPercentSlider = document.getElementById('two-percent');
const twoPercentValue = document.getElementById('two-percent-value');
const threePercentSlider = document.getElementById('three-percent');
const threePercentValue = document.getElementById('three-percent-value');
const form = document.getElementById('search-form');
const resultsTable = document.getElementById('results-body');
const teamContainer = document.getElementById('team-container');
pointsSlider.addEventListener('input', () => {
    pointsValue.innerText = pointsSlider.value;
});
twoPercentSlider.addEventListener('input', () => {
    twoPercentValue.innerText = `${twoPercentSlider.value}%`;
});
threePercentSlider.addEventListener('input', () => {
    threePercentValue.innerText = `${threePercentSlider.value}%`;
});
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const position = positionSelect.value;
    const points = pointsSlider.value;
    const twoPercent = twoPercentSlider.value;
    const threePercent = threePercentSlider.value;
    const response = await fetch(`https://nbaserver-q21u.onrender.com/filter?position=${position}&points=${points}&fg=${twoPercent}&3p=${threePercent}`);
    const players = await response.json();
    displayResults(players);
});
function displayResults(players) {
    resultsTable.innerHTML = ''; // Clear the table
    players.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.position}</td>
      <td>${player.points}</td>
      <td>${player.fgPercentage}%</td>
      <td>${player.threePercentage}%</td>
      <td><button onclick="addToTeam('${player.position}', '${player.name}', ${player.points})">Add to Team</button></td>
    `;
        resultsTable.appendChild(row);
    });
}
// add player 
function addToTeam(position, playerName, points) {
    const positionDiv = document.getElementById(position.toLowerCase());
    if (positionDiv) {
        positionDiv.innerHTML = `
      <strong>${position}</strong>
      <p>${playerName}</p>
      <p>Points: ${points}</p>
    `;
    }
}
