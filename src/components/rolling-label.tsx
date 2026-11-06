/** Two clipped copies create the roll without JavaScript or duplicate accessible text. */
export function RollingLabel({ text }: { text: string }) {
  return <span className="ams-roll-label">
    <span className="ams-roll-label-line">{text}</span>
    <span className="ams-roll-label-line ams-roll-label-copy" aria-hidden="true">{text}</span>
  </span>;
}
