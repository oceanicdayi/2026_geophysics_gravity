import { formatMgal, theoreticalGravity } from "../physics";
import { Tx } from "../store";

const PHI = 25;
const ANOMALY = -12;

export function SignLab() {
  const gt = theoreticalGravity(PHI);
  const g = gt + ANOMALY;

  return (
    <div className="widget">
      <p>
        <Tx
          zh="平原測站，海拔接近 0，所以自由空間校正也接近 0。下面只用緯度把「正常重力」拿走。"
          en="A station on a plain, with elevation near zero, so the free-air term is near zero. Only latitude is removed."
        />
      </p>
      <div className="chain">
        <div>
          <span>g</span>
          <span>{formatMgal(g, 2)} mGal</span>
        </div>
        <div>
          <span>− gₜ（φ = 25°）</span>
          <span>{formatMgal(gt, 2)}</span>
        </div>
        <div className="result">
          <span>Δg</span>
          <span>{formatMgal(ANOMALY, 0)} mGal</span>
        </div>
      </div>
      <p>
        <Tx
          zh="負號代表比參考地球少了一點質量。鹽丘、洞穴、厚的低密度沉積都可能造成這種低，重力本身分不出是哪一種。"
          en="The minus sign means a little less mass than the reference Earth. A salt dome, a cavity, or thick light sediments can all do this. Gravity alone does not say which."
        />
      </p>
    </div>
  );
}
