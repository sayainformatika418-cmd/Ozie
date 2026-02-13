
export enum Level {
  IBTIDAIYAH = 'Ibtidaiyah',
  TSANAWIYAH = 'Tsanawiyah'
}

export enum Imda {
  ONE = '1',
  TWO = '2',
  THREE = '3'
}

export interface User {
  id: string;
  name: string;
  username: string;
  password?: string;
}

export interface Teacher {
  id: string;
  name: string;
  nip: string;
  specialization: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  level: Level;
  grade: number; // 1-6 for Ibtidaiyah, 7-9 for Tsanawiyah
  teacherId: string;
}

export interface Subject {
  id: string;
  name: string;
  level: Level;
}

export interface Student {
  id: string;
  name: string;
  nis: string;
  nisn: string;
  gender: 'L' | 'P';
  pob: string;
  dob: string;
  address: string;
  fatherName: string;
  motherName: string;
  classId: string;
  isActive: boolean;
  photo?: string; // Base64 string
  status?: 'Kenaikan' | 'Kelulusan' | 'Boyong';
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  imda: Imda;
  score: number;
}

export interface StudentBehavior {
  id: string;
  studentId: string;
  imda: Imda;
  kerajinan: string;
  kedisiplinan: string;
  kebersihan: string;
}

export interface StudentNote {
  id: string;
  studentId: string;
  imda: Imda;
  taujihat: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  imda: Imda;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';
}

export interface SchoolProfile {
  name: string;
  address: string;
  pengasuh: string;
  kepalaMadrasah: string;
  logo: string;
}
