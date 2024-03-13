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

// ランタンを生成する関数（修正）
function createLanterns(numberOfLanterns, initial = false) {
    const lanternContainer = document.getElementById('lanterns');
    const containerWidth = lanternContainer.offsetWidth; // コンテナの横幅

    for (let i = 0; i < numberOfLanterns; i++) {
        const delay = Math.random() * 2000; // 最大2秒のランダムな遅延

        setTimeout(() => {
            const lantern = document.createElement('div');
            lantern.classList.add('lantern');

            // ランタンの左位置を画面の横幅内でランダムに設定
            const lanternLeftPosition = Math.random() * 100; // パーセンテージで位置を決定
            lantern.style.left = `${lanternLeftPosition}vw`; // ビューポート幅の割合で位置指定

            document.getElementById('lanterns').appendChild(lantern);

            // アニメーションとその他のスタイル設定は省略

        }, initial ? i * 100 : delay); // 初期生成時は少し遅延をつけて連続的に見えるように、それ以外はランダムな遅延を適用
    }
}

// ランタン生成の間隔と数を調整する関数（一部修正）
function startLanternFestival() {
    const lanternContainer = document.getElementById('lanterns');
    const containerWidth = lanternContainer.offsetWidth;
    const lanternWidth = 20;
    const lanternsPerRow = Math.floor(containerWidth / lanternWidth);

    createLanterns(lanternsPerRow, true); // 初期表示で一列のランタンを生成

    // 定期的にランタンを追加する処理を修正
    // ここでは`setInterval`を使わず、連続してランダムなタイミングでランタンを生成
    function addRandomLantern() {
        const randomDelay = 500 + Math.random() * 2500; // 0.5秒から3秒のランダムな遅延

        setTimeout(() => {
            createLanterns(5); // 一度に1個のランタンを生成
            addRandomLantern(); // 再帰的に次のランタン生成をスケジュール
        }, randomDelay);
    }

    addRandomLantern(); // ランタン追加処理を開始
}

// ページ読み込み完了時にランタンフェスティバルを開始
document.addEventListener('DOMContentLoaded', startLanternFestival);

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

// スワイプに応じてランタンに風の効果を適用する関数（拡張版）
function applyWindToLanterns(distanceX, distanceY) {
    const lanterns = document.querySelectorAll('.lantern');
    const windStrength = Math.sqrt(distanceX * distanceX + distanceY * distanceY) * 0.1; // 風の強さを計算

    lanterns.forEach(lantern => {
        const duration = 20 + Math.random() * 30; // 風による移動の持続時間
        lantern.style.transition = `transform ${duration}s ease-in-out`;
        const angle = Math.atan2(distanceY, distanceX); // 風の角度
        const moveX = Math.cos(angle) * windStrength;
        const moveY = Math.sin(angle) * windStrength;
        lantern.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

function showWindEffect(startX, startY, endX, endY) {
    const windEffect = document.getElementById('windEffect');
    windEffect.style.left = `${startX}px`;
    windEffect.style.top = `${startY}px`;
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    windEffect.style.transform = `rotate(${angle}deg)`;
}
