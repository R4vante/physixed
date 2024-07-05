import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const BenefitCards = ({ className, logo, text }: BenefitCardsProps) => {
  return (
    <>
      <div className="flex flex-col items-center gap-y-6">
        <Card
          className={cn(
            "rounded-full size-32 flex justify-center items-center",
            className
          )}
        >
          <CardHeader>{logo}</CardHeader>
        </Card>
        <p className="text-muted-foreground text-center w-64">{text}</p>
      </div>
    </>
  );
};

export default BenefitCards;

type BenefitCardsProps = {
  text: React.ReactNode;
  className?: string;
  logo: React.ReactNode;
};
