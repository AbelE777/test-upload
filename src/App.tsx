import "./App.css";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
  Rx,
  FilesPage,
  SharedFilesPage
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
          <Route path="/" element={<Navigate to="/files" replace />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* Redirección de / a /files */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/clients" element={<Clients />} /> */}
          {/* <Route path="/clients/:id" element={<EditClient/>} /> */}
          {/* <Route path="/new_client" element={<NewClient />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/users" element={<Users />} /> */}
          {/* <Route path="/new_user" element={<NewUser />} /> */}
          {/* <Route path="/facturacion" element={<Facturacion />} /> */}
          {/* <Route path="/rx" element={<Rx />} /> */}
          {/* <Route path="/remisiones" element={<Remisiones />} /> */}
          <Route path="/files" element={<FilesPage />} />
          <Route path="/shared-files" element={<SharedFilesPage />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
