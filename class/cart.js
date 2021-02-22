let mini_cart =  localStorage.getItem('cart');

let count_product = JSON.parse(mini_cart);
let grand_price = 0;
let count_total = 0;
let out = '<table class="table table-bordered">';
out += `<tbody>`;
for(let key in count_product){
    out += `<tr>`;
    out += `<td> <button class='to-cart btn btn-success'> X </button> </td>`;
    out += `<td><img src="${count_product[key]['image']}"></td>`;
    out += `<td>${count_product[key]['name']}</td>`;
    out += `<th> <button class='to-cart btn btn-success plus'> + </button> </th>`;
    out += `<td>${count_product[key]['count']}  </td>`;
    out += `<th> <button class='to-cart btn btn-success minus'> - </button> </th>`;
    out += `<td>${count_product[key]['price']} тенге  </td>`;
    out += `</tr>`;
    grand_price += count_product[key]['price'];
    count_total += count_product[key]['count'];
 }
out += `</tbody><tfoot><tr>`;
out += `<td colspan='5' class='text-center'>Итог</td>`;
out += `<td> ${count_total} </td>`;
out += `<td  class='text-right'>${grand_price} тенге  </td>`;
out += `</tr></tfoot>`;
out += `</table>`; 

document.querySelector('.goods').innerHTML = out;

document.querySelector('.goods').onclick = event => {

    if(event.target.classList.contains('plus')){

        localStorage.setItem('cart',JSON.stringify(data));
    
    }else if(event.target.classList.contains('minus')){

        localStorage.setItem('cart',JSON.stringify(data));
    
    }
};


//проверяю наличие корзину в localStoroge
function checkCart(){
    let mini_cart =  localStorage.getItem('cart');
    if(mini_cart !== undefined){
    let i = 0;
    count_product = JSON.parse(mini_cart);
     for(let key in count_product){
        i += +count_product[key]['count'];
    }
    document.querySelector('.badge').innerHTML = i ;
    }
};
checkCart();