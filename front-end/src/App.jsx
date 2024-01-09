import { useState } from 'react'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/index.jsx";
import {Button} from "./components/ui/button.jsx";
import {Provider} from "react-redux";
import studentStore from "./store/store.jsx";
import {ThemeProvider} from "./components/themeProvider.jsx";

function App() {
  return (
    <>

        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Provider store={studentStore}>
                <RouterProvider router={router}/>
            </Provider>
        </ThemeProvider>
    </>
  )
}

export default App
