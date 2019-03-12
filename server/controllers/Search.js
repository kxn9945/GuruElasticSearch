const highlighter = require('keyword-highlighter');
const resultPage = (req, res) => {
    res.render('app', {
        csrfToken: req.csrfToken(),
    });
};

const searchHighlight = (req, res) => {

   let result = highlighter(req.body.searchTerm, req.body.text);
   return res.json({
        docs: result,
      });
};

module.exports.resultPage = resultPage;
module.exports.searchHighlight = searchHighlight;