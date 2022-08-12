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

///////////////////////////////////////////////

function Loaded(){
  document.getElementById('kana').style.backgroundColor = "darkblue"
  var zquestion = document.getElementById("zquestion")
  var yanswer = document.getElementById("yanswer")
      checkSAB = document.getElementById("checkSwapAB")

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
    }
  }
}

////////////////////////////////////////////////

function listZelfsList(){
  zll = zelfsList.length

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
  //pick a random number dividable by to
  nrnd =  Math.floor(Math.random()*(zll/2))*2

  if(checkSAB.checked == true){
    yq = zelfsList[nrnd+1]
    ya = zelfsList[nrnd].replace(/\r?\n|\r/, "")
  }
  else{
    yq = zelfsList[nrnd]
    ya = zelfsList[nrnd+1].replace(/\r?\n|\r/, "")
  }
  zquestion.innerHTML = yq
  console.log("Question: "+yq+" "+nrnd)
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
  console.log(yanswer.value+" ans---true "+ya+", "+nrnd)
}
