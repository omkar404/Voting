import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoothLeaderForm from './BoothLeaderForm';
import DailyUpdateForm from './DailyUpdateForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BoothLeaderForm />} />
                <Route path="/daily-update" element={<DailyUpdateForm />} />
            </Routes>
        </Router>
    );
}
export default App;