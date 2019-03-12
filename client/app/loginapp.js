let getcsrfValue;
let importData;
    
    const prep = (a) => {
    try {
      return (typeof a != 'string' ? String(a) : a).toLowerCase() || 'undefined';
    } catch (ex) {
      return 'exception';
    }
  };

const ChangeContentWindow = props => (
  <div />
);
const createSearchWindow = (csrf) => {
  ReactDOM.render(
    <SearchWindow csrf={csrf} />,
    document.querySelector('#createContext'),
  );
};

const createDisplayResultWindow = (csrf, searchResult) => {
  ReactDOM.render(
    <DisplayWindow searchResult={searchResult} />,
    document.querySelector('#content'),
  );
};

const SearchWindow = props => (
  <form id="searchForm" name="searchForm" onSubmit={handleSearch} action="/search" method="POST" className="searchForm card-panel hoverable">

    <input id="word" className="center-align" type="text" name="searchTerm" placeholder="ค้นหา" />


    <div className="input-field col s12">
      <select name="Database">
        <option value="" disabled selected>เลือกจากฐานข้อมูล</option>
        <option value="consult">ข้อหารือ</option>
        <option value="judge">คำพิพากษา</option>
      </select>
    </div>

    <input type="hidden" name="_csrf" value={props.csrf} />

    <button type="submit" className="searchSubmit btn waves-effect waves-light">  <i className="material-icons">details</i></button>

  </form>
);

const DisplayWindow = function (props) {
  console.log(props);

  if (!props.searchResult) {
    return (
      <div className="searchResultList">
        <h3 className="searchResult card-panel hoverable">We cannot find the information that you are looking for</h3>
      </div>
    );
  }

  const line = props.searchResult._source.tag.map(t => (
    <div className="tagline">
      <p className="searchLink">{t} &nbsp;</p>
    </div>
  ));

  if (props.searchResult._index === 'consult') {
    return (
      <div className="row">
        <div className="col s12 left-align">
          <div className="card">
            <div className="searchResult card-panel hoverable">
              <table className="striped">

                <tbody>
                  <tr>
                    <td className="heading">ข้อหารือ </td>
                    <td>{props.searchResult._source['ข้อหารือ']}</td>
                  </tr>
                  <tr>
                    <td className="heading">วันที่ </td>
                    <td>{props.searchResult._source['วันที่']}</td>
                  </tr>
                  <tr>
                    <td className="heading">ข้อกฎหมาย </td>
                    <td>{props.searchResult._source['ข้อกฎหมาย']}</td>
                  </tr>
                  <tr>
                    <td className="heading">แนววินิจฉัย </td>
                    <td>{props.searchResult._source['แนววินิจฉัย']}</td>
                  </tr>
                  <tr>
                    <td className="heading">เลขที่หนังสือ </td>
                    <td>{props.searchResult._source['เลขที่หนังสือ']}</td>
                  </tr>
                  <tr>
                    <td className="heading">เลขตู้ </td>
                    <td>{props.searchResult._source['เลขตู้']}</td>
                  </tr>
                  <tr>
                    <td className="heading">url </td>
                    <td>{props.searchResult._source.url}</td>
                  </tr>
                  <tr>
                    <td className="heading">tag </td>
                    <td>[{line}]</td>
                    <td id="index" style={{ visibility: 'hidden' }}>{props.searchResult._index}</td>
                  </tr>
                </tbody>
              </table>
              {/*
                <h1 className="card-title">ข้อหารือ: {props.searchResult._source["ข้อหารือ"]}</h1>
                <h2 >วันที่: {props.searchResult._source["วันที่"]}</h2>
                  <p className="card-content">เรื่อง: {props.searchResult._source["เรื่-ง"]}</p>
                   <p className="card-content">ข้อกฎหมาย: {props.searchResult._source["ข้อกฎหมาย"]}</p>
                   <p className="card-content">แนววินิจฉัย: {props.searchResult._source["แนววินิจฉัย"]}</p>
                   <p className="card-content">เลขที่หนังสือ: {props.searchResult._source["เลขที่หนังสือ"]}</p>
                   <p className="card-content">เลขตู้: {props.searchResult._source["เลขตู้"]}</p>
                   <p className="card-content">url: {props.searchResult._source["url"]}</p>
                   <p className="card-content">tag: [{line}]</p>
                   <p id='index' style={{visibility:'hidden'}}>{props.searchResult._index}</p>
*/}

            </div>
          </div>
        </div>
      </div>

    );
  } else if (props.searchResult._index === 'judge') {
    return (
      <div className="row">
        <div className="col s12 left-align">
          <div className="card">
            <div className="searchResult card-panel hoverable">
              <table className="striped">

                <tbody>
                  <tr>
                    <td>โจทก์ </td>
                    <td>{props.searchResult._source['โจทก์']}</td>
                  </tr>
                  <tr>
                    <td>จำเลย </td>
                    <td>{props.searchResult._source['จำเลย']}</td>
                  </tr>
                  <tr>
                    <td>เรื่อง </td>
                    <td>{props.searchResult._source['เรื่อง']}</td>
                  </tr>
                  <tr>
                    <td>เนื้อหา </td>
                    <td>{props.searchResult._source['เนื้อหา']}</td>
                  </tr>
                  <tr>
                    <td>กฎหมายที่เกี่ยวข้อง </td>
                    <td>{props.searchResult._source['กฎหมายที่เกี่ยวข้อง']}</td>
                  </tr>
                  <tr>
                    <td>คำพิพากษาฎีกาที่ </td>
                    <td>{props.searchResult._source['คำพิพากษาฎีกาที่']}</td>
                  </tr>
                  <tr>
                    <td>url </td>
                    <td>{props.searchResult._source.url}</td>
                  </tr>
                  <tr>
                    <td>tag </td>
                    <td>[{line}]</td>
                    <td id="index" style={{ visibility: 'hidden' }}>{props.searchResult._index}</td>
                  </tr>
                </tbody>
              </table>
              {/*
        <div className="row">
        <div className="col s12">
        <div className="card">
        <div className='searchResult card-panel hoverable'>
                <h1 className="card-title">โจทก์: {props.searchResult._source["โจทก์"]}</h1>
                <h2>จำเลย: {props.searchResult._source["จำเลย"]}</h2>
                  <p className="card-content">เรื่อง: {props.searchResult._source["เรื่อง"]}</p>
                   <p className="card-content">เนื้อหา: {props.searchResult._source["เนื้อหา"]}</p>
                   <p className="card-content">กฎหมายที่เกี่ยวข้อง: {props.searchResult._source["กฎหมายที่เกี่ยวข้อง"]}</p>
                   <p className="card-content">คำพิพากษาฎีกาที่: {props.searchResult._source["คำพิพากษาฎีกาที่"]}</p>
                   <p className="card-content">url: {props.searchResult._source["url"]}</p>
                   <p className="card-content">tag: [{line}]</p>
                   <p id='index' style={{visibility:'hidden'}}>{props.searchResult._index}</p>

            </div>
            </div>
            </div>
            </div>
*/}

            </div>
          </div>
        </div>
      </div>


    );
  }
};

