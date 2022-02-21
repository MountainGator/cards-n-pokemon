/* Select a random element from values array. */
const Choice = (values) => {
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
}

export default Choice;