// --- キーワードリスト（自由に追加可能） ---
const keywordsList = [
    { key: "luxury", name: "高級感" },
    { key: "simple", name: "シンプル" },
    { key: "minimal", name: "ミニマル" },
    { key: "natural", name: "ナチュラル" },
    { key: "modern", name: "モダン" },
    { key: "clean", name: "クリーン" },
    { key: "eco", name: "サステナブル" },
    { key: "cute", name: "かわいい" },
    { key: "youthful", name: "若々しい" },
    { key: "feminine", name: "フェミニン" },
    { key: "genderless", name: "ジェンダーレス" },
    { key: "botanical", name: "ボタニカル" },
    { key: "relaxing", name: "リラックス" },
    { key: "unique", name: "ユニーク" },
    { key: "elegant", name: "エレガント" },
    { key: "pop", name: "ポップ" },
    { key: "japanese", name: "和風" },
    { key: "ethnic", name: "エスニック" },
    { key: "futuristic", name: "未来的" },
    // ...追加可能
];
// キーワードごとのプロンプト例
const keywordPrompts = {
    luxury: "high-end luxury, premium feel, sophisticated design",
    simple: "clean simple aesthetic, intuitive layout, effortless and accessible design, clear and easy to understand",
    minimal: "stark minimalism, refined essential elements, monochromatic, rigorous geometric forms, severe aesthetic",
    natural: "natural organic ingredients concept, earthy minimalist tones, serene atmosphere, unrefined texture, product resting on stone or clay",
    modern: "sleek modern design, cutting-edge typography, contemporary forms",
    clean: "pure clean look, pristine white space, transparent elements",
    eco: "sustainable eco-friendly packaging, recycled material texture, conscious design",
    cute: "adorable cute design, playful typography, soft focus, charming details",
    feminine: "delicate feminine beauty, graceful curves, soft lighting, elegant details",
    youthful: "vibrant and youthful energy, fresh and lively colors, dewy texture",
    genderless: "neutral aesthetic, gender-fluid design, concrete texture, sharp and clear",
    botanical: "lush botanical graphic elements, rich greenery, detailed plant motif illustration, vibrant natural light, active floral and leaf composition",
    relaxing: "calm and relaxing mood, spa-like atmosphere, serene, gentle light diffusion",
    unique: "distinct unique concept, unconventional form, artistic composition",
    elegant: "classic elegant style, refined and graceful, soft shadows",
    pop: "bold pop art style, high contrast, vibrant graphic elements",
    japanese: "Wabi-Sabi aesthetic, delicate Japanese craftsmanship, subtle paper texture",
    ethnic: "rich ethnic patterns, warm earthy tones, handcrafted texture",
    futuristic: "sci-fi futuristic concept, metallic sheen, dynamic composition, glossy finish",
};

// パッケージタイプ
const packageTypes = {
    box: {name: "箱", basePrompt: "white paper box packaging mockup, seamless edges"},
    bottle: {name: "ボトル", basePrompt: "bottle packaging mockup"},
    tube: {name: "チューブ", basePrompt: "tube packaging mockup"},
    jar: {name: "クリームジャー", basePrompt: "cosmetic glass jar packaging mockup, cream container"},
    pouch: {name: "パウチ", basePrompt: "foil pouch packaging mockup, sachet, single-use packet"},
};

// --- 色調キーワード（カラー選択からキーワード選択へ変更） ---
const toneOptions = [
    { key: "tone-pale", name: "ペールトーン", gradientColors: ['#FADADD', '#FFFACD', '#C8F9E4', '#E5E3F5'], prompt: "pale tone, soft pastel colors, delicate and soft" },
    { key: "tone-pastel", name: "パステルカラー", gradientColors:  ['#FFC0CB', '#FAFAD2', '#98FB98', '#B19CD9'], prompt: "pastel color palette, light and airy, cute and cheerful, highly visible tints" },  
    { key: "tone-vivid", name: "ビビッド", gradientColors: ['#FF00FF', '#FFFF00', '#00FFFF', '#FF0000'], prompt: "vivid saturated colors, bright and energetic" },
    { key: "tone-nuance", name: "ニュアンスカラー", gradientColors: ['#A9A9A9', '#B0C4DE', '#B5878F'], prompt: "nuanced desaturated colors, subtle and sophisticated" },
    { key: "tone-dark", name: "ダークトーン", gradientColors:['#653030', '#4B5320', '#191970', '#000000'], prompt: "dark tone, deep rich colors, moody" },
    { key: "tone-monotone", name: "モノトーン", gradientColors: ['#000000', '#808080', '#D3D3D3', '#FFFFFF'], prompt: "monotone palette, grayscale accents, minimal contrast" },
    { key: "tone-warm", name: "ウォーム", gradientColors: ['#FFB347', '#FF7F50', '#FF4500'], prompt: "warm tone, cozy and inviting colors, comforting and friendly" },
    { key: "tone-cool", name: "クール", gradientColors: ['#87CEEB', '#4682B4', '#5F9EA0'], prompt: "cool tone, refreshing and calm colors, modern and sleek" },
    // ...追加可能
];

