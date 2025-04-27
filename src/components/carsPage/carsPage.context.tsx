import { createContext } from "react";
import { ICarPageInitialState, carPageInitialState } from './carsPage.reducer';

export const CarsPageContext = createContext<ICarPageInitialState>(carPageInitialState);