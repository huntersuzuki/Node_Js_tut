const myName = "Pranay bhoir";

// module.exports = myName;// old way to export the file

export const generateMarks = () => {
  return `${Math.floor(Math.random() * 100)} %`;
};
export default myName;
