const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const content = document.getElementById('content');
const successContent = document.getElementById('success-content');

const OFFSET = 100;

noBtn.addEventListener('mouseenter', moveButton);
noBtn.addEventListener('touchstart', moveButton);

function moveButton() {
    if (!noBtn.classList.contains('moving')) {
        noBtn.classList.add('moving');
    }

    noBtn.getBoundingClientRect();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    const padding = 50;

    const maxX = windowWidth - btnWidth - padding;
    const maxY = windowHeight - btnHeight - padding;

    const randomX = Math.max(0, Math.random() * maxX) / 2;
    const randomY = Math.max(0, Math.random() * maxY) / 2;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

yesBtn.addEventListener('click', () => {
    content.classList.add('hidden');
    successContent.classList.remove('hidden');
    playConfetti();
    spawnCats();
});

const CAT_GIFS = [
    'cat-cat-with-tongue.gif',
    'cat-dancing-meme-dancing.gif',
    'cat-gloomy-cat.gif',
    'cat-kat.gif',
    'cat.gif',
    'cat1.gif',
    'emil-dresden-emil.gif',
    'evil-kitty-throne.gif',
    'gato-lengua.gif',
    'kenjou-cat.gif',
    'kiss.gif',
    'qazqaz.gif',
    'vibe-cat.gif',
    'what-the-sigma-cat-cat-reaction.gif'
];

const cats = [];

function spawnCats() {
    const container = document.body;

    const catContainer = document.createElement('div');
    catContainer.style.position = 'fixed';
    catContainer.style.top = '0';
    catContainer.style.left = '0';
    catContainer.style.width = '100vw';
    catContainer.style.height = '100vh';
    catContainer.style.pointerEvents = 'none';
    catContainer.style.zIndex = '-1';
    document.body.appendChild(catContainer);

    CAT_GIFS.forEach(gif => {
        const img = document.createElement('img');
        img.src = `cats/${gif}`;
        img.style.position = 'absolute';

        // rnadom dimensions
        const size = Math.random() * 150 + 100;
        img.style.width = `${size}px`;
        img.style.height = 'auto';

        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        catContainer.appendChild(img);

        //speed
        const vx = (Math.random() - 0.5) * 10;
        const vy = (Math.random() - 0.5) * 10;

        cats.push({
            element: img,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            width: size,
            height: size
        });
    });

    animateCats();
}

function animateCats() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    cats.forEach(cat => {
        cat.x += cat.vx;
        cat.y += cat.vy;

        // Bounce off walls
        if (cat.x <= 0 || cat.x + cat.width >= windowWidth) {
            cat.vx *= -1;
            if (cat.x <= 0) cat.x = 0;
            if (cat.x + cat.width >= windowWidth) cat.x = windowWidth - cat.width;
        }

        //border collision
        if (cat.y <= 0 || cat.y + cat.width >= windowHeight) {
            cat.vy *= -1;

            if (cat.y <= 0) cat.y = 0;
            if (cat.y + cat.width >= windowHeight) cat.y = windowHeight - cat.width;
        }

        cat.element.style.left = `${cat.x}px`;
        cat.element.style.top = `${cat.y}px`;
    });

    requestAnimationFrame(animateCats);
}

function playConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
