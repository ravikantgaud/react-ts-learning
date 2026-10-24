import type { RootState } from "../../app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectFavoriteEmployeeIds = (state: RootState) =>
    state.favorites.favoriteEmployeeIds;

export const selectFavoriteCount = (state: RootState) =>
    state.favorites.favoriteEmployeeIds.length;

export const selectFavoriteCountMemoized = createSelector(
    [selectFavoriteEmployeeIds], 
    (favoriteEmployeeIds) => favoriteEmployeeIds.length
)

export const selectSortedFavoriteEmployeeIds = createSelector(
    [selectFavoriteEmployeeIds],
    (favoriteEmployeeIds) => [...favoriteEmployeeIds].sort((a, b) => a - b)
);