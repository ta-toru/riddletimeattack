// 画像ファイルのURLリストと対応する解答
const imageSets = {
    set1: {
        images: [
            'images/Aset/image1.png',
            'images/Aset/image2.png',
            'images/Aset/image3.png',
            'images/Aset/image4.png',
            'images/Aset/image5.png',
            'images/Aset/image6.png',
            'images/Aset/image7.png',
            'images/Aset/image8.png',
            'images/Aset/image9.png',
            'images/Aset/image10.png',
        ],
        answers: [
            'なぞなぞ',
            'みしん',
            'さんらん',
            'かつじ',
            'らんたん',
            'ぷれい',
            'ななもんめ',
            'しゅぎょう',
            'じんしゅ',
            'しーる',
        ]
    },
    set2: {
        images: [
            'images/Bset/image1.png',
            'images/Bset/image2.png',
            'images/Bset/image3.png',
            'images/Bset/image4.png',
            'images/Bset/image5.png',
            'images/Bset/image6.png',
            'images/Bset/image7.png',
            'images/Bset/image8.png',
            'images/Bset/image9.png',
            'images/Bset/image10.png',
        ],
        answers: [
            'はじまり',
            'ありさま',
            'さやあて',
            'まじっく',
            'あさやけ',
            'さっかく',
            'かけじく',
            'じさぼけ',
            'まくあけ',
            'くりあ',
        ]
    }
};

let currentImageSet = imageSets.set1; // 初期状態で最初の画像セットを選択
let currentImageIndex = 0; // 初期状態で最初の画像を表示する
let startTime;
let elapsedTime = 0;
let timerInterval;
let countdownInterval;

// ストップウォッチの開始
function startStopwatch() {
    startCountdown();
    const image = document.getElementById('dynamicImage');
    image.src = currentImageSet.images[currentImageIndex];
}

// 3秒間のカウントダウンを開始
function startCountdown() {
    document.getElementById('startButton').classList.add('hidden');
    let countdown = 3; // カウントダウン秒数
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = countdown;
    countdownElement.style.display = 'flex'; // カウントダウンを表示

    countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none'; // カウントダウンを非表示
            startStopwatchTimer(); // ストップウォッチを開始
        }
    }, 1000); // 1秒ごとに更新
}

// ストップウォッチのタイマー開始
function startStopwatchTimer() {
    startTime = Date.now() - elapsedTime; // 現在の時間から経過時間を引く
    timerInterval = setInterval(updateStopwatch, 10); // 10ミリ秒ごとに更新
    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('imageSetSelectorContainer').classList.add('hidden');
    document.getElementById('passButton').classList.remove('hidden');
    document.getElementById('inputContainer').classList.remove('hidden');
    document.getElementById('intro').classList.add('hidden'); 
}

// ストップウォッチの更新
function updateStopwatch() {
    elapsedTime = Date.now() - startTime; // 経過時間を計算
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    document.getElementById('stopwatch').textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

// ストップウォッチの停止
function stopStopwatch() {
    clearInterval(timerInterval);
    document.getElementById('stopButton').classList.add('hidden');
}

// 最後の処理
function finalprocess() {
    stopStopwatch();
    document.getElementById('stopButton').classList.add('hidden');
    document.getElementById('passButton').classList.add('hidden');
    document.getElementById('inputContainer').classList.add('hidden');
    document.getElementById('linkButton').classList.remove('hidden');
    document.getElementById('YourResult').classList.remove('hidden');
    
    // 画像セットの名前をリザルト画面に表示
    displayImageSetName();
}

// 画像セットの名前をリザルト画面に表示する
function displayImageSetName() {
    const imageSetNameElement = document.getElementById('imageSetName');
    let setName = '';

    // 現在の画像セットに応じた名前を取得
    switch (currentImageSet) {
        case imageSets.set1:
            setName = 'セットA';
            break;
        case imageSets.set2:
            setName = 'セットB';
            break;
        default:
            setName = 'セット0';
            break;
    }

    imageSetNameElement.textContent = `${setName}`;
    imageSetNameElement.style.display = 'block'; // 要素を表示
}


// ストップウォッチのリセット
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById('stopwatch').textContent = '00:00:00.00';
    document.getElementById('stopwatch-container').classList.add('hidden');
    document.getElementById('startButton').classList.remove('hidden');
    document.getElementById('stopButton').classList.add('hidden');
    document.getElementById('resetButton').classList.add('hidden');
    document.getElementById('passButton').classList.add('hidden');
    document.getElementById('inputContainer').classList.add('hidden'); // 入力欄と画像を非表示
    document.getElementById('linkButton').classList.add('hidden');
    currentImageIndex = 0; // 画像インデックスをリセット
    showNextImage(); // 初期画像を表示
}

// 次の画像を表示する
function showNextImage() {
    const image = document.getElementById('dynamicImage');
    currentImageIndex = (currentImageIndex + 1) % currentImageSet.images.length; // インデックスを次に進める
    image.src = currentImageSet.images[currentImageIndex]; // 次の画像に切り替える
}

