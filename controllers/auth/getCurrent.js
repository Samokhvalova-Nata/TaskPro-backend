const getCurrent = async (req, res) => {
    const { name, email, userTheme } = req.user;

    res.status(200).json({
        name,
        email,
        userTheme
    });
};

export default getCurrent;