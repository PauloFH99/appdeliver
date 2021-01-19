import { getRepository } from 'typeorm'
import { Product } from '../models/Product';
import { Request, Response } from 'express'
class ProductController {
    async getProducts(request: Request, response: Response){
        try {
            const product = await getRepository(Product).find()
            
            return response.json(product)
        } catch (error) {
            return response.status(500).json({ message: 'Error' })
        }
    };

    async getProduct(request: Request, response: Response){
        const { id } = request.params

        try {
            const product = await getRepository(Product).findOne(id)
            return response.json(product)
        } catch (error) {
            return response.status(500).json({ message: 'Error' })
        }
    };

    async saveProduct(request: Request, response: Response){
        try {
         
            const product = await getRepository(Product).save(request.body)
            console.log(product)
            return response.json(product)
        } catch (error) {
            return response.status(500).json({ message: 'Error' })
        }
    };

    async updateProduct(request: Request, response: Response) {
        const { id } = request.params

        try {
            const product = await getRepository(Product).update(id, request.body)

            if (product.affected === 1) {
                const productUpdated = await getRepository(Product).findOne(id)
                return response.json(productUpdated)
            }

            return response.status(404).json({ message: 'Product not found!' })
        } catch (error) {
            return response.status(500).json({ message: 'Error' })
        }

    };


    async removeProduct(request: Request, response: Response) {
        const { id } = request.params

        try {

            const product = await getRepository(Product).delete(id)

            if (product.affected === 1) {
                const productUpdated = await getRepository(Product).findOne(id)
                return response.json({ message: 'Product removed!' })
            }

            return response.status(404).json({ message: 'Product not found!' })

        } catch (error) {
            return response.status(500).json({ message: 'Error' })
        }
    };
}
export default new ProductController()