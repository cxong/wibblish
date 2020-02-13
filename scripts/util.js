const range = (prefix, n) =>
  Array.from({length:n},(v,k)=>prefix + k)

export { range }
