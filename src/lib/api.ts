import { Task, TaskFormData } from './types';

const API_BASE_URL = 'http://localhost:3001';

// Simulated delay for demo purposes
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique ID
const generateId = (): string => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// API Service - Currently uses localStorage, ready for API integration
export const taskApi = {
  // GET all tasks
  async getTasks(): Promise<Task[]> {
    await delay(300); // Simulate network delay

    // TODO: Replace with actual API call
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return response.json();
  },

  // POST create task
  async createTask(formData: TaskFormData): Promise<Task> {
    await delay(400);

    const newTask: TaskFormData = {
      title: formData.title,
      priority: formData.priority,
      description: formData.description || '',
      dueDate: formData.dueDate?.toString() || '',
    };

    // TODO: Replace with actual API call
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    return response.json();
  },

  // PUT update task
  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    await delay(300);

    // TODO: Replace with actual API call
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  // DELETE task
  async deleteTask(taskId: string): Promise<void> {
    await delay(300);

    // TODO: Replace with actual API call
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Toggle task completion
  async toggleTaskStatus(taskId: string): Promise<Task> {
    const tasks = await taskApi.getTasks();
    const task = tasks.find(t => t.taskId === taskId);

    console.log(task)
    if (!task) {
      throw new Error('Tarea no encontrada');
    }

    const newStatus = task.status === 'completada' ? 'pendiente' : 'completada';
    return this.updateTask(taskId, { status: newStatus });
  },
};
