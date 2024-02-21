import {useState} from "react";
import {Button, Snackbar, Stack, TextField} from "@mui/material";
import axios from "axios";
import {Carlist} from "./Carlist.tsx";

type User = {
    username: string;
    password: string;
}
export const Login = () => {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[event.target.name]: event.target.value});
    }
    const handleLogin = () => {
        axios.post(import.meta.env.VITE_API_URL + "/login", user, {
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res => {
            const jwtToken = res.headers.authorization;

            if (jwtToken !== null){
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        })
            .catch(() => setOpen(true));
    }
    const handleLogout = () => {
        setAuth(false);
        sessionStorage.setItem("jwt", "");
    }

    const [isAuthenticated, setAuth] = useState(false);

    const [open, setOpen] = useState(false);

    if (isAuthenticated){
        return <Carlist logOut={handleLogout}/>
    } else {
        return (
            <>
                <Stack spacing={2} alignItems="center" mt={2}>
                    <TextField
                        name="username"
                        label="Username"
                        onChange={handleChange}/>
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        onChange={handleChange}/>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleLogin}>
                        Login
                    </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => setOpen(false)}
                        message="Login failed: Check your username and password"
                        />
                </Stack>
            </>
        );
    }
};