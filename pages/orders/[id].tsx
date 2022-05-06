import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { Box,  Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"


const OrderPage = () => {
    return (
        <ShopLayout title="Resumen de orden 1234513" pageDescription={"Resumen de la orden"}>
            <Typography variant="h1" component={'h1'}>Orden: ABC123</Typography>
                
                {/* <Chip
                    sx={{ my:2 }}
                    label="Pendiente de pago"
                    variant="outlined"
                    color="error"
                    icon={ <CreditCardOffOutlined/> }
                /> */}
                
                <Chip
                    sx={{ my:2 }}
                    label="Orden ya fue pagada"
                    variant="outlined"
                    color="success"
                    icon={ <CreditScoreOutlined/> }
                />

                <Grid container>
                    <Grid item xs={ 12 } sm={ 7 }>
                        <CartList  />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 5 }>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant='h2'>Resumen (3 productos)</Typography>
                                <Divider sx={{ my:1 }}/>
                                
                                <Box display='flex' justifyContent={'space-between'}>
                                    <NextLink href={"/checkout/address"} passHref>
                                        <Link underline='always'>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>

                                <Typography variant="subtitle1">Dirección de entrega</Typography>
                                <Typography>Francisco Zelada</Typography>
                                <Typography>Calle falsa 123</Typography>
                                <Typography>Maipú, 324234</Typography>
                                <Typography>Chile</Typography>
                                <Typography>+568894794</Typography>

                                <Divider sx={{ my:1 }}/>

                                <Box display='flex' justifyContent={'end'}>
                                    <NextLink href={"/cart"} passHref>
                                        <Link underline='always'>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>

                                <OrderSummary/>

                                <Box sx={{ mt: 3 }}>
                                    {/* TODO */}
                                    <h1>Pagar</h1>
                                        <Chip
                                            sx={{ my:2 }}
                                            label="Orden ya fue pagada"
                                            variant="outlined"
                                            color="success"
                                            icon={ <CreditScoreOutlined/> }
                                        />
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            

        </ShopLayout>
    )
}

export default OrderPage
