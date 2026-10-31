import React from 'react';
import { ReportFormCard } from './ReportFormCard';
import { QuickGuideSidebar } from './QuickGuideSidebar';
import { EmergencyContactCard } from './EmergencyContactCard';
import { ReportFormInput, ReportItem } from '../types/report';

interface ReportFormSectionProps {
  onSubmitReport: (report: Partial<ReportItem>) => void;
  onSaveDraft?: (report: ReportFormInput) => void;
}

export const ReportFormSection: React.FC<ReportFormSectionProps> = ({
  onSubmitReport,
  onSaveDraft,
}) => {
  return (
    <section className="py-10 sm:py-12 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form: Desktop 8 Cols */}
          <div className="lg:col-span-8">
            <ReportFormCard
              onSubmitReport={onSubmitReport}
              onSaveDraft={onSaveDraft}
            />
          </div>

          {/* Right Info Sidebar: Desktop 4 Cols */}
          <div className="lg:col-span-4 space-y-6">
            <QuickGuideSidebar />
            <EmergencyContactCard />
          </div>

        </div>
      </div>
    </section>
  );
};
