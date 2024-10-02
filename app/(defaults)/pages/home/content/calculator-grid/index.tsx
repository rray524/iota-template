import React from "react";
import SectionTitle from "@/components/section-title/section-title";
import dynamic from "next/dynamic";
const DynamicComponent = dynamic(() => import("./calculator"), {
  ssr: false,
});

export interface CalculatorDataProps {
  title: string;
  imageUrl: string;
  link: string;
}

const CalculatorGrid: React.FC<{ items: CalculatorDataProps[] }> = ({
  items = [],
}) => {
  return (
    <section className="container mx-auto px-4 mt-8">
      <SectionTitle
        title="Real Estate Calculators"
        description="SELECT CALCULATOR FROM FOLLOWING LIST"
      />
      <div className="p-1 flex flex-wrap items-center justify-center">
        {items.map((item, index) => (
          <DynamicComponent
            key={index}
            title={item.title}
            imageUrl={item.imageUrl}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
};

export default CalculatorGrid;
