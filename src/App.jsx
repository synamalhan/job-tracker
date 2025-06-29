import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <main className="p-4">
        <AppRoutes />
      </main>
    </div>
  );
}
