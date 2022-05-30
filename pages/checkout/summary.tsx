import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import { useContext } from "react"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { CartContext } from "../../context"
import { countries } from "../../utils"


const SummaryPage = () => {

    const { shippingAddress, numberOfItems } = useContext(CartContext);

    if ( !shippingAddress ) {
        return <> no data </>;
    }

    const { firstName , lastName, address, address2 = '', city, country, zip, phone } = shippingAddress;

    return (
        <ShopLayout title="Resumen de orden" pageDescription={"Resumen de la orden"}>
            <Typography variant="h1" component={'h1'}>Resumen ({ numberOfItems } {  numberOfItems === 1 ? 'producto':'productos'  })</Typography>
                <Grid container>
                    <Grid item xs={ 12 } sm={ 7 }>
                        <CartList  />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 5 }>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant='h2'>Resumen (3 productos)</Typography>
                                <Divider sx={{ my:1 }}/>
                                
                                <Typography variant="subtitle1">Dirección de entrega</Typography>
                                <Box display='flex' justifyContent={'space-between'}>
                                    <NextLink href={"/checkout/address"} passHref>
                                        <Link underline='always'>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>

                                <Typography>{ firstName } { lastName }</Typography>
                                <Typography>{ address } { address2 ? `, ${address2}` : '' } </Typography>
                                <Typography> { city }  </Typography>
                                <Typography> { zip }  </Typography>
                                <Typography> { countries.find( c => c.code === country)?.name  }  </Typography>
                                <Typography> { phone } </Typography>

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
