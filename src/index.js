const API = 'https://rickandmortyapi.com/api/character';

const addNumCharacterbttn = document.getElementById('addNumCharacterbttn');

// Construir función XHR
// Añadir listener
// Input

const fetchData = (url_api, callback) => {
  const xhr = new XMLHttpRequest;

  xhr.open('GET',url_api, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        return callback(null, JSON.parse(xhr.responseText));
      } else {
        const error = new Error('Error: ' + url_api)
        callback(error, null)
      }
    }
  }
  xhr.send();
}

const getCharacter = () => {
  fetchData(API, (error, data) => {
    if (error) return console.error(error)
    const maxNumOfCharacter =  data.info.count;
    const randomNumber = Math.floor(Math.random() * (maxNumOfCharacter - 1) + 1);
  
    fetchData(`${API}/${randomNumber}`, (error2, data2) => {
      if (error2) return console.error(error)
    
      const img = document.createElement('img');
      img.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';
      img.src = data2.image;
    
      const h3 = document.createElement('h3');
      h3.className = 'font-bold text-xl';
      h3.innerText = data2.name;
    
      const p = document.createElement('p');
      const stringHTMLp = `<span class="text-indigo-600 font-medium" id="originCharacter">Origen: </span>${data2.origin.name}`
      p.innerHTML = stringHTMLp;

      const pId = document.createElement('p');
      const stringHTMLpId = `<span class="text-indigo-600 font-medium" id="idCharacter">id: ${data2.id}</span>`
      pId.innerHTML = stringHTMLpId;
    
      const infoDiv = document.createElement('div');
      infoDiv.className = 'text-center md:text-left';
      infoDiv.append(h3, p, pId);
    
      const divCard = document.createElement('div');
      divCard.className = 'md:flex bg-indigo-300 rounded-lg p-6 hover:bg-gray-300';
      divCard.append(img, infoDiv);
    
      const appMount = document.getElementById('appNode');
      appMount.appendChild(divCard);
    })
  })
} 


const repeatNumTimes = () => {
  let times = document.getElementById('numCharacters').value;

  if (times === '') {
    times = 1;
  }

  for (let i = 0; i < times; i++) {
    getCharacter();
  }
}

addNumCharacterbttn.addEventListener('click', repeatNumTimes);