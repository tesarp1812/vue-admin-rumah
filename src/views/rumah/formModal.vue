<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
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
        <button type="button" @click="closeModal">Cancel</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRumahStore } from '@/state/pinia/rumah'; // Pastikan jalur import benar

export default {
  name: 'formModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
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
        emit('close');
        alert('Rumah berhasil ditambahkan');
        form.value = {
          no_rumah: '',
          Status_Rumah: 'Dihuni',
          penghuni_id: '',
        };
      } catch (error) {
        errorMessage.value = 'Terjadi kesalahan saat menambahkan rumah';
      }
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      form,
      submitForm,
      closeModal,
      errorMessage
    };
  }
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
  opacity: 1;
  transition: opacity 0.3s ease;
}

.modal-overlay.fade-out {
  opacity: 0;
}

.modal-content {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  animation: slide-in 0.3s ease;
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

@keyframes slide-in {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