// 画像ファイル名リスト
const pictImages = [
    "box-cube-closed-cover-multi_views.jpeg",
    // ...追加可能
];

// 画像データ
const availableImages = pictImages.map(filename => {
    const tags = filename.replace(/\.[^/.]+$/, "").split("-");
    return {
        src: "images/pict/" + filename,
        tags: tags
    };
});

// --- 状態変数 ---
let selectedKeywords = [];
let selectedColorTone = "";
let selectedPackageType = "";

// --- DOM要素 ---
let keywordsContainer;
let colorContainer;
let packageTypesContainer;
let showPromptBtn;
let copyPromptBtn;
let resetBtn;
let copyMessage;
let promptDisplay;
let generatedPrompt;
let selectionSummary;
let imageDisplayArea;
let dynamicImageGrid;
let customColorToneInput; 

// --- 初期化 ---
function initializeElements() {
    keywordsContainer = document.getElementById("keywords-container");
    colorContainer = document.getElementById("color-tones"); 
    packageTypesContainer = document.getElementById("package-types");
    showPromptBtn = document.getElementById("show-prompt-btn");
    copyPromptBtn = document.getElementById("copy-prompt-btn");
    resetBtn = document.getElementById("reset-btn");
    copyMessage = document.getElementById("copy-message");
    promptDisplay = document.getElementById("prompt-display");
    generatedPrompt = document.getElementById("generated-prompt");
    selectionSummary = document.getElementById("selection-summary");
    imageDisplayArea = document.getElementById("image-display-area");
    dynamicImageGrid = document.getElementById("dynamic-image-grid");
    customColorToneInput = document.getElementById("custom-color-tone");
}

// --- キーワードボタン生成 ---
function renderKeywords() {
    keywordsContainer.innerHTML = "";
    const row = document.createElement("div");
    row.className = "flex flex-wrap gap-3"; 

    keywordsList.forEach(keyword => {
        const isSelected = selectedKeywords.includes(keyword.key);
        const button = document.createElement("button");

        button.className = `keyword-btn p-3 rounded-lg border-2 transition-all duration-200 flex justify-center items-center ${
            isSelected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
        }`;

        // ボタンのテキスト要素を作成
        const textDiv = document.createElement("div");
        textDiv.className = "text-center text-base";
        textDiv.textContent = keyword.name;

        // 要素を組み立て
        button.appendChild(textDiv);

        button.onclick = () => {
            if (isSelected) {
                selectedKeywords = selectedKeywords.filter(k => k !== keyword.key);
            } else {
                selectedKeywords.push(keyword.key);
            }
            updateUI();
        };
        row.appendChild(button);
    });
    keywordsContainer.appendChild(row);
}

// --- 色調（キーワード）ボタン生成 ---
function renderColorTones() {
    colorContainer.innerHTML = "";

    const row = document.createElement("div");
    row.className = "flex flex-wrap gap-3 items-center";

    toneOptions.forEach(tone => {
        const isSelected = selectedColorTone === tone.key;
        const button = document.createElement("button");

        button.className = `tone-btn p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 w-32 ${
            isSelected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
        }`;
        button.title = tone.name; // ツールチップ

        // グラデーションアイコン要素を作成
        const gradientIcon = document.createElement("div");
        gradientIcon.className = "w-full h-10 rounded";
        if (tone.gradientColors && tone.gradientColors.length >= 2) {
            const colors = tone.gradientColors.join(', ');
            gradientIcon.style.background = `linear-gradient(to right, ${colors})`;
        }

        // ボタンのテキスト要素を作成
        const textSpan = document.createElement("span");
        textSpan.textContent = tone.name;

        // 要素を組み立て
        button.appendChild(gradientIcon);
        button.appendChild(textSpan);

        button.onclick = () => {
            selectedColorTone = isSelected ? "" : tone.key; // 単一選択に変更
            updateUI();
        };
        row.appendChild(button);
    });

    colorContainer.appendChild(row);
}


