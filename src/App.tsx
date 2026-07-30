import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Site from "@/Site";

/**
 * The dashboard is a separate chunk. Visitors to the portfolio never download
 * it — it loads only when someone actually navigates to /admin.
 */
const AdminApp = lazy(() => import("@/admin/AdminApp"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminLoading />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<Site />} />
      </Routes>
    </BrowserRouter>
  );
}

function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ground">
      <p className="font-mono text-xs text-ink-3">Loading dashboard…</p>
    </div>
  );
}
