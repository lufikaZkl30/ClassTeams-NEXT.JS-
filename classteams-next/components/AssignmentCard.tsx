"use client";

import Image from "next/image";

export type AssignmentStatus = "Pending" | "Submitted" | "Completed" | "Revised";

export interface Assignment {
  id: number;
  title: string;
  code: string;
  course: string;
  instructor: string;
  deadline: string;
  deadlineDate: string; // ISO format for sorting
  status: AssignmentStatus;
  urgency: string;
  timeRemaining?: string;
  progress?: number;
  imageUrl?: string;
  imageAlt?: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onOpen: (id: number) => void;
  onViewReceipt?: (id: number) => void;
}

const statusBadgeClasses: Record<AssignmentStatus, string> = {
  Pending: "bg-red-50 text-red-700",
  Submitted: "bg-green-50 text-green-700",
  Completed: "bg-blue-50 text-blue-700",
  Revised: "bg-yellow-50 text-yellow-700",
};

export default function AssignmentCard({
  assignment,
  onOpen,
  onViewReceipt,
}: AssignmentCardProps) {
  const isSubmitted = assignment.status === "Submitted";

  return (
    <div
      className="bg-surface p-3 md:p-6 border border-outline hover:border-primary transition-all cursor-pointer group assignment-card relative"
      onClick={() => onOpen(assignment.id)}
      data-instructor={assignment.instructor}
      data-course={assignment.course}
      data-course-code={assignment.code}
      data-deadline={assignment.deadlineDate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(assignment.id)}
      aria-label={`Open assignment: ${assignment.title}`}
    >
      <div className="flex flex-col md:flex-row gap-3 md:gap-6">
        {/* Thumbnail */}
        {assignment.imageUrl && (
          <div
            className={`w-full md:w-32 h-32 shrink-0 relative overflow-hidden bg-surface-container-low ${isSubmitted ? "opacity-80" : ""}`}
          >
            <Image
              src={assignment.imageUrl}
              alt={assignment.imageAlt ?? assignment.title}
              fill
              className="object-cover"
            />
            {!isSubmitted && (
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3 md:mb-4 gap-2">
            <div className="flex-1">
              <span
                className={`text-xs font-bold uppercase tracking-wider ${isSubmitted ? "text-secondary" : "text-error"}`}
              >
                {assignment.urgency}
              </span>
              <h3 className="text-base md:text-xl font-bold text-on-background mt-1">
                {assignment.title}
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                {assignment.course} • {assignment.code}
              </p>
            </div>
            <span
              className={`px-2 md:px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${statusBadgeClasses[assignment.status]}`}
            >
              {assignment.status}
            </span>
          </div>

          {/* Footer Row */}
          <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-3 md:gap-6">
            {isSubmitted ? (
              <>
                <div className="flex items-center gap-2 text-on-surface-variant text-xs md:text-sm">
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  <span className="font-semibold">
                    Submitted {assignment.deadline}
                  </span>
                </div>
                <div className="flex-1" />
                {onViewReceipt && (
                  <button
                    className="bg-surface-container text-on-surface-variant font-bold text-xs px-3 md:px-4 py-2 border border-outline/20 hover:bg-surface-container-high transition-colors whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewReceipt(assignment.id);
                    }}
                  >
                    View Receipt
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-on-surface-variant text-xs md:text-sm">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">
                    calendar_today
                  </span>
                  <span className="font-semibold">{assignment.deadline}</span>
                </div>
                {assignment.timeRemaining && (
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs md:text-sm">
                    <span className="material-symbols-outlined text-base" aria-hidden="true">
                      schedule
                    </span>
                    <span
                      className={`font-semibold ${assignment.urgency === "Urgent Submission" ? "text-error" : ""}`}
                    >
                      {assignment.timeRemaining}
                    </span>
                  </div>
                )}
                {assignment.progress !== undefined && (
                  <div className="flex-1 min-w-[80px] md:min-w-[120px]">
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${assignment.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <button className="text-primary font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform whitespace-nowrap">
                  Open{" "}
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    chevron_right
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
