/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ActiveRole,
  Student,
  Batch,
  Coach,
  FeeInvoice,
  BeltExam,
  Tournament,
  Announcement,
  BeltRank,
  AttendanceStatus,
  OrganizationConfig,
} from './types';
import {
  INITIAL_STUDENTS,
  INITIAL_BATCHES,
  INITIAL_COACHES,
  INITIAL_INVOICES,
  UPCOMING_BELT_EXAM,
  UPCOMING_TOURNAMENT,
  INITIAL_ANNOUNCEMENTS,
} from './data/sampleData';
import { Navbar } from './components/Navbar';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { BottomNav } from './components/BottomNav';
import { ReceiptModal } from './components/ReceiptModal';
import { CertificateModal } from './components/CertificateModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { AuthModal } from './components/AuthModal';
import { DesignSystemSheet } from './components/DesignSystemSheet';
import { OrgBrandingModal, PRESET_ORGANIZATIONS } from './components/OrgBrandingModal';

import { AdminDashboardView } from './views/AdminDashboardView';
import { CoachAttendanceView } from './views/CoachAttendanceView';
import { StudentsDirectoryView } from './views/StudentsDirectoryView';
import { BatchesScheduleView } from './views/BatchesScheduleView';
import { FeesManagementView } from './views/FeesManagementView';
import { BeltGradingView } from './views/BeltGradingView';
import { TournamentsView } from './views/TournamentsView';
import { ParentPortalView } from './views/ParentPortalView';
import { StudentPersonalView } from './views/StudentPersonalView';
import { AnnouncementsView } from './views/AnnouncementsView';

