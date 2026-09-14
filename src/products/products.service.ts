import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  private products: CreateProductDto[] = [
    {
    productId: uuid(),
    productName: "Sabritas normal",
    price: 29,
    countSeal: 3,
    provider: uuid(),
},
{
  productId: uuid(),
  productName: "Coca Cola 600ml",
  price: 40,
  countSeal: 2,
  provider: uuid(), 
},
{
  productId: uuid(),
  productName: "Agual Ciel 1L",
  price: 15,
  countSeal: 2,
  provider: uuid(),
}
]

  create(createProductDto: CreateProductDto) {

    const product = this.productRepository.create(createProductDto)
    const savedProduct = this.productRepository.save(product);
    return savedProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id,
    })
    if (!product) throw new NotFoundException()
      return product;
  }

  findByProvider(id: string) {
    const productFound = this.products. filter((product) => product.productId === id)
    if (productFound.length === 0) throw new NotFoundException()
      return productFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
   const productToUpdate = await this.productRepository.preload({
   productId: id,
   ...updateProductDto 
   })
   if (!productToUpdate) throw new NotFoundException()
   this.productRepository.save(productToUpdate)
   return productToUpdate;
    }
  
 remove(id: string) {
  return this.productRepository.delete({
    productId: id,
  })
 }
}