import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
        className="flex cursor-pointer items-center justify-center rounded-full p-1.5 transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Info */}
      <span
        style={{ color: "var(--foreground)" }}
        className="text-sm font-medium"
      >
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
        className="flex cursor-pointer items-center justify-center rounded-full p-1.5 transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
