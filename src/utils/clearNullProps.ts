export function clearNullProps(obj) {
  const newObj = {};

  for (const prop in obj) {
      if (obj[prop] !== null) {
          newObj[prop] = obj[prop];
      }
  }

  return newObj;
}
