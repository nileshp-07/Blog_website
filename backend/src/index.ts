import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PrismaClient } from '@prisma/client/edge'  
import { withAccelerate } from '@prisma/extension-accelerate'    //we need this library for the connection pooling
import { sign, verify } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';


// Create the main Hono app
const app = new Hono();

app.use("/*" , cors());
app.get("/" , (c) => {
   return c.text("Server is running")
})

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);



export default app;