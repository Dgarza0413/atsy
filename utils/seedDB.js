import data from '../static/products.json';
import Product from '../models/Product';
import connectDb from './connectDb';
import shortid from 'shortid';

async function seedDb() {
    connectDb()
    for (let i = 0; i < data.length; i++) {
        new Product.create({
            name: data[i].name,
            price: data[i].price,
            description: data[i].description,
            sku: shortid.generate(),
            mediaUrl: data[i].mediaUrl
        })
            .save()
            .then(() => console.log('item saved'))
    }
}

export default seedDb