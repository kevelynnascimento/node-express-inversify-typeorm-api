export enum OrderDirectionEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}

export interface PaginationResponse<T> {
    rows: T[];
    count: number;
}

export interface PaginationRequest {
    page: number;
    pageSize: number;
    orderColumn: string;
    orderDirection: OrderDirectionEnum;
}

export class PaginationHelper {
  public static get(paginationRequest: PaginationRequest) {
    const pagination = {
      skip: +paginationRequest.page * +paginationRequest.pageSize,
      take: +paginationRequest.pageSize,
      order: {
        [paginationRequest.orderColumn]: paginationRequest.orderDirection,
      },
    };

    return pagination;
  };
}