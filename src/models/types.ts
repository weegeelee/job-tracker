export interface Application {
  _id: string;
  company: string;
  position: string;
  applicationDate: string;
  status: 'pending' | 'interview' | 'rejected' | 'no_response' | 'offer';
  notes?: string;
  followUpDate?: string;
  createAt?: Date;
  updateAt?: Date;
}

export interface JobApplication {
  _id: string;
  company: string;
  position: string;
  applicationDate: string;
  status: 'pending' | 'interview' | 'rejected' | 'no_response' | 'offer';
  notes?: string;
  followUpDate?: string;
}

export interface JobStats {
  totalApplications: number;
  statusCounts: Record<string, number>;
  year: number;
  applicationsByWeek: Record<string, number>;
  responseRate: number;
  averageResponseTime?: number;
}

export interface JobFormProps {
  isEditing?: boolean;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}