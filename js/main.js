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




const cardsData = [
    { title: "Cadeira de madeira", description: "Cadeira feita de madeira reciclada", imageSrc: "IMG_produtos/Cadeira _bambu01.png", price: 50 },
    { title: "Cadeira de madeira", description: "Cadeira feita de madeira reciclada", imageSrc: "IMG_produtos/Cadeira _bambu02.png", price: 50 },
    { title: "Cadeira jornal", description: "Cadeira feita de jornal reciclado", imageSrc: "IMG_produtos/Cadeira_jornal.png", price: 40 },
    { title: "Poltrona jornal", description: "Cadeira feita de jornal reciclado", imageSrc: "/IMG_produtos/Poltona_papel.png", price: 80 },
    { title: "Poltrona jornal", description: "Cadeira feita de jornal reciclado", imageSrc: "/IMG_produtos/Poltrona_papel_2.png", price: 80 },
    { title: "Cadeira de madeira", description: "Cadeira feita de madeira reciclada", imageSrc: "IMG_produtos/Cadeira _bambu03.png", price: 50 },
    { title: "Cadeira de madeira", description: "Cadeira feita de madeira reciclada", imageSrc: "IMG_produtos/Cadeira  _bambu04.png", price: 50 },
    { title: "Mesa de garrafas de vidro", description: "Mesa de garrafas de vidro reciclada", imageSrc: "IMG_produtos/mesa_garrafa_redondo.png", price: 150 },
    { title: "Mesa de garrafas de vidro", description: "Mesa de garrafas de vidro reciclada", imageSrc: "IMG_produtos/mesa_vidro_rg.png", price: 150 },
    { title: "Mesa de garrafas de vidro", description: "Mesa  de garrafas de vidro reciclada", imageSrc: "IMG_produtos/mesa_vidro_quadrado.png", price: 150 },
    { title: "Mesa de garrafas de vidro", description: "Mesa  de garrafas de vidro reciclada", imageSrc: "IMG_produtos/Mesa_v_Quadrada.png", price: 150 },
    { title: "Mesa de Madeira", description: "Mesa de madeira reciclada", imageSrc: "IMG_produtos/Mesa_Madeira_P.png", price: 100 },
    { title: "Mesa de Madeira", description: "Mesa de madeira reciclada", imageSrc: "IMG_produtos/Mesa_Madeira_P_02.png", price: 100 },
    { title: "Mesa de Madeira", description: "Mesa de madeira reciclada", imageSrc: "IMG_produtos/mesa.png", price: 100 },
    { title: "Conjunto de Mesa e Cadeira", description: "Mesa de madeira reciclada", imageSrc: "/IMG_produtos/conjunto_01.png", price: 999 },
    { title: "Conjunto de Mesa e Cadeira", description: "Mesa de madeira reciclada", imageSrc: "/IMG_produtos/conjunto_02.png", price: 999 },
];

let cart = [];

function createCards(data) {
    const container = document.getElementById('cards-container');
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.textContent = item.title;

        const description = document.createElement('p');
        description.textContent = item.description;

        const image = document.createElement('img');
        image.alt = item.title;
        image.src = item.imageSrc;

        const price = document.createElement('p');
        price.textContent = `R$ ${item.price}`;

        const button = document.createElement('button');
        button.textContent = 'Adicionar ao Carrinho';
        button.onclick = () => addToCart(item);

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(button);
        container.appendChild(card);
    });
}

function addToCart(item) {
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    if (cart.length > 0) {
        cartElement.style.display = 'block';
    } else {
        cartElement.style.display = 'none';
    }

    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title} - R$ ${item.price}`;
        total += item.price;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);
        listItem.appendChild(removeButton);

        cartItems.appendChild(listItem);
    });

    totalElement.textContent = `Total: R$ ${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    alert('Compra finalizada!');
    cart = [];
    updateCart();
}

createCards(cardsData);

