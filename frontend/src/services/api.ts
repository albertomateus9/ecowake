const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:8000/api';

export interface Ship {
  id: number;
  name: string;
  status: string;
  biofouling_level: number;
  fuel_consumption: number;
  speed: number;
  created_at: string;
}

export interface Recommendation {
  id: number;
  ship_id: number;
  recommendation: string;
  priority: string;
  created_at: string;
}

class ApiClient {
  async getShips(): Promise<Ship[]> {
    try {
      const response = await fetch(`${API_BASE}/ships`);
      if (!response.ok) throw new Error('Failed to fetch ships');
      const data = await response.json();
      return data.ships || [];
    } catch (error) {
      console.error('Error fetching ships:', error);
      return [];
    }
  }

  async getShip(id: number): Promise<Ship | null> {
    try {
      const response = await fetch(`${API_BASE}/ships/${id}`);
      if (!response.ok) throw new Error('Failed to fetch ship');
      return await response.json();
    } catch (error) {
      console.error('Error fetching ship:', error);
      return null;
    }
  }

  async getRecommendations(): Promise<Recommendation[]> {
    try {
      const response = await fetch(`${API_BASE}/recommendations`);
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      return data.recommendations || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  }
}

export default new ApiClient();
