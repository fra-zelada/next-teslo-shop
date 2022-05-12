import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from "../../components/layouts"
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
// import { initialData } from "../../database/products"
// import { useProducts } from '../../hooks/useProducts';
// import { useRouter } from 'next/router';
import { IProduct } from '../../interfaces/products';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { PropsWithChildren } from 'react';
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database';

// const product = initialData.products[0];

interface Props {
    product: IProduct
}

const ProductPage: NextPage<PropsWithChildren<Props>> = ( { product } ) => {
    
    // const router = useRouter();
    
    // const { products: product, isLoading } = useProducts(`/products/${ router.query.slug }`);

    // if ( isLoading ) {
    //     return <h1>Cargando...</h1>
    // }

    // if ( !product ){
    //     return <h1> Producto no existe</h1>
    // }



    return (
        <ShopLayout title={ product.title } pageDescription={ product.description }>

            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } sm={ 7 }>
                    <ProductSlideshow images={ product.images }/>
                </Grid>

                <Grid item xs = { 12 } sm = { 5 }>
                    <Box display='flex' flexDirection='column'>
                        {/* titulos */}
                        <Typography variant='h1' component='h1'> { product.title } </Typography>
                        <Typography variant='subtitle1' component='h2'> { `$${product.price}` } </Typography>
                        {/* Cantidad */}
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2">Cantidad</Typography>
                            <ItemCounter/>
                            <SizeSelector 
                                selectedSize={ product.sizes[2] } 
                                sizes={ product.sizes }
                            />

                        </Box>

                        {/* Agregar al carrito */}
                        <Button color="secondary" className='circular-btn'>
                            Agregar al carrito
                        </Button>

                        <Chip label="No hay disponibles" color="error" variant="outlined" />

                        {/* Description */}

                        <Box sx= {{ mt:3 }}>
                            <Typography variant="subtitle2">Descripción</Typography>
                            <Typography variant="body2">{ product.description }</Typography>
                        </Box>

                    </Box>
                </Grid>

            </Grid>

        </ShopLayout>

        )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     // const { data } = await  // your fetch function here 
    
//     const slug = ctx.query.slug as string || '';
    
//     const product = await dbProducts.getProductBySlug( slug );

//     // Se redirecciona, permanent false porque este índice podría quizás existir en el futuro
//     if ( !product ) {
//         return {
//             redirect:{
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }

//getStaticPaths

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const productSlugs = await dbProducts.getAllProductsSlugs();



    return {
        paths: productSlugs.map( ({ slug }) => ({
            params: {
                slug
            }
        })),
        // [
        //     {
        //         params: {
                    
        //         }
        //     }
        // ],
        fallback: "blocking"

        // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    }
}


//

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { params } = ctx;
    const { slug = '' } = params as { slug: string };

    const product = await dbProducts.getProductBySlug( slug );

    if ( !product ) {
        return {
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}


export default ProductPage
