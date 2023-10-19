function contChars(campo, contID) {
    const cont = document.getElementById(contID);

    cont.innerHTML = "Caracteres Restantes: " + (700 - campo.value.length);
}

function resetForm() {

    document.getElementById("formEgresso").reset();
    mudarFormado();

    const contadores = document.querySelectorAll(".contador");
    contadores.forEach(contador => {
        contador.textContent = "Caracteres Restantes: " + 700;
    });

}

function abrirModal(idModal) {
    document.getElementById(idModal).style.display = "block";
}

function fecharModal() {
    const modais = document.querySelectorAll(".modal");

    Array.from(modais).forEach(elemento => {
        elemento.style.display = "none";
    });
}

function mostrarImagem() {
    const imgPreview = document.getElementById("img-preview");
    const chooseFile = document.getElementById("foto");

    const file = chooseFile.files[0];

    if (file) {
        const fileReader = new FileReader();

        fileReader.onload = function () {
            const image = new Image();
            image.src = fileReader.result;
            image.alt = "Imagem selecionada";
            imgPreview.innerHTML = "";
            imgPreview.appendChild(image);
        };

        fileReader.readAsDataURL(file);
    } else {
        imgPreview.innerHTML = "Nenhuma imagem selecionada";
    }
}


function limparImagem() {
    const imgPreview = document.getElementById("img-preview");
    imgPreview.innerHTML = 'Sua foto aqui';
}

function mudarFormado() {
    const formado = document.getElementById("formado");
    const cursando = document.getElementById("cursando");
    const wrapper = document.getElementById("dadosFormado");
    const primeiro = document.getElementById("primeiro");
    const segundo = document.getElementById("segundo");
    const ano = document.getElementById("ano");
    const wrapperContent = wrapper.children;

    Array.from(wrapperContent).forEach(elemento => {
        if (formado.checked) {
            elemento.style.opacity = 1;
            elemento.style.pointerEvents = "auto";
            primeiro.required = true;
            segundo.required = true;
            ano.required = true;
        } else if (cursando.checked) {
            elemento.style.opacity = 0.15;
            elemento.style.pointerEvents = "none";
            primeiro.required = false;
            segundo.required = false;
            ano.required = false;
        }
    });
}

function liberarEnviar() {
    const btnSubmit = document.getElementById("submit");
    const chkTermo = document.getElementById("chkTermo");

    if (chkTermo.checked) {
        btnSubmit.disabled = false;
        btnSubmit.classList.remove("tooltip");
    } else {
        btnSubmit.disabled = true;
        btnSubmit.classList.add("tooltip");
    }
}

const root = document.documentElement;

if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light");
}

setTimeout(toggleTheme, 1);

function invertTheme() {
    (localStorage.getItem("theme") == "light") ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light");
    setTimeout(toggleTheme, 1);
}

function toggleTheme() {
    if (localStorage.getItem("theme") == "light") {

        document.getElementById("btnTheme").src = "https://img.icons8.com/ios-glyphs/480/FFFFFF/sun--v1.png";

        root.style.setProperty('--main', 'var(--light-main)');
        root.style.setProperty('--main-hover', 'var(--light-main-hover)');
        root.style.setProperty('--bg', 'var(--light-bg)');
        root.style.setProperty('--h1', 'var(--light-h1)');
        root.style.setProperty('--h2', 'var(--light-h2)');
        root.style.setProperty('--shadow', 'var(--light-shadow)');
        root.style.setProperty('--tooltip', 'var(--light-tooltip)');
        root.style.setProperty('--input-hover', 'var(--light-input-hover)');
    } else if (localStorage.getItem("theme") == "dark") {

        document.getElementById("btnTheme").src = "https://img.icons8.com/ios-glyphs/480/moon-symbol.png";

        root.style.setProperty('--main', 'var(--dark-main)');
        root.style.setProperty('--main-hover', 'var(--dark-main-hover)');
        root.style.setProperty('--bg', 'var(--dark-bg)');
        root.style.setProperty('--h1', 'var(--dark-h1)');
        root.style.setProperty('--h2', 'var(--dark-h2)');
        root.style.setProperty('--shadow', 'var(--dark-shadow)');
        root.style.setProperty('--tooltip', 'var(--dark-tooltip)');
        root.style.setProperty('--input-hover', 'var(--dark-input-hover)');
    }
}

if (localStorage.getItem("theme") == "light") {

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("btnTheme").src = "https://img.icons8.com/ios-glyphs/480/FFFFFF/sun--v1.png";
    });

    root.style.setProperty('--main', 'var(--light-main)');
    root.style.setProperty('--main-hover', 'var(--light-main-hover)');
    root.style.setProperty('--bg', 'var(--light-bg)');
    root.style.setProperty('--h1', 'var(--light-h1)');
    root.style.setProperty('--h2', 'var(--light-h2)');
    root.style.setProperty('--shadow', 'var(--light-shadow)');
    root.style.setProperty('--tooltip', 'var(--light-tooltip)');
    root.style.setProperty('--input-hover', 'var(--light-input-hover)');
} else if (localStorage.getItem("theme") == "dark") {

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("btnTheme").src = "https://img.icons8.com/ios-glyphs/480/moon-symbol.png";
    });

    root.style.setProperty('--main', 'var(--dark-main)');
    root.style.setProperty('--main-hover', 'var(--dark-main-hover)');
    root.style.setProperty('--bg', 'var(--dark-bg)');
    root.style.setProperty('--h1', 'var(--dark-h1)');
    root.style.setProperty('--h2', 'var(--dark-h2)');
    root.style.setProperty('--shadow', 'var(--dark-shadow)');
    root.style.setProperty('--tooltip', 'var(--dark-tooltip)');
    root.style.setProperty('--input-hover', 'var(--dark-input-hover)');
}

document.addEventListener('DOMContentLoaded', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('.formulario').style.width = '90%';
    }
});

function musica(){
    alert(`Me sinto só\nMas quem é que nunca se sentiu assim\nProcurando o caminho pra seguir\nUma direção, respostas!\nUm minuto para o fim do mundo\nToda sua vida em 60 segundos\nUma volta no ponteiro do relógio pra viver\nO tempo corre contra mim\nSempre foi assim e sempre vai ser\nVivendo apenas pra vencer a falta que me faz você\nDe olhos fechados eu tento esconder a dor agora\nPor favor entenda eu preciso ir embora porque\nQuando estou com você\nSinto meu mundo acabar\nPerco o chão sob os meus pés\nMe falta o ar pra respirar\nE só de pensar em te perder por um segundo\nEu sei que isso é o fim do mundo\nVolto o relógio para trás tentando adiar o fim\nTentando esconder o medo de te perder quando me sinto assim\nDe olhos fechados eu tento enganar meu coração\nFugir pra outro lugar em uma outra direção porque\nQuando estou com você\nSinto meu mundo acabar\nPerco o chão sob os meus pés\nMe falta o ar pra respirar\nE só de pensar em te perder por um segundo\nEu sei que isso é o fim do mundo\nQuando estou com você\nSinto meu mundo acabar\nPerco o chão sob os meus pés\nMe falta o ar pra respirar\nE só de pensar em te perder por um segundo\nEu sei que isso é o fim do mundo\nEu sei que isso é o fim do mundo\nEu sei que isso é o fim\nEu sei que isso é o fim\nEu sei que isso é o fim do mundo!`);
}