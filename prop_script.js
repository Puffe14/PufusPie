var rngNum = 0
var rngMax = 6
var rngMin = 1

var rngList = []
var rngListNum = 6

var rngElmnt = document.getElementById("rngTextId");
var addElmnt = document.getElementById("rngTextMaxId");
var lowElmnt = document.getElementById("rngTextMinId");

var atk1 = [0, 0, 0]
var atk2 = [0, 0, 0]

totalChance = 0;
boxCount = 0;


function Loaded(){

}



function CalcAtk() {
  //Calculate total chance of consecutive attacks
  totalChance = (document.getElementById("atk1ch").value*0.01)*(document.getElementById("atk2ch").value*0.01)*(document.getElementById("atk3ch").value*0.01)*(document.getElementById("atk4ch").value*0.01);
  chanceElmnt = document.getElementById("totChId");
  if(totalChance>=0.01){chanceElmnt.innerHTML = Math.floor(totalChance*100);}
  else{chanceElmnt.innerHTML = Math.floor(totalChance*1000000)/1000000;}
  //Calculate life points remaining form total attack points
  totalAp = document.getElementById("atk1ap").value*1 + document.getElementById("atk2ap").value*1 + document.getElementById("atk3ap").value*1 + document.getElementById("atk4ap").value*1;
  deadElmnt = document.getElementById("totLpId");
  lp = document.getElementById("lpid").value*1;
  lpLeft = lp-totalAp;
  if(lpLeft>0){
    deadElmnt.innerHTML = "LP: "+lpLeft;
    document.getElementById("propCoverId").style.backgroundColor = "darkblue";
  }
  else{
    deadElmnt.innerHTML = "Dead";
    document.getElementById("propCoverId").style.backgroundColor = "red";
  }
  console.log(totalAp);
  //Set square on top of image, Persona 3 Nocturne
  document.getElementById("propCoverId").style.width = totalChance*30+"%";
}



function ApplySett(){
  fieldw = document.getElementById("settWidthId").value*1
  fieldh = document.getElementById("settHeightId").value*1
  pmov = document.getElementById("settMovementId").value*1
  mhit = document.getElementById("settHitsId").value*1
  pcount = document.getElementById("settPCountId").value*1;
}

function CollectFromBoxes (){
  //Move all boxes to place
  boxes = document.getElementsByClassName("atkBox");
  for (var i = 0; i < boxes.length; i++) {
      //Set position for each box
      boxes[i].style.left = 100*i+"px";
      //Set onClick for each square
        //squares[tileNum].addEventListener("click", ClickSquare);
      console.log("moved box "+i);
  }
}


function AddBox(){
  boxcount += 1

  //Set container element
  atksRowDiv = document.getElementById("atksRow");

  //Create a new box squares for container
  box = document.createElement("div");
  box.className = "atkBox";
  atksRowDiv.appendChild(box);
  box.style.left = 100*boxcount+"px";
  //document.getClassByID("squareDiv").style.left = 100*(i/7)+"px";
  console.log(i);
}


function ClearBoxes(){
  while (atksRowDiv.firstChild) {
    atksRowDiv.firstChild.remove();
  }
  box = 0
}


function UPDATE(){
  update = setInterval(UPDATE, 3)
}

//Function for simulating keyboard events
function KeySimulate(kcode){
  document.body.dispatchEvent(new KeyboardEvent('keydown', {keyCode: kcode}));
}
