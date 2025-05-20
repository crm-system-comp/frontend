import { Box } from "@mui/material";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import OrderFormSection from "../components/OrderFormSection";
import AuthModal from "../components/AuthModal";
import { useGetMeQuery, useLazyGetMeQuery } from "../api/auth";
import { useEffect, useState } from "react";
import { getSession, isLoggedIn } from "../../session";

const MainPage = () => {
  const session = getSession();
  const [fetchMe, { data: user }] = useLazyGetMeQuery();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (session.accessToken) {
      fetchMe();
    }
  }, [session.accessToken]);

  return (
    <Box>
      <Header
        isLoggedIn={isLoggedIn()}
        username={user?.username}
        onLoginClick={() => setAuthModalOpen(true)}
      />
      <Welcome />
      <OrderFormSection onAuthRequired={() => setAuthModalOpen(true)} />
      <AuthModal
        open={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          fetchMe();
        }}
      />
    </Box>
  );
};

export default MainPage;
