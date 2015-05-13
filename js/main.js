$(document).ready(function(){

  // Move counter to see if game is over
  var moveCounter = 0;

  // determines if square is already occupied using T/F
  var isOccupied = function (square) {
    if ($(square).html() === '') {
      return false;
    } else {
      return true;
    }
  };

  // Array in which square values are pushed. Used to check who has won with isThereWinner()
  var pandorasBox = [['','',''],['','',''],['','','']];

  // places squares' content into pandorasBox
  var movePlacer = function () {
    pandorasBox[0][0] = $('div#one').html();
    pandorasBox[0][1] = $('div#two').html();
    pandorasBox[0][2] = $('div#three').html();
    pandorasBox[1][0] = $('div#four').html();
    pandorasBox[1][1] = $('div#five').html();
    pandorasBox[1][2] = $('div#six').html();
    pandorasBox[2][0] = $('div#seven').html();
    pandorasBox[2][1] = $('div#eight').html();
    pandorasBox[2][2] = $('div#nine').html();
  };

  // Changes once game has ended to true
  var gameOver = false;

  // stores win amounts
  var xWins = 0;
  var oWins = 0;

  // Adds win amounts to UI
  var xAdd = function () {
    $('#xWins').html('<p>X has ' + xWins + ' wins now.</p>');
  };
  var oAdd = function () {
    $('#oWins').html('<p>O has ' + oWins + ' wins now.</p>');
  };

  // Recognises if there is a winner at end of move
var isThereWinner = function () {

  var winningCombos = [['one','two','three'],['four','five','six'],['seven','eight'
  ,'nine'],['one','four','seven'],['two','five','eight'],['three','six','nine'],['one','five','nine'],['three','five','seven']];

  for (var i = 0; i < winningCombos.length; i += 1) {

    var cell1 = $('#' + winningCombos[i][0]).html();
    var cell2 = $('#' + winningCombos[i][1]).html();
    var cell3 = $('#' + winningCombos[i][2]).html();

    if ((cell1 === cell2 && cell2 === cell3) && (cell1 === 'X' || cell1 === 'O')) {
      console.log(cell1 + ' is the winner!');
      alert(cell1 + ' is the winner!');
      gameOver = true;
      $('div.messageBoard').append('<p>' + cell1 + ' is the winner!</p>');

      if (cell1 === 'X') {
        xWins += 1;
        xAdd();
      } else if (cell1 === 'O') {
        oWins += 1;
        oAdd();
      }

    }
  }
};

  // Determines if it is X's go or not.
  var xTurn = true;

  // Displays whose go it is above gameboard
  var showGo = function () {
    if (xTurn) {
      $('#turn').html('X\'s go');
    } else {
      $('#turn').html('O\'s go');
    }
  };

  // Counts the amount of games played
  var gamesPlayed = 0;

  // T/F to see if gamesPlayed has already been updated
  var gamesPlayedUpdateAllowed = true;

  // Adds gamesPlayed to the UI
  var gamesCounter = function () {
    $('#gamesPlayed').html(gamesPlayed + ' games played.');
  };

  // Places move ('X' or 'O') on gameBoard and uses xTurn to switch turn
  var move = function () {
    
    if (gameOver === false) { // checks if game is complete yet
      
      if (isOccupied(this) === false) { // checks if cell is occupied
        if (xTurn) {
          $(this).html('X');
          xTurn = false; // next round it will be O's go
          moveCounter += 1; // adds one to move counter
          showGo(); // changes whose go it is above gameBoard
        } else {
          $(this).html('O');
          xTurn = true;
          moveCounter += 1;
          showGo();
        }
      } else {
        $('div.messageBoard').append('<p>Cannot move here.</p>'); // Displays if the block is occupied
        movePlacer();
      }

      movePlacer(); // places all moves into array
      isThereWinner(); // checks array to see if winner


      if (moveCounter === 9 && gameOver === false) {        // checks if the board is full. If there
      gameOver = true;                                      // is no winner to end the game as draw.
      alert('Draw!');
      $('div.messageBoard').append('<p>Result is a draw. Game is over!</p>');
      }

    } else if (gameOver === true) {
      $('div.messageBoard').append('<p>Game is over!</p>'); // Displays that the game is over
    }
    
    if (gameOver === true && gamesPlayedUpdateAllowed === true) { // When game is done, allows for one game counter update
      gamesPlayed += 1;
      gamesPlayedUpdateAllowed = false;
      gamesCounter();
      $('#resetBoard').addClass('resetTime');         // changes resetBoard to orange when game complete so 
    }                                                 // that user knows to click it

  };

  // Clears board for next game to commence
  var resetBoardFn = function () {
    $('div#one').html('');
    $('div#two').html('');
    $('div#three').html('');
    $('div#four').html('');
    $('div#five').html('');
    $('div#six').html('');
    $('div#seven').html('');
    $('div#eight').html('');
    $('div#nine').html('');
    moveCounter = 0;
    gameOver = false;
    $('.messageBoard').html('<h2>Message Board</h2>');
    $('#resetBoard').removeClass('resetTime').addClass('infoBox');
    gamesPlayedUpdateAllowed = true;
  };

  var resetBoardwithConfirm = function () {
    if (gameOver === false) {
      var confirmReset = confirm('Are you sure you wish to reset?');
      if (confirmReset === true) {
        resetBoardFn();
      }
    } else {
      resetBoardFn();
    }
  };

  // Clears all counters and moves and starts anew
  var restartGame = function () {
    resetBoardFn();
    xWins = 0;
    xAdd();
    oWins = 0;
    oAdd();
    xTurn = true;
    gamesPlayed = 0;
    gamesCounter();
    showGo();
  };

  // The click activated functions
  $('.gameBoard').on('click','.square',move);
  $('#resetBoard').on('click',resetBoardwithConfirm);
  $('#restartGame').on('click',restartGame);
 
});