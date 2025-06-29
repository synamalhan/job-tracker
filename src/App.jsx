import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <div className="p-4">
        <AppRoutes />
      </div>
    </div>
  );
}
