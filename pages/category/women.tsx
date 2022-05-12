import { Typography } from "@mui/material"
import { NextPage } from "next"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"
import { useProducts } from "../../hooks"



const WomenPage: NextPage = () => {

  const { products, isLoading } = useProducts ('/products/?gender=women')

  return (

      <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Encuentra los mejores productos de Teslo para mujeres'}>

        <Typography variant='h1' component='h1'>Mujer</Typography>
        <Typography variant='h2' sx={{mb: 1}}>Productos para Mujeres</Typography>

        {
          isLoading ?
            <FullScreenLoading />
            : 
            <ProductList 
              // products={ initialData.products as any }        
              products={ products }        
            />
        }


      </ShopLayout>

    )
}

export default WomenPage
