import { useState } from "react";
import { Callout, Formula, NextBar, Objectives, Var } from "../components/Bits";
import { PoeCycle } from "../components/PoeCycle";
import { VocabStrip } from "../components/VocabStrip";
import { Tx } from "../store";
import { ProfileLab } from "../widgets/ProfileLab";
import { SeaLab } from "../widgets/SeaLab";

const PREDICT = {
  zh: "我預測____，因為____。",
  en: "I predict that ____, because ____.",
};
const EXPLAIN = {
  zh: "我原本預測____。觀察顯示____。所以布格異常____。",
  en: "I predicted that ____. The observation shows ____. So the Bouguer anomaly ____.",
};

export function Lesson3() {
  const [open, setOpen] = useState<string | null>("bc");

  return (
    <article className="page lesson">
      <p className="kicker">Lesson 03</p>
      <h1>
        <Tx zh="把山從曲線裡移開" en="Move the hill out of the curve" />
      </h1>
      <p className="lede">
        <Tx
          zh="自由空間異常已經處理了緯度和高度，卻把測站下方那一截岩石留在數字裡。山越高，這截岩石越厚，曲線就越像地形的複本。布格校正做的事，是在計算裡把這塊平板拿掉。"
          en="The free-air anomaly has dealt with latitude and height, but the rock beneath the station is still in the number. The higher the hill, the thicker that rock, and the more the curve copies the terrain. The Bouguer correction removes that slab inside the calculation."
        />
      </p>
      <Objectives
        content={{
          zh: [
            "說明自由空間異常為什麼還會跟著地形走。",
            "計算陸上布格平板 BC = 0.0419 ρ h，並從自由空間異常中減去。",
            "說明海上要用海水與地殼的密度差，而且這一項是負的。",
          ],
          en: [
            "Explain why the free-air anomaly still follows terrain.",
            "Compute the land slab BC = 0.0419 ρ h and subtract it from the free-air anomaly.",
            "Explain that the sea uses the seawater–crust density contrast and that the term is negative.",
          ],
        }}
        language={{
          zh: [
            "能把 Bouguer 讀成布格，並知道有人寫成布蓋。",
            "用 mass excess / mass deficiency 描述正負異常，而不是直接說「一定是某種礦」。",
          ],
          en: [
            "Read 布格 as Bouguer, and recognise the spelling 布蓋.",
            "Describe the sign as mass excess or mass deficiency instead of naming one ore for certain.",
          ],
        }}
      />
      <VocabStrip
        ids={["bc", "ba", "slab", "contrast", "unique"]}
        openId={open}
        onToggle={(id) => setOpen(open === id ? null : id)}
      />

      <PoeCycle
        id="l3-copy"
        lesson="l3"
        index="07"
        title={{ zh: "曲線還會不會跟著山走？", en: "Does the curve still follow the hill?" }}
        question={{
          zh: "一條翻山的測線只做了自由空間校正。異常曲線會變成怎樣？",
          en: "A survey line crosses a range and only the free-air correction has been applied. What does the anomaly curve do?",
        }}
        options={[
          { id: "flat", zh: "幾乎變平。高度已經校正了。", en: "It becomes nearly flat. Height has been corrected." },
          { id: "copy", zh: "仍大致跟著山丘起伏。山和海平面之間的岩石還在。", en: "It still mostly rises and falls with the hills. The rock between the station and sea level is still there." },
          { id: "mirror", zh: "變成地形的上下顛倒。", en: "It becomes an upside-down copy of the terrain." },
        ]}
        correct="copy"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="自由空間校正把測站「想成」懸在基準面上方 h 公尺的空中，再把距離效應補回去。可是實地上，這 h 公尺裡裝的是岩石，不是真空。岩石有質量，會產生額外的向下加速度。山越高，這一份越多，所以 Δg_fa 常常看起來像地形的複本。"
                en="The free-air correction imagines the station hanging h metres above the datum and restores the distance effect. In the field, those h metres are filled with rock, not a vacuum. Rock has mass and adds a downward acceleration. The higher the hill, the larger that share, so Δg_fa often looks like a copy of the terrain."
              />
            </p>
            <p>
              <Tx
                zh="看這條教學剖面。自由空間的最高處靠近山頂，而不是靠近後面那個埋藏的高密度體。地形還佔著曲線。"
                en="Look at this teaching profile. The free-air peak sits near the summit, not near the dense body buried farther along the line. Terrain still owns the curve."
              />
            </p>
          </>
        }
        model={{
          zh: "我預測自由空間異常仍會跟著地形起伏，因為測站與海平面之間的岩石沒有被移除。觀察到的高峰靠近山頂。因此還需要布格校正。",
          en: "I predicted that the free-air anomaly would still follow the terrain, because the rock between the station and sea level has not been removed. The observed peak sits near the summit. A Bouguer correction is still needed.",
        }}
      >
        <ProfileLab stage="freeair" />
      </PoeCycle>

      <div className="prose">
        <p>
          <Tx
            zh="皮埃爾．布格把這截物質近似成一塊密度為 ρ、厚度為 h 的無限大平板。平板的引力是 BC = 2πρGh。把常數和單位整理成探勘習慣之後，課程寫成："
            en="Pierre Bouguer approximated that material as an infinite slab of density ρ and thickness h. The slab’s attraction is BC = 2πρGh. With the constants and units folded into prospecting practice, the course writes:"
          />
        </p>
        <Formula label="Bouguer correction equals 0.0419 rho h">
          <span>BC</span>
          <span className="op">=</span>
          <span>0.0419</span>
          <Var>ρ</Var>
          <Var>h</Var>
        </Formula>
        <p>
          <Tx
            zh="ρ 用 g/cm³，h 用公尺，BC 就是 mGal。若取地殼常用的 2.67 g/cm³，梯度約是 0.112 mGal/m。簡單布格異常是："
            en="With ρ in g/cm³ and h in metres, BC is in mGal. At the often-used crustal density 2.67 g/cm³, the gradient is about 0.112 mGal per metre. The simple Bouguer anomaly is:"
          />
        </p>
        <Formula label="Bouguer anomaly equals free-air anomaly minus BC" light>
          <span>Δg</span>
          <sub>B</sub>
          <span className="op">=</span>
          <span>Δg</span>
          <sub>fa</sub>
          <span className="op">−</span>
          <span>BC</span>
        </Formula>
      </div>

      <PoeCycle
        id="l3-slab"
        lesson="l3"
        index="08"
        title={{ zh: "山移開之後，高點在哪？", en: "After the hill leaves, where is the high?" }}
        question={{
          zh: "用接近真密度的平板把地形拿掉之後，剩下的正異常高點會在哪裡？",
          en: "After a slab near the true density removes the terrain, where is the remaining positive peak?",
        }}
        options={[
          { id: "summit", zh: "仍在最高的山頂上。", en: "Still on the highest summit." },
          { id: "ore", zh: "改到埋藏的高密度體上方，即使那裡不是山頂。", en: "It moves over the buried dense body, even if that is not the summit." },
          { id: "zero", zh: "整條曲線變成零。布格校正會把所有質量都消掉。", en: "The whole curve becomes zero. The Bouguer correction removes every mass." },
        ]}
        correct="ore"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="平板只代表「和地形一樣厚的那一層正常岩石」。比這層更多或更少的質量會留下來。先按「施作布格校正」，再放大曲線。密度用 2.67 時，高點會離開山頂，移向埋藏體。"
                en="The slab stands only for a normal rock layer as thick as the terrain. Mass beyond that layer remains. Apply the Bouguer correction, then zoom. At a density of 2.67 the peak leaves the summit and moves toward the buried body."
              />
            </p>
            <p>
              <Tx
                zh="把密度滑開。假設密度不等於真密度時，地形的形狀又會漏回布格曲線。所以 ρ 不是裝飾，它決定你有沒有真的把山拿乾淨。"
                en="Move the density away from the true value. When the assumed density is wrong, terrain shape leaks back into the Bouguer curve. ρ is not decoration. It decides whether the hill was actually removed."
              />
            </p>
            <p>
              <Tx
                zh="正值是質量過剩，負值是質量虧損。過剩可能是礦體、基性侵入岩或較高密度的基盤；虧損可能是沉積盆地、鹽丘或空洞。這是一份密度線索，不是一份已經命名的地質圖。"
                en="Positive is mass excess, negative is mass deficit. Excess might be ore, a mafic intrusion, or denser basement. Deficit might be a sedimentary basin, a salt dome, or a cavity. This is a density clue, not a geological map with the bodies already named."
              />
            </p>
          </>
        }
        model={{
          zh: "我預測布格高點會移到埋藏體上方，因為平板移除的是地形岩石，不是額外的質量。觀察在密度 2.67 時確實如此；密度用錯時，地形又回到曲線上。",
          en: "I predicted that the Bouguer peak would move over the buried body, because the slab removes the terrain rock rather than the extra mass. At a density of 2.67 that is what happens. With the wrong density, terrain returns to the curve.",
        }}
      >
        <ProfileLab stage="bouguer" />
      </PoeCycle>

      <PoeCycle
        id="l3-sea"
        lesson="l3"
        index="09"
        title={{ zh: "船上怎麼補質量？", en: "How does a ship restore the mass?" }}
        question={{
          zh: "海上測站的高程接近 0，但船底下是海水，密度約 1.03 g/cm³，不是 2.67 g/cm³ 的岩石。相對於「全是岩石」的參考，海水這一步的布格項 BCₛ = 0.0419 (ρ海水 − ρ地殼) h 會是？",
          en: "A ship has elevation near zero, but under it is seawater of about 1.03 g/cm³, not rock at 2.67 g/cm³. Relative to a reference filled with rock, the marine Bouguer term BCₛ = 0.0419 (ρwater − ρcrust) h is:",
        }}
        options={[
          { id: "negative", zh: "負的。計算 Δg_B 時減去這個負數，等於把缺少的質量加回來。", en: "Negative. Subtracting that negative number in Δg_B adds the missing mass back." },
          { id: "positive", zh: "正的。海水一樣要像山一樣被減掉。", en: "Positive. Seawater is subtracted just like a hill." },
          { id: "zero", zh: "零。船在海平面上，不需要布格校正。", en: "Zero. The ship is at sea level, so no Bouguer correction is needed." },
        ]}
        correct="negative"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="陸上的平板是「多出來的岩石」，所以 BC 為正，要減掉。海上的參考仍把地殼密度當成 2.67，可是那一段深度裝的是較輕的水，是質量虧損。0.0419 × (1.03 − 2.67) 是負的，約 −0.0687 mGal/m。"
                en="On land the slab is extra rock, so BC is positive and is subtracted. At sea the reference still uses a crustal density of 2.67, but that depth is filled with lighter water: a mass deficit. The factor 0.0419 × (1.03 − 2.67) is negative, about −0.0687 mGal per metre."
              />
            </p>
            <Formula label="marine Bouguer anomaly">
              <span>Δg</span>
              <sub>Bs</sub>
              <span className="op">=</span>
              <span>Δg</span>
              <sub>fa</sub>
              <span className="op">−</span>
              <span>BCₛ</span>
              <span className="op">=</span>
              <span>Δg</span>
              <sub>fa</sub>
              <span className="op">+</span>
              <span>0.0687 h</span>
            </Formula>
            <p>
              <Tx
                zh="所以海上常會看到很負的自由空間異常，那一大截是海水比岩石輕，不一定是海底還有一個洞穴。補回這份虧損之後，剩下的布格異常才比較適合拿來談海床之下的密度。"
                en="A strongly negative free-air anomaly at sea is often the lightness of water compared with rock, not automatically a cave under the seabed. After that deficit is restored, the remaining Bouguer anomaly is the better place to talk about density beneath the sea floor."
              />
            </p>
          </>
        }
        model={{
          zh: "我預測海上的 BCₛ 是負的，因為海水比岩石輕。觀察顯示減去這個負數等於加回約 0.0687 mGal/m 乘上水深。因此海上的自由空間低，有很大一部分是水，而不是自動等於空洞。",
          en: "I predicted a negative marine BCₛ because seawater is lighter than rock. Subtracting that negative number adds back about 0.0687 mGal per metre of water depth. A free-air low at sea is therefore largely the water, not automatically a cavity.",
        }}
      >
        <SeaLab />
      </PoeCycle>

      <Callout title={<Tx zh="還有一個地形校正" en="There is still a terrain correction" />}>
        <p>
          <Tx
            zh="無限大平板是平的。測站旁邊若有真正的山峰或山谷，山會向上拉、谷會少一塊向下的質量，兩者都會讓測到的 g 變小。完整布格異常再加一項地形校正 TC：Δg_B = g − gₜ + FAC − BC + TC。本站的計算機做的是簡單布格，TC 先設為 0。"
            en="An infinite slab is flat. A real peak beside the station pulls upward, and a real valley is missing downward mass. Both make measured g smaller. The complete Bouguer anomaly adds a terrain correction TC: Δg_B = g − gₜ + FAC − BC + TC. The calculator on this site computes the simple Bouguer anomaly and sets TC to 0."
          />
        </p>
      </Callout>

      <div className="prose">
        <p>
          <Tx
            zh="最後留一個限制。重力是位能場，地表的一條曲線可以對應不只一種地下組合：較寬較淺的物體，和較窄較深的物體，異常可以很像。這叫非唯一性。布格異常是密度地圖的起點，解釋時要讓其他地質與地球物理資料一起說話。"
            en="One limit remains. Gravity is a potential field, and one surface curve can belong to more than one underground arrangement. A wider, shallower body and a narrower, deeper body can look alike. That is non-uniqueness. The Bouguer anomaly is the start of a density map. Other geological and geophysical evidence has to speak with it."
          />
        </p>
      </div>

      <section className="takeaways">
        <h2>
          <Tx zh="三層校正疊完" en="The three corrections, stacked" />
        </h2>
        <ol>
          <li>
            <Tx zh="減 gₜ，拿走緯度。" en="Subtract gₜ to remove latitude." />
          </li>
          <li>
            <Tx zh="加 FAC，補回高度造成的減少。" en="Add FAC to restore what height removed." />
          </li>
          <li>
            <Tx zh="減 BC。陸上平板為正；海上 BCₛ 為負，減去它等於補回海水的質量虧損。" en="Subtract BC. The land slab is positive. At sea BCₛ is negative, and subtracting it restores the seawater deficit." />
          </li>
        </ol>
      </section>
      <NextBar
        prev={{ href: "#/lesson/2", zh: "上一課", en: "Previous lesson" }}
        next={{ href: "#/lab", zh: "到測站計算機", en: "To the station calculator" }}
      />
    </article>
  );
}
