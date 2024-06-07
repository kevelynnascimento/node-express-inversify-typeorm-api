const getCreationResponseTemplate = (pascalCaseName: string): string => {
  return `
export default interface ${pascalCaseName}CreationResponse {
  id: string;
}
`;
}

export { getCreationResponseTemplate };