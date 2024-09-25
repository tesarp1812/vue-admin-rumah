<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h1>Tambah Warga</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nama">Nama:</label>
          <input type="text" v-model="form.nama" id="nama" required />
        </div>
        <div>
          <label for="ktp">Foto KTP:</label>
          <!-- <input type="file" @change="handleFileUpload" id="ktp" required /> -->
        </div>
        <div>
          <label for="nomorTelepon">Nomor Telepon:</label>
          <input type="tel" v-model="form.Nomor_Telepon" id="nomorTelepon" required />
        </div>
        <div>
          <label for="statusMenikah">Status Menikah:</label>
          <select v-model="form.Status_Menikah" id="statusMenikah" required>
            <option value="Ya">Sudah Menikah</option>
            <option value="Tidak">Belum Menikah</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        <button type="button" @click="closeModal">Cancel</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { usePenghuniStore } from '@/state/pinia/penghuni'; // Sesuaikan dengan path yang benar

export default {
  name: 'FormRumah',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = usePenghuniStore();
    const form = ref({
      nama: '',
      Nomor_Telepon: '',
      Status_Menikah: '',
      Foto_KTP: null,
    });
    const errorMessage = ref('');

    // const handleFileUpload = (event) => {
    //   form.value.Foto_KTP = event.target.files[0];
    // };

    const submitForm = async () => {
      const formData = new FormData();
      formData.append('nama', form.value.nama);
      formData.append('Nomor_Telepon', form.value.Nomor_Telepon);
      formData.append('Status_Menikah', form.value.Status_Menikah);
      if (form.value.Foto_KTP) {
        formData.append('Foto_KTP', form.value.Foto_KTP);
      }

      try {
        await store.addWarga(formData); // Ganti dengan action yang sesuai
        emit('close');
        form.value = {
          nama: '',
          Nomor_Telepon: '',
          Status_Menikah: '',
          Foto_KTP: null,
        };
      } catch (error) {
        errorMessage.value = error.message;
        form.value = {
          nama: '',
          Nomor_Telepon: '',
          Status_Menikah: '',
          Foto_KTP: null,
        };
      }
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      form,
      // handleFileUpload,
      submitForm,
      closeModal,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}

.modal-content h1 {
  margin-top: 0;
  font-size: 1.5em;
  color: #333;
}

.modal-content div {
  margin-bottom: 15px;
}

.modal-content label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.modal-content input,
.modal-content select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  box-sizing: border-box;
}

.modal-content input:focus,
.modal-content select:focus {
  border-color: #007bff;
  outline: none;
}

.modal-content button {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content button[type="submit"] {
  background-color: #28a745;
  color: #fff;
}

.modal-content button[type="submit"]:hover {
  background-color: #218838;
}

.modal-content button[type="button"] {
  background-color: #dc3545;
  color: #fff;
}

.modal-content button[type="button"]:hover {
  background-color: #c82333;
}

.error {
  margin-top: 10px;
  color: #dc3545;
  font-size: 0.875em;
}
</style>
