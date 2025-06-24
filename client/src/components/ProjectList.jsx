import { useEffect, useState } from "react";
import {
  Plus,
  MapPin,
  Users,
  Gift,
  Star,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
} from "lucide-react";
import useTransactionStore from "../stores/transactionStore.js";
import ProjectForm from "./ProjectForm.jsx";

const ProjectList = ({ onProjectSelect }) => {
  const { projects, loading, error, fetchProjects, deleteProject } =
    useTransactionStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const projectTypeIcons = {
    trip: MapPin,
    meal: Users,
    party: Gift,
    event: Star,
    other: Plus,
  };

  const projectTypeLabels = {
    trip: "Viaje",
    meal: "Comida",
    party: "Fiesta",
    event: "Evento",
    other: "Otro",
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
    setShowMenu(null);
  };

  const handleDelete = async (projectId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")
    ) {
      try {
        await deleteProject(projectId);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
    setShowMenu(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading.projects) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Cargando proyectos...</span>
      </div>
    );
  }

  if (error.projects) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error.projects}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Mis Proyectos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Nuevo Proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-4">
            <Plus className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No hay proyectos
          </h3>
          <p className="text-gray-500 mb-4">
            Crea tu primer proyecto para empezar a gestionar gastos
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Crear Proyecto
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Icon = projectTypeIcons[project.type];
            const balance =
              (project.summary?.totalIncome || 0) -
              (project.summary?.totalExpenses || 0);

            return (
              <div
                key={project._id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onProjectSelect(project)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${
                        project.type === "trip"
                          ? "bg-blue-100 text-blue-600"
                          : project.type === "meal"
                          ? "bg-green-100 text-green-600"
                          : project.type === "party"
                          ? "bg-purple-100 text-purple-600"
                          : project.type === "event"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {projectTypeLabels[project.type]}
                    </span>
                  </div>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(
                          showMenu === project._id ? null : project._id
                        );
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>

                    {showMenu === project._id && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(project);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(project._id);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-1">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(project.startDate)}</span>
                    {project.endDate && (
                      <>
                        <span>-</span>
                        <span>{formatDate(project.endDate)}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <DollarSign className="w-4 h-4" />
                      <span>Balance: ${balance.toFixed(2)}</span>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        balance >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {balance >= 0 ? "+" : ""}${balance.toFixed(2)}
                    </div>
                  </div>

                  {project.summary && (
                    <div className="text-xs text-gray-400">
                      {project.summary.transactionCount} transacciones
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <ProjectForm project={editingProject} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default ProjectList;
