const COLS=10,ROWS=20,CELL=30;
let grid=[];
for(let y=0;y<ROWS;y++){grid[y]=[];for(let x=0;x<COLS;x++){grid[y][x]=0}}
let SHAPES={I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],O:[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],T:[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],L:[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],J:[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],S:[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],Z:[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]};
let COLORS={"I":"#00f0f0","O":"#f0f000","T":"#a000f0","L":"#f0a000","J":"#0000f0","S":"#00f000","Z":"#f00000"};
let currentPiece=null;
let currentPieceType="";
let currentX=0;
let currentY=0;
let dropTicks=0;
let dropInterval=30;
let score=0;
let gameOver=false;
function rotateMatrix(m){let out=[];for(let r=0;r<4;r++){out[r]=[];for(let c=0;c<4;c++){out[r][c]=0}}for(let r=0;r<4;r++){for(let c=0;c<4;c++){out[c][3-r]=m[r][c]}}return out}
function valid(matrix,x,y){for(let r=0;r<4;r++){for(let c=0;c<4;c++){if(matrix[r][c]===1){let gx=x+c;let gy=y+r; if(gx<0||gx>=COLS) return false; if(gy>=ROWS) return false; if(gy>=0 && grid[gy][gx]) return false}}}return true}
function placePiece(){for(let r=0;r<4;r++){for(let c=0;c<4;c++){if(currentPiece[r][c]===1){let gx=currentX+c;let gy=currentY+r; if(gy>=0 && gy<ROWS && gx>=0 && gx<COLS){grid[gy][gx]=currentPieceType}}}}}
function clearLines(){let linesCleared=0;for(let y=ROWS-1;y>=0;y--){let full=true;for(let x=0;x<COLS;x++){if(grid[y][x]===0){full=false;break}}if(full){grid.splice(y,1);let newRow=[];for(let x=0;x<COLS;x++){newRow[x]=0}grid.unshift(newRow);linesCleared++;y++}}score+=linesCleared*100}
function spawnPiece(){let keys=[];for(let k in SHAPES){keys.push(k)}let k=keys[Math.floor(Math.random()*keys.length)];let src=SHAPES[k];let copy=[];for(let r=0;r<4;r++){copy[r]=[];for(let c=0;c<4;c++){copy[r][c]=src[r][c]}}currentPiece=copy;currentPieceType=k;currentX=Math.floor(COLS/2)-2;currentY=-1; if(!valid(currentPiece,currentX,currentY)){gameOver=true}}
function dropPiece(){if(gameOver) return; if(valid(currentPiece,currentX,currentY+1)){currentY++}else{placePiece();clearLines();spawnPiece()}}
function setup(){createCanvas(COLS*CELL,ROWS*CELL);frameRate(60);spawnPiece()}
function draw(){background(30);stroke(50);for(let y=0;y<ROWS;y++){for(let x=0;x<COLS;x++){let cell=grid[y][x];if(cell){fill(COLORS[cell])}else{fill(20)}rect(x*CELL,y*CELL,CELL,CELL)}}if(!gameOver){dropInterval= keyIsDown(DOWN_ARROW)?5:30;dropTicks++; if(dropTicks>=dropInterval){dropPiece();dropTicks=0}}for(let r=0;r<4;r++){for(let c=0;c<4;c++){if(currentPiece && currentPiece[r][c]===1){let gx=currentX+c;let gy=currentY+r; if(gy>=0){fill(COLORS[currentPieceType]);rect(gx*CELL,gy*CELL,CELL,CELL)}}}}noStroke();fill(255);textSize(16);textAlign(LEFT,TOP);text("Score: "+score,5,5); if(gameOver){textAlign(CENTER,CENTER);textSize(32);fill(255,50,50);text("Game Over",width/2,height/2)}}
function keyPressed(){if(gameOver) return; if(keyCode===LEFT_ARROW){if(valid(currentPiece,currentX-1,currentY)) currentX--}else if(keyCode===RIGHT_ARROW){if(valid(currentPiece,currentX+1,currentY)) currentX++}else if(keyCode===DOWN_ARROW){dropPiece();dropTicks=0}else if(keyCode===UP_ARROW){let rot=rotateMatrix(currentPiece);let kicked=false;let shifts=[0,-1,1,-2,2];for(let i=0;i<shifts.length;i++){let sx=shifts[i];if(valid(rot,currentX+sx,currentY)){currentPiece=rot;currentX+=sx;kicked=true;break}}}
