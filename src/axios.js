// src/axios.js
import axios from 'axios';

// Menggunakan VUE_APP_APIURL dari .env
const instance = axios.create({
  baseURL: process.env.VUE_APP_APIURL, // Vue CLI: Variabel lingkungan dengan prefix VUE_APP_
  timeout: 10000, // Waktu tunggu untuk permintaan
});

export default instance;
