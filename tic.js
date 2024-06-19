

const board=document.getElementById("board");
const resetButton=document.getElementById("resetButton");
const result=document.getElementById("result");
const turnIndicator=document.getElementById("turnIndicator");

let currentPlayer="X";

let winningarray=[];
//to ager ko value pahle se cell me hai to return don't change the value
//ye array isliye hi bnaya hai
let boardState=Array(9).fill(null);

//it is a 2d array
const winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



function createBoard(){
    for(let i=0;i<9;i++){
        const newcell=document.createElement("div");
        newcell.classList.add("cell");
        newcell.dataset.index=i;//dataset index set kr rha har cell ka
        //ye kiya take har cell ko index se acces kr skte index koi default 
        //value nhi blki ye hmne set kiya hai ek attricute ka part  
        newcell.addEventListener("click",handleClick);
        board.appendChild(newcell);
    }
}

function handleClick(event){
    const index=event.target.dataset.index;//event means koi event hua target means jha click kiya then dataset is used 
    //to access the value then index as a value to access comes
    if(boardState[index]!==null || checkWinnder()){
        return;//to ager ko value pahle se cell me hai to return don't change the value
    }
    boardState[index]=currentPlayer;//aor ager null hai to value dal do
    event.target.textContent=currentPlayer;

    if(checkWinnder()){
        //if player wins
        result.textContent=`${currentPlayer} WINS`;
        result.style.color="gold";
        colourwinningcombination();

    }

    else if(boardState.every((cell)=>cell!==null )){
        //if all cells are filled, then DRAW
        result.textContent="DRAWWW";
        result.style.color="white";
        turnIndicator.textContent="";
    }
    else{
        //game can continue
        currentPlayer=currentPlayer==="X"?"O":"X";//currentplayer is updated
        turnIndicator.textContent=`${currentPlayer}'s turn `;
    }
}


function checkWinnder(){
    //some() returns true if any array element meets a condition, while every() checks if all elements do.
    //to ager ek bhi combination true hua to ye true return kr dega
    return winningCombinations.some((combination)=>{//to some apni 2d array me se ek ek array uthayega
        //to combination ki jagah koi bhi parameter le lo
        let b=combination.every((index)=>boardState[index]===currentPlayer);//mtlb boardstate array me us index pe same player hai to return true
        if(b==true){
            winningarray=combination;
        }
        return b;
        //if this is true then some return true
    })
}

function colourwinningcombination(){
    winningarray.forEach((index)=>{
        const cell=board.children[index];
        cell.style.background="blue";
    })
    setTimeout(()=>{
        winningarray.forEach((index)=>{
            const cell=board.children[index];
            cell.style.background="";
        })
    },1000);
}
function resetGame(){
    boardState.fill(null);
    currentPlayer="X";
    //board me chidren to cell hi hai
    Array.from(board.children).forEach((cell)=> (cell.textContent=""));
    result.textContent="";
    turnIndicator.textContent="X's Turn";

}

//initialize the game
createBoard();
resetButton.addEventListener("click",resetGame);

console.log(winningarray);
