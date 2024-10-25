import axios from "axios";

const baseURL = "https://npc.michofat.com/api/";
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
