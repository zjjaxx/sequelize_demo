const Koa = require("koa")
const app = new Koa()
const bodyParser = require("koa-bodyparser")
const Router = require("koa-router")
const router = new Router({
    prefix: "/test"
})

app.use(bodyParser())
const User = require("./models/User")
const Cart = require("./models/Cart")
const Product = require("./models/Product")
const Order = require("./models/Order")
const ProductOrder = require("./models/ProductOrder")
const CartProduct = require("./models/CartProduct")
//用户与订单 1:n
User.hasMany(Order, { foreignKey: "uid" })
Order.belongsTo(User, { foreignKey: "uid" })

//用户与购物车 1:1
User.hasOne(Cart, { foreignKey: "uid" })
Cart.belongsTo(User,{ foreignKey: "uid" })

//订单与产品 n:m
Product.belongsToMany(Order, { through: 'ProductOrder', foreignKey: "productId" })
Order.belongsToMany(Product, { through: 'ProductOrder', foreignKey: "orderId" })

//产品与购物车 n:m
Cart.belongsToMany(Product, { through: 'CartProduct', foreignKey: "cartId" })
Product.belongsToMany(Cart, { through: 'CartProduct', foreignKey: "productId" })

//注册
router.post("/register", async (ctx, next) => {
    const { username, password, phone } = ctx.request.body
    let user
    try {
        user = await User.create({ username, password, phone })
    } catch (error) {
        ctx.body = {
            error
        }
    }
    ctx.body = { user }

})
//获取用户信息
router.get("/userInfo", async (ctx, next) => {
    const { uid } = ctx.request.query
    console.log("uid", uid)
    let userInfo
    try {
        userInfo = await User.findOne({ where: { uid } })
    } catch (error) {
        ctx.body = {
            error
        }
    }
    ctx.body = { userInfo }
})
//上传产品
router.post("/addProduct", async (ctx, next) => {
    const { productName, img, stock, price } = ctx.request.body
    let product
    try {
        product = await Product.create({ productName, img, stock, price })
    } catch (error) {
        ctx.body = {
            error
        }
    }
    ctx.body = { product }
})
//产品详情
router.get("/productDetail", async (ctx, next) => {
    const { productId } = ctx.request.query
    let productInfo
    try {
        productInfo = await Product.findOne({ where: { productId } })
    } catch (error) {
        ctx.body = {
            error
        }
    }
    ctx.body = { productInfo }
})
//下单
router.post("/order", async (ctx, next) => {
    const { uid, orderInfo } = ctx.request.body
    let order
    try {
        order = await Order.create({ uid })
        for (let i = 0; i < orderInfo.length; i++) {
            let product = await Product.findOne({ where: { productId: orderInfo[i].productId } })
            await order.addProduct(product, { through: { quality: orderInfo[i].quality } })
        }
    } catch (error) {
        ctx.body = {
            error
        }
    }
    ctx.body = {
        status: "addOk"
    }
})
//获取用户订单
router.get("/getUserOrder", async (ctx, next) => {
    const { uid } = ctx.request.query
    let orderInfoList = []
    try {
        let orders = await Order.findAll({ where: { uid }, include: Product })
        for (let i = 0; i < orders.length; i++) {
            let productList = orders[i].Products
            productList = productList.map(item => (
                {
                    proudctName: item.proudctName,
                    price: item.price,
                    stock: item.stock,
                    img: item.img,
                    quality: item.ProductOrder.quality,
                    productId: item.productId
                }
            ))
            orderInfoList.push({
                orderId: orders[i].orderId,
                productList
            })
        }
    } catch (error) {
        ctx.body = {
            error
        }
    }
    ctx.body = {
        orderInfoList
    }
})
//添加购物车
router.post("/addCart", async (ctx, next) => {
    const { productList, uid } = ctx.request.body
    try {
        let cart = await Cart.findOne({ where: { uid } })
        if (!cart) {
            cart = await Cart.create({ uid })
        }
        for (let i = 0; i < productList.length; i++) {
            let product = await Product.findOne({ where: { productId: productList[i].productId } })
            let cartHasProduct=await cart.hasProduct(product)
            if(cartHasProduct){
               let products=await cart.getProducts()
               let product= products.find(item=>item.productId==productList[i].productId)
               product.CartProduct.quality+=productList[i].quality
               await product.CartProduct.save()
            }
            else{
                await cart.addProduct(product, { through: { quality: productList[i].quality } })
            }
            
        }

    } catch (error) {
        ctx.body = {
            error
        }
    }
    ctx.body = {
        status: "addOk"
    }
})
//获取用户购物车信息
router.get("/cartInfo", async (ctx, next) => {
    const {uid}=ctx.request.query
    let cartInfo
    try {
       let cart= await Cart.findOne({where:{uid},include:Product})
       let productList=cart.Products
       console.log("productList",productList)
       productList = productList.map(item => (
           {
               proudctName: item.proudctName,
               price: item.price,
               stock: item.stock,
               img: item.img,
               quality: item.CartProduct.quality,
               productId: item.productId
           }
       ))
       console.log("productList",productList)
       cartInfo={
           cartId:cart.cartId,
           productList
       }
    } catch (error) {
        
    }
    ctx.body = {
        cartInfo
    }
})

app.use(router.routes())

app.listen(9898, () => {
    console.log("listen 9898")
})