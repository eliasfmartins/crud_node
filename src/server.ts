import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

const app = Fastify({
     logger:true
})

const start  = async () =>{
    try{
        await app.listen({
            port:3333
        })
    }catch(err){
        process.exit(1)
    }
}
start()