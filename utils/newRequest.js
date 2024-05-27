import axios from "axios";

const baseURL = "http://141.136.44.124:3002/api/";
const baseStorageURL = "http://storage.npc-huris.com.ng:3003/";

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
