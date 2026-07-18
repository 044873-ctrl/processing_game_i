let cols=10;
let rows=20;
let cell=30;
let board=[];
let shapes=[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]];
let colors=[[0,255,255],[255,255,0],[128,0,128],[255,165,0],[0,0,255],[0,255,0],[255,0,0]];
let piece=null;
let dropIntervalDefault=30;
let dropCounter=0;
let score=0;
let gameOver=false;
function initBoard(){board=[];for(let r=0;r<rows;r++){let row=[];for(let c=0;c<cols;c++){row.push(0);}board.push(row);}}
function rotateMatrix(m){let res=[];for(let i=0;i<4;i++){res[i]=[];for(let j=0;j<4;j++){res[i][j]=m[3-j][i];}}return res;}
function collide(shape,x,y){for(let i=0;i<4;i++){for(let j=0;j<4;j++){if(shape[i][j]){let gx=x+j;let gy=y+i;if(gx<0||gx>=cols) return true; if(gy>=rows) return true; if(gy>=0 && board[gy][gx]!==0) return true;}}}return false;}
function placePiece(){if(piece===null) return;for(let i=0;i<4;i++){for(let j=0;j<4;j++){if(piece.shape[i][j]){let gx=piece.x+j;let gy=piece.y+i;if(gy>=0 && gy<rows && gx>=0 && gx<cols){board[gy][gx]=piece.colorIndex+1;}}}}clearLines();spawnPiece();}
function clearLines(){let lines=0;for(let r=rows-1;r>=0;r--){let full=true;for(let c=0;c<cols;c++){if(board[r][c]===0){full=false;break;}}if(full){board.splice(r,1);let newRow=[];for(let c=0;c<cols;c++) newRow.push(0);board.unshift(newRow);lines++;r++;}}score+=lines*100;}
function spawnPiece(){let idx=floor(random(shapes.length));let shape=JSON.parse(JSON.stringify(shapes[idx]));piece={shape:shape,x:3,y:-1,color:colors[idx],colorIndex:idx};if(collide(piece.shape,piece.x,piece.y)){gameOver=true;}}
function setup(){createCanvas(300,600);initBoard();spawnPiece();textSize(16);textAlign(LEFT,TOP);}
function draw(){background(20);stroke(50);for(let r=0;r<rows;r++){for(let c=0;c<cols;c++){let val=board[r][c];if(val!==0){let col=colors[val-1];fill(col[0],col[1],col[2]);}else{fill(30);}rect(c*cell,r*cell,cell,cell);}}if(piece!==null && !gameOver){for(let i=0;i<4;i++){for(let j=0;j<4;j++){if(piece.shape[i][j]){let gy=piece.y+i;let gx=piece.x+j;if(gy>=0){let col=piece.color;fill(col[0],col[1],col[2]);rect(gx*cell,gy*cell,cell,cell);}}}}dropCounter++;let interval=dropIntervalDefault;if(keyIsDown(DOWN_ARROW)) interval=2; if(dropCounter>=interval){dropCounter=0;if(!collide(piece.shape,piece.x,piece.y+1)){piece.y++;}else{placePiece();}}}fill(255);noStroke();text('Score: '+score,10,10);if(gameOver){fill(0,180);rect(0,height/2-40,width,80);fill(255);textSize(32);text('Game Over',50,height/2-8);noLoop();}}
function keyPressed(){if(gameOver) return; if(keyCode===LEFT_ARROW){if(piece!==null && !collide(piece.shape,piece.x-1,piece.y)) piece.x--; }else if(keyCode===RIGHT_ARROW){if(piece!==null && !collide(piece.shape,piece.x+1,piece.y)) piece.x++; }else if(keyCode===UP_ARROW){if(piece!==null){let newShape=rotateMatrix(piece.shape); if(!collide(newShape,piece.x,piece.y)) piece.shape=newShape; }}else if(keyCode===DOWN_ARROW){if(piece!==null && !collide(piece.shape,piece.x,piece.y+1)) piece.y++; }}
