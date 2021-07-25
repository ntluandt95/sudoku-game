import React from 'react'
import { useState, useEffect } from 'react'
import './Board.css'
import
function Board() {
    
    var [board, setBoard] = useState(
        [["5","3","4","6","7","8","9","1","2"]
        ,["6","7","2","1","9","5","3","4","8"]
        ,["1","9","8","3","4","2","5","6","7"]
        ,["8","5","9","7","6","1","4","2","3"]
        ,["4","2","6","8","5","3","7","9","1"]
        ,["7","1","3","9","2","4","8","5","6"]
        ,["9","6","1","5","3","7","2","8","4"]
        ,["2","8","7","4","1","9","6","3","5"]
        ,["3","4","5","2","8","6","1","7","9"]]
    )
    //putNumberToBoard()
    //random number 1-9
    shuffle()
    function randomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function printBoard(arr){
        for(let i=0;i<9;i++){
            console.log(arr[i])
        }
    }
    //check if it is safe to put the number in the cell row, column 
    function safeToPut(number, row, column){
        if(number<=0) return false

        for(let i=0; i<9; i++){
            if(board[row][i]===number){
                printBoard(board)
                console.log(number,row,column)
                return false
            }
            if(board[i][column]===number){
                printBoard(board)
                console.log(number,row,column)
                return false
            }
        }

        //3 x 3 matrices coordinates
        var y = row - (row % 3)
        var x = column - (column % 3)

        for(let i = y; i< y + 3; i++){
            for(let j = x; j< x + 3; j++){
                if(board[i][j]===number) {
                printBoard(board)
                console.log(number,row,column)
                return false
                }
            }
        }

        return true
    }

    //put random number to board

    function putNumberToBoard(){
        var randomNum=0
        
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){   
                if(board[i][j]==0){
                    randomNum = randomNumber()
                    while(true){
                        if(safeToPut(randomNum,i,j)){
                            board[i][j]=randomNum
                            break
                        }else{
                            randomNum = (randomNum % 9) +1
                        }
                    }
                }
            }
        }

        for(let i=3;i<6;i++){
            for(let j=3;j<6;j++){   
                if(board[i][j]==0){
                    randomNum = randomNumber()
                    while(true){
                        if(safeToPut(randomNum,i,j)){
                            board[i][j]=randomNum
                            break
                        }else{
                            randomNum = (randomNum % 9) +1
                        }
                    }
                }
            }
        }

        for(let i=6;i<9;i++){
            for(let j=6;j<9;j++){   
                if(board[i][j]==0){
                    randomNum = randomNumber()
                    while(true){
                        if(safeToPut(randomNum,i,j)){
                            board[i][j]=randomNum
                            break
                        }else{
                            randomNum = (randomNum % 9) +1
                        }
                    }
                }
            }
        }
        
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                
                if(board[i][j]==0){
                    randomNum = randomNumber()
                    while(true){
                        if(safeToPut(randomNum,i,j)){
                            board[i][j]=randomNum
                            break
                        }else{
                            randomNum = (randomNum % 9) +1
                    }
                    
                }
                }

                
            }
        }
        //console.log(board)
        
        return board
    }

    function swap(x,y){
        var temp = x
        x = y
        y = temp
    }

    function shuffle(){
        
        var repetTime = randomNumber(0,20)
        for(let index=0; index<repetTime;index++){
            for(let i=0; i<9;i++){
                let j = randomNumber(i - (i % 3),i - (i % 3)+2)
                let temp = board[i]
                board[i] = board[j]
                board[j] = temp
               
            }
    
            for(let i=0; i<9;i++){
                let j = randomNumber(i - (i % 3),i - (i % 3)+2)
                
                for(let x=0; x<9;x++)
                {
                    let temp = board[x][i]
                    board[x][i] = board[x][j]
                    board[x][j] = temp
                }
               
            }
        }
        
    }

    function sudokuGenerator(){
        
    }

    useEffect(() => {
        //console.log(safeToPut(1,0,0))
        
        
        //console.log(board)
    },[])
    return (
        <div>
            <div className='board'>
                {
                    board.map((row,rowIndex)=>(
                        <div key={rowIndex} className='row'>
                            {
                                row.map((cell,cellIndex)=>(
                                    <div key={cellIndex} className='cell'>{cell}</div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Board
