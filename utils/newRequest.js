import axios from "axios";

// const baseURL = "http://141.136.44.124:3002/api/";
// const baseURL = "http://192.168.99.115:3002/api/";
const baseURL = "https://npcmobilebackend.onrender.com/api/";
const baseStorageURL = "https://storage.michofat.com/npcimage";

export const newRequest = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
  },
});

export const storeRequest = axios.create({
  baseStorageURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});
