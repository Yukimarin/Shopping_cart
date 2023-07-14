let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let body = document.querySelector(".body");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

// Dữ liệu
let products = [
  {
    id: 1,
    name: "PRODUCT NAME 1",
    image: "1.PNG",
    price: 120000,
  },
  {
    id: 2,
    name: "PRODUCT NAME 2",
    image: "2.PNG",
    price: 120000,
  },
  {
    id: 3,
    name: "PRODUCT NAME 3",
    image: "3.PNG",
    price: 220000,
  },
  {
    id: 4,
    name: "PRODUCT NAME 4",
    image: "4.PNG",
    price: 123000,
  },
  {
    id: 5,
    name: "PRODUCT NAME 5",
    image: "5.PNG",
    price: 320000,
  },
  {
    id: 6,
    name: "PRODUCT NAME 6",
    image: "6.PNG",
    price: 120000,
  },
];

let list = document.getElementById("list");

// Khởi tạo hàm render - hàm để in dữ liệu sản phẩm
function render() {
  // Bước 1: In dữ liệu ra màn hình
  // Để duyệt qua từng phần tử có thể sử dụng hàm map() hoặc forEach()
  products.forEach((element) => {
    // Tạo HTML element
    let newdiv = document.createElement("div");
    // Set thêm thuộc tính (attribute)
    newdiv.setAttribute("id", "item");
    // cách 1 thêm attribute class cho thể div mới tao
    // newdiv.setAttribute("class","item")
    // Cách 2: sử dụng classList.add("")
    newdiv.classList.add("item");
    // Thêm nội dung cho thẻ div vừa tạo thông qua innerHTML
    newdiv.innerHTML = `<img src="./image/${element.image}" />
    <div class="title">${element.name}</div>
    <div class="price">${element.price}</div>
    <button id="${element.id}" class="btn-add">Add To Card</button>`;
    // Thêm newdiv vào thẻ cha có id là list
    list.appendChild(newdiv);
  });
}

// Gọi hàm render để in dữ liệu sản phẩm
render();

// Xử lý cart (giỏ hàng) - lấy dữ liệu từ trên localStorage
let cart = JSON.parse(localStorage.getItem("carts")) || [];

// Ủy quyền sự kiện
list.onclick = function (e) {
  // console.log(e.target.classList.contains("btn-add"));=> true
  if (e.target.classList.contains("btn-add")) {
    // console.log(e.target.id);
    let id = Number(e.target.id);
    // console.log(id);
    // Khai báo biến buyItem, sử dụng hàm find với mảng products
    // sẻ trả về dữ liệu theo điều kiện e.id == id
    let buyItem = products.find((e) => e.id == id);
    console.log(buyItem);
    // Kiểm tra trong mảng cart nếu như sản phẩm mua chưa tồn tại trong cart
    // Thêm thuộc tính (key) là count vào đối tượng buyItem để nếu tồn tại thì sẽ cộng thêm 1
    // Còn nếu chưa tồn tại thì sẽ gán value cho thuộc tính count = 1
    // Cách 1: Sử dụng kỹ thuật cắm cờ để kiểm tra tồn tại trong giỏ hàng
    // let checkCart = -1;
    // for (let i = 0; i < cart.length; i++) {
    //   if (buyItem.id == cart[i].id) {
    //     checkCart = i;
    //   }
    // }

    // // Ra ngoài vòng for kiểm tra điều kiện với biên checkCart
    // if (checkCart == -1) {
    //   // Thêm thuộc tính cho đối tượng (thêm key cho Object)
    //   buyItem.count = 1;
    //   cart.push(buyItem);
    // } else {
    //   cart[checkCart].count += 1;
    // }
    // console.log("Sau khi thêm sản phẩm", cart);

    // Cách 2: Sử dụng hàm findIndex,find để kiểm tra tồn tại trong giỏ hàng
    // Declaration Function => có thể thực trước và sau khi khởi tạo
    //  function name(params) {
    //  }

    // Expression Function => Chỉ có thể thực thi sau khi khởi tạo
    // const render = function (){
    // }

    // Arrow Function (ES6)
    // const render = ()=> {return }
    // const render = () => // trả về kết quả

    let findIndex = cart.findIndex((e) => buyItem.id == e.id);
    // Nếu không tìm thấy phần tử theo điều kiện trên thì findIndex trả về -1
    // Nếu tìm thấy phần tử theo điều kiện trên thì findIndex sẽ trả về vị trí index của phần tử đầu tiên thỏa mãn
    console.log(findIndex);
    if (findIndex == -1) {
      buyItem.count = 1;
      cart.push(buyItem);
    } else {
      cart[findIndex].count += 1;
    }
    console.log("Sau khi thêm sản phẩm", cart);
    // Thêm dữ liệu cart lên localStorage
    localStorage.setItem("carts", JSON.stringify(cart));
    // Xử lý in số lượng sản phẩm có trong giỏ hàng
    let quantity = document.getElementById("quantity");
    quantity.innerText = cart.length;
    // In sản phẩm giỏ hàng
    renderCart();
    // In giá tiền
    renderTotal();
  }
};

