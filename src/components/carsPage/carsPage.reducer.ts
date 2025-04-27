import { TCarItemMinData } from "@/types/server";
import { removeProperty, removePropertyEmptyValue } from "@utils/object.utils";

export enum ECarsPageActionKind {
  updateCarList = "updateCarList",
  updateQueryParams = "updateQueryParams",
  updateTotalPages = "updateTotalPages",
  updateFilterOptions = "updateFilterOptions",
  clearFilterOptions = "clearFilterOptions",
}
interface ICarsPageAction {
  type: ECarsPageActionKind;
  payload: Partial<ICarPageInitialState>;
}
export interface ICarPageInitialState {
  carList: TCarItemMinData[];
  queryParams: IQueryParams;
  totalPages: number;
  filterOptions: IFilterQuery;
}
export const carPageInitialState: ICarPageInitialState = {
  carList: [],
  queryParams: {
    page: 1,
    sortBy: "ascending",
  },
  totalPages: 1,
  filterOptions: {},
};
export function carsPageReducer(
  state: ICarPageInitialState,
  action: ICarsPageAction,
): ICarPageInitialState {
  switch (action.type) {
    case ECarsPageActionKind.updateQueryParams:
      return {
        ...state,
        queryParams: { ...state.queryParams, ...action.payload.queryParams },
      };

    case ECarsPageActionKind.updateCarList:
      return { ...state, carList: action.payload.carList as TCarItemMinData[] };

    case ECarsPageActionKind.updateTotalPages:
      return { ...state, totalPages: action.payload.totalPages as number };

    case ECarsPageActionKind.updateFilterOptions:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          ...action.payload.filterOptions,
        },
      };

    case ECarsPageActionKind.clearFilterOptions:
      return {
        ...state,
        queryParams: carPageInitialState.queryParams,
        filterOptions: {},
      };
    default:
      throw new Error("Invalid action type");
  }
}
