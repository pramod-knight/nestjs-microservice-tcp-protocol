export default ()=>({
    userServicePort:process.env.USER_SERVICE_PORT,
    userServiceHost:process.env.USER_SERVICE_HOST,
    jwtSecreteKey:process.env.JWT_SECRET
    
})