// --- パッケージタイプボタン生成（任意選択） ---
function renderPackageTypes() {
    packageTypesContainer.innerHTML = "";
    // ボタンを横並びにするためのコンテナを追加
    const row = document.createElement("div");
    row.className = "flex flex-wrap gap-3"; // flex, flex-wrap, gap-3を追加

    Object.keys(packageTypes).forEach(key => {
        const type = packageTypes[key];
        const isSelected = selectedPackageType === key;
        const button = document.createElement("button");

        // クラス名を統一感のあるフォーマットで設定
        button.className = `package-btn p-3 rounded-lg border-2 transition-all duration-200 flex justify-center items-center ${
            isSelected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
        }`;
        
        // ボタンのテキスト要素を作成
        const textDiv = document.createElement("div");
        textDiv.className = "text-center text-base";
        textDiv.textContent = type.name;

        // 要素を組み立て
        button.appendChild(textDiv);

        button.onclick = () => {
            selectedPackageType = isSelected ? "" : key;
            updateUI();
        };
        // 修正: rowに追加
        row.appendChild(button);
    });
    // 修正: packageTypesContainerにrowを追加
    packageTypesContainer.appendChild(row);
}

// --- 画像フィルタ（AND条件：キーワード・色調・パッケージ種類） ---
function updateFilteredImages() {
    dynamicImageGrid.innerHTML = "";
    // フィルター条件（selectedColorTone を単一値として扱う）
    const filters = [
        ...selectedKeywords,
        selectedColorTone,
        selectedPackageType
    ].filter(Boolean);

    if (filters.length === 0) {
        imageDisplayArea.classList.remove("hidden");
        dynamicImageGrid.innerHTML = '<div class="text-gray-500 text-center py-8 col-span-4">該当する画像がありません</div>';
        return;
    }

    // AND条件で全タグ一致
    const matchingImages = availableImages.filter(image => {
        return filters.every(filter => image.tags.includes(filter));
    });

    imageDisplayArea.classList.remove("hidden");
    if (matchingImages.length > 0) {
        matchingImages.forEach(image => {
            const imageEl = document.createElement("img");
            imageEl.src = image.src;
            imageEl.alt = "選択されたパッケージのイメージ";
            imageEl.className = "w-full h-full object-contain rounded-lg border border-gray-300 cursor-pointer transition hover:scale-105";
            imageEl.style.maxWidth = "200px";
            imageEl.style.maxHeight = "200px";
            imageEl.onclick = () => openImageModal(image.src);
            const wrapper = document.createElement("div");
            wrapper.className = "flex justify-center items-center";
            wrapper.appendChild(imageEl);
            dynamicImageGrid.appendChild(wrapper);
        });
    } else {
        dynamicImageGrid.innerHTML = '<div class="text-gray-500 text-center py-8 col-span-4">該当する画像がありません</div>';
    }
}

// --- 画像プレビューモーダル ---
function openImageModal(src) {
    const overlay = document.getElementById('image-modal-overlay');
    const modalImg = document.getElementById('image-modal-img');
    if (overlay && modalImg) {
        modalImg.src = src;
        overlay.classList.remove('hidden');
    }
}
function closeImageModal() {
    const overlay = document.getElementById('image-modal-overlay');
    if (overlay) overlay.classList.add('hidden');
}

