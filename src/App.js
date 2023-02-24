import PharmacyApp from './PharmacyApp'
import AdminApp from './AdminApp'
import Home from './Home'
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from 'context/AuthContext'
import { AdminAuthProvider } from "context/AdminAuthContext";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="pharmacy" element={<AuthProvider><PharmacyApp /></AuthProvider>} />
            <Route path="admin" element={<AdminAuthProvider><AdminApp /></AdminAuthProvider>} />
            {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
    );
}

export default App;