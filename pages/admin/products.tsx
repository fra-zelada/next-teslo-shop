import {  AddOutlined, CategoryOutlined } from '@mui/icons-material';
import {  Box, Button, CardMedia, Grid, Link } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AdminLayout } from "../../components/layouts"
import useSWR from 'swr';
import {  IProduct } from "../../interfaces";
import NextLink from 'next/link';


const columns: GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Foto', 
        renderCell: ( {row}: GridValueGetterParams) => {
            return (
                <a 
                    href={`/product/${ row.slug }`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <CardMedia 
                        component="img"
                        alt={ row.title }
                        className='fadeIn'
                        image={`/products/${ row.img }`}
                    />
                </a>
            )
        }
    },
    { 
        field: 'title', 
        headerName: 'Título', 
        width: 300,
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <NextLink href={`/admin/products/${ row.slug }`} passHref>
                    <Link underline='always'>
                        { row.title }
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Género'},
    { field: 'type', headerName: 'Tipo'},
    { field: 'inStock', headerName: 'Inventario'},
    { field: 'price', headerName: 'Precio'},
    { field: 'sizer', headerName: 'Tallas', width: 250},
    

]

const ProductsPage = () => {

    const { data, error} = useSWR<IProduct[]>('/api/admin/products');

    if ( !data && !error) return (<>Loading...</>);

    const rows= data?.map( product=> ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizer: product.sizes.join(', '),
        slug: product.slug
    }))

    return (
        <AdminLayout 
            title={`Productos (${data?.length})`} 
            subTitle={"Mantenimiento de productos"}
            icon={ <CategoryOutlined/>}
        >
            <Box display={'flex'} justifyContent="end" sx={{ mb: 2}}>
                <Button
                    startIcon={ <AddOutlined/> }
                    color="secondary"
                    href="/admin/products/new"
                >
                    Crear producto
                </Button>

            </Box>

            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width:'100%'}}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns } 
                        pageSize={ 10 }
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
                
            </Grid>
        </AdminLayout>
    )
}

export default ProductsPage
