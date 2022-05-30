import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import axios from "axios";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../api";
import { AuthLayout } from "../../components/layouts";
import { AuthContext } from "../../context";
import { validations } from "../../utils";

type FormData = {
    name    : string,
    email   : string,
    password: string,
  };

const RegisterPage = () => {
    const router= useRouter();
    const { registerUser } = useContext(AuthContext)
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onRegisterForm = async( {name, email, password }: FormData) => {
            
        setShowError(false);
        const { hasError, message } = await registerUser( name, email, password);

        if( hasError )
        {
            setShowError(true);
            setTimeout(() => {
            setShowError(false);
            }, 3000);
            setErrorMessage( message!);
            return;
        }
        
        const destination = router.query.p?.toString() || '/';
        router.replace(destination);
        
    }

    return (
        <AuthLayout title={"Ingresar"}>
            <Box sx={{ width: 350, padding: '10px 20px'}}>
            <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 }>
                        <Typography 
                            variant='h1' 
                            component='h1'
                        >
                            Crear cuenta
                        </Typography>
                        <Chip
                            label={ errorMessage }
                            color="error"
                            icon={<ErrorOutline/>}
                            className="fadeIn"
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>

                    <Grid item xs={ 12 }>
                        <TextField 
                            label='Nombre Completo' 
                            variant='filled' 
                            fullWidth
                            {
                                ...register('name',{
                                    required: true,
                                    minLength: { value: 2, message: "Mínomo de 2 caracteres"}
                                })
                            }
                            error={ !!errors.name } 
                            helperText= { errors.name?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField 
                            type={"email"}
                            label='Correo' 
                            variant='filled' 
                            fullWidth 
                            { 
                                ...register('email',{
                                    required: 'Este campo es requerido',
                                    validate: (val) => validations.isEmail(val) 
                                })
                            }
                            error = { !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField 
                            label='Contraseña' 
                            type='password' 
                            variant='filled' 
                            fullWidth 
                            { 
                                ...register('password',{
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                                })
                            }
                            error = { !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Button color="secondary" className="circular-btn" size="large" fullWidth type="submit">
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={ 12 } display="flex" justifyContent={'end'}>
                        <NextLink href={ router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login' }
                        passHref>
                            <Link underline="always">¿Ya tienes cuenta?</Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </form>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage
