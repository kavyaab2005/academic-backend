import Material from "../models/Material.js";

export const addMaterial = async (req, res) => {
    try {
        const material = new Material({
            title: req.body.title,
            subject: req.body.subject,
            fileUrl: req.file ? req.file.path : ""
        });

        await material.save();
        res.json({ message: "Material uploaded", material });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMaterials = async (req, res) => {
    const materials = await Material.find();
    res.json(materials);
};
