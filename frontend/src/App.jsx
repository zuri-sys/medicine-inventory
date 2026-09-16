import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MedicineList from "./pages/MedicineList";
import AddMedicine from "./pages/AddMedicine";
import MedicineDetails from "./pages/MedicineDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style.css";
const Protected = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/medicines"
          element={
            <Protected>
              <MedicineList />
            </Protected>
          }
        />
        <Route
          path="/medicines/add"
          element={
            <Protected>
              <AddMedicine />
            </Protected>
          }
        />
        <Route
          path="/medicines/:id"
          element={
            <Protected>
              <MedicineDetails />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
