const prompt = require('prompt-sync')({sigint: true});
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;
let finish = false;
class Field
{

     constructor(){
       this._field = Array(rowNum).fill().map(()=>Array(colNum));
       this._locationX = 0;
       this._locationY = 0;
     }

     generateField(percentage){
        
        for (let y = 0; y<rowNum; y++){
           for (let x = 0; x<colNum; x++){
            const prob = Math.random();
            this._field[y][x] = prob> percentage ? fieldCharacter: hole;
           }
        }
        //set the "hat" location :object
        const hatLocation = {
          x: Math.floor(Math.random() * colNum),
          y: Math.floor(Math.random() * rowNum)
        };

        //Make sure the "hat" is not at the starting point
        while(hatLocation.x==0 && hatLocation.y==0){
            hatLocation.x = Math.floor(Math.random() * colNum);
            hatLocation.y = Math.floor(Math.random() * rowNum);
        }

        this._field[hatLocation.y][hatLocation.x] = hat;

        this._field[0][0] = pathCharacter;

     }

     runGame(){

      let playing = true;
      console.log("Start Game");
      //print the field
      while(!finish){
      this.print();
      this.askQuestion();
      this.checkBoundaryAndHole();
      }
     }
      
      print(){
        const displayString = this._field.map( row =>{

             return row.join('');
        }).join('\n');

        console.log(displayString);

      }
      //ask and update the new position
      askQuestion(){

        const direction = prompt('Which way? ').toUpperCase();
        //console.log(`direction:${direction}`);
        switch (direction) {
          case "D":
            this._locationY++;
            // console.log(`${this._locationX},${this._locationY}`);
            break;
        case "U":
            this._locationY--;
            //console.log(`${this._locationX},${this._locationY}`);
            break;
        case "L":
            this._locationX--;
            //console.log(`${this._locationX},${this._locationY}`);
            break;
        case "R":
            this._locationX++;
            //console.log(`${this._locationX},${this._locationY}`);
            break;
        default:
            console.log('You press the wrong key, use D, U, L, R to move!');
        }

      }

      checkBoundaryAndHole(){
        if(this._locationX <0 ||this._locationY <0 ){
            console.log("Out of boundary, Game Over!");
            finish = true;
        }
      
        else if(this._field[this._locationY][this._locationX] == hole){
            console.log("Fell into a hole. Game Over!");
            finish = true;
        } 
        else if(this._field[this._locationY][this._locationX] == hat){
            finish= true;
            console.log("You find the hat. You Win!");
        }
        else{
            this._field[this._locationY][this._locationX] = pathCharacter;
            
        }
        }

}

//Create an instance of Field Class Object
const myfield = new Field();
myfield.generateField(0.3);
myfield.runGame();