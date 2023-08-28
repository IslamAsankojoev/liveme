export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export default getLocalStorage;
