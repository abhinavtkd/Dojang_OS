export type BeltRank =
  | 'White Belt (10th Gup)'
  | 'Yellow Stripe (9th Gup)'
  | 'Yellow Belt (8th Gup)'
  | 'Green Stripe (7th Gup)'
  | 'Green Belt (6th Gup)'
  | 'Blue Stripe (5th Gup)'
  | 'Blue Belt (4th Gup)'
  | 'Red Stripe (3rd Gup)'
  | 'Red Belt (2nd Gup)'
  | 'Black Stripe (1st Gup)'
  | '1st Poom (Junior Black)'
  | '2nd Poom (Junior Black)'
  | '1st Dan Black Belt'
  | '2nd Dan Black Belt'
  | '3rd Dan Black Belt'
  | '4th Dan Master'
  | '6th Dan Grandmaster';

export type FeeStatus = 'Paid' | 'Due' | 'Overdue';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface Student {
  id: string;
  name: string;
  avatarText: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  beltRank: BeltRank;
  gupDanLevel: number; // 10 = white down to 1 = black stripe, 11+ = poom/dan
  isPoom: boolean; // under-15 junior black belt
  monthsAtCurrentBelt: number;
  batchId: string;
  batchName: string;
  attendancePercent: number;
  classesAttendedThisMonth: number;
  totalClassesThisMonth: number;
  feeStatus: FeeStatus;
  feeAmountDue: number;
  feeDueDate: string;
  parentName: string;
  parentPhone: string;
  emergencyContact: string;
  medicalNotes?: string;
  poomsaeFocus: string; // e.g. "Taegeuk 3 Jang"
  readyForExam: boolean;
  joinDate: string;
  achievements: {
    year: string;
    title: string;
    medal?: 'Gold' | 'Silver' | 'Bronze';
  }[];
}

export interface Batch {
  id: string;
  name: string;
  category: 'Kids' | 'Cadets' | 'Teens & Adults' | 'Poomsae Squad' | 'Kyorugi Squad' | 'Masterclass';
  ageRange: string;
  scheduleDays: string[];
  timeSlot: string;
  coachId: string;
  coachName: string;
  enrolledCount: number;
  maxCapacity: number;
  room: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  belt: string;
  phone: string;
  email: string;
  assignedBatches: string[];
  specialty: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  timeMarked?: string;
  note?: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  parentName: string;
  phone: string;
  batchName: string;
  plan: 'Monthly' | 'Quarterly' | 'Annual';
  amount: number;
  dueDate: string;
  status: FeeStatus;
  paidDate?: string;
  paymentMode?: 'UPI' | 'Cash' | 'Bank Transfer' | 'Card';
  transactionRef?: string;
}

export interface BeltExam {
  id: string;
  title: string;
  examDate: string;
  location: string;
  examiner: string;
  feePerStudent: number;
  status: 'Upcoming' | 'Grading in Progress' | 'Completed';
  minAttendancePercent: number;
  minMonthsRequired: number;
}

export interface ExamEvaluation {
  studentId: string;
  studentName: string;
  currentBelt: BeltRank;
  targetBelt: BeltRank;
  attendancePercent: number;
  monthsAtBelt: number;
  poomsaeScore?: number; // out of 25
  kyorugiScore?: number; // out of 25
  breakingScore?: number; // out of 25
  koreanTerminologyScore?: number; // out of 25
  totalScore?: number;
  coachRecommendation: 'Recommended' | 'Needs Work' | 'Conditional';
  resultStatus: 'Eligible' | 'Passed' | 'Retest Required' | 'Promoted';
  promotionApprovedDate?: string;
}

export interface Tournament {
  id: string;
  title: string;
  level: 'State Championship' | 'National Trials' | 'District Cup' | 'Inter-Dojang';
  date: string;
  location: string;
  registrationDeadline: string;
  entryFee: number;
  status: 'Open' | 'Weigh-in' | 'In Progress' | 'Completed';
  registrations: {
    studentId: string;
    studentName: string;
    division: 'Sub-Junior' | 'Cadet' | 'Junior' | 'Senior';
    category: 'Kyorugi' | 'Poomsae' | 'Both';
    weightCategory: string;
    status: 'Registered' | 'Weighed-In' | 'Completed';
    medal?: 'Gold' | 'Silver' | 'Bronze' | 'Participant';
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  targetAudience: 'All Batches' | 'Parents Only' | 'Poomsae Squad' | 'Kyorugi Squad' | 'Kids Batches';
  channels: ('WhatsApp' | 'SMS' | 'In-App')[];
  pinned?: boolean;
}

export type ActiveRole = 'admin' | 'coach' | 'parent' | 'student';

export interface OrganizationConfig {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  instagram: string;
  instagramUrl: string;
  address: string;
  phone: string;
  email: string;
  upiVpa: string;
  affiliation: string;
  regNo: string;
  headmaster: string;
  headmasterRank: string;
}
