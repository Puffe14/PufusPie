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


function Loaded(){
  rngSetMaxMin()
}

function Rng(){
   rngElmnt = document.getElementById("rngTextId");
   rngNum = Math.floor(Math.random()*(rngMax*1) + rngMin*1)
   console.log(rngNum);
   rngElmnt.innerHTML = rngNum;
}

function RngAdd(){
  rngMax = document.getElementById("rngTextMaxId").value;
}

function RngLow(){
  rngMin = document.getElementById("rngTextMinId").value
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


function RngList(){
  //reset list
  document.getElementById("listOfNumsId").innerHTML = null;
  //collect data
  listElmnt = document.getElementById("listOfNumsId");
  listLength = document.getElementById("listNumId");
  //create list
  for (let i = 0; i < listLength.value; i++) {
    rngNum = Math.floor(Math.random()*(rngMax*1) + rngMin*1)
    if(i < listLength.value-1){listElmnt.innerHTML += rngNum+", ";}
    else{listElmnt.innerHTML += rngNum}
  }
  console.log(listLength.value);
}

fieldw = 7
fieldh = 7
pmov = 3
pmoves = pmov
mhit = 3
pcount = 3
pplace = 0
deads = 0


function ApplySett(){
  fieldw = document.getElementById("settWidthId").value*1
  fieldh = document.getElementById("settHeightId").value*1
  pmov = document.getElementById("settMovementId").value*1
  mhit = document.getElementById("settHitsId").value*1
  pcount = document.getElementById("settPCountId").value*1;
}

function CreateField(){
  turnCount = 1;

  //Set field element and remove previous children
  fieldElmnt = document.getElementById("gameField");
  while (fieldElmnt.firstChild) {
    fieldElmnt.firstChild.remove();
  }

  //Make square class the correct size
  //squareElmnt = document.getElementsByClassName("squareDiv");
  //squareElmnt.style.width = 100+"%";
  //squareElmnt.style.height = 1/fieldh*100+"%";

  //Create all squares for field
  for (var k = 0; k < fieldh*fieldw; k++) {
    square = document.createElement("div");
    square.className = "squareDiv";
    fieldElmnt.appendChild(square);
    fieldElmnt.style.height = 100*fieldh+"px";
    fieldElmnt.style.width = 100*fieldw+"px";
    //document.getClassByID("squareDiv").style.left = 100*(i/7)+"px";
    console.log(i);
  }

  //Move all squares to place
  for (var i = 0; i < fieldw; i++) {
    for (var j = 0; j < fieldh; j++) {
      squares = document.getElementsByClassName("squareDiv");
      //number
      tileNum = i*fieldh+j
      //Set position for each square
      squares[tileNum].style.left = 100*i+"px";
      squares[tileNum].style.top = 100*j+"px";
      //Set onClick for each square
      squares[tileNum].addEventListener("click", ClickSquare);
      console.log(100*i+","+100*j);
    }
  }

  //Reset values for all squares
  SetSquareValues();
  pmoves = pmov
  mhitsleft = mhit
  turn = "meteor";
  deads = 0
  document.getElementById("showDeadId").innerHTML = "";
  document.getElementById("countTurnId").innerHTML = "Meteor"
  document.getElementById("countHitsId").innerHTML = "Hits: "+mhit
}

turn = "meteor";
mhitsleft = mhit;
playerNum = 1;

function ClickSquare(){
  squares = document.getElementsByClassName("squareDiv");
  turntext = document.getElementById("countTurnId")
  hitstext = document.getElementById("countHitsId")
  deadtext = document.getElementById("showDeadId")

  var l = 0;

  while (l<squares.length){
      if(this == squares[l]){thisTile = l;}
      l++;
  }

  console.log("Clicked, "+this+", "+thisTile);
  if(turn=="meteor" && mhitsleft>0){
    this.style.backgroundColor = "red";
    mhitsleft-=1;
    if(tile[thisTile]*1>0){deadtext.innerHTML+=" P"+tile[thisTile]; deads++;}
    tile[thisTile] = "burning";
    hitstext.innerHTML = "Hits: "+mhitsleft;
  }

  console.log(playerNum);
  //fieldElmnt.previousSibling.style.backgroundColor = "green";
  //remove hit, only on meteor turn
  /**
  fieldElmnt.childNodes[thisTile-1].style.backgroundColor = "blue";
  fieldElmnt.childNodes[thisTile+1].style.backgroundColor = "blue";
  fieldElmnt.childNodes[thisTile-fieldh].style.backgroundColor = "blue";
  fieldElmnt.childNodes[thisTile+fieldh].style.backgroundColor = "blue";
  **/
  if(deads>=pcount){
    deads=0
    if(confirm("Meteor Wins! Start again?")){CreateField()}
  }
}

  var tile = []

function SetSquareValues(){
  for (var i = 0; i < fieldw; i++) {
    for (var j = 0; j < fieldh; j++) {
      //Set a variable for each square
      tile[i*fieldh+j] = "empty"
      console.log(tile[i*fieldh+j]);
    }
  }

  if(fieldh*fieldw==49 && pcount == 8){
    tile[16] = 1;
    tile[18] = 2;
    tile[30] = 3;
    tile[32] = 4;
    tile[17] = 5;
    tile[23] = 6;
    tile[31] = 7;
    tile[25] = 8;
  }
  else if (fieldh*fieldw==49 && pcount == 4) {
    tile[16] = 1;
    tile[18] = 2;
    tile[30] = 3;
    tile[32] = 4;
  }
  else{
    if(pcount <= 1 || pcount > fieldh*fieldw){pcount = 1}
    var p = 1
    while (p <= pcount){
      rngTileP = Math.floor(Math.random()*(fieldh*fieldw))
      if(tile[rngTileP]=="empty"){
        tile[rngTileP] = p;
        p++;
        console.log("T"+rngTileP+" = P"+p);
      }
    }
  }
}

/**
squares = document.getElementsByClassName("squareDiv");
squares[i*fieldh+j].style.left = (100/fieldw)*i+"%";
squares[i*fieldh+j].style.top = (100/fieldh)*j+"%";
squares[i*fieldh+j].style.width = 100/fieldw+"%";
squares[i*fieldh+j].style.height = 100/fieldh+"%";
console.log(i+","+j)
**/

function KeySquare(event){
  pkey = event.keyCode;

  if(turn == "player"){
    squares = document.getElementsByClassName("squareDiv");
    turntext = document.getElementById("countTurnId");
    hitstext = document.getElementById("countHitsId");

    var l = 0;
    thisTileVal = -1;

    while (l<tile.length){
        if(tile[l] == playerNum){thisTileVal = l;}
        l++;
        console.log(l);
    }

    if(tile[thisTileVal] == playerNum && pmoves>0){
      turntext.innerHTML = "P"+playerNum+" - " + turnCount;
      tvpp = thisTileVal+pplace
      PrintDirects(tile[tvpp-1],tile[tvpp+1],tile[tvpp+fieldh],tile[tvpp-fieldh])

      //37 left, 38 up, 39 right, 40 down
      if(pkey==37 && tvpp>fieldh-1 && tile[tvpp-fieldh]=="empty"){pplace-=fieldh;pmoves-=1;}
      if(pkey==39 && tvpp<fieldh*fieldw-fieldh && tile[tvpp+fieldh]=="empty"){pplace+=fieldh;pmoves-=1;}
      if(pkey==38 && tvpp%fieldh>0 && tile[tvpp-1]=="empty"){pplace-=1;pmoves-=1;}
      if(pkey==40 && tvpp%fieldh!=fieldh-1 && tile[tvpp+1]=="empty"){pplace+=1;pmoves-=1;}

      hitstext.innerHTML = "Moves: "+pmoves;
      //tcolor = (80-15*playerNum);
      tcolor = 62-2*playerNum;

      squares[thisTileVal+pplace].style.backgroundColor = "blue";
      //squares[thisTileVal].style.backgroundColor = "hsl(62, 100%, "+tcolor+"%)";
      squares[thisTileVal].style.backgroundColor = "hsl("+tcolor+", 100%, 75%)";


    console.log(thisTileVal+pplace+", add "+pplace+", "+(thisTileVal%fieldh));
  }
    if(thisTileVal==-1 && (pkey != 13 || pkey != 32)){alert("P"+playerNum+" is dead")}
    console.log(thisTileVal);
    if (pkey == 13 || pkey == 32) {
      if(thisTileVal!=-1){
        tile[thisTileVal] = "trail";
        tile[thisTileVal+pplace] = playerNum;
        squares[thisTileVal+pplace].style.backgroundColor = "green";
      }
      playerNum++;
      pmoves=pmov;

      pplace=0;
      ClearBlues();

      turntext.innerHTML = "P"+playerNum+" - " + turnCount;
      hitstext.innerHTML = "Moves: "+pmoves;

      if(playerNum>pcount){
        turn = "meteor";
        playerNum = 1;
        turnCount++;
        ClearGreens();
        hitstext.innerHTML = "Hits: " + mhit;
        turntext.innerHTML = "Meteor - " + turnCount;
      }
    }
  }
  console.log("Pressed, "+event.key+"+"+event.keyCode+", "+l+", "+pplace);

  if(turn == "meteor"){
    if(mhitsleft<=0){
      turn = "player";
      playerNum = 1;
      mhitsleft = mhit;
      turntext.innerHTML = "P"+playerNum+" - " + turnCount;
      hitstext.innerHTML = "Moves: "+pmoves;
    }
  }

  if(event.key == "x"){
    console.log("mhitsleft: "+mhitsleft+", playerNum: "+playerNum+", pmoves: "+pmoves)
  }
}

function ClearBlues(){
  squares = document.getElementsByClassName("squareDiv");
  var c = 0;

  while (c<squares.length){
      if(squares[c].style.backgroundColor == "blue"){
        squares[c].style.backgroundColor = "white";
        console.log(c);
      }
      c++;
  }
}

function ClearGreens(){
  squares = document.getElementsByClassName("squareDiv");
  var c = 0;

  while (c<squares.length){
      if(squares[c].style.backgroundColor == "green"){
        squares[c].style.backgroundColor = "white";
        console.log(c);
      }
      c++;
  }
}

function PrintDirects(ut, dt, rt, lt){
  console.log("up: "+ut+", down: "+dt+", right: "+rt+", left: "+lt)
}

function UPDATE(){
  //bodye = document.body;
  update = setInterval(UPDATE, 3)

  /*if(turn=="meteor" && mhitsleft == mhit){
    bodye.style.backgroundColor = "lightred";
  }
  else if(turn=="player" && playerNum<=1 && pmoves == pmov){
    bodye.style.backgroundColor = "blue";
  }
  else{
    bodye.style.backgroundColor = "gray";
  }*/

  if(deads>=pcount){
    deads=0
    if(confirm("Meteor Wins! Start again?")){CreateField()}
  }
}

//Function for simulating keyboard events
function KeySimulate(kcode){
  document.body.dispatchEvent(new KeyboardEvent('keydown', {keyCode: kcode}));
}
