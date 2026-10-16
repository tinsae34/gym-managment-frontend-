import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import CheckInScreen from './pages/CheckInScreen';
import MembersScreen from './pages/MembersScreen';

function App() {
    return (
        <Router>
            <Toaster
                position="top-right"
                theme="dark"
                toastOptions={{
                    style: {
                        background: '#1e293b',
                        color: '#f8fafc',
                        border: '1px solid #334155',
                    },
                }}
            />
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/checkin" replace />} />
                    <Route path="/checkin" element={<CheckInScreen />} />
                    <Route path="/members" element={<MembersScreen />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
