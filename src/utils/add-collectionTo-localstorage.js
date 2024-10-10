export const addCollectionToLocalStorage = (colors) => {
  const existingCollections = JSON.parse(localStorage.getItem("colors")) || [];
  let lastId = localStorage.getItem("lastId") || 0;
  const newId = parseInt(lastId) + 1;
  const newCollection = {
    id: newId,
    colors: colors,
  };
  const updatedCollections = [...existingCollections, newCollection];

  localStorage.setItem("colors", JSON.stringify(updatedCollections));
  localStorage.setItem("lastId", newId);
};
