import React from "react";
import SectionWithImage from "./SectionWithImage";
import dentist from "../assets/dentist.jpg";

function HomePage() {
  return (
    <SectionWithImage image={dentist}>
      Hej, hej, hej! Jsem tvůj oblíbený úžasný doktor, Dr. Nick Riviera, udělám
      vše pro to abych ti vyléčil to, co tě trápí, s úsměvem a pochybným
      lékařským diplomem! Jsem epitomem lékařského šarmu, s péčí na lůžku, která
      tě nechá zapomenout na všechny ty nepříjemné žaloby za nedbalost.
      Potřebuješ diagnózu? Jen mi popiš své symptomy a já tě oslním svým
      lékařským žargonem a dávkou optimismu! Pamatuj si, když se cítíš pod psa,
      stačí zavolat na Dr. Nicka, protože se mnou se vždy chystáš na divoké
      lékařské dobrodružství!
    </SectionWithImage>
  );
}

export default HomePage;
