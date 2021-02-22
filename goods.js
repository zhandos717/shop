const cart = {
    'P92779': {
        'name':'Часы CASIO MTP-1375L-1AVDF Black',
        'url':'#',
        'image': 'https://cdn-kaspi.kz/shop/medias/sys_master/images/images/h54/hb9/12076358631454/casio-mtp-1375l-1avdf-black-21400938-1.png',
        'price':27000.00
    },
       'P927': {
        'name':'Часы CASIO MTP-1314D-2AVDF Silver',
        'url':'#',
        'image': 'https://cdn-kaspi.kz/shop/medias/sys_master/images/images/hd1/hf1/10037134000158/casio-mtp-1314d-2avdf-silver-21401225-1.png',
        'price':18980.00
    },
       'P9779': {
        'name':'Часы CASIO MTP-1BVUDF Silver',
        'url':'#',
        'image': 'https://cdn-kaspi.kz/shop/medias/sys_master/images/images/h47/hca/9721502498846/casio-mtp-vd01d-1bvudf-silver-21401969-1.png',
        'price':22000.00
    },
       'P279': {
        'name':'Часы CASIO A158WA-1DF Silver',
        'url':'#',
        'image': 'https://cdn-kaspi.kz/shop/medias/sys_master/images/images/h08/hf1/9707040374814/casio-a158wa-1df-silver-21401320-1.png',
        'price':10975.00
    },
       'PW92779': {
        'name':'Часы CASIO MTP-1183Q-9ADF Brown',
        'url':'#',
        'image': 'https://cdn-kaspi.kz/shop/medias/sys_master/images/images/h58/h34/10033861558302/casio-mtp-1183q-9adf-brown-21401444-1.png',
        'price':13928.00
    },
       'W2779': {
        'name':'Часы CASIO MTP-1375D-1AVDF Silver',
        'url':'#',
        'image': 'https://cdn-kaspi.kz/shop/medias/sys_master/images/images/h23/h37/10036981596190/casio-mtp-1375d-1avdf-silver-21401211-1.png',
        'price':35985.00
    },
       'Pfsfs79': {
        'name':'Часы CASIO MTP-1374L-7A1VDF Brown',
        'url':'#',
        'image': 'https://cdn-kaspi.kz/shop/medias/sys_master/images/images/hd7/hd2/9720877318174/casio-mtp-1374l-7a1vdf-brown-21401925-1.png',
        'price':33800.00
    },
}

// Проверяем объект на пустоту
function isEmpty(obj) {
    for(var key in obj)
    {
        return false;
    }
       return true;
}

 let out = '<div class="pricing-table row">';
 for(let key in cart){
    out += `<div class="col col-md-6 col-lg-4 col-sm-6">`;
    out += `<div class="package feature text-center">`;
    out += `<h3>${cart[key]['name']}</h3>`;
    out += `<img src="${cart[key]['image']}">`;
    out += `<p class="price">${cart[key]['price']} тенге</p>`;
    out += `<button class="to-cart button-primary" data-articul="${key}">в корзину </button>`;
    out += `</div>`; 
    out += `</div>`; 
 }
 out += `</div>`; 
// Выводим данные в HTML
 document.querySelector('.goods').innerHTML = out;

// Получаем данные из LocalStorage
function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o){
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}
const data = getCartData() || {};// получаем данные корзины или создаём новый объект, если данных еще нет

// Добавляю продукт в корзину
document.querySelector('.goods').addEventListener('click', event=>{
    if(event.target.classList.contains('to-cart')){
        let articul = event.target.dataset['articul'];
        if(data[articul] !== undefined){
            data[articul]['count']++;
        }else{
            data[articul] = cart[articul];
            data[articul]['count'] = 1;  
        }
     setCartData(data)
    }
    checkCart();
})
//проверяю наличие корзину в localStoroge
function checkCart(){
    let mini_cart =  getCartData();

    if(isEmpty(mini_cart)){
    let out_cart = 'Корзина пуста';
    document.querySelector('.modal-body').innerHTML = out_cart;
    document.querySelector('.badge').innerHTML = 0;
    }else{
    let grand_price = 0;
    let count_total = 0;
    let out_cart = '<table class="table">';
    out_cart += `<tbody>`;
     for(let key in mini_cart){
        out_cart += `<tr >`;
        out_cart += `<td><img width="50px" src="${mini_cart[key]['image']}"></td>`;
        out_cart += `<td>${mini_cart[key]['name']}</td>`;
        out_cart += `<th> <button class='to-cart btn btn-success plus fa fa-plus' data-articul="${key}">  </button> </th>`;
        out_cart += `<td>${mini_cart[key]['count']}  </td>`;
        out_cart += `<th> <button class='to-cart btn btn-success minus fa fa-minus' data-articul="${key}"> </button> </th>`;
        out_cart += `<td>${mini_cart[key]['price']} тенге  </td>`;
         out_cart += `<td> <button class='to-cart btn btn-danger remove fa fa-trash' data-articul="${key}"> </button> </td>`;
        out_cart += `</tr>`;
        grand_price += mini_cart[key]['price']*mini_cart[key]['count'];
        count_total += mini_cart[key]['count'];
    }
    out_cart += `</tbody><tfoot><tr>`;
    out_cart += `<th colspan='2' class='text-center'>Итог</th>`;
    out_cart += `<th colspan='2'> кл. ${count_total} </th>`;
    out_cart += `<th colspan='3' class='text-right'>${grand_price} тенге  </th>`;
    out_cart += `</tr></tfoot></table>`; 
    document.querySelector('.badge').innerHTML = count_total;
    document.querySelector('.modal-body').innerHTML = out_cart
    };


};


document.querySelector('#myModal').onclick = () => {
    document.querySelector('.modal').classList.add('modal-open');
};

document.querySelector('.modal').onclick = event => {
    let articul = event.target.dataset['articul'];
    //let articul = event.parentNode;
    if(event.target.classList.contains('btn-close')){
    document.querySelector('.modal').classList.remove('modal-open');
    }else if(event.target.classList.contains('minus')){
    if(data[articul]['count'] >1) data[articul]['count']--;
    else delete data[articul];
    }else if(event.target.classList.contains('plus')){
        data[articul]['count']++;
    }else if(event.target.classList.contains('remove')){
        delete data[articul];
    } 
    setCartData(data)
    checkCart();
    // console.log(event);
    //console.log(articul);
    console.log(event);
};



// Вызываю счетчик 
checkCart();


