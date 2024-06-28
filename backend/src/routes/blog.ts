import { PrismaClient } from '@prisma/client/edge'  
import { withAccelerate } from '@prisma/extension-accelerate'    
import { Hono } from "hono";
import { verify } from "hono/jwt";
import z from "zod"

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userId : string,
    }
}>();



export const createBlogInput = z.object({
    title : z.string(),
    content : z.string()
})

export const updateBlogInput = z.object({
    id : z.string(),
    title : z.string(),
    content : z.string()
})




blogRouter.use("/*" , async (c, next) => {   // Authentication middleware for all the blog related routes to ensure the auth of the use

    try{
        const headers = c.req.header("Authorization");

        console.log("Headers : ",headers)

        if(!headers)
        {
          c.status(401);
              return c.json({ error: "unauthorized" });
        }
    
        // const token = headers.split(" ")[1];
        const token = headers.split(" ")[1];
        console.log(token);
    
        const payload = await verify(token, c.env.JWT_SECRET);
        
        if (!payload) {
          c.status(401);
          return c.json({ error: "unauthorized" });
        }
    
        //@ts-ignore
        c.set('userId', payload.id);
        await next();
    }
    catch(err)
    {
        c.status(401)
        return c.json({error: "User not verified"})
    }
})
 
// app.use("*", (c) => {   // we can also add a middleware to get prismaClient at every request instead of creating  on all controllers explicitly
// 	const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma);
// })




blogRouter.get('/get/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const id = c.req.param('id');
    
        const post = await prisma.post.findUnique({
            where : {
                id
            },
            include: {
                author: true // Include the author details from the User table
            }
        });
        return c.json(post);
    }
    catch(err)
    {
        c.status(401)
        return c.json({error: "User not verified"})
    }
    
})



blogRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const userId = c.get("userId");
        const body = await c.req.json();

        const {success} = createBlogInput.safeParse(body);
     
        if(!success)
        {
            c.status(411);
            return c.json({
            success : false,
            message : "invalid Inputs!!"
            })
        }
    
        const blog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : userId
            }
        })
        return c.json({
            id : blog.id
        })
    }
    catch(err)
    {
        c.status(401)
        return c.json({error: "User not verified"})
    }
})


blogRouter.put('/update', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const userId = c.get("userId");
        const body = await c.req.json();

        const {success} = updateBlogInput.safeParse(body);
        
        if(!success)
        {
            c.status(411);
            return c.json({
            success : false,
            message : "invalid Inputs!!"
            })
        }
    
        const updatedBlog = await prisma.post.update({
            where :{
                id : body.id,
                authorId : userId   //can be able fetch using single query
            },
            data : {
                title : body.title,
                content : body.content
            }
        })
    
        return c.text("Blog is updated");
    }
    catch(err)
    {
        c.status(401)
        return c.json({error: "User not verified"})
    }
})


blogRouter.get("/all" , async(c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try{
        const allPosts = await prisma.post.findMany({
            include: {
                author: true // Include the author details from the User table
            }
        });
        return c.json(allPosts);
    }
    catch(err)
    {
        c.status(401)
        return c.json({error: "User not verified"})
    }
})