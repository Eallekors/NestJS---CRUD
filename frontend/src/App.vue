<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <div class="container">
        <div class="header-content">
          <div class="logo-container">
            <h1>User Management System</h1>
          </div>

        </div>
      </div>
    </header>

    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.container {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e6ed;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 36px;
  width: 36px;
}

header h1 {
  font-size: 20px;
  margin: 0;
  color: #1e293b;
  font-weight: 600;
}

nav {
  display: flex;
  gap: 8px;
}

nav a {
  color: #1e293b;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

nav a:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}

nav a.router-link-active {
  background-color: #e2e8f0;
  color: #0f172a;
  font-weight: 600;
}

main {
  flex: 1;
  padding: 30px 0;
}

footer {
  background-color: #ffffff;
  border-top: 1px solid #e0e6ed;
  padding: 20px 0;
  margin-top: 20px;
}

footer p {
  color: #64748b;
  font-size: 14px;
  text-align: center;
  margin: 0;
}

/* Adjust layout for very large screens */
@media (min-width: 1600px) {
  .container {
    max-width: 1500px;
  }
}
</style>
