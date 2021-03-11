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
const { Op } = require("sequelize")
//用户与订单 1:n
User.hasMany(Order, { foreignKey: "uid" })
Order.belongsTo(User, { foreignKey: "uid" })

//用户与购物车 1:1
User.hasOne(Cart, { foreignKey: "uid" })
Cart.belongsTo(User, { foreignKey: "uid" })

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
    const { uid } = ctx.request.body
    const user = await User.findOne({ where: { uid }, include: Cart })
    const cart = user.Cart
    const products = await cart.getProducts()
    const order = await user.createOrder()
    await order.addProducts(products.map(product => {
        product.ProductOrder = {
            quality: product.CartProduct.quality
        }
        return product
    }))
    await cart.setProducts([])
    ctx.body = {
        status: "order ok"
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
    const { quality, productId, uid } = ctx.request.body
    const product = await Product.findOne({ where: { productId } })
    let cart = await Cart.findOne({ where: { uid } })
    if (!cart) {
        cart = await Cart.create({ uid })
    }
    let cartHasProduct = await cart.hasProduct(product)
    if (cartHasProduct) {
        let _product = await cart.getProducts({ where: { productId } })
        _product[0].CartProduct.quality += quality
        await _product[0].CartProduct.save()
    }
    else {
        await cart.addProduct(product, { through: { quality } })
    }
    ctx.body = {
        status: "addCartOk"
    }
})
//获取用户购物车信息
router.get("/cartInfo", async (ctx, next) => {
    const { uid } = ctx.request.query
    let cartInfo
    try {
        let cart = await Cart.findOne({ where: { uid }, include: Product })
        let productList = cart.Products
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
        cartInfo = {
            cartId: cart.cartId,
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