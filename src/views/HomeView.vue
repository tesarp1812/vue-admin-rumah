<template>
  <div>
    <h1>Home View</h1>
    <!-- Add content here -->
  </div>
</template>

<script>
import { useRumahStore } from '../state/pinia/rumah'; // Adjust path if necessary

export default {
  name: 'HomeView',
  setup() {
    const store = useRumahStore();
    // Use store in your setup function as needed
    return {
      store
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
