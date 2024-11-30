import { NextFunction, Request, Response, Router } from "express";
import { fromDataEntity } from "../../libs/dataEntity";
import { addAccount } from "./service/addAccount";
import { getAccount, getSingleAccount } from "./service/getAccount";
import { deleteAccount } from "./service/deleteAccount";
import { ScrollToGetPost } from "../../core-playwright/AccessTradde/scrollFB";
import { configCookie } from "../../utils/configCookie";
import { sendMessage } from "../../core-playwright/AccessTradde/sendMessage";
import { scrollFromSearch } from "../../core-playwright/AccessTradde/scrollFromSearch";

export const AccountRoute = Router();

// add an account  when found
AccountRoute.post("/", async (req, res, next): Promise<void> => {
    try {
        const account = await addAccount(req.body);
        res.status(200).send(fromDataEntity(account));
    } catch (e) {
        console.error(e);
        next();
    }
});
//get all account from database
AccountRoute.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const account = await getAccount();
        res.json(account);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//get 1 account from database
AccountRoute.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await getSingleAccount(req.params.id);
        res.json(post);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//update an account
// AccountRoute.put("/:id", async (req, res, next) => {
//     const updatedAccount = await putAccount(req.body, req.params.id);
//     res.status(200).json(updatedAccount);
//     next();
// });

//delete an account
AccountRoute.delete("/:id", async (req, res, next) => {
    try {
        const result = await deleteAccount(req.params.id);
        if (result.status === 200) {
            res.status(200).json({
                status: 200,
                message: "Resource deleted successfully",
            });
        } else if (result.status === 404) {
            res.status(404).json({
                status: 404,
                message: "Resource not found",
            });
        } else {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//send message to account
AccountRoute.put("/sendMessage", async (req, res, next) => {
    try {
        const listProfile = req.body.listProfile;
        sendMessage(listProfile[0]);
        let currentIndex = 1; 
        const intervalId = setInterval(() => {
            if (currentIndex < listProfile.length) {
                console.log("start send message by interval ");
                sendMessage(listProfile[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(intervalId); 
            }
        }, 3500000);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//find more post
AccountRoute.put("/scroll", async (req, res, next) => {
    try {
        console.log("req.body.account :",req.body.account);
        const cookie = await configCookie(req.body.account);
        await ScrollToGetPost(cookie);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//find more post by search section
AccountRoute.put("/scrollBySearch", async (req, res, next) => {
    try {
        console.log("req.body.account :",req.body.account);
        const cookie = await configCookie(req.body.account);
        await scrollFromSearch(cookie);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
