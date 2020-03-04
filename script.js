

function caesarDecrypt(encrypted, number){
  var alphabetComplet = 'abcdefghijklmnopqrstuvwxyz'; 
  var newDescrypt = '';
        for(let alphabet of encrypted){ 
            let positionAlphabet = alphabetComplet.indexOf(alphabet); 
            if(positionAlphabet != -1){ 
                if(positionAlphabet - number < 0) newDescrypt = newDescrypt + alphabetComplet[26 + positionAlphabet - number];
                else newDescrypt = newDescrypt + alphabetComplet[positionAlphabet - number];
                } else  newDescrypt = newDescrypt + alphabet;
        }
  return newDescrypt;
}

//console.log(cesaerDecrypt("svwetmlom qa xwemz. nzivkqa jikwv", 8));

function caesarEncrypt(descripted, number){
  var alphabetComplet = 'abcdefghijklmnopqrstuvwxyz';
  var newEncrypt = '';
      for(let alphabet of descripted){
          let positionAlphabet = alphabetComplet.indexOf(alphabet)
          if(positionAlphabet != -1){
              if(positionAlphabet + number > 25) newEncrypt = newEncrypt + alphabetComplet[positionAlphabet + number - 26];
              else newEncrypt = newEncrypt + alphabetComplet[positionAlphabet + number];
              } else newEncrypt = newEncrypt + alphabet;
      }
  return newEncrypt
}

//console.log(cesaerEncrypt("knowledge is power. francis bacon", 8));

//function to GET json URL, generate sha1 and create archive with json items 
var api = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=c4635ee3086382279b84ff2968501ffe48de6952';
function getAPI(key) {
  fetch = require('node-fetch')
  fetch(key)
     .then( (response) => response.json() )
     .then( (myJson) => {
         sha1 = require('js-sha1')
         myJson.decifrado = caesarDecrypt(myJson.cifrado, myJson.numero_casas)  
         myJson.resumo_criptografico = sha1(myJson.decifrado)             
         console.log(myJson)
         myJsonUpdate = JSON.stringify(myJson)                               
         const fs = require('fs')  
         fs.writeFile('./answer.json', myJsonUpdate, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });                       
     })
     .catch( (err) => {
         console.log('ERROR: ', err.message)
     })
}

//getAPI(api);
function postAPI() {
  fetch = require('node-fetch')
  const fs = require('fs')
  FormData = require('form-data')
  const formData = new FormData()
  formData.append('answer', fs.createReadStream('./answer.json'))

  fetch('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=c4635ee3086382279b84ff2968501ffe48de6952', {
      method: 'POST',
      body: formData
  })
  .then( (res) => console.log(`FormData ${JSON.stringify(formData)} Resposta: ${res.status} ${res.type} ${res.json()}`) )
  .catch( (err) => console.log('ERROR: ', err.message) )

}

postAPI()