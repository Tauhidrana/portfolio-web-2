import { Card, CardContent } from "@/components/ui/card";
import { DesktopMockupSection } from "@/pages/secttions/DesktopMockupSection";
import { MobileMockupSection } from "@/pages/secttions/MobileMockupSection";
import type { JSX } from "react";

const featureItems = [
  "STYLE GUIDE",
  "PIXEL PERFECT DESIGN",
  "FREE ICONS",
  "FREE FONTS",
];

export const Cover = (): JSX.Element => {
  return (
    <main className="relative w-full overflow-hidden bg-[#111204]">
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        alt="Ellipse"
        src="/figmaAssets/ellipse-1.svg"
      />
      <section className="relative z-10 mx-auto flex min-h-[960px] w-full min-w-[1558px] items-start px-[34px] pb-12 pt-[2px]">
        <div className="flex w-[175px] shrink-0 flex-col pt-[40px]">
          <img
            className="mb-[43px] h-[34px] w-[196px]"
            alt="Brand logo"
            src="/figmaAssets/brand-logo-1.svg"
          />
          <header>
            <h1 className="[font-family:'Barlow_Condensed',Helvetica] text-[69px] font-bold italic leading-[0.95] tracking-[0] text-white">
              FREE
              <br />
              PORTFOLIO
              <br />
              WEBSITE UI
              <br />
              DESIGN
            </h1>
          </header>
          <Card className="mt-[44px] w-fit border-0 bg-transparent shadow-none">
            <CardContent className="p-0">
              <ul className="[font-family:'Barlow_Condensed',Helvetica] text-[23px] font-semibold leading-[1.15] tracking-[0] text-[#b9fd50]">
                {featureItems.map((item) => (
                  <li key={item} className="ml-[20px] list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="ml-[160px] mt-[66px] w-[530px] shrink-0">
          <DesktopMockupSection />
        </div>
        <div className="ml-[92px] w-[343px] shrink-0">
          <MobileMockupSection />
        </div>
      </section>
    </main>
  );
};
