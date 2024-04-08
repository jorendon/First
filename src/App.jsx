import './App.css'
import {Grid} from "@mui/material";
import IncomeView from "./components/IncomeView/IncomeView.jsx";

function App() {
  return (
      <Grid container>
          <Grid>
              <IncomeView />
          </Grid>
      </Grid>

  )
}

export default App
