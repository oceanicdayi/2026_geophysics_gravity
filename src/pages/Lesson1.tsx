import { useState } from "react";
import { Callout, Formula, Frac, NextBar, Objectives, Var } from "../components/Bits";
import { PoeCycle } from "../components/PoeCycle";
import { VocabStrip } from "../components/VocabStrip";
import { Tx } from "../store";
import { FallingLab } from "../widgets/FallingLab";
import { LatitudeLab } from "../widgets/LatitudeLab";
import { TraverseLab } from "../widgets/TraverseLab";

const PREDICT = {
  zh: "我預測____，因為____。",
  en: "I predict that ____, because ____.",
};
const EXPLAIN = {
  zh: "我原本預測____。觀察顯示____。這是因為____。",
  en: "I predicted that ____. The observation shows ____. This is because ____.",
};

export function Lesson1() {
  const [open, setOpen] = useState<string | null>("g");

  return (
    <article className="page lesson">
      <p className="kicker">Lesson 01</p>
      <h1>
        <Tx zh="重力是一扇窗" en="Gravity as a window" />
      </h1>
      <p className="lede">
        <Tx
          zh="重力每天把人留在椅子上，也可以被當成測量。重力儀讀到的不是兩個物體之間的力，而是加速度 g。g 在地表並不處處相同，那個不相同，就是探勘的入口。"
          en="Gravity keeps you in the chair, and it can also be a measurement. A gravimeter does not read the force between two objects. It reads the acceleration g. g is not the same everywhere at the surface, and that difference is the door into prospecting."
        />
      </p>
      <Objectives
        content={{
          zh: [
            "由萬有引力寫出 g = GM / R²，並說明 g 與落下物體的質量無關。",
            "說明赤道的 g 為什麼小於兩極。",
            "把重力高和重力低對上高密度與低密度。",
          ],
          en: [
            "Write g = GM / R² from gravitation and show that g does not depend on the falling mass.",
            "Explain why g is smaller at the equator than at the poles.",
            "Match a gravity high to extra density and a gravity low to missing density.",
          ],
        }}
        language={{
          zh: [
            "用 I predict that…, because… 在觀察前寫下預期。",
            "能口說並辨認 gravitational acceleration、inverse square law、gravity high / low。",
          ],
          en: [
            "Use「我預測……，因為……」before looking.",
            "Recognise and say 重力加速度、平方反比、重力高區 / 低區。",
          ],
        }}
      />
      <VocabStrip ids={["prospecting", "g", "inverse", "gravimeter", "mgal"]} openId={open} onToggle={(id) => setOpen(open === id ? null : id)} />

      <div className="prose">
        <p>
          <Tx
            zh="下面三個測站都先不問公式。你先用日常經驗預測，再讓模型把經驗裡混進去的東西分開。"
            en="The next three stations do not start with a formula. Predict from ordinary experience first, then let the model separate what that experience mixed together."
          />
        </p>
      </div>

      <PoeCycle
        id="l1-fall"
        lesson="l1"
        index="01"
        title={{ zh: "真空裡，誰先落地？", en: "In a vacuum, who lands first?" }}
        question={{
          zh: "抽掉空氣之後，從同一高度釋放一根羽毛和一個保險箱。加速度會怎樣？",
          en: "Air is removed. A feather and a safe are released from the same height. What happens to their accelerations?",
        }}
        options={[
          { id: "safe", zh: "保險箱加速度比較大，因為它比較重。", en: "The safe has the larger acceleration because it is heavier." },
          { id: "feather", zh: "羽毛加速度比較大，因為它比較輕。", en: "The feather has the larger acceleration because it is lighter." },
          { id: "same", zh: "兩者加速度相同。落下物體自己的質量不會留在 g 裡。", en: "The accelerations are the same. The falling mass does not stay inside g." },
        ]}
        correct="same"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="萬有引力寫成 F = G m₁ m₂ / r²。牛頓第二運動定律寫成 F = m₁ a。兩個式子描述同一個力，所以 m₁ a = G m₁ m₂ / r²。被吸引的那個 m₁ 在兩邊都有，消掉之後，a = G m₂ / r²。"
                en="Gravitation is F = G m₁ m₂ / r². Newton’s second law is F = m₁ a. They describe the same force, so m₁ a = G m₁ m₂ / r². The attracted mass m₁ is on both sides and cancels, leaving a = G m₂ / r²."
              />
            </p>
            <Formula label="g equals G M over R squared">
              <Var>g</Var>
              <span className="op">=</span>
              <Var>G</Var>
              <Frac n={<Var>M</Var>} d={<><Var>R</Var><sup>2</sup></>} />
            </Formula>
            <p>
              <Tx
                zh="對地球來說，M 是地球質量，R 是到地心的距離。羽毛和保險箱交換的是 m₁，而 m₁ 已經不在式子裡。空氣阻力會讓羽毛變慢，那是另一個力，不是 g 本身。"
                en="For Earth, M is Earth’s mass and R is the distance to the center. A feather and a safe differ in m₁, and m₁ is already gone from the expression. Air resistance slows the feather. That is another force, not g itself."
              />
            </p>
          </>
        }
        model={{
          zh: "我預測兩者加速度相同，因為 g 與落下物體的質量無關。觀察顯示真空中它們一起落地。這是因為萬有引力與 F = m a 裡的 m₁ 會消掉，留下 g = GM / R²。",
          en: "I predicted equal accelerations because g does not depend on the falling mass. The observation shows that in a vacuum they land together. This is because m₁ cancels between gravitation and F = ma, leaving g = GM / R².",
        }}
      >
        <FallingLab />
      </PoeCycle>

      <div className="prose">
        <p>
          <Tx
            zh="G 約是 6.67 × 10⁻¹¹ N·m²/kg²，到哪裡都一樣。力與兩質量成正比，與質心距離的平方成反比。距離變成兩倍，加速度變成四分之一。這就是平方反比。"
            en="G is about 6.67 × 10⁻¹¹ N·m²/kg², the same everywhere. The force grows with both masses and falls with the square of the distance between centers of mass. Double the distance and the acceleration falls to a quarter. That is the inverse square law."
          />
        </p>
        <p>
          <Tx
            zh="國中常把 g 寫成 9.8 m/s²。那個數字是一個方便的平均。赤道大約 9.78 m/s²，兩極大約 9.83 m/s²。差看起來不大，換成探勘用的毫伽就變得很大。"
            en="School physics often writes g as 9.8 m/s². That is a convenient average. The equator is about 9.78 m/s² and the poles about 9.83 m/s². The gap looks modest until it is written in the milligals prospecting uses."
          />
        </p>
      </div>

      <PoeCycle
        id="l1-poles"
        lesson="l1"
        index="02"
        title={{ zh: "哪裡比較重？", en: "Where is g larger?" }}
        question={{
          zh: "同一個人、同一部重力儀，讀數在哪裡比較大？",
          en: "The same person and the same gravimeter. Where is the reading larger?",
        }}
        options={[
          { id: "equator", zh: "赤道。因為那裡的地球比較「多」。", en: "At the equator, because there is more Earth there." },
          { id: "poles", zh: "兩極。赤道的離心力較大，而且赤道離地心較遠。", en: "At the poles. Centrifugal acceleration is larger at the equator, and the equator is farther from the center." },
          { id: "same", zh: "到處一樣。g 是常數。", en: "Everywhere the same. g is a constant." },
        ]}
        correct="poles"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="地球不是正球，而是赤道略鼓的扁球，並且在自轉。兩件事讓赤道的 g 變小：赤道的離心力最大，方向與重力相反；赤道到地心的距離 R 較大，平方反比讓 g 下降。鼓出的那一圈額外質量會把 g 稍微拉高，但前兩項的淨效果仍是赤道較小。"
                en="Earth is an oblate spheroid, a little wider at the equator, and it rotates. Two effects make equatorial g smaller: centrifugal acceleration is greatest there and opposes gravity, and distance R to the center is larger, so the inverse square law lowers g. The extra mass of the bulge pulls g up a little, but the net of the first two effects is still a smaller equatorial g."
              />
            </p>
            <p>
              <Tx
                zh="把滑桿從 0° 拉到 90°。你會看到大約五千多毫伽的變化。後面探勘要找的異常通常只有這個數字的千分之一左右，所以緯度必須先被當成已知項拿掉。"
                en="Drag the slider from 0° to 90°. The change is a little over five thousand milligal. An exploration anomaly is often about a thousandth of that, so latitude has to be removed as a known term."
              />
            </p>
          </>
        }
        model={{
          zh: "我預測兩極的 g 比較大，因為赤道有較強的離心力，而且離地心較遠。觀察顯示理論重力由赤道往兩極增加約五千毫伽。因此量測局部地質之前，要先移除緯度效應。",
          en: "I predicted a larger g at the poles because the equator has stronger centrifugal acceleration and a greater distance from Earth’s center. The observation shows theoretical gravity increasing by about five thousand milligal from equator to pole. Latitude therefore has to be removed before local geology can be read.",
        }}
      >
        <LatitudeLab />
      </PoeCycle>

      <Callout title={<Tx zh="單位先換好" en="Change the unit first" />}>
        <p>
          <Tx
            zh="1 Gal = 1 cm/s² = 0.01 m/s²。1 mGal = 10⁻³ Gal = 10⁻⁵ m/s²。地球的 g 約 980,000 mGal。赤道與兩極相差約 5,000 mGal。一個值得注意的礦體或空洞，可能只貢獻 0.1 到 10 mGal。"
            en="1 Gal = 1 cm/s² = 0.01 m/s². 1 mGal = 10⁻³ Gal = 10⁻⁵ m/s². Earth’s g is about 980,000 mGal. Equator and pole differ by about 5,000 mGal. An ore body or a cavity worth noticing may contribute only 0.1 to 10 mGal."
          />
        </p>
      </Callout>

      <PoeCycle
        id="l1-walk"
        lesson="l1"
        index="03"
        title={{ zh: "沿著測線走過去", en: "Walk the line" }}
        question={{
          zh: "重力儀先經過埋在地下的高密度礦體，再經過一個空洞。讀數會怎麼變？",
          en: "The gravimeter passes a buried high-density ore body, then a cavity. What does the reading do?",
        }}
        options={[
          { id: "high-low", zh: "礦體上方上升，空洞上方下降。", en: "It rises over the ore and falls over the cavity." },
          { id: "low-high", zh: "礦體上方下降，空洞上方上升。", en: "It falls over the ore and rises over the cavity." },
          { id: "flat", zh: "幾乎不變。g 在平地上是定值。", en: "Almost nothing. g is constant on flat ground." },
        ]}
        correct="high-low"
        predictFrame={PREDICT}
        explainFrame={EXPLAIN}
        explanation={
          <>
            <p>
              <Tx
                zh="局部的 g 跟著腳下的質量變。高密度礦體是質量過剩，產生重力高。空洞把岩石換成空氣，是質量虧損，產生重力低。鹽的密度通常也低於周圍沉積岩，所以鹽丘常常同樣是重力低。"
                en="Local g follows the mass underfoot. Dense ore is extra mass and makes a gravity high. A cavity replaces rock with air, which is missing mass, and makes a gravity low. Salt is usually less dense than the sediments around it, so a salt dome is often a low as well."
              />
            </p>
            <p>
              <Tx
                zh="重力探勘的工作就是：把已經知道的全球變化拿開之後，用地表上這幾毫伽的異常，反過來談地底下的密度。它還不能單靠一條曲線確定那是鐵礦還是別的高密度岩石。"
                en="Gravity prospecting removes the global changes that are already known, then uses a few milligal at the surface to talk about density underground. One curve still cannot decide that the cause is iron ore rather than some other dense rock."
              />
            </p>
          </>
        }
        model={{
          zh: "我預測礦體上方是重力高、空洞上方是重力低，因為 g 隨局部質量增加而增加。觀察到的曲線確實先正後負。因此重力高指向質量過剩，重力低指向質量虧損。",
          en: "I predicted a gravity high over the ore and a gravity low over the cavity, because g increases when local mass increases. The curve does go positive, then negative. A high points to mass excess and a low points to mass deficit.",
        }}
      >
        <TraverseLab />
      </PoeCycle>

      <section className="takeaways">
        <h2>
          <Tx zh="這一站先留下" en="Keep this" />
        </h2>
        <ol>
          <li>
            <Tx zh="g = GM / R²，與被吸引物體的質量無關。" en="g = GM / R², independent of the attracted mass." />
          </li>
          <li>
            <Tx zh="赤道的 g 小於兩極，主因是離心力與較大的 R。" en="Equatorial g is smaller than polar g, mainly from centrifugal acceleration and a larger R." />
          </li>
          <li>
            <Tx zh="重力高對高密度，重力低對低密度。單位用 mGal。" en="Highs match dense mass, lows match light mass. The unit is the milligal." />
          </li>
        </ol>
      </section>
      <NextBar
        prev={{ href: "#/", zh: "回課程", en: "Course" }}
        next={{ href: "#/lesson/2", zh: "下一課：正常重力", en: "Next: normal gravity" }}
      />
    </article>
  );
}
