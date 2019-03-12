let getcsrfValue;
let importData;

const ChangeContentWindow = props => (
  <div />
);

const prep = (a) => {
  try {
    return (typeof a !== 'string' ? String(a) : a).toLowerCase() || 'undefined';
  } catch (ex) {
    return 'exception';
  }
};

const createSearchWindow = (csrf) => {
  ReactDOM.render(
    <SearchWindow csrf={csrf} />,
    document.querySelector('#createContext'),
  );
  ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
    document.querySelector('#content'),
  );
};

/*
const ExploreList = function (props) {
  if (props.infos.length === 0) {
    return (
      <div className="infoList">
        <h3 className="empty">No Records</h3>
      </div>
    );
  }
    console.dir(props.infos);
    let data = [];


    for(let i =0;i<props.infos.length;i++){
        data.push(props.infos[i]._source);
    }

    if(props.infos[0]._index === "consult"){

        $(".jsGrid").jsGrid("option", "fields",[
            { name: "เรื่อง", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "วันที่", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "ข้อหารือ", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "ข้อกฎหมาย", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "แนววินิจฉัย", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "เลขที่หนังสือ", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } }

        ]);

    }else if(props.infos[0]._index === "judge"){

        $(".jsGrid").jsGrid("option", "fields",[
            { name: "จำเลย", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "เนื้อหา", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "กฎหมายที่เกี่ยวข้อง", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "คำพิพากษาฎีกาที่", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "เรื่อง", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } },
            { name: "โจทก์", type: "text",
             itemTemplate: function(value) {
                 return $("<div>").addClass("setHeight").text(value);
             } }

        ]);

    }

    $(".jsGrid").jsGrid("option", "data",data);

            document.getElementById("sortingField").innerHTML = "";

        let objKey = Object.keys(data[0]);
        let sortField = document.getElementById("sortingField");

        for(let i=0;i<objKey.length;i++){
            var option = document.createElement("option");
            //console.log("LLL"+ objKey[i]);
            //console.log("LLL1"+ sortField);
            option.text = objKey[i];
            sortField.add(option);

        }

            return (
        <div>
        </div>
        );

};
*/

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

const handleSearch = (e) => {
  e.preventDefault();
  if ($('#word').val() == '') {
    handleError('Search field is require');
    return false;
  }


  sendAjax('POST', $('#searchForm').attr('action'), $('#searchForm').serialize(), (data1) => {
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
      //console.log(data1.Infos);
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
    sendAjax('POST', '/searchHighlight', `searchTerm=${document.getElementById("word").value}&text=${JSON.stringify(data1)}&_csrf=${getcsrfValue}`, (result) => {
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
  
  return false;
};

$(document).ready(() => {
  getToken();
});

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

const setup = (csrf) => {
  getcsrfValue = csrf;

  ReactDOM.render(
    <SearchWindow csrf={csrf} />,
    document.querySelector('#content'),
  );
  ReactDOM.render(
    <ChangeContentWindow csrf={csrf} />,
    document.querySelector('#createContext'),
  );

  $('.tabs').tabs();
  $('select').formSelect();
};

