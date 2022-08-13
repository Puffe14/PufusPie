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

      //pick out every line
      everyLine = this.result.split('\n')

      // add them to zelf's list
      zelfsList = [...zelfsList, ...everyLine]
      zll = zelfsList.length

      //clean out all empty lines and line breaks
      console.log("removing empty...")
      for(var i = 0; i < zll; i++){
        console.log(zelfsList[i])
        zelfsList[i] = zelfsList[i].replace(/\r?\n|\r/, "")
        if(zelfsList[i]==""){
          zelfsList.splice(i,1)
          i--
          zll = zelfsList.length
        }
      }
    }
  }

  checkBA.onclick = function() {
    if(checkBA.checked == true){
      yanswer.oninput = ""
    }
    else{
      yanswer.oninput = "checkForAnswer()"
    }
  }

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
    }
    else {
      zquestion.innerHTML = "You did it!"
    }

    yanswer.value = ""
    uc += 1
    ut = uc+uw
    ur = (Math.floor((uc/ut)*1000))/10
    console.log(uc+"/"+ut+", "+ur+"%")
    document.getElementById("scorep").innerHTML = "Score: "+ut+"/"+ut+", "+ur+"%"
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
  }
}


function debugBtn(){
  console.log(zll) //(yanswer.value+" ans---true "+ya+", "+nrnd)
}
