import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "react-error-boundary";
import { createTheme } from "@mui/material";
import { green, teal } from "@mui/material/colors";
import AppErrorFallback from "./AppErrorFallback";
import Index from "./pages";
import MarkdownConvert from "./pages/markdown/convert";

const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: teal[800],
    },
    secondary: {
      main: green[500],
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/markdown",
    children: [
      {
        path: "convert",
        element: <MarkdownConvert />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={3000}
      >
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
