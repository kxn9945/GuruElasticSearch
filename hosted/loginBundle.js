'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getcsrfValue = void 0;
var importData = void 0;

var ChangeContentWindow = function ChangeContentWindow(props) {
  return React.createElement('div', null);
};

var prep = function prep(a) {
  try {
    return (typeof a !== 'string' ? String(a) : a).toLowerCase() || 'undefined';
  } catch (ex) {
    return 'exception';
  }
};

var createSearchWindow = function createSearchWindow(csrf) {
  ReactDOM.render(React.createElement(SearchWindow, { csrf: csrf }), document.querySelector('#createContext'));
  ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#content'));
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

var SearchWindow = function SearchWindow(props) {
  return React.createElement(
    'form',
    { id: 'searchForm', name: 'searchForm', onSubmit: handleSearch, action: '/search', method: 'POST', className: 'searchForm card-panel hoverable' },
    React.createElement('input', { id: 'word', className: 'center-align', type: 'text', name: 'searchTerm', placeholder: '\u0E04\u0E49\u0E19\u0E2B\u0E32' }),
    React.createElement(
      'div',
      { className: 'input-field col s12' },
      React.createElement(
        'select',
        { name: 'Database' },
        React.createElement(
          'option',
          { value: '', disabled: true, selected: true },
          '\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25'
        ),
        React.createElement(
          'option',
          { value: 'consult' },
          '\u0E02\u0E49\u0E2D\u0E2B\u0E32\u0E23\u0E37\u0E2D'
        ),
        React.createElement(
          'option',
          { value: 'judge' },
          '\u0E04\u0E33\u0E1E\u0E34\u0E1E\u0E32\u0E01\u0E29\u0E32'
        )
      )
    ),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement(
      'button',
      { type: 'submit', className: 'searchSubmit btn waves-effect waves-light' },
      '  ',
      React.createElement(
        'i',
        { className: 'material-icons' },
        'details'
      )
    )
  );
};

var handleSearch = function handleSearch(e) {
  e.preventDefault();
  if ($('#word').val() == '') {
    handleError('Search field is require');
    return false;
  }

  sendAjax('POST', $('#searchForm').attr('action'), $('#searchForm').serialize(), function (data1) {
    ReactDOM.render(React.createElement(
      'div',
      { id: 'sorting', className: 'row' },
      React.createElement(
        'div',
        { className: 'input-field col s2' },
        React.createElement('select', { id: 'sortingField', className: 'so' }),
        React.createElement(
          'label',
          null,
          '\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A \u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E35\u0E481'
        )
      ),
      React.createElement(
        'div',
        { className: 'input-field col s2' },
        React.createElement('select', { id: 'sortingField2', className: 'so' }),
        React.createElement(
          'label',
          null,
          '\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A \u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E35\u0E482'
        )
      ),
      React.createElement(
        'div',
        { className: 'input-field col s2' },
        React.createElement('select', { id: 'sortingField3', className: 'so' }),
        React.createElement(
          'label',
          null,
          '\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A \u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E35\u0E483'
        )
      ),
      React.createElement(
        'div',
        { className: 'input-field col s2' },
        React.createElement('select', { id: 'sortingField4', className: 'so' }),
        React.createElement(
          'label',
          null,
          '\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A \u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E35\u0E484'
        )
      ),
      React.createElement(
        'div',
        { className: 'input-field col s2' },
        React.createElement('select', { id: 'sortingField5', className: 'so' }),
        React.createElement(
          'label',
          null,
          '\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A \u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E35\u0E485'
        )
      ),
      React.createElement(
        'div',
        { className: 'input-field col s2' },
        React.createElement('select', { id: 'sortingField6', className: 'so' }),
        React.createElement(
          'label',
          null,
          '\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A \u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E35\u0E486'
        )
      ),
      React.createElement(
        'div',
        { className: 'input-field col s2' },
        React.createElement(
          'select',
          { id: 'order' },
          React.createElement(
            'option',
            { value: 'asc' },
            '\u0E08\u0E32\u0E01\u0E19\u0E49\u0E2D\u0E22\u0E44\u0E1B\u0E21\u0E32\u0E01'
          ),
          React.createElement(
            'option',
            { value: 'desc' },
            '\u0E08\u0E32\u0E01\u0E21\u0E32\u0E01\u0E44\u0E1B\u0E19\u0E49\u0E2D\u0E22'
          )
        ),
        React.createElement(
          'label',
          null,
          'Sort Direction'
        )
      ),
      React.createElement(
        'button',
        { type: 'button', id: 'sort', className: 'waves-effect waves-light btn' },
        '\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A'
      ),
      React.createElement('div', { id: 'jsGrid' })
    ), document.querySelector('#grid'));
    document.getElementById('grid').classList.remove('hide');
    //console.log(data1.Infos);
    var objKey = Object.keys(data1.Infos[0]._source);
    for (var x = 0; x < data1.Infos.length; x++) {
      for (var y = 0; y < objKey.length; y++) {
        var temp = data1.Infos[x]._source[objKey[y]].toString();
        var strLength = 200;
        for (var z = 0; z < 10; z++) {
          if (temp.substring(strLength - 1, strLength) != ' ') {
            strLength++;
          }
        }

        temp = temp.substring(0, strLength);
        data1.Infos[x]._source[objKey[y]] = temp;
      }
    }
    sendAjax('POST', '/searchHighlight', 'searchTerm=' + document.getElementById("word").value + '&text=' + JSON.stringify(data1) + '&_csrf=' + getcsrfValue, function (result) {
      var _$$jsGrid;

      //console.log(result);
      var data2 = JSON.parse(result.docs);
      console.log(data2);

      $('#jsGrid').jsGrid((_$$jsGrid = {

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
        pageLoading: false

      }, _defineProperty(_$$jsGrid, 'paging', true), _defineProperty(_$$jsGrid, 'pageSize', 20), _defineProperty(_$$jsGrid, 'pageButtonCount', 5), _defineProperty(_$$jsGrid, 'fields', [{
        name: 'เรื่อง',
        type: 'text',
        itemTemplate: function itemTemplate(value) {
          return $('<div>').addClass('setHeight, detail').html(value);
        }
      }, {
        name: 'วันที่',
        type: 'text',
        itemTemplate: function itemTemplate(value) {
          return $('<div>').addClass('setHeight').html(value);
        }
      }, {
        name: 'ข้อหารือ',
        type: 'text',
        itemTemplate: function itemTemplate(value) {
          return $('<div>').addClass('setHeight').html(value);
        }
      }, {
        name: 'ข้อกฎหมาย',
        type: 'text',
        itemTemplate: function itemTemplate(value) {
          return $('<div>').addClass('setHeight').html(value);
        }
      }, {
        name: 'แนววินิจฉัย',
        type: 'text',
        itemTemplate: function itemTemplate(value) {
          return $('<div>').addClass('setHeight').html(value);
        }
      }, {
        name: 'เลขที่หนังสือ',
        type: 'text',
        itemTemplate: function itemTemplate(value) {
          return $('<div>').addClass('setHeight').html(value);
        }
      }]), _defineProperty(_$$jsGrid, 'rowClick', function rowClick(args) {
        console.dir(args.event.currentTarget);
        var $target = $(args.event.target);
        console.dir($target);

        if ($target.closest('.detail').length) {
          // handle cell click
          sendAjax('POST', '/detail', 'searchTerm=' + args.event.currentTarget.cells[2].textContent + '&Database=' + document.getElementsByName('Database')['0'].value + '&_csrf=' + getcsrfValue, window.open(window.location.origin + '/searchResult'));
        }
      }), _defineProperty(_$$jsGrid, 'noDataContent', 'Not found'), _defineProperty(_$$jsGrid, 'confirmDeleting', true), _defineProperty(_$$jsGrid, 'deleteConfirm', 'Are you sure?'), _defineProperty(_$$jsGrid, 'pagerContainer', null), _defineProperty(_$$jsGrid, 'pageSize', 5), _defineProperty(_$$jsGrid, 'pageButtonCount', 10), _defineProperty(_$$jsGrid, 'pagerFormat', 'Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}'), _defineProperty(_$$jsGrid, 'pagePrevText', 'Prev'), _defineProperty(_$$jsGrid, 'pageNextText', 'Next'), _defineProperty(_$$jsGrid, 'pageFirstText', 'First'), _defineProperty(_$$jsGrid, 'pageLastText', 'Last'), _defineProperty(_$$jsGrid, 'pageNavigatorNextText', '...'), _defineProperty(_$$jsGrid, 'pageNavigatorPrevText', '...'), _defineProperty(_$$jsGrid, 'invalidMessage', 'Invalid data entered!'), _defineProperty(_$$jsGrid, 'loadIndication', true), _defineProperty(_$$jsGrid, 'loadIndicationDelay', 500), _defineProperty(_$$jsGrid, 'loadMessage', 'Please, wait...'), _defineProperty(_$$jsGrid, 'loadShading', true), _defineProperty(_$$jsGrid, 'updateOnResize', true), _defineProperty(_$$jsGrid, 'rowRenderer', null), _defineProperty(_$$jsGrid, 'headerRowRenderer', null), _defineProperty(_$$jsGrid, 'filterRowRenderer', null), _defineProperty(_$$jsGrid, 'insertRowRenderer', null), _defineProperty(_$$jsGrid, 'editRowRenderer', null), _$$jsGrid));

      $('#sort').click(function () {
        var field = $('#sortingField')[0].value;
        var field2 = $('#sortingField2')[0].value;
        var field3 = $('#sortingField3')[0].value;
        var field4 = $('#sortingField4')[0].value;
        var field5 = $('#sortingField5')[0].value;
        var field6 = $('#sortingField6')[0].value;
        var order = $('#order').val();
        console.log(order);

        try {
          importData.sort(function (a, b) {
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

          if (order === 'asc') {} else {
            importData.reverse();
          }
          $('.jsGrid').jsGrid('option', 'data', data);
        } catch (ex) {
          console.log(ex);
        }
      });

      console.log(data1);
      var data = [];

      for (var i = 0; i < data2.Infos.length; i++) {
        data.push(data2.Infos[i]._source);
      }
      importData = data;

      if (data2.Infos[0]._index === 'consult') {
        $('.jsGrid').jsGrid('option', 'fields', [{
          name: 'เรื่อง',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight, detail').html(value);
          }
        }, {
          name: 'วันที่',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }, {
          name: 'ข้อหารือ',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }, {
          name: 'ข้อกฎหมาย',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }, {
          name: 'แนววินิจฉัย',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }, {
          name: 'เลขที่หนังสือ',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }]);
      } else if (data2.Infos[0]._index === 'judge') {
        $('.jsGrid').jsGrid('option', 'fields', [{
          name: 'โจทก์',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight, detail').html(value);
          }
        }, {
          name: 'จำเลย',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }, {
          name: 'เนื้อหา',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }, {
          name: 'เรื่อง',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }, {
          name: 'กฎหมายที่เกี่ยวข้อง',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }, {
          name: 'คำพิพากษาฎีกาที่',
          type: 'text',
          itemTemplate: function itemTemplate(value) {
            return $('<div>').addClass('setHeight').html(value);
          }
        }]);
      }

      $('.jsGrid').jsGrid('option', 'data', data);

      var sortFields = document.getElementsByClassName('so');
      // console.dir(sortFields);
      var objKey = Object.keys(data[0]);

      Array.prototype.forEach.call(sortFields, function (sortField, index) {
        // console.dir(sortField);
        var defaultopt = document.createElement('option');
        defaultopt.textContent = '-';
        defaultopt.selected = true;
        if (index !== 0) {
          sortField.innerHTML = '';
          sortField.add(defaultopt);
        } else {
          sortField.innerHTML = '';
        }

        for (var _i = 0; _i < objKey.length; _i++) {
          if (objKey[_i] !== 'tag' && objKey[_i] !== 'url' && objKey[_i] !== 'เลขตู้') {
            var option = document.createElement('option');
            // console.log("LLL"+ objKey[i]);
            // console.log("LLL1"+ sortField);
            option.text = objKey[_i];
            option.classList.add(objKey[_i]);
            sortField.add(option);
          }
        }
      });

      var soClass = document.getElementsByClassName('so');
      Array.prototype.forEach.call(soClass, function (soElem, index) {
        //  console.log(soClass);
        soElem.addEventListener('change', function (e) {
          var options = document.querySelectorAll('[disabled]');
          for (var _i2 = 0; _i2 < options.length; _i2++) {
            options[_i2].removeAttribute('disabled'); // enable them.
          }

          for (var _x = 0; _x < soClass.length; _x++) {
            console.log(soClass[_x].value);
            var dis = document.getElementsByClassName(soClass[_x].value);
            if (soClass[_x].value !== '-') {
              for (var _i3 = _x; _i3 < dis.length; _i3++) {
                dis[_i3].disabled = true;
              }
            }
          }
          $('select').formSelect();
        });

        var start = document.getElementsByClassName(soClass[0].value);
        for (var _i4 = 0; _i4 < start.length; _i4++) {
          start[_i4].disabled = true;
        }
      });
      console.log(document.getElementById('word').value);

      $('select').formSelect();
    });
  });

  return false;
};

$(document).ready(function () {
  getToken();
});

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

var setup = function setup(csrf) {
  getcsrfValue = csrf;

  ReactDOM.render(React.createElement(SearchWindow, { csrf: csrf }), document.querySelector('#content'));
  ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#createContext'));

  $('.tabs').tabs();
  $('select').formSelect();
};
"use strict";

var handleError = function handleError(message) {
  $('#errorMsg').text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
