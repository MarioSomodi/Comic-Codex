import axios from 'axios';
import {firebase} from '@react-native-firebase/database';
import {md5} from '../utilites/md5';

var privateKey = null;
var publicKey = 'f7d2fbda7534b27e3668700680e22b21';

const getApiPrivateKey = async () => {
  const database = firebase
    .app()
    .database(
      'https://comic-codex-default-rtdb.europe-west1.firebasedatabase.app/',
    );
  privateKey = await database
    .ref('/apiKey')
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
};

const getApiAuthString = async () => {
  let usedTimestamp = Date.now();
  if (privateKey == null) {
    await getApiPrivateKey();
  }
  var hash = md5(usedTimestamp + privateKey + publicKey);
  return '?ts=' + usedTimestamp + '&apikey=' + publicKey + '&hash=' + hash;
};

const marvelApi = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

export {getApiAuthString, marvelApi};
