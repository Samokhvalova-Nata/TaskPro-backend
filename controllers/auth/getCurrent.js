const getCurrent = (req, res) => {
    const { accessToken, refreshToken, _id, name, email, avatarURL, userTheme } = req.user;

    res.status(200).json({
        accessToken,
        refreshToken,
        user: {
            _id,
            name,
            email,
            avatarURL,
            userTheme,
        }
    });
};

export default getCurrent;