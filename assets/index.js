const themeToggle = document.querySelector('.theme-toggle');
const themePanel = document.querySelector('.theme-panel');

themeToggle.addEventListener('mouseenter', () => {
    themePanel.classList.add('active');
});

themePanel.addEventListener('mouseleave', () => {
    themePanel.classList.remove('active');
});

document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        const theme = option.getAttribute('data-theme');
        applyTheme(theme);
    });
});

function applyTheme(theme) {
    const root = document.documentElement;
    switch (theme) {
        case 'dark':
            root.style.setProperty('--main-color', '#ffffff');
            document.body.style.background = '#1a1a1a';
            break;
        case 'neon':
            root.style.setProperty('--main-color', '#00ff00');
            document.body.style.backgroundColor = '#000000';
            document.querySelectorAll('.theme-option').forEach(opt => {
                opt.style.animation = 'glow 2s infinite';
            });
            break;
        case 'gradient':
            document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            root.style.setProperty('--main-color', '#ffffff');
            break;
        default:
            root.style.setProperty('--main-color', 'rgb(41, 41, 41)');
            document.body.style.backgroundColor = 'white';
            document.querySelectorAll('.theme-option').forEach(opt => {
                opt.style.animation = 'none';
            });
    }
}

var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

var sex = "m";
document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    });
});

document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    });
});

const input = document.querySelector("#image");
const previewModal = document.querySelector('.image-preview-modal');
const previewImage = document.querySelector('.preview-image');
const closePreview = document.querySelector('.close-preview');

input.addEventListener('input', (event) => {
    const url = event.target.value;
    if (url.includes('imgur.com') || url.includes('catbox.moe')) {
        localStorage.removeItem('userImage');
        input.setAttribute("selected", url);
        previewImage.src = url;
        previewModal.style.display = 'flex';
    }
});

closePreview.addEventListener('click', () => {
    previewModal.style.display = 'none';
});

previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) {
        previewModal.style.display = 'none';
    }
});

const randomMaleSurnames = ["Kowalski", "Nowak", "Wiśniewski", "Wójcik", "Kowalczyk", "Kamiński", "Lewandowski", "Zieliński", "Szymański", "Woźniak"];
const randomFemaleSurnames = ["Kowalska", "Nowak", "Wiśniewska", "Wójcik", "Kowalczyk", "Kamińska", "Lewandowska", "Zielińska", "Szymańska", "Woźniak"];
const randomCities = ["Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin", "Bydgoszcz", "Lublin", "Katowice"];
const randomStreets = ["Mickiewicza", "Słowackiego", "Kościuszki", "Piłsudskiego", "Sienkiewicza", "Reymonta", "Konopnickiej", "Prusa", "Wyspiańskiego"];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomPostcode() {
    return String(Math.floor(Math.random() * 90 + 10)) + "-" + String(Math.floor(Math.random() * 900 + 100));
}

document.querySelector(".clear-btn").addEventListener('click', () => {
    document.querySelectorAll(".input_holder .input").forEach(input => input.value = '');
    document.querySelectorAll(".date_input").forEach(input => input.value = '');
    localStorage.clear();
});

document.querySelector(".generate-btn").addEventListener('click', () => {
    document.querySelectorAll(".input_holder .input").forEach(input => {
        let randomValue = "";
        switch (input.id) {
            case "surname":
                randomValue = sex === "m" ? getRandomElement(randomMaleSurnames) : getRandomElement(randomFemaleSurnames);
                break;
            case "nationality":
                randomValue = "POLSKA";
                break;
            case "familyName":
                randomValue = sex === "m" ? getRandomElement(randomMaleSurnames) : getRandomElement(randomFemaleSurnames);
                break;
            case "fathersFamilyName":
                randomValue = getRandomElement(randomMaleSurnames);
                break;
            case "mothersFamilyName":
                randomValue = getRandomElement(randomFemaleSurnames);
                break;
            case "birthPlace":
                randomValue = getRandomElement(randomCities);
                break;
            case "countryOfBirth":
                randomValue = "POLSKA";
                break;
            case "adress1":
                randomValue = "ul. " + getRandomElement(randomStreets) + " " + Math.floor(Math.random() * 100 + 1);
                break;
            case "adress2":
                randomValue = generateRandomPostcode();
                break;
            case "city":
                randomValue = getRandomElement(randomCities);
                break;
        }
        if (randomValue && input.id !== "name") {
            input.value = randomValue;
        }
    });
});

document.querySelector(".go").addEventListener('click', () => {
    let empty = [];
    let params = new URLSearchParams();
    params.set("sex", sex);

    const imageInput = document.querySelector("#image");
    const imageValue = imageInput.value;

    if (!imageValue || (!imageValue.includes('imgur.com') && !imageValue.includes('catbox.moe'))) {
        empty.push(imageInput.parentElement);
        imageInput.parentElement.classList.add("error_shown");
    } else {
        params.set("image", imageValue);
    }

    let birthday = "";
    let dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday += "." + element.value;
        if (isEmpty(element.value)) dateEmpty = true;
    });

    birthday = birthday.substring(1);

    if (dateEmpty) {
        const dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("birthday", birthday);
    }

    document.querySelectorAll(".input_holder").forEach((element) => {
        const input = element.querySelector(".input");
        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value);
        }
    });

    if (empty.length != 0) {
        empty[0].scrollIntoView();
    } else {
        forwardToId(params);
    }
});

function isEmpty(value) {
    return /^\s*$/.test(value);
}

function forwardToId(params) {
    const imageData = params.get('image');
    if (imageData) {
        localStorage.setItem('userImage', imageData);
        params.delete('image');
    }

    document.querySelectorAll(".input_holder .input").forEach((input) => {
        if (input && input.value) {
            localStorage.setItem(input.id, input.value);
        }
    });

    location.href = "./id.html?" + params.toString();
}

window.addEventListener('load', () => {
    document.querySelectorAll(".input_holder .input").forEach((input) => {
        if (input && localStorage.getItem(input.id)) {
            input.value = localStorage.getItem(input.id);
        }
    });
});

