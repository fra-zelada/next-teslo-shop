import { Chip, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { width } from "@mui/system";
import NextLink from "next/link";

const columns : GridColDef [] = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'fullname', headerName: 'Nombre Completo', width: 300, sortable : false},

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid 
                ? <Chip color="success" label="Pagada" variant="outlined" />
                : <Chip color="error" label="No Pagada" variant="outlined" />
            )
        }
    },

    {
        field: 'orden',
        headerName: 'Ver orden',
        description: 'Muestra el detalle de la orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${ params.row.id }`} passHref>
                    <Link underline="always">
                        Ver Orden
                    </Link>
                </NextLink>
            )
        }
    }
]


const rows = [
    { id: 1, paid: true, fullname: 'Francisco Zelada' },
    { id: 2, paid: false, fullname: 'Joaquin Montecinos' },
    { id: 3, paid: true, fullname: 'Arturo Vidal' },
    { id: 4, paid: false, fullname: 'Ben Brereton' },
    { id: 7, paid: true, fullname: 'Cristiano Ronaldo' },
    { id: 10, paid: true, fullname: 'Sergio aguero' },
]

const HistoryPage = () => {
    return (

        <ShopLayout title={"Historial de ordenes"} pageDescription={"Historial de ordenes del cliente"}>
            <Typography variant="h1" component="h1">Historíal de ordenes</Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width:'100%'}}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns } 
                        pageSize={ 10 }
                        rowsPerPageOptions={[10]}
                    >

                    </DataGrid>

                </Grid>
                
            </Grid>

        </ShopLayout>

    )
}

export default HistoryPage;