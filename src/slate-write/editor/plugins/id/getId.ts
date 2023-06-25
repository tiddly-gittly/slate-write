export const getIdFactory = (tiddlerTitle: string): () => string => {
  let id = 1;
  return () => `${tiddlerTitle}-${id++}`;
};
