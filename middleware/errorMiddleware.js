const errorHandler = (err, req, res, next) => {
    console.log("❌ ERROR:", err.message);
    res.status(500).json({ error: err.message });
};

export default errorHandler;
