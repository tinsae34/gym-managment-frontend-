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
                theme="light"
                toastOptions={{
                    style: {
                        background: '#ffffff',
                        color: '#000000',
                        border: '2px solid #000000',
                        borderRadius: '0px',
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