// --- プロンプト生成 ---
function generatePrompt() {
    let prompt = "Create a cosmetic package graphic concept, ";

    // キーワード
    if (selectedKeywords.length > 0) {
        const keywordTexts = selectedKeywords.map(k => keywordPrompts[k]).filter(Boolean);
        if (keywordTexts.length > 0) {
            prompt += keywordTexts.join(", ") + ", ";
        }
    }

    // 色調（単一選択）
    if (selectedColorTone) {
        const found = toneOptions.find(opt => opt.key === selectedColorTone);
        if (found && found.prompt) {
            prompt += found.prompt + ", ";
        }
    }

    // その他色調（テキスト入力）
    const customColor = customColorToneInput?.value?.trim();
    if (customColor) {
        prompt += `main color: ${customColor}, `;
    }

    // パッケージ種類（basePromptを使用）
    if (selectedPackageType && packageTypes[selectedPackageType]?.basePrompt) {
        prompt += packageTypes[selectedPackageType].basePrompt + ", ";
    }

    prompt += "brand logo text 'Sample' clearly visible on the package, clean white background, professional lighting, high quality, product photography style, 4K resolution, commercial grade mockup,";
    return prompt;
}


// --- UI更新 ---
function updateUI() {
    renderKeywords();
    renderColorTones();
    renderPackageTypes();
    updateFilteredImages();
    const hasKeywords = selectedKeywords.length > 0;
    showPromptBtn.disabled = !hasKeywords;
    copyPromptBtn.disabled = !hasKeywords;
    promptDisplay.classList.add("hidden");
    if (window.lucide) {
        lucide.createIcons();
    }
}

// --- プロンプト表示（要約部分の色調表示も toneOptions に合わせて修正） ---
function showPrompt() {
    if (selectedKeywords.length === 0) return;
    const prompt = generatePrompt();
    generatedPrompt.textContent = prompt;
    let summaryHTML = "";
    if (selectedKeywords.length > 0) {
        const keywordTexts = selectedKeywords.map(k => {
            const found = keywordsList.find(item => item.key === k);
            return found ? found.name : k;
        });
        summaryHTML += `<div><strong>キーワード:</strong> ${keywordTexts.join(", ")}</div>`;
    }
    if (selectedColorTone) {
        const found = toneOptions.find(opt => opt.key === selectedColorTone);
        if (found) summaryHTML += `<div><strong>色調:</strong> ${found.name}</div>`;
    }
    if (selectedPackageType) {
        summaryHTML += `<div><strong>パッケージ種類:</strong> ${packageTypes[selectedPackageType].name}</div>`;
    }
    selectionSummary.innerHTML = summaryHTML;
    promptDisplay.classList.remove("hidden");
    promptDisplay.classList.add("fade-in");
}


// --- クリップボードコピー ---
async function copyToClipboard() {
    const prompt = generatePrompt();
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(prompt);
            showCopyMessage("プロンプトをコピーしました！");
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = prompt;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyMessage("プロンプトをコピーしました！");
        }
    } catch (err) {
        showCopyMessage("コピーに失敗しました");
    }
}

function showCopyMessage(message) {
    copyMessage.textContent = message;
    copyMessage.classList.remove("hidden");
    setTimeout(() => {
        copyMessage.classList.add("hidden");
    }, 3000);
}

// --- リセット ---
function reset() {
    selectedKeywords = [];
    selectedColorTone = ""; // 単一選択をリセット
    selectedPackageType = "";
    promptDisplay.classList.add("hidden");
    copyMessage.classList.add("hidden");
    updateUI();
}


// --- イベントリスナー ---
function setupEventListeners() {
    showPromptBtn.addEventListener("click", showPrompt);
    copyPromptBtn.addEventListener("click", copyToClipboard);
    resetBtn.addEventListener("click", reset);
}

// --- ページ初期化 ---
document.addEventListener("DOMContentLoaded", function() {
    initializeElements();
    setupEventListeners();
    updateUI();

    // 画像モーダル
    const overlay = document.getElementById('image-modal-overlay');
    const closeBtn = document.getElementById('image-modal-close');
    if (overlay && closeBtn) {
        closeBtn.onclick = closeImageModal;
        overlay.onclick = (e) => {
            if (e.target === overlay) closeImageModal();
        };
    }

    // ヘルプモーダル
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal-overlay');
    const helpClose = document.getElementById('help-modal-close');
    if (helpBtn && helpModal && helpClose) {
        helpBtn.onclick = () => helpModal.classList.remove('hidden');
        helpClose.onclick = () => helpModal.classList.add('hidden');
        helpModal.onclick = (e) => {
            if (e.target === helpModal) helpModal.classList.add('hidden');
        };
    }
});