const _ = require('underscore');

const moreDetail = (req, res) => {
  if (!req.body.searchTerm || !req.body.Database) {
    return res.status(400).json({
      error: 'No Search Term',
    });
  }
  //console.log(req.body.searchTerm);
  //console.log(req.body.Database);
  //console.log(req.body);
    console.log(req.session);
    console.log("ID"+req.sessionID);
    
  const client = req.app.get('client');
    let title;
    if(req.body.Database === 'consult'){
        title = "ข้อหารือ"
    }else{
        title = "เนื้อหา"
    }

  client.msearch({
    body: [
      {
        index: req.body.Database,
        type: 'doc',
      },
      {
        "query": {
        "match_phrase" : {
            [title] : req.body.searchTerm
        }
    },
        size: 5000,
        sort: [{ _id: { order: 'asc' } }],

      },
    ],

  })
    .then((resp) => {
      req.app.set(req.sessionID, resp.responses[0].hits.hits);
      //console.log('search', resp);
      //console.dir(resp.responses[0].hits.hits);
      return res.json({
        redirect: '/searchResult',
      });
    }, (err) => {
      console.trace(err.message);
    });
};

const searchInfos = (req, res) => {
  if (!req.body.searchTerm || !req.body.Database) {
    return res.status(400).json({
      error: 'No Search Term',
    });
  }
  //console.log(req.body.searchTerm);
  //console.log(req.body.Database);
  //console.log(req.body);
  const client = req.app.get('client');

  client.msearch({
    body: [
      {
        index: req.body.Database,
        type: 'doc',
      },
      {
        query: {
          query_string: {
            query: req.body.searchTerm,
          },
        },
        size: 5000,
        sort: [{ _id: { order: 'asc' } }],

      },
    ],

  })
    .then((resp) => {
      //console.log('search', resp);
      //console.dir(resp.responses[0].hits.hits);
      return res.json({

        Infos: resp.responses[0].hits.hits,
      });
    }, (err) => {
      console.trace(err.message);
    });
};

module.exports.searchInfos = searchInfos;
module.exports.moreDetail = moreDetail;
