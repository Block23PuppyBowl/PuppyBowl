const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-A';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const getAllPalyers = async () => {
    try {
       
        const response = await fetch(`${APIURL}/players`);
        console.log(`${APIURL}/players`)
        const playerList = await response.json();
        console.log(playerList.data.players);
        return playerList.data.players;
     //   const response = await fetch(`${APIURL}/players`);
      //  const playerList = await response.json();
       
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};
const getplayerById = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`);
        const player = await response.json();
        console.log(player.data.players)
        return player
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};
const deletePlayer = async (id) => {
    // your code here
  };

  const renderSinglePlayerById = async (id) => {
    try {
      // fetch party details from server
      const player = await getplayerById(id);
  
    //   // GET - /api/workshop/guests/party/:partyId - get guests by party id
    //   const guestsResponse = await fetch(`${GUESTS_API_URL}/party/${id}`);
    //   const guests = await guestsResponse.json();
  
    //   // GET - /api/workshop/rsvps/party/:partyId - get RSVPs by partyId
    //   const rsvpsResponse = await fetch(`${RSVPS_API_URL}/party/${id}`);
    //   const rsvps = await rsvpsResponse.json();
  
    //   // GET - get all gifts by party id - /api/workshop/parties/gifts/:partyId -BUGGY?
    //    const giftsResponse = await fetch(`${PARTIES_API_URL}/party/gifts/${id}`);
    //    const gifts = await giftsResponse.json();
  
      // create new HTML element to display party details
      const playerDetailsElement = document.createElement('div');
      playerDetailsElement.classList.add('player-details');
      playerDetailsElement.innerHTML = `
      <h4>PlayerId: ${player.id}</h4>
      <p>Name : ${player.name}</p>
      <p>Breed : ${player.breed}</p>
      <p>Status: ${player.status}</p>
      <p>CreatedAt : ${player.createdAt}</p>
      <p>UpdatedAt : ${player.updatedAt}</p>
      <p>TeamId: ${player.teamId}</p>
      <p>CohortId : ${player.cohortId}</p>
      <button class="close-button">Close</button>`;
      playerContainer.appendChild(playerDetailsElement);
  
      // add event listener to close button
      const closeButton = playerDetailsElement.querySelector('.close-button');
      closeButton.addEventListener('click', () => {
        playerDetailsElement.remove();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderPlayers = async (players) => {
    try {
        playerContainer.innerHTML = '';
      players.forEach((player) => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');
        playerElement.innerHTML = 
        `<div class="flip-card">
        <div class="flip-card-inner">
        <div class="flip-card-front">
        <img  src="${player.imageUrl}" alt="${player.name}">
        <h4>PlayerId: ${player.id}</h4>
        <p>Name : ${player.name}</p>
        <p>TeamId: ${player.teamId}</p>
        </div>
        <div class="flip-card-back">
       
        <p>Breed : ${player.breed}</p>
        <p>Status: ${player.status}</p>
        <p>CreatedAt : ${player.createdAt}</p>
        <p>UpdatedAt : ${player.updatedAt}</p>
        <p>CohortId : ${player.cohortId}</p>
        <button class="details-button" data-id="$player.id}">See Details</button>
        <button class="delete-button" data-id="${player.id}">Delete</button>
        </div>
        </div>
        </div>`
       
        playerContainer.appendChild(playerElement);
         const renderSinglePlayer =(player)=>{
            if(!player || player.length === 0){
                playerContainer.innerHTML ='<h3>No player found</h3>';
              return;
            }
            let playerHTML = `<div> class ="single-player-view">
                              <div class ="player">
                              <img  src="${player.imageUrl}" alt="${player.name}">
                              <h4>PlayerId: ${player.id}</h4>
        <p>Name : ${player.name}</p>
        <p>Breed : ${player.breed}</p>
        <p>Status: ${player.status}</p>
        <p>CreatedAt : ${player.createdAt}</p>
        <p>UpdatedAt : ${player.updatedAt}</p>
        <p>TeamId: ${player.teamId}</p>
        <p>CohortId : ${player.cohortId}</p>
                              </div>
                              <button class="back-button">Back</button>
                              <div> `;
                              playerContainer.innerHTML = playerHTML;
                              let backButton = playerContainer.querySelector('.back-button');
                              backButton.addEventListener('click', async ()=>{
                                const players = await getAllPalyers();
                                renderPlayers(players)
                              })
                              console.log(player)
         }
        // see details
        const detailsButton = playerElement.querySelector('.details-button');
        detailsButton.addEventListener('click', async (event) => {
          // your code here
          event.preventDefault();
          renderSinglePlayer(player)
        
          
        });
  
        // delete player
        const removePlayer = async (id) => {
            try {
                 console.log(`${APIURL}/players/${id}`)
                   const response = await fetch(`${APIURL}/players/${id}`, {
                      method: 'DELETE'
                   });
                  const data = await response.json();
                  console.log(data)
                  renderPlayers();
                //  return data;
                // //console.log(data)
            } catch (error) {
                console.log(error);
            }
          }
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await removePlayer(id);
                const players = await getAllPalyers();
                renderPlayers(players)
            });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };



  // init function
const init = async () => {
    // your code here
    const players = await getAllPalyers();
    
    renderPlayers(players);
  
    
  };
  
  init();
  