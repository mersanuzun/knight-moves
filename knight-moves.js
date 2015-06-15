function Moves(x, y){ // Moves sınıfı 
  this.x = x;
  this.y = y;
  this.possibleMoves = []; // gidebilecek noktaların bir sonraki gidebilecek olduğu noktaları tutuyor
}

var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
moves = []; // atın gittiği koordinatları tutuyor

function findAmountOfMoves(possibleMove, n){ // gidilebilecek noktaların da bir sonraki hamlede gidebileceği noktları hesaplıyor
  possibleMove.possibleMoves = [];
  for (var i = 1; i <= n; i++){
    for (var j = 1; j <= n; j++){
      if ((Math.abs(possibleMove.x - i) == 1 && Math.abs(possibleMove.y - j) == 2) ||
         (Math.abs(possibleMove.x - i) == 2 && Math.abs(possibleMove.y - j) == 1)){
           var move = new Moves(i,j);
           if (isExist(move)) continue;
           else possibleMove.possibleMoves.push(move);
         }
    }
  }
  return possibleMove;
}

function isExist(move){ // daha önce bu noktaya gidilip gidilmediğini kontrol ediyor
  for (var index in moves){
    if (move.x == moves[index].x && move.y == moves[index].y) return true
  }
  return false
}

function knightMoves(x, y, n){ // x ve y başlangıc koordinatları n satranç tahtasının bir kenarının boyut
  var move = new Moves(x,y); // başlangıç noktasının object i oluşturuluyor
  var possibleMoves = []; // her noktanın kaç tane farklı noktaya gidebileceğini tutuyor
  moves.push(move);  
  while (moves.length < n * n){
    possibleMoves = [] // her yeni nokta da içini boşaltıyoruz
    for (var i = 1; i <= n; i++){
      for (var j = 1; j <= n; j++){
        if ((Math.abs(moves[moves.length - 1].x - i) == 1 && Math.abs(moves[moves.length - 1].y - j) == 2) ||
           (Math.abs(moves[moves.length - 1].x - i) == 2 && Math.abs(moves[moves.length - 1].y - j) == 1)){
             var move1 = new Moves(i, j); // yeni mi hareket object i yaratıyoruz
             if (isExist(move1)) continue; // moves ın içinde yarattığımız nokta var ise bir sonrakine noktaları hesaplamak için devam ediyor
             possibleMoves.push(findAmountOfMoves(move1, n)); // bu noktaya geldikten sonra diğer gidebileceği noktaları hesaplıyor
           }
      }
    }
    possibleMoves.sort(function(move1,move2){ // gidebileceği noktaların bir sonraki hamlede gidebileceği noktalar içindeki en az olanı buluyor
      if (move1.possibleMoves.length > move2.possibleMoves.length) {
        return move1.possibleMoves.length - move2.possibleMoves.length
      }
    })
    moves.push(possibleMoves[0]);
  }
  return moves;
}

var moves = knightMoves(2,4,5);
moves.forEach(function(move){
  console.log("(" + letters[move.x - 1] + "," + move.y + ")")
});



