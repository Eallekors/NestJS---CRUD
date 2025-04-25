<template>
  <div class="form-container">
    <div class="page-header">
      <h1>{{ isEditMode ? 'Edit User' : 'Create New User' }}</h1>
    </div>

    <div class="content-panel">
      <div v-if="userStore.loading" class="loading-container">
        <div class="loader"></div>
        <p>Loading user data...</p>
      </div>
      
      <div v-else-if="userStore.error" class="alert alert-danger">
        <i class="icon">!</i>
        <span>{{ userStore.error }}</span>
      </div>
      
      <div v-else class="form-wrapper">
        <form @submit.prevent="submit">
          <div class="form-grid">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                id="firstName" 
                v-model="form.firstName" 
                required
                maxlength="50"
                class="form-control"
                placeholder="Enter first name"
              />
              <div class="error-message" v-if="errors.firstName">
                {{ errors.firstName }}
              </div>
            </div>
            
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                id="lastName" 
                v-model="form.lastName" 
                required
                maxlength="50"
                class="form-control"
                placeholder="Enter last name"
              />
              <div class="error-message" v-if="errors.lastName">
                {{ errors.lastName }}
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              id="email" 
              type="email" 
              v-model="form.email" 
              required
              class="form-control"
              placeholder="name@example.com"
            />
            <div class="error-message" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
          
          <div class="form-group" v-if="isEditMode">
            <div class="checkbox-wrapper">
              <input 
                id="isActive" 
                type="checkbox" 
                v-model="form.isActive" 
                class="checkbox-input"
              />
              <label for="isActive" class="checkbox-label">User is active</label>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="form-actions">
            <button type="button" @click="$router.push('/users')" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              {{ isEditMode ? 'Update User' : 'Create User' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useUserStore } from '@/stores/users';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const userId = computed(() => Number(route.params.id));
const isEditMode = computed(() => route.name === 'editUser');

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  isActive: true
});

const errors = reactive({
  firstName: '',
  lastName: '',
  email: ''
});

onMounted(async () => {
  if (isEditMode.value) {
    await userStore.fetchUser(userId.value);
    if (userStore.currentUser) {
      form.firstName = userStore.currentUser.firstName;
      form.lastName = userStore.currentUser.lastName;
      form.email = userStore.currentUser.email;
      form.isActive = userStore.currentUser.isActive;
    }
  }
});

const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  errors.firstName = '';
  errors.lastName = '';
  errors.email = '';
  
  // Validate firstName
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required';
    isValid = false;
  } else if (form.firstName.length > 50) {
    errors.firstName = 'First name must be less than 50 characters';
    isValid = false;
  }
  
  // Validate lastName
  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required';
    isValid = false;
  } else if (form.lastName.length > 50) {
    errors.lastName = 'Last name must be less than 50 characters';
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  return isValid;
};

const submit = async () => {
  if (!validateForm()) return;
  
  try {
    if (isEditMode.value) {
      await userStore.updateUser(userId.value, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        isActive: form.isActive
      });
      alert('User updated successfully!');
    } else {
      await userStore.createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email
      });
      alert('User created successfully!');
    }
    router.push('/users');
  } catch (error: any) {
    // Error is handled in store
  }
};
</script>

<style scoped>
.form-container {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.content-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alert {
  padding: 16px 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin: 24px;
}

.alert-danger {
  background-color: #fee2e2;
  color: #b91c1c;
  border-left: 4px solid #dc2626;
}

.alert i {
  margin-right: 12px;
  font-size: 16px;
  font-weight: bold;
}

.form-wrapper {
  padding: 32px;
  max-width: 800px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #334155;
  font-size: 14px;
}

.form-control {
  display: block;
  width: 100%;
  padding: 10px 14px;
  font-size: 15px;
  line-height: 1.5;
  color: #1e293b;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #93c5fd;
  outline: 0;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.form-text {
  color: #64748b;
  font-size: 14px;
  margin-top: 6px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.checkbox-label {
  margin: 0;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.error-message {
  color: #dc2626;
  font-size: 14px;
  margin-top: 6px;
}

.divider {
  height: 1px;
  background-color: #e2e8f0;
  margin: 32px 0 24px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  min-width: 120px;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #475569;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
}

.icon {
  font-style: normal;
}
</style>