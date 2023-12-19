import styles from "../intersection-background.module.css";

export  function LowerLeftSVG() {
    return (
      <svg viewBox="0 0 100 100" className={styles.svgBack} xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="50" x2="100" y2="50" stroke="black" stroke-width="2" />
      <line x1="50" y1="0" x2="50" y2="50" stroke="black" stroke-width="2" />
  </svg>
    )
  }