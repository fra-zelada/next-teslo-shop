import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"


const SummaryPage = () => {
    return (
        <ShopLayout title="Resumen de orden" pageDescription={"Resumen de la orden"}>
            <Typography variant="h1" component={'h1'}>Resumen de la orden</Typography>
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
                                    <Button color="secondary" className="circular-btn" fullWidth>
                                        Confirmar Orden
                                    </Button>
                                    
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            

        </ShopLayout>
    )
}

export default SummaryPage
