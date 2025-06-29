import { useState } from 'react';
import { supabase } from '../supabaseClient';

const resumeOptions = [
  { label: 'Software Engineering Resume', value: 'se_resume.pdf' },
  { label: 'Data Science Resume', value: 'ds_resume.pdf' },
  { label: 'Research Resume', value: 'research_resume.pdf' },
];

export default function EditModal({ application, onClose, onSubmit }) {
  const [form, setForm] = useState({ ...application });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('applications')
      .update(form)
      .eq('id', application.id);
    if (error) alert('Update failed: ' + error.message);
    else {
      onSubmit();
      onClose();
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this application?');
    if (!confirm) return;
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', application.id);
    if (error) alert('Delete failed: ' + error.message);
    else {
      onSubmit();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1F1F2E] rounded-2xl w-full max-w-2xl p-8 text-white relative shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">✏️ Edit Application</h2>
        <form className="grid grid-cols-2 gap-6" onSubmit={handleUpdate}>
          <FormField label="Company" name="company" value={form.company} onChange={handleChange} />
          <FormField label="Role" name="role" value={form.role} onChange={handleChange} />
          <FormField label="Location" name="location" value={form.location} onChange={handleChange} />
          <FormField label="Date" name="date" type="date" value={form.date} onChange={handleChange} />
          <FormSelect label="Status" name="status" value={form.status} onChange={handleChange} options={['Applied', 'Interview', 'Offer', 'Rejected', 'Ghosted']} />
          <FormSelect label="Resume" name="resume" value={form.resume} onChange={handleChange} options={resumeOptions.map(r => r.label)} />
          <FormField label="Cover Letter" name="cover_letter" value={form.cover_letter} onChange={handleChange} />
          <FormField label="Description" name="description" value={form.description} onChange={handleChange} className="col-span-2" />
          <div className="col-span-2">
            <label className="block mb-1">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full p-2 rounded bg-[#2A2A3B] border border-[#444]" rows={4} />
          </div>

          <div className="col-span-2 flex justify-between items-center mt-6">
            <div className="text-sm text-purple-300 underline cursor-pointer" onClick={() => window.location.href = '/resumes'}>
              Manage Resumes
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">Delete</button>
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, name, value, onChange, type = 'text', className = '' }) {
  return (
    <div className={className}>
      <label className="block mb-1">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="w-full p-2 rounded bg-[#2A2A3B] border border-[#444]" />
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <select name={name} value={value} onChange={onChange} className="w-full p-2 rounded bg-[#2A2A3B] border border-[#444]">
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
