const login = (req,res)=> {
res.send("login")
}

const register = (req,res)=> {
res.send('register')
}

const logout = (req, res)=> {
res.send('logout')
}

module.exports = {
    login, logout, register
}