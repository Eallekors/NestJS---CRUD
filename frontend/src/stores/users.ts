import { defineStore } from 'pinia';
import userService from '../services/userService';
import type { User, CreateUserDto, UpdateUserDto } from '../services/userService';

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
    loading: false,
    error: null as string | null
  }),
  
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await userService.getAll();
        this.users = response.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch users';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchUser(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await userService.getById(id);
        this.currentUser = response.data;
      } catch (error: any) {
        this.error = error.message || `Failed to fetch user #${id}`;
      } finally {
        this.loading = false;
      }
    },
    
    async createUser(user: CreateUserDto) {
      this.loading = true;
      this.error = null;
      try {
        const response = await userService.create(user);
        this.users.push(response.data);
        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Failed to create user';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async updateUser(id: number, user: UpdateUserDto) {
      this.loading = true;
      this.error = null;
      try {
        const response = await userService.update(id, user);
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = response.data;
        }
        if (this.currentUser?.id === id) {
          this.currentUser = response.data;
        }
        return response.data;
      } catch (error: any) {
        this.error = error.message || `Failed to update user #${id}`;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteUser(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await userService.delete(id);
        this.users = this.users.filter(user => user.id !== id);
        if (this.currentUser?.id === id) {
          this.currentUser = null;
        }
      } catch (error: any) {
        this.error = error.message || `Failed to delete user #${id}`;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});