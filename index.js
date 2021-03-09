const Koa=require("koa")
const app=new Koa()
const Router=require("koa-router")
const router=new Router({
    prefix:"/test"
})
const User=require("./models/User")
const Cart=require("./models/Cart")
const Product=require("./models/Product")
const Order=require("./models/Order")
const ProductOrder=require("./models/ProductOrder")
const CartProduct=require("./models/CartProduct")
//用户与订单 1:n
User.hasMany(Order)
Order.belongsTo(User)

//用户与购物车 1:1
User.hasOne(Cart)
Cart.belongsTo(User) 

//订单与产品 n:m
Product.belongsToMany(Order,{ through: 'ProductOrder',foreignKey:"productId"})
Order.belongsToMany(Product,{ through: 'ProductOrder',foreignKey:"orderId"})

//产品与购物车 n:m
Cart.belongsToMany(Product,{ through: 'CartProduct',foreignKey:"cartId"})  
Product.belongsToMany(Cart,{ through: 'CartProduct',foreignKey:"productId"})

//注册
router.post("/register",async (ctx,next)=>{
    const {username,password,phone}=ctx.request.body
    let user
    try {
        user=await User.create({username,password,phone})
    } catch (error) {
        ctx.body={
            error
        }
    }
    ctx.body={user}
    
})
//获取用户信息
router.get("/userInfo",async(ctx,next)=>{
    const {uid}=ctx.request.query
    let userInfo
    try {
        userInfo=User.findOne({where:{uid}})
    } catch (error) {
        ctx.body={
            error
        }
    }
    ctx.body={userInfo}
})
//上传产品
router.post("/addProduct",async(ctx,next)=>{
    const {productName,img,stock,price}=ctx.request.body
    let  product
    try {
        product= await Product.create({productName,img,stock,price})
    } catch (error) {
        ctx.body={
            error
        }
    }
    ctx.body={product}
})
//产品详情
router.get("/productDetail",async(ctx,next)=>{
    const {productId}=ctx.request.query
    let productInfo
    try {
        productInfo=await Product.findOne({where:{productId}})
    } catch (error) {
        ctx.body={
            error
        }
    }
    ctx.body={productInfo}
})
//下单
router.post("/order",async(ctx,next)=>{
    const {uid,orderInfo}=ctx.request.body
    let order
    try {
        order=await Order.create({uid})
    } catch (error) {
        
    }
})
//获取用户订单
router.get("/getUserOrder",async(ctx,next)=>{

})
//添加购物车
router.post("/addCart",async(ctx,next)=>{

})
//获取用户购物车信息
router.get("/cartInfo",async(ctx,next)=>{

})

app.use(router.routes())

app.listen(9898,()=>{
    console.log("listen 9898")
})