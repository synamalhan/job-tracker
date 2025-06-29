import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="text-white p-8">
        <h1>Hello JobTrackr</h1>
        <p>If you see this, routing and Tailwind are working.</p>
      </div>
    </>
  );
}
