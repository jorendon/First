import './App.css'
import {Grid} from "@mui/material";
import IncomeView from "./components/IncomeView/IncomeView.jsx";
import {SnackbarProvider} from "notistack";

function App() {
  return (
      <SnackbarProvider maxSnack={3}>
      <Grid container>
          <Grid>
              <IncomeView />
          </Grid>
      </Grid>
      </SnackbarProvider>

  )
}

export default App
