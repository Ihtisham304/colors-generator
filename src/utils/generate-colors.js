

 const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };


 export const generateColorArray = (num) => {
    return Array.from({ length: num }, () => generateRandomColor());
  };