import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { Box,  Card, CardContent, Chip,     Divider,     Grid,     Typography } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { CartList, OrderSummary } from "../../../components/cart"
import { AdminLayout } from "../../../components/layouts"
import { dbOrders } from "../../../database"
import { IOrder } from '../../../interfaces';




interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    
    return (
        <AdminLayout
            title="Resumen de orden"
            subTitle={`OrdenId: ${order._id}`}
            icon={<AirplaneTicketOutlined/>}
        >
            {/* <Typography variant="h1" component={'h1'}>Orden: { order._id }</Typography> */}
                

                {
                    order.isPaid
                    ? (
                        <Chip
                            sx={{ my:2 }}
                            label="Orden ya fue pagada"
                            variant="outlined"
                            color="success"
                            icon={ <CreditScoreOutlined/> }
                        />
                    ):
                    (
                        <Chip
                        sx={{ my:2 }}
                        label="Pendiente de pago"
                        variant="outlined"
                        color="error"
                        icon={ <CreditCardOffOutlined/> }
                        /> 
                        )

                }
                
                
                

                <Grid container className="fadeIn">
                    <Grid item xs={ 12 } sm={ 7 }>
                        <CartList  products={ order.orderItems } />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 5 }>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos':'producto' })</Typography>
                                <Divider sx={{ my:1 }}/>
                                
                                <Box display='flex' justifyContent={'space-between'}>
                                    {/* <NextLink href={"/checkout/address"} passHref>
                                        <Link underline='always'>
                                            Editar
                                        </Link>
                                    </NextLink> */}
                                <Typography variant="subtitle1">Dirección de entrega</Typography>
                                </Box>

                                <Typography>{ shippingAddress.firstName } {shippingAddress.lastName}</Typography>
                                <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }` : ''}</Typography>
                                <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                                <Typography> {shippingAddress.country } </Typography>
                                <Typography>{ shippingAddress.phone }</Typography>

                                <Divider sx={{ my:1 }}/>

                                {/* <Box display='flex' justifyContent={'end'}>
                                    <NextLink href={"/cart"} passHref>
                                        <Link underline='always'>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box> */}

                                <OrderSummary 
                                    orderValues={{ 
                                        numberOfItems: order.numberOfItems,
                                        subTotal: order.subTotal,
                                        total: order.total,
                                        tax: order.tax
                                     }} 
                                />

                                <Box sx={{ mt: 3 }} display="flex" flexDirection={"column"} >
                                    
                                    {/* <Box 
                                        display={"flex"} 
                                        justifyContent="center" 
                                        className="fadeIn"
                                        sx={{ display: 'flex' }}
                                    >
                                        <CircularProgress />
                                    </Box> */}
                                    <Box
                                        flexDirection={"column"}
                                        sx={{ display: 'flex', flex: 1 }}
                                    >

                                        {
                                            order.isPaid ? (
                                                <Chip
                                                sx={{ my:2 }}
                                                label="Orden ya fue pagada"
                                                variant="outlined"
                                                color="success"
                                                icon={ <CreditScoreOutlined/> }
                                            />
                                            )
                                            : (
                                                <Chip
                                                sx={{ my:2 }}
                                                label="Orden no pagada"
                                                variant="outlined"
                                                color="error"
                                                icon={ <CreditScoreOutlined/> }
                                            />
                                            )

                                        }
                                    </Box>

                                        
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            

        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query as { id: string };  // your fetch function here 



    const order = await dbOrders.getOrderById( id );

    if ( !order ) {
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false,
            }
        }
    }

    // if ( order.user !== session.user._id ) {
    //     return {
    //         redirect: {
    //             destination: `orders/history`,
    //             permanent: false,
    //         }
    //     }
    // } 

    return {
        props: {
            order
        }
    }
}

export default OrderPage
