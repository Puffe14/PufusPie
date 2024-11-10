var zelfsList = []
var zll = 0
var nrnd = 0

var yq = ""
var ya = ""

var uc = 0 //u corrects
var uw = 0 //u wrongs
var ur = 0 //ur ratio
var ut = 0 //ur total

var checkSAB = ""
var checkBA = ""
var checkSZ = ""
var zface = ""

///////////////////////////////////////////////

function Loaded(){
  //document.getElementById('kana').style.backgroundColor = "darkblue"
  var zquestion = document.getElementById("zquestion")
  var yanswer = document.getElementById("yanswer")
      checkSAB = document.getElementById("checkSwapAB")
      checkBA = document.getElementById("checkBtnAnswer")
      checkSZ = document.getElementById("checkShowZelf")
      checkFC = document.getElementById("checkFlash")
      checkLSC = document.getElementById("checkSpeChars")
      zface = document.getElementById("imgZelfFace")

  //read and add all lines from txt file to the zelfsList array
  document.getElementById("inq_file").onchange = function() {
    inqFile = this.files[0]
    console.log(inqFile)

    //create the file reader
    var zreader = new FileReader()
        zreader.readAsText(inqFile)

    //have the reader read the file and collect the information
    zreader.onload = function(progressEvent){
      console.log(this.result)

      //turn tabs to line breaks
      var theFileAsString = this.result.replace(/\t/g, "\n")
      //pick out every line
      everyLine = theFileAsString.split('\n')

      // add them to zelf's list
      zelfsList = [...zelfsList, ...everyLine]
      zll = zelfsList.length

      //clean out all empty lines and line breaks
      console.log("removing empty...")
      for(var i = 0; i < zll; i++){
        console.log(zelfsList[i])
        zelfsList[i] = zelfsList[i].replace(/(\r\n|\n|\r)/gm,"")
        if(zelfsList[i]==""){
          zelfsList.splice(i,1)
          i--
          zll = zelfsList.length
        }
      }
    }
    //display the inquirer on loading file
    inquirerDisplay()
  }

  //script for button for answers checkbox
  checkBA.onclick = function() {
    if(checkBA.checked == false){
      yanswer.oninput = checkForAnswer
      console.log("manual answer")
    }
    else{
      yanswer.oninput = ""
      console.log("auto answer")
    }
  }

  //script for show Zelf checkbox
  checkSZ.onclick = function() {
    if(checkSZ.checked == true){
      //zface.src = ""
      //zface.alt = ""
      zface.style.width = "0%"
      zface.style.heigth = "0%"
      console.log("face off")
    }
    else{
      //zface.src = "zelf_face_img.png"
      //zface.alt = "the face of a Blue Haired Lib"
      zface.style.width = "25%"
      zface.style.heigth = "25%"
      console.log("face on")
    }
  }
  optionDisplay()
  listscDisplay()
}

////////////////////////////////////////////////

function listZelfsList(){
  zll = zelfsList.length
  console.log("Listing Zelf's list...")

  for(var i = 0; i < zll; i++){
    console.log(zelfsList[i]+" "+i)
  }

  if(zelfsList.length < 1){
    console.log("Zelf's list is empty")
  }
  else{
    console.log("items on list:" + zelfsList.length)
  }
}


function resetZelfsList(){
  zelfsList = []
  uc = ut = ur = uw = 0
  zquestion.innerHTML = "My list has been reset."
  document.getElementById("scorep").innerHTML = "Score: 0, 0%"
}


function pickQuestion(){
  if(zll == 0){
    zquestion.innerHTML = "My list is empty..."
    console.log("His list is empty...")
  }
  else {
    //pick a random number dividable by to
    nrnd =  Math.floor(Math.random()*(zll/2))*2

    if(checkSAB.checked == true){
      yq = zelfsList[nrnd+1]
      ya = zelfsList[nrnd]
    }
    else{
      yq = zelfsList[nrnd]
      ya = zelfsList[nrnd+1]
    }
    zquestion.innerHTML = yq
    console.log("Question: "+yq+" "+nrnd)
  }
}


function checkForAnswer(){
  if(yanswer.value == ya){

    zelfsList.splice(nrnd, 2)
    zll = zelfsList.length

    if(zll > 0){
      pickQuestion()
      flashColor("green", 1000/3)
    }
    else {
      zquestion.innerHTML = "You did it!"
      flashColor("blue", 1500)
    }
    setTimeout(function(){
      yanswer.value = ""
      uc += 1
      ut = uc+uw
      ur = (Math.floor((uc/ut)*1000))/10
      console.log(uc+"/"+ut+", "+ur+"%")
      document.getElementById("scorep").innerHTML = "Score: "+uc+"/"+ut+", "+ur+"%"
    }, 100);
  }
  else if (checkBA.checked){
    flashColor("red", 1000/3)
  }
}

function skipQuestion(){
  if(zll>0){
    pickQuestion()
    yanswer.value = ""
    uw += 1
    ut = uc+uw
    ur = (Math.floor((uc/ut)*1000))/10
    console.log(uc+"/"+ut+", "+ur+"%")
    document.getElementById("scorep").innerHTML = "Score: "+uc+"/"+ut+", "+ur+"%"
    flashColor("yellow", 1000/5)
  }
}

function showAnswer(){
  zquestion.innerHTML = "It's: "+ya
}



function flashColor(fclr, ftime){
  if(checkFC.checked!=true){
    document.body.style.backgroundColor = fclr
    setTimeout(function(){
      document.body.style.backgroundColor = "gray"
    }, ftime);
  }
}


///////////////

//script for Close/Open Options button
function optionDisplay(){
  var optdisbtn = document.getElementById('displaybtn')
  var menudivs = document.getElementsByClassName('menu')
  console.log(menudivs[0].style.display+" "+menudivs.length)

  //hide all members of menu divs
  if(menudivs[0].style.display != 'none'){
   for(i=0; i<menudivs.length; i++){
    menudivs[i].style.display = 'none'
   }
   optdisbtn.innerHTML = "Show Options"
   optdisbtn.style.borderColor = "pink"
   console.log("all options set to hidden")
  }

  //show all members of menu divs
  else{
    for(i=0; i<menudivs.length; i++){
      menudivs[i].style.display = 'flex'
    }
   //display change when closed
   optdisbtn.innerHTML = "Close Options"
   optdisbtn.style.borderColor = "purple"
   console.log("all options set to display")
  }
}


function inquirerDisplay(){
  var inqdivs = document.getElementsByClassName('inq')
  console.log(inqdivs[0].style.display+" "+inqdivs.length)
  /*
  //hide all members of inquirer divs
  if(inqdivs[0].style.display != 'none'){
   for(i=0; i<inqdivs.length; i++){
    inqdivs[i].style.display = 'none'
   }
   console.log("inquirer set to hidden")
  }


  //show all members of inquirer divs
  else{ */
    for(i=0; i<inqdivs.length; i++){
      inqdivs[i].style.display = 'block'
    }
   console.log("inquirer set to display")
  //}
}


//script for liset special characters button
function listscDisplay(){
  var listscdiv = document.getElementById('listscdiv')

  //hide list of characters
  if(listscdiv.style.display != 'none'){
    listscdiv.style.display = 'none';
    console.log("list set to hidden");
  }

  //show list of characters
  else{
      listscdiv.style.display = 'flex';
      console.log("list set to show");
    }
}



//debugging function
function debugBtn(){
    console.log(yanswer.oninput) //(yanswer.value+" ans---true "+ya+", "+nrnd)
  }
