const socket = io()

socket.on("producto",  (products)=>{
    console.log(products)
})