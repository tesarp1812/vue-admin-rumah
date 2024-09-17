// src/state/pinia/rumah.js
import { defineStore } from 'pinia';
import axios from '../../axios'; 

export const useRumahStore = defineStore('rumah', {
  state: () => ({
    items: [],             // Data rumah
    warga: [],             // Data warga
    penghuni: [],          // Data penghuni
    mergedData: [],        // Merged data of rumah, penghuni, and warga
    isLoading: false,    
    error: null,         
    page: 1,            
    perPage: 10,         
    totalItems: 0,        // Total item di server
    houseNumbers: [],     // Available house numbers
    residents: [],   // List of residents (warga)
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const rumahResponse = await axios.get('/rumah');
        this.items = Array.isArray(rumahResponse.data) ? rumahResponse.data : [rumahResponse.data];
        
        const wargaResponse = await axios.get('/warga');
        this.warga = Array.isArray(wargaResponse.data) ? wargaResponse.data : [wargaResponse.data];
        
        const penghuniResponse = await axios.get('/penghuni');
        this.penghuni = Array.isArray(penghuniResponse.data) ? penghuniResponse.data : [penghuniResponse.data];

        // Merge rumah with penghuni and warga
        this.mergedData = this.items.map(rumah => {
          const penghuniForRumah = this.penghuni
            .filter(p => p.rumah_id === rumah.id)
            .map(penghuni => {
              const wargaData = this.warga.find(w => w.id === penghuni.warga_id);
              return {
                ...penghuni,
                warga: wargaData || null
              };
            });

          return {
            ...rumah,
            penghuni: penghuniForRumah
          };
        });
        
        console.log(this.mergedData);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchHouseNumbers() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('/rumah'); // Endpoint to fetch house numbers
        this.houseNumbers = response.data;
        console.log("rumah", this.houseNumbers);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchResidents() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('/warga'); // Endpoint to fetch residents (warga)
        this.residents = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async loadMore() {
      if (this.isLoading || this.items.length >= this.totalItems) return;
      await this.fetchData(this.page + 1);
    },
    async addRumah(newRumah) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.post('/rumah', newRumah);
        await this.fetchData(); // Refresh the data after adding new rumah
      } catch (error) {
        this.error = 'Failed to add new rumah';
      } finally {
        this.isLoading = false;
      }
    },
    async addPenghuni(newPenghuni) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.post('/penghuni', newPenghuni);
        // Refresh the data after adding new Penghuni
        await this.fetchData();
      } catch (error) {
        this.error = 'Failed to add new Penghuni';
      } finally {
        this.isLoading = false;
      }
    }
  },
});
