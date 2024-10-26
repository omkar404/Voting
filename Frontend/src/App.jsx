import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import VillageTabs from './VillageTabs';
import BoothLeaderForm from './BoothLeaderForm';
import DailyUpdateForm from './DailyUpdateForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />  
                <Route path="/villages" element={<VillageTabs/>} />
                <Route path="/Boothleader" element={<BoothLeaderForm />} />
                <Route path="/daily-update" element={<DailyUpdateForm />} />
            </Routes>
        </Router>
    );
}
export default App;