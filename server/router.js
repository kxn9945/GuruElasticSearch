const controllers = require('./controllers');
const mid = require('./middleware');


//const router = (app, words, client) => {
const router = (app, client) => {
    //////FOR UPLOAD JSON TO ELASTIC DON'T TOUCH
    /*
  function addJson(request, response) {
    console.log(words.length);
    let x = 0;
    const bulkData = [];

    for (let i = 0; i < words.length;) {
      bulkData.push({
        index: {
          _index: 'consult',
          _type: 'doc',
          _id: i,
        },
      });
      bulkData.push(words[i]);

      x = i;
      i += 1;
    }
    client.bulk({
      refresh: true,
      body: bulkData,
    }, (err1, res1) => {
      if (err1) {
        console.log('error send halp');
        console.log(err1);
      }
    });
    console.log(bulkData.length);
    console.log("words length: "+words.length);
    response.send(words[0]);
  }

*/
  //app.post('/create', mid.requiresSecure, mid.requiresLogout, controllers.Info.makeInfo);
  app.post('/search', mid.requiresSecure, mid.requiresLogout, controllers.Info.searchInfos);
  app.get('/getSearch', mid.requiresSecure, controllers.Account.getSearch);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  //app.get('/getAll', mid.requiresSecure, mid.requiresLogout, controllers.Info.getAll);
  app.post('/detail', mid.requiresSecure, mid.requiresLogout, controllers.Info.moreDetail);
  app.get('/searchResult', mid.requiresSecure, mid.requiresLogout, controllers.Search.resultPage);
  app.post('/searchHighlight', mid.requiresSecure, mid.requiresLogout, controllers.Search.searchHighlight);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  //app.get('/all', addJson);
};


module.exports = router;
