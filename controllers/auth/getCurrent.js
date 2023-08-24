const getCurrent = async (req, res) => {
    const {name, email, theme} = req.user;

    res.status(200).json({
        name,
        email,
        theme
    });
};

export default getCurrent