import { promises as fs } from "fs"
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export class cartManager {

    constructor(){
        const currentFileUrl = import.meta.url
        const currentFilePath = fileURLToPath(currentFileUrl)
        this.path  = join(dirname(currentFilePath), "cart.json")
        this.cart = []
    }

    getCart = async() =>{
        const cart = await fs.readFile(this.path, 'utf-8')
        const responseCart = JSON.parse(cart)
        return responseCart
    }

    getCartProduct = async (id) =>{
        const cartId = await this.getCart
        const getCartId = cartId.find(cart => cart,id === id)

        if (getCartId){
            return getCartId.product 
        }else{
            console.log("no se encuentra el carrito")
        }
    }

    newCart = async() =>{
        const id = 0
        cartManager.id =+ 1

        const anotherCart = {id, product: []}
        this.cart = await this.getCart()
        this.cart.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(this.cart))
        return newCart

    }

    addProductToCart = async(cart_id, product_id)=>{

        const addCart = await this.getCart()
        const index = addCart.findIndex(cart => cart.id === cart_id)

        if(index !== -1){
            const cartProduct = await this.getCartProduct(cart_id)
            const savedProduct = cartProduct.findIndex(product=> product.product.id === product_id)

            if(savedProduct !== -1){
                cartProduct[savedProduct].quantity = cartProduct[savedProduct].quantity +1
            }else{
                cartProduct.push({product_id, quantity : 1})
            }

            addCart[index].product = cartProduct

            await fs.writeFile(this.path, JSON.stringify(addCart))
            console.log("producto agregado")
        }else{
            console.log("producto no agregado")
        }
    }
}