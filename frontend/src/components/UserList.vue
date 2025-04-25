<template>
  <div class="user-list-container">
    <div class="page-header">
      <h1>Users</h1>
      <button @click="$router.push('/users/create')" class="btn btn-primary">
        <i class="icon plus-icon">+</i> Add New User
      </button>
    </div>
    
    <div class="content-panel">
      <div v-if="userStore.loading" class="loading-container">
        <div class="loader"></div>
        <p>Loading users...</p>
      </div>
      
      <div v-else-if="userStore.error" class="alert alert-danger">
        <i class="icon">!</i>
        <span>{{ userStore.error }}</span>
      </div>
      
      <div v-else-if="userStore.users.length === 0" class="empty-state">
        <div class="empty-icon">👤</div>
        <h3>No Users Found</h3>
        <p>Create your first user to get started</p>
        <button @click="$router.push('/users/create')" class="btn btn-outline">Create User</button>
      </div>
      
      <div v-else class="table-container">
        <table class="user-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th class="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userStore.users" :key="user.id" class="user-row">
              <td class="user-id">{{ user.id }}</td>
              <td class="user-name">{{ user.firstName }} {{ user.lastName }}</td>
              <td class="user-email">{{ user.email }}</td>
              <td class="user-status">
                <span :class="user.isActive ? 'status-badge active' : 'status-badge inactive'">
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <button @click="$router.push(`/users/${user.id}/edit`)" class="btn btn-edit" title="Edit user">
                  <i class="icon">✏️</i>
                </button>
                <button @click="confirmDelete(user)" class="btn btn-delete" title="Delete user">
                  <i class="icon">🗑️</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/users';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.fetchUsers();
});

const confirmDelete = async (user: { id: number; firstName: string; lastName: string }) => {
  if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
    try {
      await userStore.deleteUser(user.id);
      alert('User deleted successfully!');
    } catch (error) {
      alert('Failed to delete user.');
    }
  }
};
</script>

<style scoped>
.user-list-container {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.7;
}

.empty-state h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #334155;
  font-weight: 600;
}

.empty-state p {
  font-size: 16px;
  margin-bottom: 24px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  color: #334155;
}

.user-table thead {
  background-color: #f8fafc;
}

.user-table th {
  text-align: left;
  padding: 16px 20px;
  font-weight: 600;
  white-space: nowrap;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
}

.user-table td {
  padding: 16px 20px;
  vertical-align: middle;
  border-bottom: 1px solid #e2e8f0;
}

.user-row:hover {
  background-color: #f8fafc;
}

.user-id {
  font-family: 'SFMono-Regular', Consolas, monospace;
  color: #64748b;
  font-size: 14px;
}

.user-name {
  font-weight: 500;
  color: #0f172a;
}

.user-email {
  color: #2563eb;
}

.actions-column {
  width: 120px;
  text-align: right;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  padding: 0;
  line-height: 1;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 11px 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-primary .plus-icon {
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-outline {
  border: 1px solid #3b82f6;
  color: #3b82f6;
  background-color: transparent;
  padding: 10px 20px;
}

.btn-outline:hover {
  background-color: #eff6ff;
}

.btn-edit, .btn-delete {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-edit {
  background-color: #f1f5f9;
  color: #475569;
}

.btn-delete {
  background-color: #f1f5f9;
  color: #ef4444;
}

.btn-edit:hover {
  background-color: #e2e8f0;
  color: #334155;
}

.btn-delete:hover {
  background-color: #fee2e2;
  color: #dc2626;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
}

.status-badge.active {
  background-color: #d1fae5;
  color: #065f46;
}

.status-badge.inactive {
  background-color: #fef2f2;
  color: #b91c1c;
}

.icon {
  font-style: normal;
}
</style>