const handleAjax = (method, action, serialize,source) => {
  sendAjax(method, action, serialize, (data1) => {
ReactDOM.render(
      <div id="sorting" className="row">
        <div className="input-field col s2">
          <select id="sortingField" className="so" />
                    <label>จัดลำดับ ครั้งที่1</label>
        </div>
        <div className="input-field col s2">
          <select id="sortingField2" className="so" />
          <label>จัดลำดับ ครั้งที่2</label>
        </div>
        <div className="input-field col s2">
          <select id="sortingField3" className="so" />
          <label>จัดลำดับ ครั้งที่3</label>
        </div>
        <div className="input-field col s2">
          <select id="sortingField4" className="so" />
          <label>จัดลำดับ ครั้งที่4</label>
        </div>
        <div className="input-field col s2">
          <select id="sortingField5" className="so" />
          <label>จัดลำดับ ครั้งที่5</label>
        </div>
        <div className="input-field col s2">
          <select id="sortingField6" className="so" />
          <label>จัดลำดับ ครั้งที่6</label>
        </div>
        <div className="input-field col s2">
          <select id="order">
            <option value="asc">จากน้อยไปมาก</option>
            <option value="desc">จากมากไปน้อย</option>
          </select>
          <label>Sort Direction</label>
        </div>

        <button type="button" id="sort" className="waves-effect waves-light btn">จัดลำดับ</button>

        <div id="jsGrid" />
      </div>,
      document.querySelector('#grid'),
    );
    document.getElementById('grid').classList.remove('hide');
      console.log(data1);
      const objKey = Object.keys(data1.Infos[0]._source);
      for(let x = 0;x<data1.Infos.length;x++){
          for(let y=0;y<objKey.length;y++){
          let temp = data1.Infos[x]._source[objKey[y]].toString();
          let strLength = 200;
          for(let z=0;z<10;z++){
            if(temp.substring(strLength-1,strLength) != ' '){
              strLength++;
          }
          }
          temp = temp.substring(0,strLength);
          data1.Infos[x]._source[objKey[y]] = temp;
          }

      }
      console.log(source);
    sendAjax('POST', '/searchHighlight', `searchTerm=${source}&text=${JSON.stringify(data1)}&_csrf=${getcsrfValue}`, (result) => {
        //console.log(result);
        let data2 = JSON.parse(result.docs);
        console.log(data2);
      

    $('#jsGrid').jsGrid({

      autoload: true,
      height: 'auto',
      width: '90%',


      heading: true,
      filtering: false,
      inserting: false,
      editing: false,
      selecting: true,
      sorting: true,
      paging: true,
      pageLoading: false,


      paging: true,
      pageSize: 20,
      pageButtonCount: 5,


      fields: [
        {
          name: 'เรื่อง',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight, detail').html(value);
          },
        },
        {
          name: 'วันที่',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'ข้อหารือ',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'ข้อกฎหมาย',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'แนววินิจฉัย',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'เลขที่หนังสือ',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        /* { name: "วันที่", type: "textarea", width: 150 },
            { name: "Rating", type: "number", width: 50, align: "center",
                itemTemplate: function(value) {
                    return $("<div>").addClass("rating").append(Array(value + 1).join("&#9733;"));
                }
            },
            { name: "Price", type: "number", width: 50,
                itemTemplate: function(value) {
                    return value.toFixed(2) + "$"; }
            }
            */
      ],


      // rowClass: function(item, itemIndex) { ... },
      rowClick(args) {
        console.dir(args.event.currentTarget);
        const $target = $(args.event.target);
        console.dir($target);

        if ($target.closest('.detail').length) {
          // handle cell click

          sendAjax('POST', '/detail', `searchTerm=${args.event.currentTarget.cells[2].textContent}&Database=${document.getElementsByName('Database')['0'].value}&_csrf=${getcsrfValue}`, window.open(`${window.location.origin}/searchResult`));
        }
      },
      // rowDoubleClick: function(args) { ... },


      noDataContent: 'Not found',

      confirmDeleting: true,
      deleteConfirm: 'Are you sure?',

      pagerContainer: null,
      pageSize: 5,
      pageButtonCount: 10,
      pagerFormat: 'Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}',
      pagePrevText: 'Prev',
      pageNextText: 'Next',
      pageFirstText: 'First',
      pageLastText: 'Last',
      pageNavigatorNextText: '...',
      pageNavigatorPrevText: '...',

      // invalidNotify: function(args) { ... }
      invalidMessage: 'Invalid data entered!',

      loadIndication: true,
      loadIndicationDelay: 500,
      loadMessage: 'Please, wait...',
      loadShading: true,

      updateOnResize: true,

      rowRenderer: null,
      headerRowRenderer: null,
      filterRowRenderer: null,
      insertRowRenderer: null,
      editRowRenderer: null,

    });


    $('#sort').click(() => {
      const field = $('#sortingField')[0].value;
      const field2 = $('#sortingField2')[0].value;
      const field3 = $('#sortingField3')[0].value;
      const field4 = $('#sortingField4')[0].value;
      const field5 = $('#sortingField5')[0].value;
      const field6 = $('#sortingField6')[0].value;
      const order = $('#order').val();
      console.log(order);

      try {
        importData.sort((a, b) => {
          a = prep(a[field]);
          b = prep(b[field]);
          if (a < b) {
            // console.log(-1);
            return -1;
          }
          if (a > b) {
            // console.log(1);
            return 1;
          }
          if (a === b && field2 != '-') {
            a = prep(a[field2]);
            b = prep(b[field2]);

            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
          }
          if (a === b && field3 != '-') {
            a = prep(a[field3]);
            b = prep(b[field3]);

            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
          }
          if (a === b && field4 != '-') {
            a = prep(a[field4]);
            b = prep(b[field4]);

            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
          }
          if (a === b && field5 != '-') {
            a = prep(a[field5]);
            b = prep(b[field5]);

            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
          }
          if (a === b && field6 != '-') {
            a = prep(a[field6]);
            b = prep(b[field6]);

            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
          }
          console.log(a);
          console.log(b);
          console.log(0);
          return 0;
        });

        if (order === 'asc') {

        } else {
          importData.reverse();
        }
        $('.jsGrid').jsGrid('option', 'data', data);
      } catch (ex) {
        console.log(ex);
      }
    });


    console.log(data1);
    const data = [];

    for (let i = 0; i < data2.Infos.length; i++) {
      data.push(data2.Infos[i]._source);
    }
    importData = data;

    if (data2.Infos[0]._index === 'consult') {
      $('.jsGrid').jsGrid('option', 'fields', [
        {
          name: 'เรื่อง',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight, detail').html(value);
          },
        },
        {
          name: 'วันที่',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'ข้อหารือ',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'ข้อกฎหมาย',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'แนววินิจฉัย',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'เลขที่หนังสือ',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },

      ]);
    } else if (data2.Infos[0]._index === 'judge') {
      $('.jsGrid').jsGrid('option', 'fields', [
        {
          name: 'โจทก์',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight, detail').html(value);
          },
        },
        {
          name: 'จำเลย',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'เนื้อหา',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'เรื่อง',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'กฎหมายที่เกี่ยวข้อง',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },
        {
          name: 'คำพิพากษาฎีกาที่',
          type: 'text',
          itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          },
        },


      ]);
    }

    $('.jsGrid').jsGrid('option', 'data', data);

    const sortFields = document.getElementsByClassName('so');
    // console.dir(sortFields);
    const objKey = Object.keys(data[0]);

    Array.prototype.forEach.call(sortFields, (sortField, index) => {
      // console.dir(sortField);
      const defaultopt = document.createElement('option');
      defaultopt.textContent = '-';
      defaultopt.selected = true;
      if (index !== 0) {
        sortField.innerHTML = '';
        sortField.add(defaultopt);
      } else {
        sortField.innerHTML = '';
      }

      for (let i = 0; i < objKey.length; i++) {
        if (objKey[i] !== 'tag' && objKey[i] !== 'url' && objKey[i] !== 'เลขตู้') {
          const option = document.createElement('option');
          // console.log("LLL"+ objKey[i]);
          // console.log("LLL1"+ sortField);
          option.text = objKey[i];
          option.classList.add(objKey[i]);
          sortField.add(option);
        }
      }
    });

    const soClass = document.getElementsByClassName('so');
    Array.prototype.forEach.call(soClass, (soElem, index) => {
      //  console.log(soClass);
      soElem.addEventListener('change', (e) => {
        const options = document.querySelectorAll('[disabled]');
        for (let i = 0; i < options.length; i++) {
          options[i].removeAttribute('disabled'); // enable them.
        }


        for (let x = 0; x < soClass.length; x++) {
          console.log(soClass[x].value);
          const dis = document.getElementsByClassName(soClass[x].value);
          if (soClass[x].value !== '-') {
            for (let i = x; i < dis.length; i++) {
              dis[i].disabled = true;
            }
          }
        }
        $('select').formSelect();
      });

      const start = document.getElementsByClassName(soClass[0].value);
      for (let i = 0; i < start.length; i++) {
        start[i].disabled = true;
      }
    });
    console.log(document.getElementById('word').value);

    $('select').formSelect();
      

  });
  });
};

const handleSearch = (e) => {
  e.preventDefault();

  handleAjax('POST', $('#searchForm').attr('action'), $('#searchForm').serialize(),document.getElementById("word"));



  return false;
};

$(document).ready(() => {
  getSearch();
});

const getSearch = () => {
  sendAjax('GET', '/getSearch', null, (result) => {
    console.log(result.Infos[0]);
    setup(result.csrfToken, result.Infos[0]);
  });
};

const setup = (csrf, searchResult) => {
  getcsrfValue = csrf;

  createSearchWindow(csrf);

  createDisplayResultWindow(csrf, searchResult);

  Array.from(document.getElementsByClassName('searchLink')).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const database = document.getElementById('index').textContent;
      let location = e.target.textContent;
        location = e.target.textContent.split(" ");
      //console.log(location[0]);
      handleAjax('POST', $('#searchForm').attr('action'), `searchTerm=${location[0]}&Database=${database}&_csrf=${getcsrfValue}`,location[0]);

      return false;
    });
  });

  $('.tabs').tabs();
  $('select').formSelect();
};

