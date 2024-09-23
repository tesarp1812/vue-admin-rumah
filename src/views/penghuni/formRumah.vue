<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Nama :</label>
          <input type="text" v-model="form.name" id="name" />
        </div>
        <div>
          <label for="KTP">KTP :</label>
          <input type="text" v-model="form.name" id="name" />
        </div>
        <div>
          <label for="Nomer Telepon">Nomer Telepon :</label>
          <input type="number" v-model="form.name" id="name" />
        </div>
        <div>
          <label for="name">Status Menikah :</label>
          <select name="" id="">
            <option value=""></option>
            <option value="">Sudah Menikah</option>
            <option value="">Belum Menikah</option>
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
export default {
  name: 'FormRumah',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form);
      // You can emit an event to notify the parent to refresh data
      this.$emit('close'); // Close the modal after submission
    }
  }
}
</script>

<style scoped>
.modal {
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

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  /* Could be more or less, depending on screen size */
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
