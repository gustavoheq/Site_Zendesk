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
setInterval(Carrossel, 1999)





const cardsData = [
    
    { title: "Cadeira de madeira", description: "Cadeira feita  de madeira reciclada", imageSrc: "IMG_produtos/Cadeira _bambu01.png" },
    { title: "Cadeira de madeira", description: "Cadeira feita  de madeira reciclada", imageSrc: "IMG_produtos/Cadeira _bambu02.png" },
    { title: "Cadeira jornal", description: "Cadeira feita de jornal reciclado", imageSrc: "IMG_produtos/Cadeira_jornal.png" },
    { title: "Cadeira de madeira", description: "Cadeira feita  de madeira reciclada", imageSrc: "IMG_produtos/Cadeira _bambu03.png" },
    { title: "Cadeira de madeira", description: "Cadeira feita  de madeira reciclada", imageSrc: "/IMG_produtos/Cadeira  _bambu04.png" },
    { title: "Mesa de garrafas de vidro ", description: "Mesa feita de de garrafas de vidro  reciclada", imageSrc: "IMG_produtos/mesa_garrafa_redondo.png" },
    { title: "Mesa de garrafas de vidro ", description: "Mesa feita de de garrafas de vidro  reciclada", imageSrc: "IMG_produtos/mesa_vidro_rg.png" },
    { title: "Mesa de garrafas de vidro ", description: "Mesa feita de de garrafas de vidro  reciclada", imageSrc: "IMG_produtos/mesa_vidro_quadrado.png" },
    { title: "Mesa de garrafas de vidro ", description: "Mesa feita de de garrafas de vidro  reciclada", imageSrc: "IMG_produtos/Mesa_v_Quadrada.png" },
    { title: "Mesa de Madeira", description: "Mesa de madeira reciclada", imageSrc: "IMG_produtos/Mesa_Madeira_P.png" },
    { title: "Mesa de Madeira", description: "Mesa de madeira reciclada", imageSrc: "IMG_produtos/Mesa_Madeira_P_02.png" },
    { title: "Mesa de Madeira", description: "Mesa de madeira reciclada", imageSrc: "IMG_produtos/mesa.png" },
    // Adicione mais objetos aqui se necessário
];
function createCards(data) {
    const container = document.getElementById('cards-container');
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.textContent = item.title;


        const description = document.createElement('p');
        description.textContent = item.description;

        // Criando o elemento de imagem
        const image = document.createElement('img');
        image.alt = item.title; // Adicionando um texto alternativo para acessibilidade
        image.src = item.imageSrc; // Definindo o caminho da imagem


        
        container.appendChild(card);
        // Adicionando título e descrição ao cartão
        card.appendChild(title);
        // Adicionando a imagem ao cartão
        card.appendChild(image);
        card.appendChild(description);

        // Adicionando o cartão ao contêiner
       
    });
}

createCards(cardsData)

