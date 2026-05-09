import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { JSX } from "react";

const projectCards = [
  {
    title: "Brand Journey Improvements",
    image: "/figmaAssets/img-1.png",
    line: "/figmaAssets/line-3-3.svg",
    client: "Organc",
    work: ["Branding", "Logo design"],
  },
  {
    title: "Brand Grouping",
    image: "/figmaAssets/img-5.svg",
    line: "/figmaAssets/line-3-1.svg",
    client: "FR",
    work: ["Branding", "Logo design"],
  },
  {
    title: "NFT Glimps",
    image: "/figmaAssets/img-3.svg",
    line: "/figmaAssets/line-3.svg",
    client: "Rumanda",
    work: ["NFT Design"],
  },
  {
    title: "Brand Suggestions",
    image: "/figmaAssets/img-2.svg",
    line: "/figmaAssets/line-3.svg",
    client: "T3d",
    work: ["NFT logo"],
  },
];

const navItems = ["HOME", "ABOUT ME", "MY WORKS"];

export const MobileMockupSection = (): JSX.Element => {
  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">
        The image shows a dark rotated mobile portfolio mockup framed like a
        phone screen, with a compact top navigation, a hero section, an about
        section with portrait artwork, a projects grid, a testimonial block, and
        a contact footer. The layout is vertically stacked, highly compact, and
        uses dark charcoal backgrounds with white text and orange accent buttons
        and borders.
      </p>
      <section className="relative mx-auto w-full max-w-[341px] overflow-hidden rounded-[20px] bg-[#1a1a1a] text-white shadow-2xl rotate-[13.09deg]">
        <img
          className="pointer-events-none absolute left-[-75px] top-[154px] h-[149px] w-[213px] rotate-[-13.09deg]"
          alt="Vector"
          src="/figmaAssets/vector-6-1.svg"
        />
        <img
          className="pointer-events-none absolute left-[142px] top-[323px] h-[142px] w-[173px] rotate-[-13.09deg]"
          alt="Vector"
          src="/figmaAssets/vector-7.svg"
        />
        <img
          className="pointer-events-none absolute left-40 top-[27px] h-[94px] w-[135px] rotate-[-13.09deg]"
          alt="Vector"
          src="/figmaAssets/vector-8-1.svg"
        />
        <img
          className="pointer-events-none absolute left-[-61px] top-[821px] h-[167px] w-[175px] rotate-[-13.09deg]"
          alt="Vector"
          src="/figmaAssets/vector-8-3.svg"
        />
        <header className="relative z-10 flex items-center justify-between px-9 pt-2">
          <img
            className="h-[5.21px] w-[29.6px]"
            alt="Brand logo"
            src="/figmaAssets/brand-logo.svg"
          />
          <nav aria-label="Mobile portfolio navigation">
            <ul className="flex items-center gap-[10px]">
              {navItems.map((item) => (
                <li
                  key={item}
                  className="opacity-50 [font-family:'Rubik',Helvetica] text-[3.3px] font-medium tracking-[0] text-[#ffffff]"
                >
                  <button type="button" className="h-auto">
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <Button
                  variant="outline"
                  className="h-auto rounded-[7.1px] border-[0.47px] border-[#ffffff4c] bg-[#03030480] px-[8.3px] py-[3.6px] [font-family:'Rubik',Helvetica] text-[3.3px] font-bold tracking-[0] text-[#ffffff] opacity-80 hover:bg-[#03030480]"
                >
                  CONTACT
                </Button>
              </li>
            </ul>
          </nav>
        </header>
        <div className="relative z-10 px-9 pb-0 pt-[45px]">
          <section className="relative min-h-[305px]">
            <h2 className="mx-auto w-[211px] text-center [font-family:'Syne',Helvetica] text-[17px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              Adaptive Logo Design for Your Brand
            </h2>
            <div className="mt-[55px] flex justify-center">
              <Button className="h-auto rounded-[7.7px] bg-[#ff9141] px-[9.5px] py-[4px] shadow-[0px_7.58px_12.79px_#03030323] hover:bg-[#ff9141]">
                <span className="[font-family:'Rubik',Helvetica] text-[3.1px] font-bold tracking-[0.38px] text-[#f4f7fa]">
                  EXPLORE WORKS
                </span>
                <img
                  className="ml-[5px] h-[3.16px] w-[4.23px] rotate-[-13.09deg]"
                  alt="Icon"
                  src="/figmaAssets/icon-3.png"
                />
              </Button>
            </div>
            <img
              className="absolute left-[153px] top-[61px] h-[138px] w-[129px] rotate-[-13.09deg]"
              alt="Rectangle"
              src="/figmaAssets/rectangle-361-1.png"
            />
            <div className="absolute left-[155px] top-[136px] h-[42px] w-[13px] rounded-[7.1px] border-[0.24px] border-solid border-[#ff9141]" />
            <div className="absolute left-[245px] top-[66px] h-2 w-[26px] rounded-[7.1px] border-[0.24px] border-solid border-[#ff9141]" />
            <div className="absolute left-0 top-[84px] w-[122px] [font-family:'Syne',Helvetica] text-[13.3px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              Let&apos;s get know about me closer
            </div>
            <p className="absolute left-0 top-[122px] w-[148px] [font-family:'Rubik',Helvetica] text-[4.3px] font-normal leading-[6.6px] tracking-[0.23px] text-[#a7a7a7]">
              Aaronn is a New York-based visual designer focusing on branding
              and visual identity. Her portfolio showcases her wide range of
              work, spanning books, posters and web design.
            </p>
            <Button className="absolute left-0 top-[160px] h-auto rounded-[11.13px] bg-[#ff9141] px-[11.84px] py-[4.74px] hover:bg-[#ff9141]">
              <span className="[font-family:'Rubik',Helvetica] text-[3.8px] font-semibold tracking-[0] text-white">
                Discover More About Me
              </span>
            </Button>
          </section>
          <section className="pt-[8px]">
            <div className="relative">
              <h2 className="text-center [font-family:'Syne',Helvetica] text-[15.2px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
                My Projects Highlight
              </h2>
              <div className="mt-[16px] flex justify-center">
                <Button
                  variant="outline"
                  className="h-auto rounded-[7.7px] border-[0.24px] border-[#ff9141] bg-transparent px-[11px] py-[4px] [font-family:'Rubik',Helvetica] text-[3.1px] font-bold tracking-[0.38px] text-[#f4f7fa] hover:bg-transparent"
                >
                  EXPLORE MORE
                  <img
                    className="ml-[6px] h-[3px] w-1"
                    alt="Icon"
                    src="/figmaAssets/icon-2.png"
                  />
                </Button>
              </div>
            </div>
            <div className="mt-[19px] grid grid-cols-2 gap-x-[7px] gap-y-[23px]">
              {projectCards.map((project) => (
                <Card
                  key={`${project.title}-${project.client}`}
                  className="border-0 bg-transparent p-0 shadow-none"
                >
                  <CardContent className="p-0">
                    <article className="flex flex-col gap-[7.6px]">
                      <div className="flex h-[146.82px] w-full overflow-hidden rounded-[3.79px]">
                        <img
                          className="mb-[-13.9px] ml-[-14.1px] mr-[-15.7px] mt-[-12.4px] h-auto w-[160.9px] flex-1 rotate-[-13.09deg] object-cover"
                          alt={project.title}
                          src={project.image}
                        />
                      </div>
                      <div className="flex flex-col items-start gap-[7.58px]">
                        <div className="inline-flex items-center gap-[7.58px]">
                          <h3 className="[font-family:'Syne',Helvetica] text-[5.7px] font-bold leading-[7.6px] tracking-[0] text-[#ffffff] whitespace-nowrap">
                            {project.title}
                          </h3>
                          <img
                            className="h-[2.81px] w-[11.12px] rotate-[-13.09deg]"
                            alt="Line"
                            src={project.line}
                          />
                        </div>
                        <div className="flex flex-col items-start gap-[1.89px]">
                          <div className="inline-flex items-start gap-[3.79px]">
                            <span className="w-[13.26px] [font-family:'Rubik',Helvetica] text-[3.3px] font-normal leading-[5.2px] tracking-[0.06px] text-[#606060]">
                              Client:
                            </span>
                            <span className="[font-family:'Rubik',Helvetica] text-[3.3px] font-normal leading-[5.2px] tracking-[0.06px] text-[#ffffff] whitespace-nowrap">
                              {project.client}
                            </span>
                          </div>
                          <div className="inline-flex items-start gap-[3.79px]">
                            <span className="w-[13.26px] [font-family:'Rubik',Helvetica] text-[3.3px] font-normal leading-[5.2px] tracking-[0.06px] text-[#606060]">
                              Work:
                            </span>
                            {project.work.map((item) => (
                              <span
                                key={`${project.title}-${item}`}
                                className="[font-family:'Rubik',Helvetica] text-[3.3px] font-normal leading-[5.2px] tracking-[0.06px] text-[#ffffff] whitespace-nowrap"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          <section className="relative pt-[39px]">
            <img
              className="absolute right-[8px] top-[52px] h-[30px] w-[39px]"
              alt="Image"
              src="/figmaAssets/--1.png"
            />
            <h2 className="[font-family:'Syne',Helvetica] text-[15.2px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              Testimonial
            </h2>
            <p className="mt-[22px] w-[208px] [font-family:'Rubik',Helvetica] text-[4.3px] font-normal leading-[normal] tracking-[0] text-[#939393]">
              &quot;Aaronn was fantastic to work with from start to finish. We
              were looking for a simple, stand-out logo and he delivered. I
              tried designing the logo myself thinking I wouldn&apos;t need to
              pay the money for a professional graphic designer but I was very
              wrong. Working with Aaronn was worth every penny and was
              surprisingly affordable! I remember him saying simplicity is key
              to a successful logo and boy he was right. I can&apos;t thank
              Aaronn enough for his effort and professionalism. I would
              recommend him to anyone looking for a design!&quot;
            </p>
            <p className="mt-[12px] [font-family:'Syne',Helvetica] text-[5.7px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              -Martin lee
            </p>
          </section>
        </div>
        <footer className="relative mt-[28px] bg-[#131313] px-[33px] pb-[20px] pt-6">
          <img
            className="absolute left-[33px] top-[71px] h-[23px] w-[58px]"
            alt="Group"
            src="/figmaAssets/group-5139764-1.png"
          />
          <div className="text-center [font-family:'Syne',Helvetica] text-[5.7px] font-bold leading-[normal] tracking-[0] text-[#ff9141]">
            Get in Touch With Us
          </div>
          <a
            className="mt-3 block text-center [font-family:'Syne',Helvetica] text-[15.2px] font-bold leading-[normal] tracking-[0] text-[#ffffff] underline"
            href="mailto:info@growl.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            info@aaronn.com
          </a>
          <div className="mt-[44px] flex justify-end gap-[25px] pr-[6px]">
            <div className="[font-family:'Syne',Helvetica] text-[5.7px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              <div>Street Avenue 21, CA</div>
              <div className="mt-[2px]">0-8-00-888-000</div>
            </div>
            <div className="[font-family:'Syne',Helvetica] text-[5.7px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              +9 0283353
            </div>
          </div>
          <div className="mt-[29px] text-center [font-family:'Syne',Helvetica] text-[5.7px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
            © 2023. Ideapeel. All rights reserved.
          </div>
        </footer>
      </section>
    </>
  );
};
