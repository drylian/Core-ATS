import express from "express";
import { CreateCaptcha, ValidCaptcha } from "@/utils/ALTcaptcha";

const router = express.Router();

router.post("/challenge", (req, res) => {
    const data = CreateCaptcha()
    res.status(200).json(data)
});
router.post("/checker", (req, res) => {
    const { result } = req.body
    console.log(result)
    if ( !result) return res.status(400).json({ completed: false, code: null })
    const data = ValidCaptcha(result)
    if (data) {
        res.status(200).json({completed:true, code:data})
    } else {
        res.status(200).json({completed:false, code:null})
    }
});

export default router;
