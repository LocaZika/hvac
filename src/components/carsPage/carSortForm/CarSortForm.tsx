'use client'
import { Grid } from "@mui/material";
import SelectSort from "./SelectSort";

export interface ISortByChangeFunction {
  handleSortByChange: (value: TSortBy) => void;
}
export default function CarSortForm({ handleSortByChange }: ISortByChangeFunction) {
  return (
    <Grid container justifyContent={'end'}>
      <Grid item xs={12} md={6}>
        <SelectSort handleSortByChange={handleSortByChange} />
      </Grid>
    </Grid>
  )
}
