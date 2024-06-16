function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "./img/menu_white_36dp.svg"
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "./img/close_white_36dp.svg"
    }
}

// ==============================CARROSSEL====================================
const imgs = document.getElementById("img")
const img = document.querySelectorAll("#img img")

let idx = 0;

function Carrossel() {
    idx++;
    if (idx > img.length - 1) {
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 700}px)`
}
setInterval(Carrossel, 2000)
// ============================================================================
// =========================CARRINHO===========================================

let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const addDataToHTML = () => {

    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;

            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    fetch('./js/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
}
initApp();
// ============================================================================
// ================= REGEX E-MAIL - TELEFONE - SENHA ==========================
class Validator {

    constructor() {
      this.validations = [
        'data-email-validate',
        'data-phone-validate',
        'data-password-validate'
      ]
    }
  
    // inicia a validação de todos os campos
    validate(form) {
  
      // limpa todas as validações antigas
      let currentValidations = document.querySelectorAll('form .error-validation');
  
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      // pegar todos inputs
      let inputs = form.getElementsByTagName('input');
      // transformar HTMLCollection em arr
      let inputsArray = [...inputs];
  
      // loop nos inputs e validação mediante aos atributos encontrados
      inputsArray.forEach(function(input, obj) {
  
        // fazer validação de acordo com o atributo do input
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {
  
            // limpa string para saber o método
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            // valor do input
            let value = input.getAttribute(this.validations[i])
  
            // invoca o método
            this[method](input, value);
  
          }
        }
  
      }, this);
  
    }
  
    // método para validar e-mail
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Insira um e-mail no padrão exemplo@dominio.com`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para validar telefone
    phonevalidate(input) {
      let re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  
      let phone = input.value;
  
      let errorMessage = `Insira um telefone no padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX`;
  
      if(!re.test(phone)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para validar senha
    passwordvalidate(input) {
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
      let password = input.value;
  
      let errorMessage = `A senha precisa ter no mínimo 8 caracteres, incluindo letras e números`;
  
      if(!re.test(password)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para exibir mensagens de erro
    printMessage(input, msg) {
  
      // checa os erros presentes no input
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      // imprimir erro só se não tiver erros
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
  
        let inputParent = input.parentNode;
  
        template.classList.remove('template');
  
        inputParent.appendChild(template);
      }
  
    }
  
    // remove todas as validações para fazer a checagem novamente
    cleanValidations(validations) {
      validations.forEach(el => el.remove());
    }
  
  }
  // ============================================================================
  // ========================= API CEP ==========================================
  async function fetchAddress() {
      const cep = document.getElementById('cep').value.replace(/\D/g, '');
      if (cep.length === 8) {
          try {
              const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              if (!data.erro) {
                  document.getElementById('rua').value = data.logradouro || '';
                  document.getElementById('bairro').value = data.bairro || '';
                  document.getElementById('cidade').value = data.localidade || '';
                  document.getElementById('estado').value = data.uf || '';
              } else {
                  alert('CEP não encontrado');
              }
          } catch (error) {
              alert('Erro ao buscar o CEP');
          }
      } else {
          alert('CEP inválido');
      }
  }
  
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator();
  
  // evento de envio do form, que valida os inputs
  submit.addEventListener('click', function(e) {
    e.preventDefault();
  
    validator.validate(form);
  });
  // ============================================================================