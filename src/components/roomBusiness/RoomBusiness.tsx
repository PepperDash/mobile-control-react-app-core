import { Suspense } from "react";
import { Routes } from "react-router-dom";

const RoomBusiness = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* <Route path="/*" element={<SplashPage />} />
        <Route path="/activities" element={<Activities />} /> */}
      </Routes>
    </Suspense>
  );
};

export default RoomBusiness;
