import {Car, CarEntry, CarResponse} from "../types/types.ts";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip} from "@mui/material";
import {CarDialogContent} from "./CarDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCar} from "../api/carapi.ts";
import EditIcon from '@mui/icons-material/Edit';

type FormProps = {
    cardata: CarResponse;
}

export const EditCar = ({cardata}: FormProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0,
    })

    const { mutate } = useMutation(updateCar,{
        onSuccess: () =>{
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.error(err);
        }
    })
    const handleClickOpen = () => {
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price,
        })
        setOpen(true);
    };
    const handleClose = () =>{
        setOpen(false);
    };

    const handleSave = () =>{
        const url = cardata._links.self.href;
        const carEntry: CarEntry = {car, url}
        mutate(carEntry);
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0,})
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    return (
        <>
            <Tooltip title="Edit car">
                <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cansel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};