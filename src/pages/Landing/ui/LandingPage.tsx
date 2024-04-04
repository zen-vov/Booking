import React from "react";
import styles from "./styles.module.scss";

export default function LandingPage() {
  return (
    <div>
      <div className={styles.imgbg}>
        <div className="py-[128px] pl-[131px] w-[600px] text-2xl text-center font-semibold text-primary">
          <p>Найди свое идеальное жилье</p>
        </div>
      </div>
    </div>    
  );
}