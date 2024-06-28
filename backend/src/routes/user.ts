import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'  
import { withAccelerate } from '@prisma/extension-accelerate'    //we need this library for the connection pooling
import { sign } from 'hono/jwt';
import z from "zod"

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();



export const signupInput = z.object({
  email : z.string().email(),
  password :  z.string().min(6),
  name : z.string()
})

export const signinInput = z.object({
  email : z.string().email(),
  password : z.string().min(6),
})



userRouter.post("/signup" , async(c) => {
    // // c mean context like your res, req, env variables and more
  const prisma = new PrismaClient({
    // @ts-ignore -> this will not check the type checking for next line 
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
     const body = await c.req.json();

     const {success} = signupInput.safeParse(body);
     
     if(!success)
     {
        c.status(411);
        return c.json({
          success : false,
          message : "invalid Inputs!!"
        })
     }
     const user = await prisma.user.create({
       data : {
         name : body.name,
         email : body.email,
         password : body.password,
       }
     })

    //  the way to create token using Hono
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
  }
  catch(e)
  {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
  
})
  
  
userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const body = await c.req.json();

    const {success} = signinInput.safeParse(body);
     
    if(!success)
    {
       c.status(411);
       return c.json({
         success : false,
         message : "invalid Inputs!!"
       })
    }
    const user = await prisma.user.findUnique({
      where : {
        email : body.email,
        password: body.password
      }
    })

    if(!user)
    {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({id: user.id} , c.env.JWT_SECRET);

    return c.json({jwt});
  }
  catch(err)
  {
    c.status(403);
        return c.json({ error: "error while signing" });
  }  
})
