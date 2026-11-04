import { Tx } from "../store";
import { StationLab } from "../widgets/StationLab";

export function LabPage() {
  return (
    <article className="page lesson">
      <p className="kicker">Station calculator</p>
      <h1>
        <Tx zh="測站計算機" en="Station calculator" />
      </h1>
      <p className="lede">
        <Tx
          zh="把一筆觀測走完緯度、自由空間和簡單布格。預設數字是合成的，用來把加減號練熟。寫進手記之後，這一站才算完成。"
          en="Take one observation through latitude, free-air, and the simple Bouguer correction. The presets are synthetic, for learning the signs. The station counts as finished when you save a note."
        />
      </p>
      <StationLab />
      <p className="muted">
        <Tx
          zh="同一組公式也可以對著課程提供的 Gravity 空間操作。兩邊都應使用 mGal、緯度用度、高程用水深用公尺。"
          en="The same formulas can be tried on the course Gravity Space. Both should use mGal, latitude in degrees, and elevation or water depth in metres."
        />{" "}
        <a href="https://huggingface.co/spaces/cwadayi/Gravity" target="_blank" rel="noreferrer">
          huggingface.co/spaces/cwadayi/Gravity
        </a>
      </p>
    </article>
  );
}