console.log("Ngoài sự kiện", cart);
// Viết hàm render dữ liệu trong cart ra bên giỏ hàng
let listCard = document.getElementById("list-card");
// Khởi tạo hàm renderCart - hàm in dữ liệu giỏ hàng
function renderCart() {
  listCard.innerHTML = "";
  cart.forEach((e) => {
    // Bước 1: Tạo mới thẻ li
    let li = document.createElement("li");
    // Bước 2: Gán nội dung cho thẻ li vừa tạo mới
    li.innerHTML = `<div><img src="./image/${e.image}" /></div>
            <div>${e.name}</div>
            <div>${e.price}</div>
            <div>
              <button id="${e.id}" class="btn-minus">-</button>
              <div class="count">${e.count}</div>
              <button id="${e.id}" class="btn-add">+</button>
            </div>
            <button id="${e.id}" class="btn-delete">Delete</button>`;
    //Bước 3: Thêm li vào trong thẻ cha ul
    listCard.appendChild(li);
  });
}
// Thực thi hàm in giỏ hàng
// renderCart();
// Xử lý các chức năng ở trong giỏ hàng
// Bước 1: ủy quyền sự kiện cho listCard
listCard.onclick = function (e) {
  // Bắt sự kiện với nút trừ
  if (e.target.classList.contains("btn-minus")) {
    let minusId = Number(e.target.id);
    // Tìm vị trí index của sản phẩm muốn giảm số lượng (count-1)
    let findIndex = cart.findIndex((e) => minusId == e.id);
    console.log(findIndex);
    // Update lại số lượng của sản phẩm trong giỏ hàng
    // Nếu sản phẩm có số lượng bằng 0 => xóa khỏi giỏ hàng
    // Nếu sản phẩm có số lượng lớn hơn 0 => thì trừ đi -1
    if (cart[findIndex].count == 1) {
      cart.splice(findIndex, 1);
    } else {
      cart[findIndex].count -= 1;
    }
    // Cập nhật lại dữ liệu lên localStorage
    localStorage.setItem("carts", JSON.stringify(cart));
    // Xử lý in số lượng sản phẩm có trong giỏ hàng
    let quantity = document.getElementById("quantity");
    quantity.innerText = cart.length;
    // Render lại dữ liệu trong giỏ hàng
    renderCart();
    // In giá tiền
    renderTotal();
  }
  // Bắt sự kiện với nút cộng
  if (e.target.classList.contains("btn-add")) {
    let addId = Number(e.target.id);
    // Tìm vị trí index của sản phẩm muốn thêm số lượng
    let findIndex = cart.findIndex((e) => addId == e.id);
    console.log(findIndex);
    // Update lại số lượng sản phẩm
    cart[findIndex].count += 1;
    // Cập nhật lại dữ liệu lên localStorage
    localStorage.setItem("carts", JSON.stringify(cart));
    // Xử lý in số lượng sản phẩm có trong giỏ hàng
    let quantity = document.getElementById("quantity");
    quantity.innerText = cart.length;
    // Render lại dữ liệu trong giỏ hàng
    renderCart();
    // In giá tiền
    renderTotal();
  }
  // Bắt sự kiện với nút xóa
  if (e.target.classList.contains("btn-delete")) {
    // console.log("Đây là nút xóa");
    // console.log(e.target.id); => trả về id kiểu dữ liệu string
    let deleteId = Number(e.target.id);
    // Tìm vị trị index của sản phẩm muốn xóa trong giỏ hàng
    let findIndex = cart.findIndex((e) => deleteId == e.id);
    console.log(findIndex);
    // Xóa phần tử trong mảng cart theo chỉ số index
    cart.splice(findIndex, 1);
    console.log("Sau khi xóa sản phẩm", cart);
    // Cập nhật lại dữ liệu lên localStorage
    localStorage.setItem("carts", JSON.stringify(cart));
    // Xử lý in số lượng sản phẩm có trong giỏ hàng
    let quantity = document.getElementById("quantity");
    quantity.innerText = cart.length;
    // Render (in lại dữ liệu) lại cart
    renderCart();
    // In giá tiền
    renderTotal();
  }
};

// Tính tổng giá tiền
function renderTotal() {
  let total = document.getElementById("total");
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].count * cart[i].price;
  }
  const formatter = sum.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
  });
  total.innerText = formatter;
}
