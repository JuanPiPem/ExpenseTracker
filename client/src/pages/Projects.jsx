import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ProjectList from "../components/ProjectList.jsx";
import useTransactionStore from "../stores/transactionStore.js";
import SummaryCard from "../components/SummaryCard.jsx";
import TransactionContainer from "../components/TransactionContainer.jsx";
import AddTransactionForm from "../components/AddTransactionForm.jsx";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { setCurrentProject } = useTransactionStore();

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setCurrentProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
    setCurrentProject(null);
  };

  return (
    <div className="p-8 font-sans min-h-screen bg-gray-50">
      <Navbar />
      {!selectedProject ? (
        <ProjectList onProjectSelect={handleProjectSelect} />
      ) : (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-4 text-blue-600 hover:underline text-sm"
          >
            ← Volver a proyectos
          </button>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProject.name}
            </h2>
            <p className="text-gray-500 mb-4">{selectedProject.description}</p>
            <SummaryCard />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <TransactionContainer type="income" />
            <AddTransactionForm />
            <TransactionContainer type="expense" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
