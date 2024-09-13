// src/state/pinia/rumah.js
import { defineStore } from 'pinia';
import axios from '../../axios'; // Sesuaikan dengan jalur axios Anda

export const useRumahStore = defineStore('rumah', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('/rumah'); // Menggunakan URL relatif
        this.items = Array.isArray(response.data) ? response.data : [response.data];
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async addRumah(newRumah) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.post('/rumah', newRumah);
        // Refresh the data after adding new rumah
        await this.fetchData();
      } catch (error) {
        this.error = 'Failed to add new rumah';
      } finally {
        this.isLoading = false;
      }
    }
  },
});
