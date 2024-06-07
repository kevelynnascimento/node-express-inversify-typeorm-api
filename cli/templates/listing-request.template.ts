const getListingRequestTemplate = (pascalCaseName: string): string => {
  return `
import { PaginationRequest } from "../../../../infrastructure/helpers/pagination.helper";

export default interface ${pascalCaseName}Request extends PaginationRequest {

}
`;
}

export { getListingRequestTemplate };