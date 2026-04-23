import { Router } from "express";
import multer from "multer";
import path from "path";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import {
    uploadBill,
    getUserBills,
    getBillById,
} from "../controllers/billController.js";

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, "uploads/");
    },
    filename(_req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `bill-${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (_req, file, cb) => {
    const allowed = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
    ];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, PNG, WebP, and PDF files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

const router = Router();

router.post(
    "/upload",
    requireAuth,
    upload.single("bill"),
    asyncHandler(uploadBill)
);
router.get("/", requireAuth, asyncHandler(getUserBills));
router.get("/:id", requireAuth, asyncHandler(getBillById));

export default router;
