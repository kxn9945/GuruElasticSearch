const loginPage = (req, res) => {
    res.render('login', {
        csrfToken: req.csrfToken()
    });
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};


const getToken = (request, response) => {
    const req = request;
    const res = response;

    const csrfJSON = {
        csrfToken: req.csrfToken(),
    };

    res.json(csrfJSON);
};

const getSearch = (request, response) => {
    const req = request;
    const res = response;
    console.log("csrf"+ req.sessionID);

    const searchJSON = {
        csrfToken: req.csrfToken(),
        Infos: req.app.get(req.sessionID),
    };

    res.json(searchJSON);
};


module.exports.loginPage = loginPage;

module.exports.logout = logout;

module.exports.getToken = getToken;

module.exports.getSearch = getSearch;
