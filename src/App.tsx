import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import GarageView from './features/garage/GarageView';
import WinnersView from './features/winners/WinnersView';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <Routes>
          <Route path="/" element={<Navigate to="/garage" replace />} />
          <Route path="/garage" element={<GarageView />} />
          <Route path="/winners" element={<WinnersView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
