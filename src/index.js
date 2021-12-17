const baseUrl = 'https://rickandmortyapi.com/api/character';

const API = 'https://rickandmortyapi.com/api/character';

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

fetchData(API, (error, data, ) => {
  if (error) return console.error(error)
  console.log(data);

  
})

