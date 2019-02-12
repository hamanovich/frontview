export const forEachPromise = (items, fn) =>
  items.reduce((promise, item) => promise.then(() => fn(item)), Promise.resolve());

export default null;
