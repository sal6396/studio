// This layout has been moved to /src/app/admin/layout.tsx.
// This file remains to attempt to resolve a potential routing conflict.
// For a definitive fix, please DELETE the entire /src/app/(main)/admin/ directory.
// This file should NOT export a default component.
// To ensure it does not interfere, it will not export anything.

export {}; // This ensures the file is treated as a module but exports nothing that Next.js routing would pick up.

// If you were to define a component here, it should NOT be a default export.
// For example:
// export function OldAdminLayout({ children }: { children: React.ReactNode }) {
// return <>{children}</>;
// }
// However, to be safe, we are exporting nothing.
