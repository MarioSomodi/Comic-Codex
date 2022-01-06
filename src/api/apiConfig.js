import axios from 'axios';
import {firebase} from '@react-native-firebase/database';
import MD5 from 'crypto-js/md5';

var privateKey = null;
var publicKey = 'f7d2fbda7534b27e3668700680e22b21';
var usedTimestamp = null;

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

const getTimestamp = () => {
  return Date.now();
};

const getHash = async () => {
  if (privateKey == null) {
    await getApiPrivateKey();
  }
  usedTimestamp = getTimestamp();
  return MD5(usedTimestamp + privateKey + publicKey).toString();
};

const getApiAuthString = async () => {
  var hash = await getHash();
  return '?ts=' + usedTimestamp + '&apikey=' + publicKey + '&hash=' + hash;
};

const marvelApi = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
});

export {getApiAuthString, marvelApi};
