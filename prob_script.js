

var aps = []
var chs = []
var crs = []
var crmult = 3

totalChance = 0
boxcount = 0
simCount = 1000

rch = Math.random()*100
rcr = Math.random()*100
rn = 0



function Loaded(){
  atksRowDiv = document.getElementById("atkplace");
  vicFoto = document.getElementById("victimphotoid");
  victimInputElmnt = document.getElementById("victiminputid");
  check2RN = document.getElementById("check2RNid")
  check250 = document.getElementById("check250id")
  numOfSimsElmnt =  document.getElementById("numofsimsid")
  simInputElmnt = document.getElementById("simulationinputid")
  inputCrtmltElmnt = document.getElementById("inputCrtmltid")
  numOfSimsElmnt.innerHTML = simCount
  simInputElmnt.values = simCount

  victimInputElmnt.onchange = function(event) {
    reader = new FileReader()
    imgFile = event.target.files[0]
    vicFoto.title = imgFile.name
    console.log("reader anew")

    reader.onload = function (event) {
      uploadVictim = event.target.result
      console.log(victimInputElmnt+" and "+uploadVictim)
      vicFoto.src = uploadVictim
    }
    reader.readAsDataURL(imgFile)
    console.log(vicFoto.title)
  }


  check2RN.onclick = function() {
    if(check2RN.checked == true){
      rn = 1
      check250.checked = false
    }
    else{
      rn = 0
    }
  }

  check250.onclick = function() {
    if(check250.checked == true){
      rn = 2
      check2RN.checked = false
    }
    else{
      rn = 0
    }
  }

  simInputElmnt.onchange = function() {
    if(simInputElmnt.value > 1000000){console.log("Well it's your device...")}
    simCount = simInputElmnt.value
    numOfSimsElmnt.innerHTML = simCount
  }

  inputCrtmltElmnt.onchange = function() {
    crmult = inputCrtmltElmnt.value
  }
}



function CalcAtkOld() {
  collectBoxes()
  probCoverElmnt = document.getElementById("probCoverId");
  //Calculate total chance of consecutive attacks
  totalChance = 1
  for(let o = 1; o<=chs.length; o++){
    totalChance = totalChance*(document.getElementById("ch"+o).value*0.01)
  }
  chanceElmnt = document.getElementById("totChId");
  if(totalChance>=0.01){chanceElmnt.innerHTML = Math.floor(totalChance*100);}
  else{chanceElmnt.innerHTML = Math.floor(totalChance*1000000)/1000000;}
  //Calculate life points remaining form total attack points
  totalAp = 0
  for(let p = 1; p<=aps.length; p++){
    totalAp += (document.getElementById("ap"+p).value*1)
  }
  deadElmnt = document.getElementById("totLpId");
  lp = document.getElementById("lpid").value*1;
  lpLeft = lp-totalAp;
  //*************
  if(lpLeft>0){
    deadElmnt.innerHTML = "LP: "+lpLeft;
    probCoverElmnt.style.backgroundColor = "darkblue";
  }
  else{
    deadElmnt.innerHTML = "Dead";
    probCoverElmnt.style.backgroundColor = "red";
  }
  console.log(totalAp);
  //Set square on top of image
  probCoverElmnt.style.width = totalChance*100+"%";
  //**************
}


//-----------------------------------------------------------------------------
function CalcAtkSim() {
  deadElmnt = document.getElementById("totLpId");
  probCoverElmnt = document.getElementById("probCoverId");
  simTxtElmnt = document.getElementById("simulationrestxtid");
  collectBoxes()

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
      rollit(i)
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

  probCoverElmnt = document.getElementById("probCoverId");

  chanceElmnt.innerHTML = killCh
  simTxtElmnt.innerHTML = simText
  deadElmnt.innerHTML = "Dead?";
  probCoverElmnt.style.backgroundColor = "red";
  console.log("Avrg: "+avgAp);
  console.log(totalAp);
  //Set square on top of image
  probCoverElmnt.style.width = killCh+"%";
}
//-------------------------------------------------------------------------------------------






function collectBoxes(){
  for(let q = 1; q <= boxcount; q++){
    aps[q-1] = document.getElementById("ap"+q).value*1
    chs[q-1] = document.getElementById("ch"+q).value*1
    crs[q-1] = document.getElementById("cr"+q).value*1
  }
  console.log("changed all values")
  console.log(document.getElementById("ap1").value*1)
  console.log("Aps: "+aps+"Chs: "+chs+"Crs: "+crs)
}


function rollit(numi){
  rcr = Math.random()*100
  switch (rn) {
    case 1:
      // Set 2RN  random rolls for hit and critrate
      rch = (Math.random()*100 + Math.random()*100)/2
      break
    case 2:
      if(chs[numi]<50){
        // Set 1RN if ch is under 50
        rch = Math.random()*100
      }
      else {
        // Set 2RN  random rolls for hit rate
        rch = (Math.random()*100 + Math.random()*100)/2
      }
      break
    default:
      // Set 1RN  random rolls for hit rate
      rch = Math.random()*100
  }
}


function AddBox(apob, chob, crob){
  boxcount += 1

  //Set container element
  atksRowDiv = document.getElementById("atkplace")

  //Create a new box squares for container
  box = document.createElement("div")
  box.className = "atkBox"
  box.id = "ab"+boxcount
  atksRowDiv.appendChild(box)
  //box.style.left = 100*boxcount+"px";
  console.log("appended box "+box.id)

  // Create the inputs there
  bid = document.getElementById(box.id)

  // create the title number
  bh4 = document.createElement("h4")
  bh4.innerHTML = boxcount+"."
  bid.appendChild(bh4)

  for(let g = 0; g < 3; g++){
    binput = document.createElement("input")
    binput.type = "number"
    binput.className = "inputAtk"
    switch (g) {
      case 0:
        binput.id = "ap"+boxcount
        binput.value = apob
        break
      case 1:
        binput.id = "ch"+boxcount
        binput.value = chob
        break
      case 2:
        binput.id = "cr"+boxcount
        binput.value = crob
        break
    }
    bid.appendChild(binput)
  }
}


function AddDouble(){
  collectBoxes()
  bcx = boxcount-1
  console.log("Quad Ap: "+aps[bcx]+"Chs: "+chs[bcx]+"Crs: "+crs[bcx])
  AddBox(aps[bcx], chs[bcx], crs[bcx])
}

function AddQuadruple(){
  collectBoxes()
  bcx = boxcount-1
  console.log("Quad Ap: "+aps[bcx]+"Chs: "+chs[bcx]+"Crs: "+crs[bcx])
  AddBox(aps[bcx], chs[bcx], crs[bcx])
  AddBox(aps[bcx], chs[bcx], crs[bcx])
  AddBox(aps[bcx], chs[bcx], crs[bcx])
}


function ClearBoxes(){
  while (atksRowDiv.firstChild) {
    atksRowDiv.firstChild.remove();
  }
  boxcount = 0
  aps = []
  chs = []
  crs = []
  document.getElementById("probCoverId").style.width = 0+"%";
}


function UPDATE(){
  update = setInterval(UPDATE, 3)
}

//Function for simulating keyboard events
function KeySimulate(kcode){
  document.body.dispatchEvent(new KeyboardEvent('keydown', {keyCode: kcode}));
}
