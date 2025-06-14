"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [employers, setEmployers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const URL = "http://localhost:5218/api/Employers";

  const fetchEmployers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(URL);
      setEmployers(response.data);
    } catch (err) {
      console.error("Erreur de lecture :", err);
      toast.error("Erreur lors du chargement des employés");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      firstName,
      lastName,
      email,
      phone,
      position,
      salary: parseFloat(salary),
      hireDate
    };

    try {
      if (editId === null) {
        await axios.post(URL, data);
        toast.success("Employé ajouté avec succès");
      } else {
        await axios.put(`${URL}/${editId}`, { id: editId, ...data });
        toast.success("Employé mis à jour avec succès");
        setEditId(null);
      }
      fetchEmployers();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setSalary("");
      setHireDate("");
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setFirstName(emp.firstName);
    setLastName(emp.lastName);
    setEmail(emp.email);
    setPhone(emp.phone);
    setPosition(emp.position);
    setSalary(emp.salary.toString());
    setHireDate(emp.hireDate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        toast.success("Employé supprimé avec succès");
        fetchEmployers();
      } catch (err) {
        console.error("Erreur de suppression :", err);
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 font-sans bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestion des Employés</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-700">
              {editId ? "Modifier un employé" : "Ajouter un employé"}
            </h2>

            <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="tel" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input type="text" placeholder="Poste" value={position} onChange={(e) => setPosition(e.target.value)} required />
            <input type="number" placeholder="Salaire" value={salary} onChange={(e) => setSalary(e.target.value)} required />
            <input type="date" placeholder="Date d'embauche" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />

            <button type="submit" disabled={isSubmitting} className="py-2 px-4 rounded-md bg-blue-600 text-white">
              {isSubmitting ? (editId ? "Mise à jour..." : "Enregistrement...") : (editId ? "Mettre à jour" : "Enregistrer")}
            </button>

            {editId && (
              <button type="button" onClick={() => {
                setEditId(null);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setPosition("");
                setSalary("");
                setHireDate("");
              }} className="py-2 px-4 rounded-md border border-gray-300 text-gray-700">
                Annuler
              </button>
            )}
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Liste des Employés</h2>
          </div>

          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : employers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucun employé enregistré.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Poste</th>
                    <th>Salaire</th>
                    <th>Date d'embauche</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employers.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td>{emp.id}</td>
                      <td>{emp.firstName} {emp.lastName}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.position}</td>
                      <td>{Number(emp.salary).toLocaleString()} Ar</td>
                      <td>{emp.hireDate}</td>
                      <td>
                        <button onClick={() => handleEdit(emp)} className="text-yellow-600">✏️</button>
                        <button onClick={() => handleDelete(emp.id)} className="text-red-600 ml-2">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
