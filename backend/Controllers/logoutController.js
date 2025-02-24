const logoutUser = (req, res) => {
    // Clear the JWT cookie when logging out
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  
    return res.status(200).json({ message: 'Logout successful' });
  };
  
  module.exports = { logoutUser };
  
  