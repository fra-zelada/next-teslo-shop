import { Typography } from "@mui/material"
import { NextPage } from "next"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"
import { useProducts } from "../../hooks"



const MenPage: NextPage = () => {

  const { products, isLoading } = useProducts ('/products/?gender=men')

  return (

      <ShopLayout title={'Teslo-Shop - Men'} pageDescription={'Encuentra los mejores productos de Teslo para hombres'}>

        <Typography variant='h1' component='h1'>Hombre</Typography>
        <Typography variant='h2' sx={{mb: 1}}>Productos para Hombres</Typography>

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

export default MenPage
