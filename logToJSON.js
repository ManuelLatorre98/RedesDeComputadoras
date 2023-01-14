const fs = require('fs');
const { type } = require('os');

const displayLogFile = ()=>{
  fs.readFile("./data.log", "utf8", (err, file) => {
    toFileJSON(file)
  })
}

function toFileJSON(file){
  const arrayOfHours = getHours (file)
  const arrayOfProtocols = getProtocols (file)
  const arrayOfTimes = getTimes(file)
  let jsonFileHOST1=[]
  let jsonFileHOST2=[]
  for (let i = 0; i < arrayOfHours.length; i+=6) {
    jsonFileHOST1.push({
      protocol: arrayOfProtocols[i],
      hour: "Promedio tiempo transferencia ("+arrayOfHours[i]+")",      
      time: arrayOfTimes[i]
    })
    jsonFileHOST1.push({
      protocol: arrayOfProtocols[i+1],
      hour: "Promedio tiempo transferencia ("+arrayOfHours[i+1]+")",
      time: arrayOfTimes[i+1]
    })
    jsonFileHOST1.push({
      protocol: arrayOfProtocols[i+2],
      hour: "Promedio tiempo transferencia ("+arrayOfHours[i+2]+")",
      time: arrayOfTimes[i+2]
    })
  }

  for (let i = 3; i < arrayOfHours.length; i+=6) {
    jsonFileHOST2.push({
      protocol: arrayOfProtocols[i],
      hour: "Promedio tiempo transferencia ("+arrayOfHours[i]+")",   
      time: arrayOfTimes[i]
    })
    jsonFileHOST2.push({
      protocol: arrayOfProtocols[i+1],
      hour: "Promedio tiempo transferencia ("+arrayOfHours[i+1]+")",
      time: arrayOfTimes[i+1]
    })
    jsonFileHOST2.push({
      protocol: arrayOfProtocols[i+2],
      hour: "Promedio tiempo transferencia ("+arrayOfHours[i+2]+")",
      time: arrayOfTimes[i+2]
    })
  }
  


  fs.writeFile("./dataHOST1.JSON", JSON.stringify(jsonFileHOST1), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
  console.log("JSON file has been saved.");
  })
  
  fs.writeFile("./dataHOST2.JSON", JSON.stringify(jsonFileHOST2), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
  console.log("JSON file has been saved.");
  })

}

function getProtocols(file){
  const regex = /((?<=net.ipv4.tcp_congestion_control = )(.*))/g;
  return file.match(regex)
}

function getHours(file){
  const regex = /((?<=\-(12|13)\s)(.*?)(?=--))/g;
  //const string ="2023-01-13 07:48:17-- qwuheuiqwj 23-01-13 07:48:57--"
  return file.match(regex)
}

function getTimes(file){
  const regex = /((?<=real	[0-9]m)(.*?)(?=s))/g;
  return file.match(regex)
}
displayLogFile()
