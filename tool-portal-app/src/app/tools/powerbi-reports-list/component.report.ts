// src/app/reports/component.report.ts
import { Component, OnInit, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ReportService } from "./component.service.reports";

/** UI shape used by your template */
interface Report {
  reportId?: number;          // real DB identity key
  stream: string;
  workspace: string;
  reportName: string;
  reportLink: string;
  pages: string;              // keep as string for API
  sources: string;
  schemaName: string;
  schedule: string;
  frequency: string;
  lob: string;
  stakeHolder: string;
  reportActive?: boolean;     // UI uses boolean; map to "Yes"/"No" on submit
}

@Component({
  selector: "app-powerbi-reports-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./component.report.html",
  styleUrls: ["./component.report.css"],
})
export class PowerBIReportsListComponent implements OnInit {
  // data
  reports: Report[] = [];
  filteredReports: Report[] = [];

  // ui state
  searchTerm = "";
  showAddReportModal = false;
  showEditReportModal = false;

  // forms
  newReport: Report = this.getEmptyReport();
  selectedReport: Report | any = {};

  constructor(
    private reportsApi: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  /* ---------------- API ---------------- */

  loadReports(): void {
    this.reportsApi.getReportsDetails().subscribe({
      next: (data: any) => {
        const rows: any[] = Array.isArray(data) ? data : [];
        this.reports = rows.map(d => this.fromServerDto(d));
        this.filteredReports = [...this.reports];
      },
      error: (e) => console.error("Failed to load reports:", e),
    });
  }

  submitAddReport(): void {
    const errs: string[] = [];
    if (this.newReport.reportActive === undefined) errs.push('Choose Active: Yes or No');
    if (errs.length) { alert(errs.join('\n')); return; }

    const payload = this.toCreateDto(this.newReport); // no ID
    this.reportsApi.addReports(payload).subscribe({
      next: () => { this.closeAddReportModal(); this.loadReports(); },
      error: (e) => console.error('Failed to add report:', e),
    });
  }

submitEditReport(): void {
  const id = this.selectedReport?.reportId;
  if (!id || id <= 0) { alert('Missing report id'); return; }
  const payload = this.toUpdateDto(this.selectedReport); // no Number field
  this.reportsApi.updateReport(String(id), payload).subscribe({ /* ... */ });
}


  deleteReport(id: number): void {
    this.reportsApi.deleteReport(String(id)).subscribe({
      next: () => {
        this.reports = this.reports.filter((r) => r.reportId !== id);
        this.filteredReports = this.filteredReports.filter((r) => r.reportId !== id);
      },
      error: (e) => {
        console.error("Failed to delete report:", e);
        this.loadReports();
      },
    });
  }

  downloadReportsCSV(): void {
    const header = [
      "Number","ReportId","Stream","Workspace","Report Name","Report Link","Pages",
      "Sources","Schema Name","Schedule","Frequency","LOB","Stakeholder","Active"
    ];

    // Use filteredReports to reflect current view order/search
    const rows = this.filteredReports.map((r, i) => [
      i + 1, r.reportId ?? "",
      r.stream, r.workspace, r.reportName, r.reportLink, r.pages,
      r.sources, r.schemaName, r.schedule, r.frequency, r.lob, r.stakeHolder,
      r.reportActive ? "Yes" : "No"
    ]);

    const csvContent = [header, ...rows]
      .map(row => row.map(x => `"${(x ?? "").toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---------------- Search/Filters ---------------- */

  filterReports(): void {
    const term = (this.searchTerm || "").toLowerCase();
    this.filteredReports = this.reports.filter((r) =>
      (r.reportName || "").toLowerCase().includes(term) ||
      (r.workspace  || "").toLowerCase().includes(term) ||
      (r.stream     || "").toLowerCase().includes(term)
    );
  }

  /* ---------------- Modals ---------------- */

  openAddReportModal(): void {
    this.newReport = this.getEmptyReport();
    this.showAddReportModal = true;
    this.showEditReportModal = false;
  }

  closeAddReportModal(): void {
    this.showAddReportModal = false;
    this.newReport = this.getEmptyReport();
  }

  openEditReportModal(r: Report): void {
    this.selectedReport = JSON.parse(JSON.stringify(r)); // clone
    this.showAddReportModal = false;
    this.showEditReportModal = true;
  }

  closeEditReportModal(): void {
    this.showEditReportModal = false;
    this.selectedReport = {};
  }

  /* ---------------- Helpers ---------------- */

  private getEmptyReport(): Report {
    return {
      reportId: undefined,          // server will assign
      stream: "",
      workspace: "",
      reportName: "",
      reportLink: "",
      pages: "",
      sources: "",
      schemaName: "",
      schedule: "",
      frequency: "",
      lob: "",
      stakeHolder: "",
      reportActive: undefined as any, // so the "Active" placeholder shows
    };
  }

  /** UI -> API (CREATE): omit ID because DB auto-generates identity */
  private toCreateDto(r: Report) {
    return {
      Stream: r.stream ?? "",
      Workspace: r.workspace ?? "",
      ReportName: r.reportName ?? "",
      ReportLink: r.reportLink ?? "",
      Pages: (r.pages ?? "").toString(),
      Sources: r.sources ?? "",
      SchemaName: r.schemaName ?? "",
      Schedule: r.schedule ?? "",
      Frequency: r.frequency ?? "",
      LOB: r.lob ?? "",
      StakeHolder: r.stakeHolder ?? "",
      ReportActive: r.reportActive ? "Yes" : "No"
    };
  }

  /** UI -> API (UPDATE): do NOT include Number/ID, route param is the source of truth */
  private toUpdateDto(r: Report) {
    return {
      Stream: r.stream ?? "",
      Workspace: r.workspace ?? "",
      ReportName: r.reportName ?? "",
      ReportLink: r.reportLink ?? "",
      Pages: (r.pages ?? "").toString(),
      Sources: r.sources ?? "",
      SchemaName: r.schemaName ?? "",
      Schedule: r.schedule ?? "",
      Frequency: r.frequency ?? "",
      LOB: r.lob ?? "",
      StakeHolder: r.stakeHolder ?? "",
      ReportActive: r.reportActive ? "Yes" : "No"
    };
  }

  /** Map API → UI (handle various shapes). */
  private fromServerDto(d: any): Report {
    const id =
      d.ReportId ?? d.reportId ?? d.Id ?? d.id ??
      d.Number ?? d.number; // fallback if API still sends Number

    const activeRaw = d.ReportActive ?? d.reportActive ?? "";
    const activeStr = (activeRaw ?? "").toString().toLowerCase();

    return {
      reportId: typeof id === "number" && id > 0 ? id : undefined,
      stream: d.Stream ?? d.stream ?? "",
      workspace: d.Workspace ?? d.workspace ?? "",
      reportName: d.ReportName ?? d.reportName ?? "",
      reportLink: d.ReportLink ?? d.reportLink ?? "",
      pages: (d.Pages ?? d.pages ?? "").toString(),
      sources: d.Sources ?? d.sources ?? "",
      schemaName: d.SchemaName ?? d.schemaName ?? "",
      schedule: d.Schedule ?? d.schedule ?? "",
      frequency: d.Frequency ?? d.frequency ?? "",
      lob: d.LOB ?? d.lob ?? "",
      stakeHolder: d.StakefHolder ?? d.stakeHolder ?? "",
      reportActive: activeStr === "yes" || activeStr === "true"
    };
  }

  /** ESC closes whichever modal is open */
  @HostListener("document:keydown.escape")
  onEsc() {
    if (this.showAddReportModal) this.closeAddReportModal();
    if (this.showEditReportModal) this.closeEditReportModal();
  }
}
