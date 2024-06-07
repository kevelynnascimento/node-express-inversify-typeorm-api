const getUpdateRequestTemplate = (pascalCaseName: string): string => {
  return `
export default interface ${pascalCaseName}UpdateRequest {
  name: string;
}
`;
}

export { getUpdateRequestTemplate };