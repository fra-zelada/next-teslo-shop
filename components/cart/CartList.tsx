import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';
import { ItemCounter } from '../ui';


// const productsInCart = [
//     initialData.products[0],
//     initialData.products[1],
//     initialData.products[2],
// ]

interface Props {
    editable?: boolean
}

export const CartList:FC<Props> = ( { editable = false } ) => {
    
    const { cart, updateCartQuantity, removeCartProduct, limpiarCookie } = useContext(CartContext)
    
    const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number ) => {
            
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    
    }

    const removeProductOnCart = ( product: ICartProduct ) => {

        if( cart.length === 1 )
        {
            limpiarCookie();
        }
        removeCartProduct( product );
    }

    return (<>
        {
            cart.map( product => (
                
                <Grid container spacing={ 2 } key={ product.slug + product.size } sx={{ mb:1 }}>
                    <Grid item xs={3}>
                        {/* Llevar a la página del producto */}
                        <NextLink href={`/product/${ product.slug }`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={ `/products/${ product.image}` }
                                        component='img'
                                        sx={{ borderRadius: '5px'}}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.title }</Typography>
                            <Typography variant='body1'>Talla: <strong> { product.size || 'None'} </strong></Typography>

                            {/* Condicional */}
                            {
                                editable
                                ? <ItemCounter 
                                    currentValue={ product.quantity } 
                                    maxValue={ 10 } 
                                    updatedQuantity={ ( value ) => { onNewCartQuantityValue( product, value ) }}

                                  />
                                : <Typography variant='h5'> { product.quantity } { product.quantity > 1 ? 'productos' : 'producto' }</Typography>

                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems={'center'} flexDirection='column'>
                        <Typography variant='subtitle1'> {`$${ product.price }`} </Typography>
                        {/* Editable */}

                        {
                            editable && (
                                <Button variant='text' color='secondary' onClick={ () => removeProductOnCart( product ) }>
                                    Remover
                                </Button>

                            )
                        }

                    </Grid>
                    
                </Grid>

                ))
        }
        </>
    )
}
