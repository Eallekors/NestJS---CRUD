import apiClient from './apiClient.ts';

// Define TypeScript interfaces for your data models
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
}

// Export user service methods
export default {
  // Get all users
  getAll() {
    return apiClient.get<User[]>('/users');
  },
  
  // Get user by ID
  getById(id: number) {
    return apiClient.get<User>(`/users/${id}`);
  },
  
  // Create new user
  create(user: CreateUserDto) {
    return apiClient.post<User>('/users', user);
  },
  
  // Update existing user
  update(id: number, user: UpdateUserDto) {
    return apiClient.patch<User>(`/users/${id}`, user);
  },
  
  // Delete user
  delete(id: number) {
    return apiClient.delete(`/users/${id}`);
  }
};