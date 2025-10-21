const REPO_NAME = "ConceptPaletteforCosme";
// --- キーワードリスト（自由に追加可能） ---
const keywordsList = [
    { key: "luxury", name: "高級感" },
    { key: "elegant", name: "エレガント" },
    { key: "simple", name: "シンプル" },
    { key: "modern", name: "モダン" },
    { key: "natural", name: "ナチュラル" },
    { key: "clean", name: "クリーン" },
    { key: "feminine", name: "フェミニン" },
    { key: "botanical", name: "ボタニカル" },
    { key: "unique", name: "ユニーク" },
    { key: "pop", name: "ポップ" },
    { key: "japanese", name: "和風" },
    { key: "ethnic", name: "エスニック" },
    { key: "futuristic", name: "未来的" },
    // ...追加可能
];
// キーワードごとのプロンプト例
const keywordPrompts = {
    luxury: "high-end luxury, premium feel, sophisticated design",
    elegant: "classic elegant style, refined and graceful, soft shadows",
    simple: "clean simple aesthetic, intuitive layout, effortless and accessible design, clear and easy to understand",
    modern: "sleek modern design, cutting-edge typography, contemporary forms",
    natural: "natural organic ingredients concept, subtle hand-rendered graphic texture, muted earthy tones, serene atmosphere",
    clean: "pristine clean aesthetic, delicate graphic, clear and crisp visual elements",
    feminine: "delicate feminine beauty, gentle and sophisticated forms, elegant and refined details, ethereal and delicate mood, smooth matte texture",
    botanical: "lush botanical graphic elements, rich greenery, detailed plant motif illustration, vibrant natural light, active floral and leaf composition",
    unique: "distinct unique concept, unconventional form, artistic composition",
    pop: "bold pop art style, high contrast, vibrant graphic elements",
    japanese: " Japanese-inspired graphic, elegant simplicity, delicate brushwork, tranquil atmosphere, intricate yet subtle design",
    ethnic: "Ethnic-inspired design, intricate tribal motifs, rich cultural patterns, handcrafted textures, earthy and organic feel, traditional ornamentation",
    futuristic: "Futuristic design, sleek and sophisticated, minimalist yet luxurious, dynamic composition, innovative design concept",
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
    { key: "tone-pale", name: "ペールトーン", gradientColors: ['#FADADD', '#FFFACD', '#C8F9E4', '#E5E3F5'], prompt: "pale tone, high lightness and low saturation color palette, delicate and soft, ethereal and transparent tints" },
    { key: "tone-pastel", name: "パステルカラー", gradientColors:  ['#FFC0CB', '#FAFAD2', '#98FB98', '#B19CD9'], prompt: "pastel color palette, medium lightness and saturation, cute and cheerful, highly visible tints, bright and gentle atmosphere" },  
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
"botanical_clean_modern_tone-pale_bottle.jpeg",
"botanical_elegant_japanese_tone-pastel_bottle_pouch.jpeg",
"botanical_elegant_tone-cool_pouch.jpeg",
"botanical_natural_tone-dark_bottle.jpeg",
"botanical_natural_tone-monotone_pouch.jpeg",
"botanical_natural_tone-nuance_jar.jpeg",
"botanical_natural_tone-nuance_pouch.jpeg",
"botanical_natural_tone-nuance_pouch_2.jpeg",
"botanical_natural_tone-warm_box.jpeg",
"botanical_tone-dark_pouch.jpeg",
"botanical_tone-dark_pouch_2.jpeg",
"botanical_tone-pale_bottle_pouch.jpeg",
"botanical_tone-pastel_bottle_pouch.jpeg",
"botanical_unique_tone-pastel_bottle.jpeg",
"clean_elegant_simple_tone-monotone_bottle_pouch.jpeg",
"clean_elegant_simple_tone-monotone_pouch.jpeg",
"clean_futuristic_tone-cool_box_bottle.jpeg",
"clean_modern_simple_tone-pale_pouch.jpeg",
"clean_modern_tone-pale_tube.jpeg",
"clean_pop_tone-cool_bottle_pouch.jpeg",
"clean_simple_modern_tone-monotone_bottle.jpeg",
"clean_simple_tone-cool_bottle.jpeg",
"clean_simple_tone-cool_pouch.jpeg",
"clean_simple_tone-cool_tube.jpeg",
"clean_simple_tone-monotone_bottle_jar.jpeg",
"clean_simple_tone-pale_tube.jpeg",
"clean_tone-cool_box_2.jpeg",
"clean_tone-cool_pouch.jpeg",
"clean_tone-pastel_tube.jpeg",
"elegant_feminine_tone-pale_tube.jpeg",
"elegant_feminine_tone-pale_tube_2.jpeg",
"elegant_feminine_tone-pale_tube_3.jpeg",
"elegant_luxury_botanical_tone-nuance_bottle.jpeg",
"elegant_luxury_tone-cool_tube.jpeg",
"elegant_simple_tone-nuance_jar.jpeg",
"elegant_tone-warm_tube.jpeg",
"ethnic_tone-dark_jar.jpeg",
"ethnic_tone-dark_pouch.jpeg",
"ethnic_tone-dark_tube.jpeg",
"ethnic_tone-monotone_pouch.jpeg",
"ethnic_tone-pastel_bottle_pouch.jpeg",
"ethnic_tone-pastel_pouch.jpeg",
"ethnic_tone-vivid_bottle_pouch.jpeg",
"ethnic_tone-vivid_box.jpeg",
"ethnic_tone-vivid_pouch.jpeg",
"ethnic_tone-vivid_tube.jpeg",
"feminine_botanical_elegant_tone-pale_bottle.jpeg",
"feminine_botanical_elegant_tone-pale_tube.jpeg",
"feminine_botanical_elegant_tone-pastel_bottle.jpeg",
"feminine_botanical_tone-pale_bottle.jpeg",
"feminine_elegant_botanical_luxury_tone-warm_bottle.jpeg",
"feminine_elegant_botanical_tone-nuance_bottle.jpeg",
"feminine_elegant_botanical_tone-pastel_bottle.jpeg",
"feminine_elegant_botanical_tone-warm_bottle.jpeg",
"feminine_elegant_luxury_tone-pale_bottle.jpeg",
"feminine_elegant_tone-pale_bottle.jpeg",
"feminine_elegant_tone-pale_tube.jpeg",
"feminine_luxury_elegant_botanical_tone-pastel_tube_pouch.jpeg",
"feminine_modern_tone-pale_bottle_tube.jpeg",
"feminine_natural_tone-pale_bottle_pouch.jpeg",
"feminine_pop_tone-pale_bottle.jpeg",
"feminine_pop_tone-pale_tube.jpeg",
"feminine_simple_tone-pale_pouch.jpeg",
"feminine_simple_tone-pale_tube.jpeg",
"feminine_tone-pale_bottle_pouch.jpeg",
"futuristic_modern_clean_tone-monotone_box.jpeg",
"futuristic_modern_tone-vivid_box.jpeg",
"futuristic_simple_tone-vivid_tube.jpeg",
"futuristic_tone-cool_bottle.jpeg",
"futuristic_tone-cool_box.jpeg",
"futuristic_tone-cool_pouch.jpeg",
"futuristic_tone-cool_pouch_2.jpeg",
"futuristic_tone-cool_pouch_3.jpeg",
"futuristic_tone-monotone_pouch.jpeg",
"futuristic_tone-vivid_box.jpeg",
"futuristic_tone-vivid_pouch.jpeg",
"japanese_botanical_tone-monotone_pouch.jpeg",
"japanese_modern_tone-cool_pouch.jpeg",
"japanese_modern_tone-dark_bottle_pouch.jpeg",
"japanese_tone-cool_pouch.jpeg",
"japanese_tone-cool_tube.jpeg",
"japanese_tone-dark_bottle.jpeg",
"japanese_tone-dark_box.jpeg",
"japanese_tone-dark_pouch.jpeg",
"japanese_tone-monotone_box.jpeg",
"japanese_tone-monotone_pouch.jpeg",
"japanese_tone-monotone_pouch_2.jpeg",
"japanese_tone-monotone_pouch_3.jpeg",
"japanese_tone-monotone_pouch_4.jpeg",
"japanese_tone-monotone_tube.jpeg",
"japanese_tone-nuance_pouch.jpeg",
"japanese_tone-nuance_pouch_2.jpeg",
"japanese_tone-pale_bottle_pouch.jpeg",
"japanese_tone-pale_pouch.jpeg",
"japanese_tone-pale_pouch_2.jpeg",
"japanese_tone-pastel_box.jpeg",
"japanese_tone-pastel_box_jar.jpeg",
"japanese_tone-vivid_pouch.jpeg",
"japanese_tone-vivid_pouch_2.jpeg",
"japanese_tone-warm_pouch.jpeg",
"japanese_tone-warm_pouch_2.jpeg",
"luxury_box.jpeg",
"luxury_elegant_tone-warm_box_bottle_jar.jpeg",
"luxury_elegant_tone-warm_jar.jpeg",
"luxury_elegant_tone-warm_pouch.jpeg",
"luxury_elegant_tone-warm_tube.jpeg",
"luxury_modern_tone-monotone_bottle.jpeg",
"luxury_modern_tone-monotone_box.jpeg",
"luxury_modern_tone-monotone_box_2.jpeg",
"luxury_modern_tone-vivid_tube.jpeg",
"luxury_simple_modern_tone-monotone_box_tube.jpeg",
"luxury_simple_modern_tone-monotone_jar.jpeg",
"luxury_simple_modern_tone-monotone_jar2.jpeg",
"luxury_simple_modern_tone-monotone_tube.jpeg",
"luxury_simple_modern_tone-monotone_tube_2.jpeg",
"luxury_tone-cool_box.jpeg",
"luxury_tone-cool_pouch.jpeg",
"luxury_tone-cool_tube.jpeg",
"luxury_tone-dark_box.jpeg",
"luxury_tone-dark_box2.jpeg",
"luxury_tone-dark_pouch.jpeg",
"luxury_tone-monotone_box.jpeg",
"luxury_tone-warm_tube.jpeg",
"modern_clean_tone-pale_box.jpeg",
"modern_luxury_tone-cool_pouch.jpeg",
"modern_pop_tone-vivid_box.jpeg",
"modern_pop_tone-vivid_pouch.jpeg",
"modern_simple_tone-monotone_bottle.jpeg",
"modern_simple_tone-monotone_box.jpeg",
"modern_simple_tone-monotone_tube.jpeg",
"modern_simple_tone-vivid_box.jpeg",
"modern_simple_tone-vivid_pouch.jpeg",
"modern_tone-cool_pouch.jpeg",
"modern_tone-dark_bottle_pouch _2.jpeg",
"modern_tone-dark_bottle_pouch.jpeg",
"modern_tone-dark_box.jpeg",
"modern_tone-dark_box_2.jpeg",
"modern_tone-dark_pouch.jpeg",
"modern_tone-dark_pouch_2.jpeg",
"modern_tone-monotone_pouch.jpeg",
"modern_tone-monotone_pouch_2.jpeg",
"modern_tone-vivid_pouch.jpeg",
"modern_tone-vivid_pouch2.jpeg",
"modern_tone-vivid_tube.jpeg",
"modern_tone-warm_pouch.jpeg",
"modern_tone-warm_tube.jpeg",
"natural_botanical_tone-monotone_pouch.jpeg",
"natural_botanical_tone-nuance_bottle_tube_jar.jpeg",
"natural_botanical_tone-nuance_box.jpeg",
"natural_botanical_tone-nuance_box_jar.jpeg",
"natural_botanical_tone-nuance_jar.jpeg",
"natural_botanical_tone-nuance_pouch.jpeg",
"natural_botanical_tone-nuance_pouch_2.jpeg",
"natural_botanical_tone-nuance_pouch_3.jpeg",
"natural_botanical_tone-nuance_pouch_4.jpeg",
"natural_botanical_tone-warm_pouch.jpeg",
"natural_modern_tone-cool_tube.jpeg",
"natural_modern_tone-cool_tube_pouch.jpeg",
"natural_simple_luxury_tone-nuance_box.jpeg",
"natural_simple_tone-nuance_pouch.jpeg",
"natural_simple_tone-nuance_tube.jpeg",
"natural_simple_tone-warm_pouch.jpeg",
"natural_tone-cool_pouch.jpeg",
"natural_tone-cool_pouch_2.jpeg",
"natural_tone-dark_jar.jpeg",
"natural_tone-dark_pouch.jpeg",
"natural_tone-nuance_jar.jpeg",
"natural_tone-nuance_pouch.jpeg",
"natural_tone-nuance_pouch2.jpeg",
"natural_tone-nuance_pouch3.jpeg",
"natural_tone-nuance_pouch_2.jpeg",
"natural_tone-nuance_pouch_3.jpeg",
"natural_tone-nuance_pouch_4.jpeg",
"natural_tone-nuance_pouch_5.jpeg",
"natural_tone-nuance_pouch_6.jpeg",
"natural_tone-nuance_tube.jpeg",
"natural_tone-nuance_tube_2.jpeg",
"pop_japanese_tone-vivid_pouch.jpeg",
"pop_modern_futuristic_tone-vivid_pouch.jpeg",
"pop_modern_tone-vivid_bottle_tube.jpeg",
"pop_simple_tone-vivid_pouch.jpeg",
"pop_unique_futuristic_tone-vivid_jar.jpeg",
"pop_unique_tone-vivid_bottle.jpeg",
"pop_unique_tone-vivid_pouch.jpeg",
"pop_unique_tone-vivid_pouch_2.jpeg",
"pop_unique_tone-vivid_tube.jpeg",
"pop_unique_tone-warm_box.jpeg",
"pop_unique_tone-warm_pouch.jpeg",
"simple_botanical_tone-pale_tube.jpeg",
"simple_clean_tone-monotone_bottle.jpeg",
"simple_feminine_tone-pale_bottle.jpeg",
"simple_feminine_tone-pale_bottle_tube.jpeg",
"simple_futuristic_tone-monotone_pouch.jpeg",
"simple_luxury_bottle.jpeg",
"simple_luxury_bottle2.jpeg",
"simple_luxury_tone-cool_box_jar.jpeg",
"simple_luxury_tone-dark_pouch.jpeg",
"simple_luxury_tone-monotone_pouch.jpeg",
"simple_luxury_tone-monotone_pouch_2.jpeg",
"simple_luxury_tone-monotone_tube.jpeg",
"simple_luxury_tone-monotone_tube2.jpeg",
"simple_luxury_tone-monotone_tube_2.jpeg",
"simple_luxury_tone-pale_tube.jpeg",
"simple_luxury_tone-warm_box.jpeg",
"simple_modern_feminine_tone-pale_tube.jpeg",
"simple_modern_luxury_tone-monotone_box.jpeg",
"simple_modern_tone-cool_pouch.jpeg",
"simple_modern_tone-cool_pouch_2.jpeg",
"simple_modern_tone-cool_pouch_3.jpeg",
"simple_modern_tone-cool_tube_pouch.jpeg",
"simple_modern_tone-dark_bottle_pouch.jpeg",
"simple_modern_tone-dark_pouch.jpeg",
"simple_modern_tone-dark_pouch_2.jpeg",
"simple_modern_tone-dark_pouch_3.jpeg",
"simple_modern_tone-monotone_box _2.jpeg",
"simple_modern_tone-monotone_box.jpeg",
"simple_modern_tone-monotone_pouch.jpeg",
"simple_modern_tone-monotone_pouch_2.jpeg",
"simple_modern_tone-monotone_pouch_3.jpeg",
"simple_modern_tone-monotone_pouch_4.jpeg",
"simple_modern_tone-monotone_pouch_5.jpeg",
"simple_modern_tone-monotone_tube.jpeg",
"simple_modern_tone-nuance_pouch.jpeg",
"simple_modern_tone-nuance_tube_pouch.jpeg",
"simple_modern_tone-vivid_pouch.jpeg",
"simple_modern_tone-vivid_tube.jpeg",
"simple_modern_tone-warm_pouch.jpeg",
"simple_modern_tone-warm_pouch_2.jpeg",
"simple_pop_tone-cool_tube.jpeg",
"simple_pop_tone-dark_pouch.jpeg",
"simple_pop_tone-warm_pouch.jpeg",
"simple_pop_tone-warm_pouch_2.jpeg",
"simple_tone-cool_pouch.jpeg",
"simple_tone-cool_pouch_2.jpeg",
"simple_tone-dark_bottle_pouch _2.jpeg",
"simple_tone-dark_bottle_pouch.jpeg",
"simple_tone-dark_pouch.jpeg",
"simple_tone-monotone_box.jpeg",
"simple_tone-monotone_tube_bottle.jpeg",
"simple_tone-nuance_pouch.jpeg",
"simple_tone-nuance_pouch_2.jpeg",
"simple_tone-nuance_tube.jpeg",
"simple_tone-pale_bottle_tube_pouch.jpeg",
"simple_tone-pale_pouch.jpeg",
"simple_tone-pale_pouch_2.jpeg",
"simple_tone-pale_pouch_3.jpeg",
"simple_tone-pale_tube_pouch.jpeg",
"simple_tone-pastel_pouch.jpeg",
"simple_tone-pastel_pouch_2.jpeg",
"simple_tone-pastel_pouch_3.jpeg",
"simple_tone-pastel_pouch_4.jpeg",
"simple_tone-pastel_pouch_5.jpeg",
"simple_tone-pastel_pouch_6.jpeg",
"simple_tone-pastel_tube.jpeg",
"simple_tone-warm_pouch.jpeg",
"simple_tone-warm_tube_pouch.jpeg",
"unique_elegant_pop_tone-pastel_bottle.jpeg",
"unique_futuristic_tone-pastel_jar.jpeg",
"unique_pop_futuristic_tone-vivid_pouch.jpeg",
"unique_pop_tone-pastel_bottle.jpeg",
"unique_pop_tone-vivid_bottle.jpeg",
"unique_pop_tone-warm_jar.jpeg",
"unique_simple_tone-vivid_box_bottle.jpeg",
"unique_tone-pastel_pouch.jpeg",
"unique_tone-vivid_bottle.jpeg",
// ...追加可能
];

// 画像データ
const availableImages = pictImages.map(filename => {
    const tags = filename.replace(/\.[^/.]+$/, "").split("_");
    return {
        // 修正後のパス: images/pict/ファイル名
        src: `images/pict/${filename}`, // 👈 リポジトリ名（REPO_NAME）を外す
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

    // 何も選択されていない場合は画像を表示しない
    if (filters.length === 0) {
        imageDisplayArea.classList.add("hidden");
        return;
    }

    // 色調のみ選択されている場合の処理
    if (selectedColorTone && filters.length === 1) {
        const matchingImages = availableImages.filter(image => image.tags.includes(selectedColorTone));
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
        imageDisplayArea.classList.remove("hidden");
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

    prompt += "brand logo text 'Sample' clearly visible on the package, soft diffused lighting, high quality, product photography style, 4K resolution, commercial grade mockup, clean white background";
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