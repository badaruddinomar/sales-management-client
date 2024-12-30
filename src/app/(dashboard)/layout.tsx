import ProtectedRoute from "@/components/ProtectedRoute";
import SidebarLayout from "@/components/SidebarLayout";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <SidebarLayout>{children}</SidebarLayout>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
