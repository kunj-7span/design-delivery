const projectStatuses = ["Draft", "In Progress", "Completed"];
const projectCreators = [
  "Aarav Mehta",
  "Priya Shah",
  "Rohan Verma",
  "Neha Patel",
  "Kunal Joshi",
];
const clientNames = [
  "Acme Corp",
  "Bright Labs",
  "Nimbus Tech",
  "BluePeak Studio",
  "Vertex Systems",
  "Greenline Media",
];

const projects = Array.from({ length: 64 }, (_, i) => ({
  id: i + 1,
  name: `Project ${i + 1}`,
  createdBy: projectCreators[i % projectCreators.length],
  clientName: clientNames[i % clientNames.length],
  status: projectStatuses[i % projectStatuses.length],
  tasks: 8 + ((i * 3) % 18),
}));

export const fetchProjects = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sortBy = "name",
  order = "asc",
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...projects];

  if (search) {
    const searchValue = search.toLowerCase();

    filtered = filtered.filter(
      (project) =>
        project.name.toLowerCase().includes(searchValue) ||
        project.createdBy.toLowerCase().includes(searchValue) ||
        project.clientName.toLowerCase().includes(searchValue) ||
        project.status.toLowerCase().includes(searchValue) ||
        String(project.tasks).includes(searchValue)
    );
  }

  if (status && status !== "All") {
    filtered = filtered.filter((project) => project.status === status);
  }

  filtered.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (order === "asc") {
      return String(aValue).localeCompare(String(bValue));
    }

    return String(bValue).localeCompare(String(aValue));
  });

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit),
  };
};

export const fetchProjectById = async (projectId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const project = projects.find((item) => item.id === Number(projectId));

  if (!project) {
    throw new Error("Project not found");
  }

  return { ...project };
};

export const deleteProject = async (projectId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const projectIndex = projects.findIndex((project) => project.id === projectId);

  if (projectIndex === -1) {
    throw new Error("Project not found");
  }

  projects.splice(projectIndex, 1);

  return { success: true };
};
