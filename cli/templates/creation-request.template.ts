const getCreationRequestTemplate = (pascalCaseName: string): string => {
  return `
export default interface ${pascalCaseName}CreationRequest {
  name: string;
}
`;
}

export { getCreationRequestTemplate };