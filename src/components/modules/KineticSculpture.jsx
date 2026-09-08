export function KineticSculpture() {
  return (
    <div className="kinetic-sculpture" aria-hidden="true">
      <span className="kinetic-sculpture__orbit kinetic-sculpture__orbit--one" />
      <span className="kinetic-sculpture__orbit kinetic-sculpture__orbit--two" />
      <span className="kinetic-sculpture__orbit kinetic-sculpture__orbit--three" />
      <div className="kinetic-sculpture__cube">
        <span className="kinetic-sculpture__face kinetic-sculpture__face--front">G</span>
        <span className="kinetic-sculpture__face kinetic-sculpture__face--back">S</span>
        <span className="kinetic-sculpture__face kinetic-sculpture__face--right" />
        <span className="kinetic-sculpture__face kinetic-sculpture__face--left" />
        <span className="kinetic-sculpture__face kinetic-sculpture__face--top" />
        <span className="kinetic-sculpture__face kinetic-sculpture__face--bottom" />
      </div>
      <span className="kinetic-sculpture__core" />
    </div>
  )
}
