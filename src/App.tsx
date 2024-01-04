import "./App.css";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  PageNotFound,
  Unauthorized,
  Home,
  Dashboard,
  Clients,
  Settings,
  Profile,
  NewUser,
  NewClient,
  Users,
  Facturacion,
  Remisiones,
  EditClient,
  Rx
} from "./pages";
import { RequireAuth } from "./components";

function App() {
  useEffect(() => {}, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* <Route path="registro" element={<Signup />} /> */}

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<EditClient/>} />
          <Route path="/new_client" element={<NewClient />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/new_user" element={<NewUser />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/rx" element={<Rx />} />
          <Route path="/remisiones" element={<Remisiones />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
