const taskStatuses = ["In Progress", "Completed"];

const employees = [
  "Aarav Mehta",
  "Priya Shah",
  "Rohan Verma",
  "Neha Patel",
  "Kunal Joshi",
];
const projectNames = [
  "Project 1",
  "Project 2",
  "Project 3",
  "Project 4",
  "Project 5",
];

const tasks = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  name: `Task ${i + 1}`,
  projectName: projectNames[i % projectNames.length],
  assignedTo: employees[i % employees.length],
  status: taskStatuses[i % taskStatuses.length],
  version: i % 5,
}));

export const fetchTasks = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sortBy = "name",
  order = "asc",
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...tasks];

  if (search) {
    const searchValue = search.toLowerCase();

    filtered = filtered.filter(
      (task) =>
        task.name.toLowerCase().includes(searchValue) ||
        task.projectName.toLowerCase().includes(searchValue) ||
        task.assignedTo.toLowerCase().includes(searchValue) ||
        task.status.toLowerCase().includes(searchValue)
    );
  }

  if (status && status !== "All") {
    filtered = filtered.filter((task) => task.status === status);
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

export const fetchTaskById = async (taskId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const task = tasks.find((item) => item.id === Number(taskId));

  if (!task) {
    throw new Error("Task not found");
  }

  return { ...task };
};

export const deleteTask = async (taskId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  tasks.splice(taskIndex, 1);

  return { success: true };
};
