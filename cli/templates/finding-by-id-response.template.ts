const getFindingByIdTemplate = (pascalCaseName: string): string => {
  return `
export default interface ${pascalCaseName}FindingByIdResponse {
  name: string;
  creationDate: Date;
  updateDate: Date;
  deactivationDate: Date;
}
`;
}

export { getFindingByIdTemplate };