import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JoinRoom from './pages/JoinRoom';
import ConsultationRoom from './pages/ConsultationRoom';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinRoom />} />
          <Route path="/consultation/:roomId" element={<ConsultationRoom />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
