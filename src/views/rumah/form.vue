<template>
    <div>
      <h1>Tambah Rumah</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="no_rumah">Nomor Rumah:</label>
          <input v-model="form.no_rumah" type="text" id="no_rumah" required />
        </div>
        <div>
          <label for="status_rumah">Status Rumah:</label>
          <select v-model="form.Status_Rumah" id="status_rumah" required>
            <option value="Dihuni">Dihuni</option>
            <option value="Kosong">Kosong</option>
          </select>
        </div>
        <div>
          <label for="penghuni_id">Penghuni ID:</label>
          <input v-model="form.penghuni_id" type="text" id="penghuni_id" required />
        </div>
        <button type="submit">Submit</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRumahStore } from '../../state/pinia/rumah'; // Ensure the path is correct
  
  export default {
    name: 'AddRumah',
    setup() {
      const store = useRumahStore();
  
      const form = ref({
        no_rumah: '',
        Status_Rumah: 'Dihuni',
        penghuni_id: '',
      });
  
      const errorMessage = ref('');
  
      const submitForm = async () => {
        try {
          await store.addRumah(form.value);
          alert('Rumah berhasil ditambahkan');
          // Reset the form fields after successful submission
          form.value = {
            no_rumah: '',
            Status_Rumah: 'Dihuni',
            penghuni_id: '',
          };
        } catch (error) {
          errorMessage.value = 'Terjadi kesalahan saat menambahkan rumah';
        }
      };
  
      return {
        form,
        submitForm,
        errorMessage
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  