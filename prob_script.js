

var aps = [0,0,0,0]
var chs = [0,0,0,0]
var crs = [0,0,0,0]
var crmult = 3

totalChance = 0;
boxcount = 0;


function Loaded(){
  atksRowDiv = document.getElementById("atkplace");
  victimPhotoElmnt = document.getElementById("victimphotoid");
  victimInputElmnt = document.getElementById("victiminputid");


  victimInputElmnt.onchange = function() {
    reader = new FileReader()
    console.log("reader anew")
    reader.readAsDataURL(this.files[0]);

    reader.onload = function (progressEvent) {
      uploadVictim = reader.result
      console.log(victimInputElmnt+" and "+uploadVictim)
      victimPhotoElmnt.style.backgroundImage = "url(${uploadVictim})"
    }
    console.log(reader.result)
  }
}



function CalcAtkOld() {
  propCoverElmnt = document.getElementById("probCoverId");
  //Calculate total chance of consecutive attacks
  totalChance = (document.getElementById("ch1").value*0.01)*(document.getElementById("ch2").value*0.01)*(document.getElementById("ch3").value*0.01)*(document.getElementById("ch4").value*0.01);
  chanceElmnt = document.getElementById("totChId");
  if(totalChance>=0.01){chanceElmnt.innerHTML = Math.floor(totalChance*100);}
  else{chanceElmnt.innerHTML = Math.floor(totalChance*1000000)/1000000;}
  //Calculate life points remaining form total attack points
  totalAp = document.getElementById("ap1").value*1 + document.getElementById("ap2").value*1 + document.getElementById("ap3").value*1 + document.getElementById("ap4").value*1;
  deadElmnt = document.getElementById("totLpId");
  lp = document.getElementById("lpid").value*1;
  lpLeft = lp-totalAp;
  if(lpLeft>0){
    deadElmnt.innerHTML = "LP: "+lpLeft;
    propCoverElmnt.style.backgroundColor = "darkblue";
  }
  else{
    deadElmnt.innerHTML = "Dead";
    propCoverElmnt.style.backgroundColor = "red";
  }
  console.log(totalAp);
  //Set square on top of image
  document.getElementById("probCoverId").style.width = totalChance*30+"%";
}


//-----------------------------------------------------------------------------
function CalcAtkSim() {
  deadElmnt = document.getElementById("totLpId");
  propCoverElmnt = document.getElementById("probCoverId");
  simTxtElmnt = document.getElementById("simulationrestxtid");
  collectDefaultBoxes()

  //reset everything when the button is clicked
  hitAp = 0
  totalAp = 0
  carriedAp = 0
  avgAp = 0
  allAps = [] // all of the totalAp values
  //simulation result related
  simRes = [] // how many of each value a simulation ends in
  simCount = 1000
  simText = ""

  // Repeat all attacks
  for(let k = 1; k <= simCount; k++){

    totalAp = 0
    hitAp = 0

    // Perform a single simulation of all attacks
    for(let i = 0; i < aps.length; i++){
      // Set random rolls for hit and critrate
      rch = Math.random()*100
      rcr = Math.random()*100
      hitAp = 0

      // Add damage if rolls hit
      if(rch < chs[i]){
          hitAp += aps[i]
          // Add crit bonus
          if(rcr < crs[i]){
            hitAp += crmult*aps[i] - aps[i]
          }
      }
      // Add a loops damage total to a variable
      carriedAp += hitAp
      totalAp += hitAp
      console.log(rch+" "+rcr+" "+hitAp)
      if(i == aps.length-1){
        console.log("Total: "+totalAp)
        allAps.push(totalAp)
      }
    }
  }

  // form the avarage damage dealt based it
  avgAp = Math.floor(carriedAp/simCount)

  //Calculate life points remaining form total attack points
  lp = document.getElementById("lpid").value*1;
  lpLeft = lp-avgAp;

  //Check whether the attack has slain the victim or not
  if(lpLeft > 0){
    deadElmnt.innerHTML = "LP: "+lpLeft;
  }
  else{
    deadElmnt.innerHTML = "Dead";
  }

  simAvPos = []

  for(let j = 0; j < allAps.length; j++){
    //check whether or not the value has already been found and add to it
    av = allAps[j]
    foundav = false

    if(simRes[av] != null){
      simRes[av] += 1
    }
    else {
      simRes[av] = 1
    }

    // can the value already be found?
    for (m = 0; m <= simAvPos.length; m++){
      if(simAvPos[m] == av){
        foundav = true
        console.log("Found a value")
      }
    }
    // if not, add it
    if (foundav == false) {
        simAvPos.push(av)
        console.log("No value, added new "+av+" n: "+simAvPos.length)
    }
  }

  //remove empty spaces
  for(var i = 0; i < simRes.length; i++){
    if(simRes[i]==null){
      simRes.splice(i,1)
      i--
    }
  }

  // sort the values of simAvPos
  simAvPos = simAvPos.sort(function (a, b) {  return a - b;  })

  // give all the info as text
  killCh = 0
  chanceElmnt = document.getElementById("totChId");

  for(l=0;l<simRes.length;l++){
    midperc = Math.floor((simRes[l]/allAps.length)*100)
    if(simAvPos[l]>=lp){
      simText += " |"+simAvPos[l]+": "+midperc+"%| " + "\n"
      killCh += midperc
    }
    else{
      simText += " <"+simAvPos[l]+": "+midperc+"%> " + "\n"
    }
  }

  chanceElmnt.innerHTML = killCh
  simTxtElmnt.innerHTML = simText
  console.log("Avrg: "+avgAp);
}
//-------------------------------------------------------------------------------------------





function ApplySett(){
  fieldw = document.getElementById("settWidthId").value*1
  fieldh = document.getElementById("settHeightId").value*1
  pmov = document.getElementById("settMovementId").value*1
  mhit = document.getElementById("settHitsId").value*1
  pcount = document.getElementById("settPCountId").value*1;
}

function CollectFromBoxes() {
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

function collectDefaultBoxes(){
  aps[0] = document.getElementById("ap1").value*1
  chs[0] = document.getElementById("ch1").value*1
  crs[0] = document.getElementById("cr1").value*1

  aps[1] = document.getElementById("ap2").value*1
  chs[1] = document.getElementById("ch2").value*1
  crs[1] = document.getElementById("cr2").value*1

  aps[2] = document.getElementById("ap3").value*1
  chs[2] = document.getElementById("ch3").value*1
  crs[2] = document.getElementById("cr3").value*1

  aps[3] = document.getElementById("ap4").value*1
  chs[3] = document.getElementById("ch4").value*1
  crs[3] = document.getElementById("cr4").value*1

  console.log("changed all values")
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
  boxcount = 0
}


function UPDATE(){
  update = setInterval(UPDATE, 3)
}

//Function for simulating keyboard events
function KeySimulate(kcode){
  document.body.dispatchEvent(new KeyboardEvent('keydown', {keyCode: kcode}));
}
