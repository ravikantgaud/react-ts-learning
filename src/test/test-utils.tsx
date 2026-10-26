import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { createAppStore, store } from "../app/store";

export function renderWithProviders(ui: ReactElement) {
    const testStore = createAppStore();

    return {
        store: testStore,
        ...render(
            <Provider store={testStore}>
                {ui}
            </Provider>
        ),
    };
    
}