// パスボタンのカウント
function incrementPass() {
    let passCounter = document.getElementById('passCounter');
    let currentCount = parseInt(passCounter.textContent.split(': ')[1], 10);
    passCounter.textContent = `パス: ${currentCount + 1}`;
    
    // 5分 (300秒) を追加
    const additionalMilliseconds = 5 * 60 * 1000; // 5分をミリ秒に変換
    elapsedTime += additionalMilliseconds; // 現在の経過時間に追加
    startTime = Date.now() - elapsedTime; // スタート時間を調整
    updateStopwatch(); // ストップウォッチを更新

    showNextImage(); // 次の画像を表示

    // メッセージを表示
    showMessage('+5分');
    
    if (currentImageIndex === 0) {
        finalprocess();
    }
}

// メッセージを表示する
function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.opacity = 1; // メッセージを表示
    setTimeout(() => {
        messageElement.style.opacity = 0; // 1秒後にメッセージを非表示
    }, 1000);
}

// 解答ボタンの処理
function submitAnswer() {
    const userInput = document.getElementById('userInput').value.trim().toLowerCase();
    const correctAnswer = currentImageSet.answers[currentImageIndex]; // 現在の画像セットの正しい解答

    if (currentImageIndex < currentImageSet.images.length - 1 && userInput === correctAnswer) {
        showNextImage();
    } else if (currentImageIndex === currentImageSet.images.length - 1 && userInput === correctAnswer) {
        finalprocess();
    }
    document.getElementById('userInput').value = ''; // 入力欄をクリア
}

// 送信用リンクのボタン
function jamptolink() {
    document.getElementById('linkButton').addEventListener('click', function() {
        // ここに遷移したいURLを指定
        window.open('https://twitter.com/intent/tweet?text=%23%E4%BE%8B%E5%A4%96%E8%AC%8E%20%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%81%9F%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AF%E3%80%8CRiddle%20Time%20Attack%E3%80%8D%E3%82%92%E5%85%88%E8%A1%8C%E4%BD%93%E9%A8%93%E3%81%97%E3%81%9F%EF%BC%81%0A%0A%E3%82%BB%E3%83%83%E3%83%88%E9%81%B8%E6%8A%9E%EF%BC%9A%E3%82%BB%E3%83%83%E3%83%88(A%E3%81%8BB%E3%81%8B%E3%81%AE%E3%81%A9%E3%81%A1%E3%82%89%E3%81%8B%E8%A8%98%E5%85%A5)%0A%E3%82%AF%E3%83%AA%E3%82%A2%E3%82%BF%E3%82%A4%E3%83%A0%EF%BC%9A(%E3%81%93%E3%81%93%E3%81%AB%E8%A8%98%E5%85%A5)%0A%E3%83%91%E3%82%B9%E5%9B%9E%E6%95%B0%EF%BC%9A(%E3%81%93%E3%81%93%E3%81%AB%E8%A8%98%E5%85%A5)%E5%9B%9E%0A%E3%81%A7%E3%81%97%E3%81%9F%EF%BC%81%EF%BC%81%0A%0A%E3%81%BF%E3%82%93%E3%81%AA%E3%81%A7%E7%B5%90%E6%9E%9C%E3%82%92%E5%85%B1%E6%9C%89%E3%81%97%E3%81%A6%E7%AB%B6%E3%81%84%E5%90%88%E3%81%8A%E3%81%86%EF%BC%81%0A%23RiddleTA&openExternalBrowser=1', '_blank');
    });
}

// ページ読み込み時の初期化処理
window.onload = function() {
    // 初期状態で入力欄と画像を非表示
    document.getElementById('inputContainer').classList.add('hidden');

    // 画像セット選択UIの設定
    setupImageSetSelector();

    // スタートボタンのクリックイベントを設定
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.removeEventListener('click', startStopwatch); // 既存のリスナーを削除
        //startButton.addEventListener('click', startStopwatch); // 新しいリスナーを追加
    }

    // パスボタンのクリックイベントを設定
    const passButton = document.getElementById('passButton');
    if (passButton) {
        passButton.removeEventListener('click', incrementPass); // 既存のリスナーを削除
        //passButton.addEventListener('click', incrementPass); // 新しいリスナーを追加
    }
};

// 画像セットの変更を処理する
function changeImageSet(event) {
    const selectedSet = event.target.value;
    currentImageSet = imageSets[selectedSet]; // 選択された画像セットに切り替え
    currentImageIndex = 0;
    //resetStopwatch(); // ストップウォッチをリセットして最初の画像セットを反映
}

// ラジオボタンの変更イベントを設定する
function setupImageSetSelector() {
    const imageSetSelector = document.getElementById('imageSetSelector');
    imageSetSelector.addEventListener('change', changeImageSet);
}
