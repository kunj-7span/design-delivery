const users = Array.from({ length: 137 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
  phone: `987654${String(i).padStart(4, "0")}`,
}));

export const fetchUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "name",
  order = "asc",
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...users];

  // SEARCH
  if (search) {
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
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

export const fetchUserById = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const user = users.find((item) => item.id === Number(userId));

  if (!user) {
    throw new Error("User not found");
  }

  return { ...user };
};

export const deleteUser = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  users.splice(userIndex, 1);

  return { success: true };
};
