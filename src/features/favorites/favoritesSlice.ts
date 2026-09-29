import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
    favoriteEmployeeIds: number[];
}

const initialState: FavoritesState = {
    favoriteEmployeeIds: [],
}

const favoritesSlice = createSlice({
    name: "favorites",

    initialState,

    reducers: {
        addFavorite: (state, action: PayloadAction<number>) => {
            state.favoriteEmployeeIds.push(action.payload);
        },

        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favoriteEmployeeIds = state.favoriteEmployeeIds.filter(
                (id) => id !== action.payload
            );
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;