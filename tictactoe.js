document.addEventListener('DOMContentLoaded', function() {
  var squares = document.getElementsByClassName('square'),
      xTurn = true,
      gameOver = false,
      restart = document.getElementById('restart');

  var checkWinning = function() {
    //Simplify everything in allSquares variable represented by 3 row arrays of 'x' and 'o's
    var rows = document.querySelectorAll('.row')
    var allSquares = []
    rows.forEach(function(row) {
      var rowSquares = row.querySelectorAll('.square')
      var checkRow = []
      rowSquares.forEach(function(square){

        if (square.children.length > 0) {
          //shove in className = 'x' or 'o'
          checkRow.push(square.children[0].className)
        }else {
          //shove in blank
          checkRow.push('')
        }

      })
      allSquares.push(checkRow)
    })
    // console.log(allSquares)


    //announce winner!
    function announceWinner(){
      //disable all squares before announcing
      for (var square of squares) {
        square.setAttribute('disabled', true);
      }

      var winner
      if (xTurn){
        winner = 'X'
      } else {
        winner = 'O'
      }
      alert(winner + ' wins!')
    }

    // This function checks columns or rows or diagonals that are the same values
    var checkResult = function(squareData) {
      squareData.forEach(function(third){
        function isAllx(square) {
          return square === 'x'
        }
        function isAllo(square) {
          return square === 'o'
        }

        if (third.every(isAllx) || third.every(isAllo)) {
          announceWinner()
          gameOver = true
        }
      })
    }

    //check rows
    checkResult(allSquares);

    //check columns
    //arrange all square values in columns variable first
    var columns = []
    for (var c = 0; c < 3; c++) {
      var column = []
      for (var r = 0; r < allSquares[0].length; r++) {
        column.push(allSquares[r][c])
      }
      columns.push(column)
    }

    checkResult(columns);

    //check diagonals
    //arrange all diagonal values in array variable first
    var diagonal1 = []
    for (var v = 0; v < allSquares[0].length ; v++) {
      diagonal1.push(allSquares[v][v])
    }
    var diagonal2 = []
    var c = 2
    for (var v = 0; v < allSquares[0].length ; v++) {
      diagonal2.push(allSquares[v][c])
      c--;
    }
    var diagonals = [diagonal1, diagonal2]
    checkResult(diagonals);

    //check for draw
    if (document.querySelectorAll('.square[disabled]').length >= 9 && gameOver === false) {
      alert("It's a draw!")
      gameOver = true
    }
  }

  for (var square of squares) {
    square.addEventListener('click', function() {
      if(xTurn) { //player X turn
        var span = document.createElement('span');
        span.innerText = 'X';
        span.className = 'x';
        this.append(span);
        this.setAttribute('disabled', true);
        checkWinning();
        xTurn = false;
      } else { //player O turn
        var span = document.createElement('span');
        span.innerText = 'O';
        span.className = 'o';
        this.append(span);
        this.setAttribute('disabled', true);
        checkWinning();
        xTurn = true;
      }
    });
  }

  // Reset Game
  restart.addEventListener('click', function(e) {
    e.preventDefault()
    for (var square of squares) {
      while (square.firstChild) square.removeChild(square.firstChild);
      square.removeAttribute('disabled')
    }
    gameOver = false;
  });
})
