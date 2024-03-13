function createStars(numberOfStars) {
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        document.body.appendChild(star);
    }
}

// 例えば、画面を読み込んだ後に50個の星を生成する
document.addEventListener('DOMContentLoaded', () => {
    createStars(50);
});

// ランタンを生成する関数
function createLanterns(numberOfLanterns, initial = false) {
    const lanternContainer = document.getElementById('lanterns');
    const containerWidth = lanternContainer.offsetWidth;
    const lanternWidth = 20; // ランタンの幅を20pxと想定
    const lanternsPerRow = Math.floor(containerWidth / lanternWidth);

    for (let i = 0; i < numberOfLanterns; i++) {
        const lantern = document.createElement('div');
        lantern.classList.add('lantern');

        if (initial) {
            // 初期表示の場合、ランタンを一列に敷き詰める
            lantern.style.left = `${(i % lanternsPerRow) * lanternWidth}px`;
        } else {
            // 通常のランダム位置生成
            lantern.style.left = `${Math.random() * 100}vw`;
        }

        document.getElementById('lanterns').appendChild(lantern);

        const duration = 10 + Math.random() * 15; // 上昇スピードをランダム化
        lantern.style.animationDuration = `${duration}s`;

        // アニメーションと初期位置設定
        lantern.style.animationName = 'floatUp, glow';
        lantern.style.animationTimingFunction = 'ease-in, ease-in-out';
        lantern.style.animationIterationCount = 'forwards, infinite';

        lantern.addEventListener('animationend', () => {
            lantern.remove();
        });
    }
}

// ランタン生成の間隔と数を調整する関数
function startLanternFestival() {
    // 最初に一列のランタンを生成
    const lanternContainer = document.getElementById('lanterns');
    const containerWidth = lanternContainer.offsetWidth;
    const lanternWidth = 20; // ランタンの幅
    const lanternsPerRow = Math.floor(containerWidth / lanternWidth);

    createLanterns(lanternsPerRow, true); // 初期表示で一列のランタンを生成

    setInterval(() => {
        createLanterns(10); // 一度に2個のランタンを生成
    }, 3000); // 3秒ごとにランタンを生成
}

document.addEventListener('DOMContentLoaded', startLanternFestival);

startLanternFestival();

// スワイプ操作の検出
let startX, startY, endX, endY;

function touchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function touchEnd(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    const distanceX = endX - startX;
    const distanceY = endY - startY;

    applyWindToLanterns(distanceX, distanceY);
}

document.addEventListener('touchstart', touchStart);
document.addEventListener('touchend', touchEnd);

// スワイプに応じてランタンに風の効果を適用する関数
function applyWindToLanterns(distanceX, distanceY) {
    const lanterns = document.querySelectorAll('.lantern');

    lanterns.forEach(lantern => {
        const styles = window.getComputedStyle(lantern);
        const matrix = new WebKitCSSMatrix(styles.transform);
        const newX = matrix.m41 + distanceX * 0.1;
        const newY = matrix.m42 - distanceY * 0.1;

        lantern.style.transform = `translate(${newX}px, ${newY}px)`;
    });
}
