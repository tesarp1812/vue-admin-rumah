<template>
  <nav class="navbar">
    <div class="navbar-container">
      <a href="/" class="navbar-brand">MyApp</a>
      <ul class="navbar-menu">
        <li class="navbar-item"><router-link to="/" class="navbar-link">Home</router-link></li>
        <li class="navbar-item"><router-link to="/rumah" class="navbar-link">Admin Rumah</router-link></li>
        <li class="navbar-item"><router-link to="/penghuni" class="navbar-link">Daftar Penghuni</router-link></li>
        <li class="navbar-item"><router-link to="/contact" class="navbar-link">Contact</router-link></li>
      </ul>
      <button class="navbar-toggle" @click="toggleMenu">
        <span class="navbar-toggle-icon"></span>
        <span class="navbar-toggle-icon"></span>
        <span class="navbar-toggle-icon"></span>
      </button>
    </div>
    <ul class="navbar-menu-mobile" v-if="menuOpen">
      <li class="navbar-item"><router-link to="/" class="navbar-link" @click="closeMenu">Home</router-link></li>
      <li class="navbar-item"><router-link to="/about" class="navbar-link" @click="closeMenu">About</router-link></li>
      <li class="navbar-item"><router-link to="/services" class="navbar-link" @click="closeMenu">Services</router-link></li>
      <li class="navbar-item"><router-link to="/contact" class="navbar-link" @click="closeMenu">Contact</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    }
  }
}
</script>

<style scoped>
/* Navbar styles */
.navbar {
  background-color: #333;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  position: relative;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  font-size: 1.5em;
  color: white;
  text-decoration: none;
}

.navbar-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-item {
  margin: 0 10px;
}

.navbar-link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  display: block;
  border-radius: 4px;
}

.navbar-link:hover {
  background-color: #575757;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
}

.navbar-toggle-icon {
  background-color: white;
  height: 3px;
  width: 25px;
  margin: 4px 0;
  border-radius: 2px;
}

.navbar-menu-mobile {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #333;
  width: 200px;
}

.navbar-menu-mobile .navbar-item {
  margin: 0;
}

.navbar-menu-mobile .navbar-link {
  padding: 10px;
  color: white;
  text-decoration: none;
  display: block;
  border-radius: 4px;
}

.navbar-menu-mobile .navbar-link:hover {
  background-color: #575757;
}

/* Responsive styles */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }
  .navbar-toggle {
    display: flex;
  }
  .navbar-menu-mobile {
    display: block;
  }
}
</style>
