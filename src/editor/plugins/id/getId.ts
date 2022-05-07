export const getIdFactory = (tiddlerTitle: string) => {
  let id = 1;
  return () => `${tiddlerTitle}-${id++}`;
};
