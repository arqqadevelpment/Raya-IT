// Financial statements — titles and documents from https://raya-it.net/financial-statements/
// PDFs are stored in public/financial-statements/ (originals listed below).

export type Statement = {
  year: string; // "FY25"
  title: string;
  file: string;
  size: string;
};

export const financialIntro = "Discover Our Financial Statements";

export const statements: Statement[] = [
  // RIT-FS-Y2025.pdf
  { year: "FY25", title: "RayaIT FS FY25", file: "/financial-statements/rayait-fs-fy25.pdf", size: "8.9 MB" },
  // RI-Standalone-31-Dec-2024-Arabic.pdf
  { year: "FY24", title: "RayaIT FS FY24", file: "/financial-statements/rayait-fs-fy24.pdf", size: "1.1 MB" },
  // RI-Standalone-31-Dec-2023-Arabic-Final.pdf
  { year: "FY23", title: "RayaIT FS FY23", file: "/financial-statements/rayait-fs-fy23.pdf", size: "1.3 MB" },
  // Raya-Integration-FY22-FS-Ar.pdf
  { year: "FY22", title: "RayaIT FS FY22", file: "/financial-statements/rayait-fs-fy22.pdf", size: "1.8 MB" },
];
