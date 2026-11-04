import { Tx } from "../store";

export function Home() {
  return (
    <div className="page">
      <div className="wrap hero">
        <div>
          <p className="kicker">2026 · Geophysics · Gravity</p>
          <h1>
            <Tx zh="重力手記" en="Field notes on g" />
          </h1>
          <p className="lede">
            <Tx
              zh="一門用 POE 走完的雙語重力探勘課。先把預測鎖住，再看模型給出的讀數，最後用中文或英文把原因說清楚。學科是地球物理，語言是科學教室裡真正會用到的句子。"
              en="A bilingual gravity-prospecting course walked in POE order. Lock a prediction, watch what the model does, then say why in Chinese or English. The subject is geophysics. The language is the kind of sentence a science classroom actually uses."
            />
          </p>
          <div className="actions">
            <a className="btn primary" href="#/lesson/1">
              <Tx zh="從第一個預測開始" en="Start with the first prediction" />
            </a>
            <a className="btn ghost" href="#/lab">
              <Tx zh="打開測站計算機" en="Open the station calculator" />
            </a>
          </div>
        </div>
        <aside className="panel hero-card">
          <p className="kicker">
            <Tx zh="探勘在找的那一截" en="The slice prospecting looks for" />
          </p>
          <div className="bar-track" aria-hidden="true">
            <i className="bar-hair" />
          </div>
          <div className="scale-caption">
            <span>g ≈ 980,000 mGal</span>
            <span>0.1–10 mGal</span>
          </div>
          <p>
            <Tx
              zh="地球表面的重力很大，礦體、洞穴或鹽丘只在上面留下極小的差。這門課練習的，就是把已知的緯度和高程拿開，讓那一小截露出來。"
              en="Gravity at Earth’s surface is huge. Ore, a cave, or a salt dome leaves only a tiny difference on top of it. This course practices taking the known latitude and elevation away so that small slice can be seen."
            />
          </p>
        </aside>
      </div>

      <section className="wrap section">
        <p className="kicker">POE</p>
        <h2>
          <Tx zh="預測，觀察，解釋" en="Predict, observe, explain" />
        </h2>
        <div className="grid-3" style={{ marginTop: "0.9rem" }}>
          <article className="card">
            <div className="step-no">01</div>
            <h3>
              <Tx zh="預測" en="Predict" />
            </h3>
            <p>
              <Tx
                zh="在動畫和數字出現之前選一個答案，並寫下因為。預測會鎖定，避免看到結果才回頭改口。"
                en="Choose an answer and write a because before the animation or the numbers appear. The prediction locks, so it cannot be rewritten after the result."
              />
            </p>
          </article>
          <article className="card">
            <div className="step-no">02</div>
            <h3>
              <Tx zh="觀察" en="Observe" />
            </h3>
            <p>
              <Tx
                zh="操作教學模型：落體、緯度、測線、高山校正、地形剖面、海水。先描述讀數的方向、大小和單位。"
                en="Work the teaching models: falling masses, latitude, a survey line, a mountain correction, a terrain profile, and seawater. First describe the direction, size, and unit of the reading."
              />
            </p>
          </article>
          <article className="card">
            <div className="step-no">03</div>
            <h3>
              <Tx zh="解釋" en="Explain" />
            </h3>
            <p>
              <Tx
                zh="若預測和觀察不同，保留觀察、修改模型。再用雙語句型把機制寫進手記。"
                en="If the prediction and the observation disagree, keep the observation and revise the model. Then write the mechanism into the notebook with a bilingual frame."
              />
            </p>
          </article>
        </div>
      </section>

      <section className="wrap section">
        <p className="kicker">CLIL · 4Cs</p>
        <h2>
          <Tx zh="內容和語言放在同一條測線上" en="Content and language on the same survey line" />
        </h2>
        <div className="grid-4" style={{ marginTop: "0.9rem" }}>
          <article className="card">
            <p className="meta">Content</p>
            <h3>
              <Tx zh="內容" en="Content" />
            </h3>
            <p>
              <Tx
                zh="萬有引力、重力加速度、理論重力、自由空間異常與布格異常。"
                en="Gravitation, g, theoretical gravity, the free-air anomaly, and the Bouguer anomaly."
              />
            </p>
          </article>
          <article className="card">
            <p className="meta">Communication</p>
            <h3>
              <Tx zh="溝通" en="Communication" />
            </h3>
            <p>
              <Tx
                zh="預測、觀察、解釋的句型，以及中英對照的學科詞彙。"
                en="Sentence frames for predicting, observing, and explaining, plus a bilingual subject glossary."
              />
            </p>
          </article>
          <article className="card">
            <p className="meta">Cognition</p>
            <h3>
              <Tx zh="認知" en="Cognition" />
            </h3>
            <p>
              <Tx
                zh="比較毫伽的量級，判斷校正該加還是該減，把曲線對回質量。"
                en="Compare milligal scales, decide whether a correction is added or subtracted, and match a curve back to mass."
              />
            </p>
          </article>
          <article className="card">
            <p className="meta">Culture</p>
            <h3>
              <Tx zh="文化" en="Culture" />
            </h3>
            <p>
              <Tx
                zh="這個方法離開教室之後，用在礦產、油氣構造、地下空洞，也用在重力衛星看冰層質量。"
                en="Outside the classroom the method is used for ore, hydrocarbon traps, and cavities, and by gravity satellites watching the mass of ice."
              />
            </p>
          </article>
        </div>
      </section>

      <section className="wrap section">
        <p className="kicker">
          <Tx zh="三堂課" en="Three lessons" />
        </p>
        <h2>
          <Tx zh="沿著校正的順序往下走" en="Follow the corrections in order" />
        </h2>
        <div className="grid-3" style={{ marginTop: "0.9rem" }}>
          <a className="card" href="#/lesson/1">
            <p className="meta">01</p>
            <h3>
              <Tx zh="重力是一扇窗" en="Gravity as a window" />
            </h3>
            <p>
              <Tx
                zh="g 與落下的質量無關。赤道較輕，兩極較重。高密度是重力高，空洞是重力低。"
                en="g does not depend on the falling mass. The equator is lighter than the poles. Dense rock is a high; a void is a low."
              />
            </p>
          </a>
          <a className="card" href="#/lesson/2">
            <p className="meta">02</p>
            <h3>
              <Tx zh="什麼叫正常" en="What counts as normal" />
            </h3>
            <p>
              <Tx
                zh="先減理論重力，再把高山上少掉的重力加回來。自由空間異常因此出現。"
                en="Subtract theoretical gravity, then add back the gravity a mountain station has already lost. That produces the free-air anomaly."
              />
            </p>
          </a>
          <a className="card" href="#/lesson/3">
            <p className="meta">03</p>
            <h3>
              <Tx zh="把山從曲線裡移開" en="Move the hill out of the curve" />
            </h3>
            <p>
              <Tx
                zh="布格平板拿走地形岩石。海上則要補回海水比岩石少掉的質量。"
                en="The Bouguer slab removes the rock of the terrain. At sea, the correction restores the mass seawater lacks compared with rock."
              />
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
