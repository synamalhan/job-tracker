import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';

export default function Internships() {
  const [applications, setApplications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editApp, setEditApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('inserted_at', { ascending: false });

    if (error) console.error('Error fetching:', error);
    else setApplications(data);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🧑‍💼 Internship Applications</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary px-4 py-2 rounded text-white hover:bg-purple-700"
        >
          + New Application
        </button>
      </div>

      <table className="min-w-full text-sm text-white bg-surface rounded overflow-hidden">
        <thead className="bg-[#2D2D2D] text-primary">
          <tr>
            {[
              'Company',
              'Role',
              'Location',
              'Date',
              'Status',
              'Resume',
              'Cover Letter',
              'Description',
              'Notes',
              'Actions',
            ].map((header) => (
              <th key={header} className="px-4 py-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              className="even:bg-[#1C1C2A] hover:bg-[#2A2A3B] transition"
            >
              <td className="px-4 py-2">{app.company}</td>
              <td className="px-4 py-2">{app.role}</td>
              <td className="px-4 py-2">{app.location}</td>
              <td className="px-4 py-2">{app.date}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(app.status)}`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-4 py-2">{app.resume}</td>
              <td className="px-4 py-2">{app.cover_letter}</td>
              <td className="px-4 py-2">{app.description}</td>
              <td className="px-4 py-2">{app.notes}</td>
              <td className="px-4 py-2">
                <button
                  className="text-primary hover:underline text-xs"
                  onClick={() => setEditApp(app)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {showAddModal && (
        <AddModal onClose={() => setShowAddModal(false)} onSubmit={fetchApplications} />
      )}
      {editApp && (
        <EditModal application={editApp} onClose={() => setEditApp(null)} onSubmit={fetchApplications} />
      )}
    </div>
  );
}

function getStatusColor(status) {
  const map = {
    Applied: 'bg-gray-600 text-white',
    Interview: 'bg-blue-600 text-white',
    Offer: 'bg-green-600 text-white',
    Rejected: 'bg-red-600 text-white',
    Ghosted: 'bg-yellow-600 text-white',
  };
  return map[status] || 'bg-surface text-white';
}
