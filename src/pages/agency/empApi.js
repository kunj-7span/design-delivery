const employees = Array.from({ length: 87 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  email: `employee${i + 1}@company.com`,
}));

export const fetchEmployees = async ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "name",
  order = "asc",
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...employees];

  // SEARCH
  if (search) {
    filtered = filtered.filter(
      (employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  // SORT
  filtered.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (order === "asc") {
      return aValue > bValue ? 1 : -1;
    }

    return aValue < bValue ? 1 : -1;
  });

  // PAGINATION
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

export const deleteEmployee = async (employeeId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const employeeIndex = employees.findIndex(
    (employee) => employee.id === employeeId
  );

  if (employeeIndex === -1) {
    throw new Error("Employee not found");
  }

  employees.splice(employeeIndex, 1);

  return { success: true };
};