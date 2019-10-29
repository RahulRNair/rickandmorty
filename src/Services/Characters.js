import axios from 'axios'
const API_ENDPOINT = 'https://rickandmortyapi.com/api/';
/*
 * API for get all characters 
 */
export function getCharcters(API) {
    return new Promise((resolve, reject) => {
      const API_URL = API ? API : API_ENDPOINT+'character';
	    axios.get(API_URL)
	    .then(function (response) {
	      resolve(response.data);
	    })
	    .catch(function (response) {
	      reject(response);
	    });
    })
}
/*
 * API FOR GET Episodes
 * Using promise all call
 * not using individual api call(https://rickandmortyapi.com/api/episode/1,2,3,4,5,6,7,8,9,10,11,12)
 * because character api is returning only episode urls , spliting episode id from url(https://rickandmortyapi.com/api/episode/1)
 * is not good , if url is changing to somthing else without id logic will fail
 */
export function getEpisodes(urls) {
  var promise = urls.map(url=> fetch(url).then(y=>y.text()));
  return Promise.all(promise).then(results => {
    return results;
  })
}
