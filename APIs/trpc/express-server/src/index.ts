import express, { Request, Response } from "express";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";


const app = express();
const t = initTRPC.create();

const AppRouter = t.router({
    hello: t.procedure.query(()=> "hello from trpc server"),
    logToServer: t.procedure.input((v)=>{
        if(typeof v === "string") return v;
        throw new Error("invalid input");
    }).mutation(req=>{
        console.log(req.input);
        return req.input
    })
})

app.use(cors({
    origin: "http://localhost:5173",
}))
app.use('/trpc', createExpressMiddleware({router: AppRouter}))

app.listen(3000, () => {
    console.log(`server at http://localhost:3000`);
})

export type AppRouter = typeof AppRouter