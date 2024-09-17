<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h1>Tambah Rumah</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="no_rumah">Nomor Rumah:</label>
          <select v-model="form.rumah_id" id="no_rumah" required>
            <option v-for="house in houseNumbers" :key="house.id" :value="house.id">
              {{ house.no_rumah }}
            </option>
          </select>
        </div>
        <div>
          <label for="penghuni_id">Penghuni:</label>
          <select v-model="form.warga_id" id="penghuni_id" required>
            <option v-for="resident in residents" :key="resident.id" :value="resident.id">
              {{ resident.nama }}
            </option>
          </select>
        </div>
        <div>
          <label for="status_penghuni">Status Penghuni:</label>
          <select v-model="form.Status_Penghuni" id="status_penghuni" required>
            <option value="Kontrak">Kontrak</option>
            <option value="Tetap">Tetap</option>
          </select>
        </div>
        <div>
          <label for="start_date">Tanggal Mulai:</label>
          <input v-model="form.start_date" type="date" id="start_date" required />
        </div>
        <div>
          <label for="end_date">Tanggal Akhir:</label>
          <input v-model="form.end_date" type="date" id="end_date" />
        </div>
        <button type="submit">Submit</button>
        <button type="button" @click="closeModal">Cancel</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRumahStore } from '@/state/pinia/rumah';

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
      warga_id: '',
      rumah_id: '',
      Status_Penghuni: 'Kontrak',
      start_date: '',
      end_date: ''
    });
    const errorMessage = ref('');
    const houseNumbers = ref([]);
    const residents = ref([]);

    const fetchOptions = async () => {
      try {
        await store.fetchHouseNumbers();
        await store.fetchResidents();
        houseNumbers.value = store.houseNumbers;
        residents.value = store.residents;
      } catch (error) {
        errorMessage.value = 'Terjadi kesalahan saat memuat data';
      }
    };

    const submitForm = async () => {
      try {
        const formData = { ...form.value, end_date: form.value.end_date || null };
        await store.addPenghuni(formData);
        emit('close');
        alert('Penghuni berhasil ditambahkan');
        form.value = {
          rumah_id: '',
          Status_Rumah: 'Dihuni',
          warga_id: '',
          start_date: '',
          end_date: ''
        };
      } catch (error) {
        errorMessage.value = 'Terjadi kesalahan saat menambahkan rumah';
      }
    };

    const closeModal = () => {
      emit('close');
    };

    watch(() => props.isVisible, (newVal) => {
      if (newVal) {
        fetchOptions();
      }
    });

    return {
      form,
      submitForm,
      closeModal,
      errorMessage,
      houseNumbers,
      residents,
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
