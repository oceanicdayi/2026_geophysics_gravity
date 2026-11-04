# 重力手記

地球物理重力探勘的 CLIL 雙語學習網站。三堂課沿著課程順序前進：重力加速度、自由空間異常、布格異常。每個概念都用科學教育的 POE（預測—觀察—解釋）走完。

## 學習設計

- **Content**：萬有引力、`g = GM / R²`、1967 理論重力、自由空間校正、布格平板與海上密度差。
- **Communication**：預測、觀察、解釋的中英句型，以及可搜尋的雙語詞彙。
- **Cognition**：先鎖定預測，再看教學模型，最後用觀察修改解釋。
- **Culture**：礦體、鹽丘與油氣構造、地下空洞、重力衛星監測冰量。

預測會寫進瀏覽器的手記，觀察開始之後不能改口。剖面、動畫和測站預設值都是教學模型，不是野外實測。

## 公式

- 理論重力：`gₜ = 978031.85 (1 + 0.005278895 sin²φ + 0.000023462 sin⁴φ)` mGal
- 自由空間：`FAC = 0.308 h`，**加**回觀測值
- 陸上布格：`BC = 0.0419 ρ h`，自自由空間異常**減去**
- 海上布格：`BCₛ = 0.0419 (1.03 − 2.67) h`，為負值

## 本地執行

```bash
npm install
npm test
npm run dev
```

建置：

```bash
npm run build
npm run preview
```

## 課程原文

1. [重力探勘](https://oceanicdayi.blogspot.com/2025/10/1015-1.html)
2. [重力異常與自由空間重力](https://oceanicdayi.blogspot.com/2025/10/1015-2.html) · [Gravity Space](https://huggingface.co/spaces/cwadayi/Gravity)
3. [布格重力](https://oceanicdayi.blogspot.com/2025/10/1015-3.html)
