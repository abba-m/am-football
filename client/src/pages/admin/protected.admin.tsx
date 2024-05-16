import { Container } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import AdminDrawer from "./drawer.admin";
import { useAdminStore } from "../../store/admin.store";

interface Props {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
   const isAuthenticated  = useAdminStore((state) => state.isAuthenticated,
  );

  return (
    isAuthenticated ? (
      <Container py={2} flex="1" minH="80dvh" display="flex" background="gray.200" maxW="1440px">
        <AdminDrawer />
        {children}
      </Container>
    ) : (
      <Navigate to="/admin-login" />
    )
  );
}
 ProtectedRoute;
