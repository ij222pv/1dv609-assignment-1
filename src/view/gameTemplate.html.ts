export default /*html*/ `
<div class="pre-start">
  <form id="add-player-form">
    <input id="player-name-input" name="name" type="text" placeholder="Enter player name" required />
    <button type="submit">Add Player</button>
  </form>
</div>
<div class="post-start">
  <button id="roll-button">Roll Dice!</button>
  <p id="active-player"></p>
  <div id="dice-container"></div>
</div>
`