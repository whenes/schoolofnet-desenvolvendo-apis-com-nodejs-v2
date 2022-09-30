(function($) {
  console.log('Hello' + jQuery);

  const listData = function() {
    $.get('http://localhost:3000/bills', function(result) {
      console.log(result);
      $('#list_table tbody').empty();
      if (!result.data.length && !result.status) {
        return;
      }
      result.data.forEach(function(bill) {
          console.log(bill.title, bill.price)
          const template = ` 
            <tr>
              <td>${ bill.title }</td>
              <td>${ bill.price }</td>
              <td> <a href="http://localhost:3000/address/${ bill.cep }" target="_blank">${ bill.cep }</a> </td>
              <td> <button id="btn_delete" type="button" class="btn btn-danger btn-small value="${bill._id} data-id="${bill._id}">Delete</button> </td>
            </tr>
          `;
          $('#list_table tbody').append(template);
        });
    });
  };

  $(document).ready(function() {
    const createData = function() {
      console.log('saved');
      const title = $('input[name="title"]').val();
      const price = $('input[name="price"]').val();
      const category = $('#select_category').val();
      const cep = $('input[name="cep"]').val();

      if (!title || !price || !category) {
        console.log('invalid body');
        return;
      }
      $.post('http://localhost:3000/bills/', { title, price, category, cep }, function(result) {
        console.log(result);
        $('input[name="title"]').val('');
        $('input[name="price"]').val('');
        $('#select_category').val('');
        $('input[name="cep"]').val('');
        listData();
      });
    };
    
    const populateCategory = function() {
      $.get('http://localhost:3000/categories', function(result) {
        if (!result.data.length && !result.status) {
          return;
        }
        result.data.forEach(function(category) {
          const template = `
            <option value=${ category._id }>${category.name}</option> 
          `;
          $('#select_category').append(template);
        });
      });
    };
    const createDataCat = function() {
      const name = $('input[name="name"]').val();
      if (!name) {
        return;
      }
      $.post('http://localhost:3000/categories/', { name }, function(result) {
        $('input[name="name"]').val('');
      });
    };

    const removeData = function() {
      const id = $(this).data('id');
      $.ajax({
        url: `http://localhost:3000/bills/${ id }`,
        type: 'DELETE',
        success: function(result) {
          listData();
        }
      });
    }
    
    listData();
    populateCategory();
    $('#btn_create').on('click', createData);
    $('#btn_create_cat').on('click', createDataCat);
    $('#list_table tbody').on('click', '#btn_delete', removeData);    
  });
})(jQuery);