# knight-moves

Example

var moves = knightMoves(2,4,5);
var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
moves.forEach(function(move){
  console.log("(" + letters[move.x - 1] + "," + move.y + ")")
});