export default function App() {
  // Application Data States
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [coaches] = useState<Coach[]>(INITIAL_COACHES);
  const [invoices, setInvoices] = useState<FeeInvoice[]>(INITIAL_INVOICES);
  const [upcomingExam] = useState<BeltExam>(UPCOMING_BELT_EXAM);
  const [tournament] = useState<Tournament>(UPCOMING_TOURNAMENT);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  // Persona & Navigation States
  const [activeRole, setActiveRole] = useState<ActiveRole>('admin');
  const [userLabel, setUserLabel] = useState<string>('Master Nikhil Tyagi');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Organization Branding State
  const [orgConfig, setOrgConfig] = useState<OrganizationConfig>(PRESET_ORGANIZATIONS[0]);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);

  // Modals
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);
  const [activeInvoiceForReceipt, setActiveInvoiceForReceipt] = useState<FeeInvoice | null>(null);
  const [activeInvoiceForWhatsApp, setActiveInvoiceForWhatsApp] = useState<FeeInvoice | null>(null);
  const [certificateData, setCertificateData] = useState<{
    studentName: string;
    promotedBelt: BeltRank;
  } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  // Role switching helper
  const handleRoleChange = (role: ActiveRole) => {
    setActiveRole(role);
    if (role === 'admin') {
      setUserLabel('Master Nikhil Tyagi');
      setActiveTab('dashboard');
    } else if (role === 'coach') {
      setUserLabel('Coach Vikram Singh');
      setActiveTab('attendance');
    } else if (role === 'parent') {
      setUserLabel('Sunita Sharma (Parent)');
      setActiveTab('parent-portal');
    } else if (role === 'student') {
      setUserLabel('Kabir Mehra (Student)');
      setActiveTab('student-personal');
    }
  };

  // 1-Click Key User Flow Demonstrator
  const handleRunKeyFlow = (flowId: 'attendance' | 'fees' | 'pay' | 'promote') => {
    if (flowId === 'attendance') {
      // Flow A: Coach marks attendance in <30s
      setActiveRole('coach');
      setUserLabel('Coach Vikram Singh');
      setActiveTab('attendance');
    } else if (flowId === 'fees') {
      // Flow B: Owner chases overdue fees via WhatsApp
      setActiveRole('admin');
      setUserLabel('Master Nikhil Tyagi');
      setActiveTab('fees');
      const overdueInv = invoices.find((i) => i.status === 'Overdue') || invoices[0];
      if (overdueInv) {
        setActiveInvoiceForWhatsApp(overdueInv);
      }
    } else if (flowId === 'pay') {
      // Flow C: Parent pays fee
      setActiveRole('parent');
      setUserLabel('Sunita Sharma (Parent)');
      setActiveTab('parent-portal');
    } else if (flowId === 'promote') {
      // Flow D: Owner promotes student after exam
      setActiveRole('admin');
      setUserLabel('Master Nikhil Tyagi');
      setActiveTab('belt-exam');
    }
  };

  // Live Attendance Update
  const handleUpdateAttendance = (
    batchId: string,
    records: Record<string, AttendanceStatus>
  ) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.batchId === batchId && records[student.id]) {
          const wasPresent = records[student.id] === 'present' || records[student.id] === 'late';
          const newAttended = wasPresent
            ? student.classesAttendedThisMonth
            : Math.max(0, student.classesAttendedThisMonth - 1);
          const newPct = Math.round((newAttended / student.totalClassesThisMonth) * 100);
          return {
            ...student,
            attendancePercent: newPct,
          };
        }
        return student;
      })
    );
  };

  // Live Promotion Approval
  const handlePromoteStudent = (studentId: string, newBelt: BeltRank) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              beltRank: newBelt,
              monthsAtCurrentBelt: 0,
              readyForExam: false,
            }
          : s
      )
    );
  };

  // Live Fee Paid handler
  const handleMarkInvoicePaid = (invoiceId: string) => {
    const inv = invoices.find((i) => i.id === invoiceId);
    if (!inv) return;

    setInvoices((prev) =>
      prev.map((i) =>
        i.id === invoiceId
          ? {
              ...i,
              status: 'Paid',
              paidDate: '15 Oct 2026',
              paymentMode: 'UPI',
              transactionRef: `UPI-AXIS-${Math.floor(10000000 + Math.random() * 90000000)}`,
            }
          : i
      )
    );

    // Update matching student
    setStudents((prev) =>
      prev.map((s) =>
        s.id === inv.studentId
          ? {
              ...s,
              feeStatus: 'Paid',
              feeAmountDue: 0,
            }
          : s
      )
    );
  };

  // Parent Instant Payment Flow
  const handleParentPayFee = (studentId: string, invoiceId?: string) => {
    if (invoiceId) {
      handleMarkInvoicePaid(invoiceId);
    } else {
      const matchInv = invoices.find((i) => i.studentId === studentId && i.status !== 'Paid');
      if (matchInv) {
        handleMarkInvoicePaid(matchInv.id);
      }
    }
  };

  // Add new announcement
  const handleAddAnnouncement = (newAnn: Announcement) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  // Direct WhatsApp opener for student guardian
  const handleOpenWhatsAppForStudent = (phone: string, studentName: string) => {
    const inv = invoices.find((i) => i.studentName === studentName) || {
      id: 'inv-custom',
      invoiceNo: 'TMA-2026-REM',
      studentId: 'stu-x',
      studentName,
      parentName: 'Guardian',
      phone,
      batchName: 'Thrust Taekwondo Squad',
      plan: 'Monthly' as const,
      amount: 2500,
      dueDate: '10 Oct 2026',
      status: 'Overdue' as const,
    };
    setActiveInvoiceForWhatsApp(inv);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* 1. Universal Top Bar (Strict 3-zone contract) */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeRole={activeRole}
        userLabel={userLabel}
        orgConfig={orgConfig}
        onOpenOrgBranding={() => setIsOrgModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* 2. Interactive Role Switcher & Key Flow Tester */}
      <RoleSwitcherBar
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        onRunKeyFlow={handleRunKeyFlow}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* 3. Main Dynamic Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 pb-24 md:pb-12">
        {activeTab === 'dashboard' && (
          <AdminDashboardView
            students={students}
            batches={batches}
            invoices={invoices}
            upcomingExam={upcomingExam}
            onNavigateTab={setActiveTab}
            onSelectStudentProfile={setSelectedStudentForProfile}
            onOpenWhatsAppReminder={(inv) => setActiveInvoiceForWhatsApp(inv)}
          />
        )}

        {activeTab === 'attendance' && (
          <CoachAttendanceView
            batches={batches}
            students={students}
            onUpdateAttendance={handleUpdateAttendance}
            onSelectStudentProfile={setSelectedStudentForProfile}
          />
        )}

        {activeTab === 'students' && (
          <StudentsDirectoryView
            students={students}
            batches={batches}
            selectedStudent={selectedStudentForProfile}
            onSelectStudent={setSelectedStudentForProfile}
            onOpenWhatsApp={handleOpenWhatsAppForStudent}
          />
        )}

        {activeTab === 'batches' && (
          <BatchesScheduleView
            batches={batches}
            students={students}
            coaches={coaches}
            onSelectStudent={setSelectedStudentForProfile}
          />
        )}

        {activeTab === 'fees' && (
          <FeesManagementView
            invoices={invoices}
            onOpenReceipt={(inv) => setActiveInvoiceForReceipt(inv)}
            onOpenWhatsAppReminder={(inv) => setActiveInvoiceForWhatsApp(inv)}
            onMarkInvoicePaid={handleMarkInvoicePaid}
          />
        )}

        {activeTab === 'belt-exam' && (
          <BeltGradingView
            exam={upcomingExam}
            students={students}
            onPromoteStudent={handlePromoteStudent}
            onOpenCertificate={(name, belt) =>
              setCertificateData({ studentName: name, promotedBelt: belt })
            }
          />
        )}

        {activeTab === 'tournaments' && (
          <TournamentsView tournament={tournament} students={students} />
        )}

        {activeTab === 'parent-portal' && (
          <ParentPortalView
            students={students}
            invoices={invoices}
            announcements={announcements}
            onOpenReceipt={(inv) => setActiveInvoiceForReceipt(inv)}
            onPayFee={handleParentPayFee}
          />
        )}

        {activeTab === 'student-personal' && (
          <StudentPersonalView
            student={students.find((s) => s.id === 'stu-16') || students[0]}
            tournament={tournament}
            upcomingExam={upcomingExam}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsView
            announcements={announcements}
            batches={batches}
            onAddAnnouncement={handleAddAnnouncement}
          />
        )}
      </main>

      {/* 4. Fixed Mobile Bottom Navigation (Ergonomic Thumb Reach) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeRole={activeRole}
      />

      {/* 5. Modals & Overlays */}
      <ReceiptModal
        invoice={activeInvoiceForReceipt}
        orgConfig={orgConfig}
        onClose={() => setActiveInvoiceForReceipt(null)}
      />

      {certificateData && (
        <CertificateModal
          studentName={certificateData.studentName}
          promotedBelt={certificateData.promotedBelt}
          orgConfig={orgConfig}
          onClose={() => setCertificateData(null)}
        />
      )}

      <WhatsAppModal
        invoice={activeInvoiceForWhatsApp}
        onClose={() => setActiveInvoiceForWhatsApp(null)}
        onSent={(invId) => {
          // Keep invoice, mark logged
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(role, label) => {
          setActiveRole(role);
          setUserLabel(label);
          if (role === 'admin') setActiveTab('dashboard');
          else if (role === 'coach') setActiveTab('attendance');
          else if (role === 'parent') setActiveTab('parent-portal');
          else if (role === 'student') setActiveTab('student-personal');
        }}
      />

      <DesignSystemSheet
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />

      <OrgBrandingModal
        isOpen={isOrgModalOpen}
        onClose={() => setIsOrgModalOpen(false)}
        config={orgConfig}
        onSave={(updated) => setOrgConfig(updated)}
      />
    </div>
  );
}
