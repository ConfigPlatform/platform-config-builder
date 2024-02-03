function prepareWhere(filters) {
  const whereConditions = {};
  for (const [key, value] of Object.entries(filters)) {
    whereConditions[key] = value;
  }
  return whereConditions;
}
