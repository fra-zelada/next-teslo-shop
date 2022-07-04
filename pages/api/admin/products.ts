import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces/products';
import { Product } from '../../../models';

type Data = {
    message: string
} | IProduct[] 
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':
            
            return getProducts( req, res );
        
        case 'PUT':
        
            return updateProduct( req, res );
        
        case 'POST':
        
            return createProduct( req, res );

        break;
    
        default:
            res.status(400).json({ message: 'Bad request' })
    }
    
}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();
    const products = await Product.find()
                        .sort({title: 'asc'})
                        .lean();
    await db.disconnect();

    res.status(200).json( products )


}
const updateProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '' , images = [] } = req.body as IProduct;

    if ( !isValidObjectId( _id )) {
        return res.status(400).json({ message: 'El id del producto no es válido' })
    }

    if ( images.length < 2 ) {
        return res.status(400).json({ message: 'Es necesario al menos 2 imágenes' })
    }

    try {

        await db.connect();
        
        const product = await Product.findById( _id );
        if ( !product ) {
            return res.status(400).json({ message: 'No existe producto con ese Id' })
        }

        await product.update( req.body );
        
        await db.disconnect();
        return res.status(200).json( product );
    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(400).json({ message: 'Revisar logs del servidor' })
        
    }

}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { images = [] } = req.body as IProduct;

    if ( images.length < 2) {
        return res.status(400).json({ message: 'El producto necesita al menos 2 imágenes' })
    }

    
    try {
        await db.connect();
        const productInDb = await Product.findOne({ slug: req.body.slug });
        if( productInDb ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' })
        }

        const product = new Product( req.body );
        await product.save();
        await db.disconnect();

        res.status(201).json( product );

    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(400).json({ message: 'Revisar logs del servidor' })
        
    }


}

