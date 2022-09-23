import { PrismaClient } from "@prisma/client";
import Pusher from "pusher";

const prisma = new PrismaClient()

const pusher = new Pusher({
    appId:"1480552",
    key: "5969aa217286ec27006e",
    secret: "890daa6a0781f3e66d6d",
    cluster: "us2",
    useTLS: true,
})

export const findAll = async (_req, res) =>{
    try{
        const users = await prisma.user.findMany()

        res.json({
            ok: true,
            data: users,
        })
    }
    catch(error){
        return res.status(500).json({
            ok: false,
            data: error.message,
        })
    }
}

const findOne = async (email) => {
    try{
        return await prisma.user.findFirst({ where: { email } })
    }catch(error){
        return null;
    }
}

export const store = async (req, res) => {
    try{
        const { body } = req;

        const userByEmail = await findOne(body.email)

        if(userByEmail){
            return res.json({
                ok: true,
                data: user
            })
        }

        //body.profile_url = `https://avatars.dicebar.com/api/avataaars/${body.name}.svg`
        body.profile_url = `https://avatars.dicebear.com/api/avataaars/${body.name}.svg`
    
        const user = await prisma.user.create({
            data:{
                ...body,
            },
        });

        pusher.trigger("mychat", "my-list-contacts", {
            message: "Call to update list contacs"
        })

        res.status(201).json({
            ok:true,
            data:user,
        })
    }catch(error){
        return res.status(500).json({
            ok: false,
            data: error.message,
        })
    }
}