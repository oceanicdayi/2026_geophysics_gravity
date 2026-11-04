import { useState } from "react";
import { Callout, Formula, NextBar, Objectives, Var } from "../components/Bits";
import { PoeCycle } from "../components/PoeCycle";
import { VocabStrip } from "../components/VocabStrip";
import { Tx } from "../store";
import { LatitudeLab } from "../widgets/LatitudeLab";
import { MountainLab } from "../widgets/MountainLab";
import { SignLab } from "../widgets/SignLab";

const PREDICT = {
  zh: "我預測____，因為____。",
  en: "I predict that ____, because ____.",
};
const EXPLAIN = {
  zh: "我原本預測____。觀察顯示____。校正時要____，因為____。",
  en: "I predicted that ____. The observation shows ____. The correction ____, because ____.",
};

export function Lesson2() {
  const [open, setOpen] = useState<string | null>("fac");

  return (
    <article className="page lesson">
      <p className="kicker">Lesson 02</p>
      <h1>
        <Tx zh="什麼叫正常" en="What counts as normal" />
      </h1>
      <p className="lede">
        <Tx
          zh="重力異常不是重力本身，而是觀測值減去你原先預期的正常值。在預期還沒說清楚之前，沒有異常可言。這一課先處理兩個最大的已知項：緯度，以及你站得有多高。"
          en="A gravity anomaly is not gravity itself. It is the observed value minus the normal value you expected. Until that expectation is clear, there is no anomaly. This lesson removes the two largest known terms: latitude, and how high you are standing."
        />
      </p>
      <Objectives
        content={{
          zh: [
            "用 1967 公式理解理論重力只隨緯度改變。",
            "說明自由空間校正為什麼是加，而不是減。",
            "寫出 Δg_fa = g − gₜ + FAC，並讀出正負號。",
          ],
          en: [
            "Use the 1967 formula to see that theoretical gravity depends only on latitude.",
            "Explain why the free-air correction is added rather than subtracted.",
            "Write Δg_fa = g − gₜ + FAC and read the sign.",
          ],
        }}
        language={{
          zh: [
            "能區分 correction 與 anomaly：校正是你做的運算，異常是運算後留下的差。",
            "說得出 free-air 對應的中文是自由空間，不是「自由的空氣」。",
          ],
          en: [
            "Separate 校正 and 異常: a correction is the operation, an anomaly is the difference that remains.",
            "Say that 自由空間 names the free-air term, not “free air” in the everyday sense.",
          ],
        }}
      />
      <VocabStrip
        ids={["anomaly", "gt", "fac", "fa", "datum"]}
        openId={open}
        onToggle={(id) => setOpen(open === id ? null : id)}
      />

      <div className="prose">
        <p>
          <Tx
            zh="一個測站的讀數同時含有三件事：緯度、高程，以及腳下真正的質量分佈。探勘想留下的是第三件。前兩件要先扣乾淨。這個扣除就叫重力校正。"
            en="A station reading holds three things at once: latitude, elevation, and the real mass underfoot. Prospecting wants the third. The first two have to be cleaned off. That cleaning is a gravity correction."
          />
        </p>
      </div>

      <PoeCycle
        id="l2-scale"
        lesson="l2"
        index="04"
        title={{ zh: "緯度有多大？", en: "How large is latitude?" }}
        question={{
          zh: "赤道和兩極的理論重力大約差多少？",
          en: "About how large is the difference in theoretical gravity between the equator and the poles?",
        }}
        options={[
          { id: "5", zh: "大約 5 mGal，和一個小礦體差不多。", en: "About 5 mGal, similar to a small ore body." },
          { id: "50", zh: "大約 50 mGal。", en: "About 50 mGal." },
          { id: "500", zh: "大約 500 mGal。", en: "About 500 mGal." },
          { id: "5000", zh: "大約 5,000 mGal。不先拿掉的話，地質訊號會被蓋住。", en: "About 5,000 mGal. Left in place, it would bury a geological signal." },
        ]}
        correct="5000"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="課程使用 1967 國際重力公式。gₑ 是赤道的 978,031.85 mGal，φ 是緯度。它描述的是一顆光滑、規則、會自轉的參考扁球在海平面上的重力，裡面沒有山，也沒有礦。"
                en="The course uses the 1967 International Gravity Formula. gₑ is 978,031.85 mGal at the equator and φ is latitude. It is sea-level gravity on a smooth, regular, rotating reference ellipsoid. There is no mountain in it, and no ore."
              />
            </p>
            <Formula label="1967 international gravity formula">
              <Var>g</Var>
              <sub>t</sub>
              <span className="op">=</span>
              <Var>g</Var>
              <sub>e</sub>
              <span className="long">(1 + 0.005278895 sin²φ + 0.000023462 sin⁴φ)</span>
            </Formula>
            <p>
              <Tx
                zh="把滑桿拉到兩極，和赤道相減。差大約是 5,186 mGal。校正的動作很單純：用觀測值減去這個 gₜ。減完之後，緯度不再冒充地質。"
                en="Drag the slider to the pole and subtract the equator. The gap is about 5,186 mGal. The correction itself is simple: subtract this gₜ from the observed value. After that, latitude can no longer pretend to be geology."
              />
            </p>
          </>
        }
        model={{
          zh: "我預測赤道到兩極大約差 5,000 mGal，因為這個變化遠大於礦體。觀察到的公式差值約為 5,186 mGal。所以異常計算要先減去 gₜ。",
          en: "I predicted a gap of about 5,000 mGal from equator to pole, because that change is far larger than an ore body. The formula gives about 5,186 mGal. An anomaly is therefore computed only after gₜ is subtracted.",
        }}
      >
        <LatitudeLab />
      </PoeCycle>

      <PoeCycle
        id="l2-sign"
        lesson="l2"
        index="05"
        title={{ zh: "山上的讀數，要加還是要減？", en: "On a mountain, add or subtract?" }}
        question={{
          zh: "測站在海拔 1,000 m。只考慮離地心更遠，讀數會比同緯度的海平面小。若要把這個讀數化回海平面，自由空間校正應該怎麼做？",
          en: "The station is at 1,000 m. Considering only the greater distance from Earth’s center, the reading is smaller than sea level at the same latitude. To reduce that reading to sea level, what should the free-air correction do?",
        }}
        options={[
          { id: "subtract", zh: "再減掉 0.308 × h。校正就是把高度影響減去。", en: "Subtract another 0.308 × h. A correction means taking the height effect away." },
          { id: "add", zh: "把少掉的 0.308 × h 加回來。山上的讀數已經變小了。", en: "Add back the missing 0.308 × h. The mountain reading is already smaller." },
          { id: "ignore", zh: "高程只有幾毫伽，可以忽略。", en: "Elevation is only a few milligal and can be ignored." },
        ]}
        correct="add"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="自由空間校正先假裝測站和海平面之間是空的，只處理距離。課程用的梯度是每上升 1 公尺，g 大約減少 0.308 mGal，也大約是每 3 公尺減少 1 mGal。1,000 公尺就是 308 mGal。"
                en="The free-air correction pretends the space between the station and sea level is empty and treats distance only. The course gradient is about 0.308 mGal lost per metre of height, or about 1 mGal for every 3 metres. One thousand metres is 308 mGal."
              />
            </p>
            <Formula label="free-air correction equals 0.308 h">
              <span>FAC</span>
              <span className="op">=</span>
              <span>0.308</span>
              <Var>h</Var>
            </Formula>
            <p>
              <Tx
                zh="中文「自由空間」對上的英文是 free-air。它不是在說空氣的成分，而是說這一步先不放入岩石的質量。因為山上測到的 g 已經偏小，要把基準面的值還原回來，這一項必須加。"
                en="The Chinese 自由空間 names the free-air term. It is not about the composition of air. It means this step does not yet include the mass of rock. Because measured g on the mountain is already small, restoring the datum value means this term has to be added."
              />
            </p>
            <Formula label="free-air anomaly" light>
              <span>Δg</span>
              <sub>fa</sub>
              <span className="op">=</span>
              <Var>g</Var>
              <span className="op">−</span>
              <Var>g</Var>
              <sub>t</sub>
              <span className="op">+</span>
              <span>FAC</span>
            </Formula>
          </>
        }
        model={{
          zh: "我預測要把少掉的重力加回來，因為山上的讀數已經因距離變小。觀察顯示再減一次會離海平面更遠，加回 FAC 才回到 gₜ。因此 Δg_fa = g − gₜ + FAC。",
          en: "I predicted that the missing gravity is added back, because the mountain reading is already smaller because of distance. Subtracting again moves farther from sea level; adding FAC returns the value to gₜ. Therefore Δg_fa = g − gₜ + FAC.",
        }}
      >
        <MountainLab />
      </PoeCycle>

      <Callout title={<Tx zh="自由空間異常裡還有山" en="The hill is still inside the free-air anomaly" />}>
        <p>
          <Tx
            zh="Δg_fa 拿掉了緯度和「離地心更遠」，卻還沒拿掉測站和海平面之間那一截岩石。所以在山區，自由空間異常常常仍跟著地形起伏。下一課的布格校正就是對這截岩石說話。若高程接近 0，這一截很薄，自由空間異常就比較直接地反映腳下的質量差。"
            en="Δg_fa has removed latitude and the extra distance from Earth’s center, but not the rock between the station and sea level. In the mountains the free-air anomaly often still follows the terrain. The Bouguer correction in the next lesson speaks to that rock. Where elevation is near zero, the slice is thin and the free-air anomaly speaks more directly about the mass underfoot."
          />
        </p>
      </Callout>

      <PoeCycle
        id="l2-salt"
        lesson="l2"
        index="06"
        title={{ zh: "平原上的負號", en: "A minus sign on a plain" }}
        question={{
          zh: "平原測站海拔接近 0。減去理論重力之後，Δg = −12 mGal。這個負號比較像什麼？",
          en: "A station on a plain has elevation near zero. After theoretical gravity is removed, Δg = −12 mGal. What does the minus sign more nearly mean?",
        }}
        options={[
          { id: "ore", zh: "高密度礦體。負號代表信號很清楚。", en: "Dense ore. A minus sign means the signal is clear." },
          { id: "light", zh: "比參考模型少了質量，例如鹽丘、空洞或較輕的沉積。", en: "Less mass than the reference model, such as a salt dome, a cavity, or lighter sediments." },
          { id: "latitude", zh: "緯度還沒扣完。", en: "Latitude has not been fully removed." },
        ]}
        correct="light"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="海拔接近 0 時，FAC 也接近 0，所以這一筆差主要不是高程。負的異常表示腳下的質量少於參考模型。鹽丘、洞穴、厚的低密度沉積盆地都可能。重力指出質量虧損，沒有指出是哪一種地質體。"
                en="With elevation near zero, FAC is near zero too, so this difference is not mainly height. A negative anomaly means less mass than the reference model. A salt dome, a cavity, or a thick basin of light sediment can all do it. Gravity points to missing mass. It does not name the geological body."
              />
            </p>
            <p>
              <Tx
                zh="正的自由空間異常在同樣的平原上則是質量過剩，例如較高密度的礦體。應用時要連單位和校正步驟一起說，不能只說「重力很大」。"
                en="A positive free-air anomaly on the same plain would be extra mass, such as denser ore. In use, say the unit and the correction together. “Gravity is large” is not yet an interpretation."
              />
            </p>
          </>
        }
        model={{
          zh: "我預測負異常代表質量少於參考模型。觀察到的差值是 −12 mGal，而且高程接近 0。這可能是鹽丘、空洞或低密度沉積，但單靠重力不能唯一決定。",
          en: "I predicted that a negative anomaly means less mass than the reference model. The difference is −12 mGal and the elevation is near zero. It could be a salt dome, a cavity, or light sediments, but gravity alone does not decide uniquely.",
        }}
      >
        <SignLab />
      </PoeCycle>

      <div className="prose">
        <h2>
          <Tx zh="這個差離開教室之後" en="Where the difference goes" />
        </h2>
        <p>
          <Tx
            zh="低密度的鹽丘常把周圍地層拱起來，成為油氣可以聚集的構造，鹽丘本身往往是顯著的負異常。高密度的金屬礦體則常是正異常。地下空洞、廢礦坑或溶洞會在工程上成為負異常，提醒人們不要直接在上面築壩或蓋重結構。"
            en="A low-density salt dome can arch the surrounding strata into a trap for oil and gas, and the dome itself is often a clear negative anomaly. Dense metal ore is often a positive anomaly. Cavities, abandoned mines, and karst voids matter in engineering as negative anomalies, a warning not to place a dam or a heavy structure directly above them."
          />
        </p>
        <p>
          <Tx
            zh="質量也會隨時間變。冰層融化使一個地區的質量減少，重力跟著下降。GRACE 這一類重力衛星看的就是這種大尺度、隨時間變化的質量，而不是單一個礦體。"
            en="Mass also changes with time. Melting ice reduces the mass of a region and g falls with it. Gravity satellites such as GRACE watch that large, time-varying mass, not a single ore body."
          />
        </p>
      </div>

      <section className="takeaways">
        <h2>
          <Tx zh="加減號先記對" en="Get the signs right" />
        </h2>
        <ol>
          <li>
            <Tx zh="gₜ 只跟緯度有關，從觀測值裡減去。" en="gₜ depends only on latitude and is subtracted from the observation." />
          </li>
          <li>
            <Tx zh="FAC = 0.308 h，加回去，因為高山讀數已經偏小。" en="FAC = 0.308 h and is added, because the high reading is already small." />
          </li>
          <li>
            <Tx zh="Δg_fa = g − gₜ + FAC。正負號談的是相對於參考模型的質量。" en="Δg_fa = g − gₜ + FAC. The sign talks about mass relative to the reference model." />
          </li>
        </ol>
      </section>
      <NextBar
        prev={{ href: "#/lesson/1", zh: "上一課", en: "Previous lesson" }}
        next={{ href: "#/lesson/3", zh: "下一課：布格", en: "Next: Bouguer" }}
      />
    </article>
  );
}
