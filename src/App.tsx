import {AppBar, Container, CssBaseline, Toolbar, Typography} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Login} from "./components/Login.tsx";


function App() {
    const queryClient = new QueryClient();

  return (
    <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Car Shop
                </Typography>
            </Toolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
            <Login />
        </QueryClientProvider>
    </Container>
  )
}

export default App
