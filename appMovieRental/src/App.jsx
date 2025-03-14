import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/theme";
import { Layout } from "./components/Layout/Layout";
import { Outlet } from 'react-router-dom'

export default function App() { 
  return ( 
      <ThemeProvider theme={appTheme}> 
        <CssBaseline enableColorScheme /> 
        <Layout> 
          <Outlet /> 
        </Layout> 
      </ThemeProvider> 
  ); 
}