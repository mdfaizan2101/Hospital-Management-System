export const generateToken = (user, message, statusCode, res) => {
    const token  = user.generateJsonWebToken();
    // Determine the cookie name based on the user's role
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

    // Set the cookie with the token and expiration
    // Use the cookie name to differentiate between admin and patient tokens
    res.status(statusCode)
    .cookie(cookieName, token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ), // Convert days to milliseconds
        httpOnly: true, // Make the cookie inaccessible to JavaScript
    })
    .json({
        success: true,
        message,
        user,
        token,
    });
}