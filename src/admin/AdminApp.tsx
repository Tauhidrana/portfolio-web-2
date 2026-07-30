import { Navigate, Route, Routes, useLocation } from "react-router";
import type { Session } from "@supabase/supabase-js";
import { useAuth } from "@/lib/useAuth";
import Layout from "@/admin/Layout";
import Login from "@/admin/Login";
import ResourceEditor from "@/admin/ResourceEditor";
import SingletonEditor from "@/admin/SingletonEditor";
import ImageLibrary from "@/admin/ImageLibrary";
import ResumePage from "@/admin/ResumePage";
import { LIST_PAGES, SINGLETONS } from "@/admin/resources";
import { EVENTS_CONFIG, RATINGS_CONFIG } from "@/admin/nested";
import { PageHeader, ToastProvider } from "@/admin/ui";

export default function AdminApp() {
  const { session, loading } = useAuth();

  // Blocks the first paint until the persisted session is known, so a signed-in
  // reload never flashes the login screen.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ground">
        <p className="font-mono text-xs text-ink-3">Checking session…</p>
      </div>
    );
  }

  return (
    <ToastProvider>
      <Routes>
        <Route path="login" element={<LoginRoute session={session} />} />

        <Route element={<RequireAuth session={session} />}>
          <Route index element={<Navigate to="/admin/profile" replace />} />

          <Route
            path="profile"
            element={<SingletonEditor config={SINGLETONS.profile} />}
          />
          <Route
            path="education"
            element={<SingletonEditor config={SINGLETONS.education} />}
          />

          {LIST_PAGES.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              // key forces a remount per route: without it React reuses the
              // component and carries open edit forms between pages.
              element={<ResourceEditor key={page.path} config={page} />}
            />
          ))}

          <Route path="resume" element={<ResumePage />} />
          <Route
            path="ratings"
            element={<ResourceEditor key="ratings" config={RATINGS_CONFIG} />}
          />
          <Route
            path="events"
            element={<ResourceEditor key="events" config={EVENTS_CONFIG} />}
          />
          <Route path="images" element={<ImagesPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

/**
 * Owns the whole post-login redirect. Login itself deliberately does not
 * navigate: the session lands via onAuthStateChange, which re-renders this
 * route, and two things racing to redirect is how the requested page used to
 * get lost on the way to /admin.
 */
function LoginRoute({ session }: { session: Session | null }) {
  const location = useLocation();

  if (!session) return <Login />;

  const from = (location.state as { from?: string } | null)?.from ?? "/admin";
  return <Navigate to={from} replace />;
}

function RequireAuth({ session }: { session: Session | null }) {
  const location = useLocation();

  if (!session) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Layout email={session.user.email ?? ""} />;
}

function ImagesPage() {
  return (
    <div>
      <PageHeader
        title="Images"
        description="Everything in the site-images bucket. Deleting a file breaks anything still pointing at it."
      />

      <div className="mt-6">
        <ImageLibrary />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <PageHeader title="Not found" description="No such page in the dashboard." />
    </div>
  );
}
