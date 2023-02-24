import PharmacyApp from './PharmacyApp'
import AdminApp from './AdminApp'
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            {/* <Route index element={<Home />} /> */}
            <Route path="pharmacy" element={<PharmacyApp />} />
            <Route path="admin" element={<AdminApp />} />
            {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
    );
}

export default App;