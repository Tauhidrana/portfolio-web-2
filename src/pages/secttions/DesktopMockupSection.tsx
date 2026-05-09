import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { JSX } from "react";

const projectCards = [
  {
    title: "Brand Journey Improvements",
    client: "Organc",
    work: ["Branding", "Logo design"],
    imageSrc: "/figmaAssets/img.png",
    imageClassName:
      "mt-[-18.0px] ml-[-32.7px] mr-[-13.6px] mb-[-22.8px] w-[250.08px] flex-1 rotate-[-13.09deg]",
    lineSrc: "/figmaAssets/line-3-5.svg",
  },
  {
    title: "Brand Grouping",
    client: "FR",
    work: ["Branding", "Logo design"],
    imageSrc: "/figmaAssets/img-6.svg",
    imageClassName:
      "mt-[-17.3px] ml-[-38.3px] mr-[-8.1px] mb-[-23.4px] w-[250.08px] flex-1 rotate-[-13.09deg]",
    lineSrc: "/figmaAssets/line-3-2.svg",
  },
  {
    title: "NFT Glimps",
    client: "Rumanda",
    work: ["NFT Design"],
    imageSrc: "/figmaAssets/img-4.svg",
    imageClassName:
      "mt-[-729.5px] ml-[390.3px] mr-[-436.6px] mb-[688.8px] w-[206.11px] object-cover flex-1 rotate-[-13.09deg]",
    lineSrc: "/figmaAssets/line-3-5.svg",
  },
  {
    title: "Brand Suggestions",
    client: "T3d",
    work: ["NFT logo"],
    imageSrc: "/figmaAssets/img-7.svg",
    imageClassName:
      "mt-[-729.5px] ml-[170.2px] mr-[-216.5px] mb-[688.8px] w-[206.11px] object-cover flex-1 rotate-[-13.09deg]",
    lineSrc: "/figmaAssets/line-3-2.svg",
  },
];

const navItems = ["HOME", "ABOUT ME", "MY WORKS"];

export const DesktopMockupSection = (): JSX.Element => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-[530px] rotate-[13.09deg] overflow-hidden rounded-[20px] bg-[#1a1a1a] text-white">
        <div className="relative min-h-[1832px] w-full">
          <img
            className="absolute left-48 top-[-18px] h-[259px] w-[331px] rotate-[-13.09deg]"
            alt="Vector"
            src="/figmaAssets/vector-8.svg"
          />
          <img
            className="absolute left-[-120px] top-[212px] h-[259px] w-[331px] rotate-[-13.09deg]"
            alt="Vector"
            src="/figmaAssets/vector-6.svg"
          />
          <img
            className="absolute left-[429px] top-[291px] h-[100px] w-[190px] rotate-[-13.09deg]"
            alt="Vector"
            src="/figmaAssets/vector-8-2.svg"
          />
          <img
            className="absolute left-[291px] top-[292px] h-[215px] w-[201px] rotate-[-13.09deg]"
            alt="Rectangle"
            src="/figmaAssets/rectangle-361.png"
          />
          <img
            className="absolute left-[220px] top-[503px] h-[221px] w-[268px] rotate-[-13.09deg]"
            alt="Vector"
            src="/figmaAssets/vector-7-1.svg"
          />
          <header className="absolute left-[55px] top-3 flex h-[17px] w-[428px] items-center">
            <img
              className="ml-[3.9px] mt-[-40px] h-[18.31px] w-[46.65px]"
              alt="Brand logo"
              src="/figmaAssets/brand-logo-2.svg"
            />
            <nav
              className="ml-[199.4px] flex items-center gap-0"
              aria-label="Primary"
            >
              {navItems.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`[font-family:'Rubik',Helvetica] h-auto whitespace-nowrap text-[5.2px] font-medium leading-[normal] tracking-[0] text-[#ffffff] opacity-50 ${
                    index === 0
                      ? "w-[15px]"
                      : index === 1
                        ? "ml-[16.3px] w-[26px]"
                        : "ml-[17.1px] w-[27px]"
                  }`}
                >
                  {item}
                </button>
              ))}
              <Button
                type="button"
                variant="outline"
                className="ml-[18.7px] mt-[-1px] h-[19.3px] w-[52.79px] rounded-[11.04px] border-[0.74px] border-[#ffffff4c] bg-[#03030480] px-0 py-0 text-[#ffffff] hover:bg-[#03030480] hover:text-[#ffffff]"
              >
                <span className="ml-[12.9px] w-[25px] [font-family:'Rubik',Helvetica] text-[5.2px] font-bold leading-[normal] tracking-[0] opacity-80">
                  CONTACT
                </span>
              </Button>
            </nav>
          </header>
          <section className="absolute left-[101px] top-[100px] w-[328px] text-center">
            <h1 className="[font-family:'Syne',Helvetica] text-[26.5px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              Adaptive Logo Design for Your Brand
            </h1>
          </section>
          <div className="absolute left-[220px] top-[197px] flex h-6 w-[89px] shadow-[0px_11.78px_19.88px_#03030323]">
            <Button
              type="button"
              className="h-6 w-[89.07px] gap-2 overflow-hidden rounded-[11.96px] bg-[#ff9141] px-0 py-0 text-[#f4f7fa] hover:bg-[#ff9141]"
            >
              <span className="ml-[14.7px] mt-[-0.3px] self-center [font-family:'Rubik',Helvetica] text-[4.8px] font-bold leading-[normal] tracking-[0.60px]">
                EXPLORE WORKS
              </span>
              <img
                className="mt-[9.7px] h-[4.92px] w-[6.57px] rotate-[-13.09deg]"
                alt="Icon"
                src="/figmaAssets/icon-1.png"
              />
            </Button>
          </div>
          <section className="absolute left-14 top-[328px] w-[230px]">
            <h2 className="[font-family:'Syne',Helvetica] w-[190px] text-[20.6px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              Let&apos;s get know about me closer
            </h2>
            <p className="[font-family:'Rubik',Helvetica] mt-[18px] w-[230px] text-[6.6px] font-normal leading-[10.2px] tracking-[0.36px] text-[#a7a7a7]">
              Aaronn is a New York-based visual designer focusing on branding
              and visual identity. Her portfolio showcases her wide range of
              work, spanning books, posters and web design.
            </p>
            <Button
              type="button"
              className="mt-[29px] h-auto rounded-[17.3px] bg-[#ff9141] px-[18.4px] py-[7.36px] text-white hover:bg-[#ff9141]"
            >
              <span className="[font-family:'Rubik',Helvetica] mt-[-0.37px] whitespace-nowrap text-[5.9px] font-semibold leading-[normal] tracking-[0]">
                Discover More About Me
              </span>
            </Button>
          </section>
          <div className="absolute left-[293px] top-[409px] h-[66px] w-5 rounded-[11.04px] border-[0.37px] border-solid border-[#ff9141]" />
          <div className="absolute left-[434px] top-[300px] h-[13px] w-10 rounded-[11.04px] border-[0.37px] border-solid border-[#ff9141]" />
          <section className="absolute left-[62px] top-[599px] w-[407px] text-center">
            <h2 className="[font-family:'Syne',Helvetica] text-[23.6px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              My Projects Highlight
            </h2>
          </section>
          <div className="absolute left-[222px] top-[647px] h-6 w-[91px]">
            <Button
              type="button"
              variant="outline"
              className="h-6 w-[91px] rounded-[11.96px] border-[0.37px] border-[#ff9141] bg-transparent px-0 py-0 text-[#f4f7fa] hover:bg-transparent hover:text-[#f4f7fa]"
            >
              <span className="[font-family:'Rubik',Helvetica] ml-[17px] text-center text-[4.8px] font-bold leading-[normal] tracking-[0.60px]">
                EXPLORE MORE
              </span>
              <img
                className="ml-[11px] mt-[10px] h-[5px] w-[7px]"
                alt="Icon"
                src="/figmaAssets/icon.png"
              />
            </Button>
          </div>
          <section className="absolute left-[53px] top-[700px] grid w-[426px] grid-cols-2 gap-x-[10px] gap-y-[34px]">
            {projectCards.map((project, index) => (
              <Card
                key={project.title}
                className={`w-[206px] border-0 bg-transparent p-0 shadow-none ${
                  index < 2 ? "h-[283px]" : "h-[283px]"
                }`}
              >
                <CardContent className="flex h-full flex-col gap-[11.8px] p-0">
                  <div className="flex h-[228.19px] w-[206.11px] overflow-hidden rounded-[5.89px]">
                    <img
                      className={project.imageClassName}
                      alt={project.title}
                      src={project.imageSrc}
                    />
                  </div>
                  <div
                    className={`flex flex-col items-start ${
                      project.title === "NFT Glimps"
                        ? "h-[44.72px] w-[206.11px]"
                        : project.title === "Brand Suggestions"
                          ? "h-[42.69px] w-[184.4px]"
                          : project.title === "Brand Journey Improvements"
                            ? "h-[44.72px] w-[174.44px]"
                            : "h-[44.72px] w-[206.11px]"
                    } gap-[11.78px]`}
                  >
                    <div className="inline-flex items-center gap-[11.78px]">
                      <h3 className="[font-family:'Syne',Helvetica] mt-[-0.37px] whitespace-nowrap text-[8.8px] font-bold leading-[11.8px] tracking-[0] text-[#ffffff]">
                        {project.title}
                      </h3>
                      <img
                        className="h-px w-[17.67px] rotate-[-13.09deg]"
                        alt="Line"
                        src={project.lineSrc}
                      />
                    </div>
                    <div className="inline-flex flex-col items-start gap-[2.94px]">
                      <div className="inline-flex items-start gap-[5.89px]">
                        <span className="[font-family:'Rubik',Helvetica] mt-[-0.37px] w-[20.61px] text-[5.2px] font-normal leading-[8.1px] tracking-[0.09px] text-[#606060]">
                          Client:
                        </span>
                        <span className="[font-family:'Rubik',Helvetica] mt-[-0.37px] whitespace-nowrap text-[5.2px] font-normal leading-[8.1px] tracking-[0.09px] text-[#ffffff]">
                          {project.client}
                        </span>
                      </div>
                      <div className="inline-flex items-start gap-[5.89px]">
                        <span className="[font-family:'Rubik',Helvetica] mt-[-0.37px] w-[20.61px] text-[5.2px] font-normal leading-[8.1px] tracking-[0.09px] text-[#606060]">
                          Work:
                        </span>
                        {project.work.map((workItem) => (
                          <span
                            key={`${project.title}-${workItem}`}
                            className="[font-family:'Rubik',Helvetica] mt-[-0.37px] whitespace-nowrap text-[5.2px] font-normal leading-[8.1px] tracking-[0.09px] text-[#ffffff]"
                          >
                            {workItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
          <section className="absolute left-[53px] top-[1361px] h-[154px] w-[428px]">
            <img
              className="absolute left-[618px] top-[-982px] h-[67px] w-[73px]"
              alt="Image"
              src="/figmaAssets/-.png"
            />
            <h2 className="[font-family:'Syne',Helvetica] absolute left-0 top-[33px] w-[230px] text-[23.6px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              Testimonial
            </h2>
            <blockquote className="[font-family:'Rubik',Helvetica] absolute left-0.5 top-[79px] w-[323px] text-[6.6px] font-normal leading-[normal] tracking-[0] text-[#939393]">
              &quot;Aaronn was fantastic to work with from start to finish. We
              were looking for a simple, stand-out logo and he delivered. I
              tried designing the logo myself thinking I wouldn&apos;t need to
              pay the money for a professional graphic designer but I was very
              wrong. Working with Aaronn was worth every penny and was
              surprisingly affordable! I remember him saying simplicity is key
              to a successful logo and boy he was right. I can&apos;t thank
              Aaronn enough for his effort and professionalism. I would
              recommend him to anyone looking for a design!&quot;
            </blockquote>
            <cite className="[font-family:'Syne',Helvetica] absolute left-0.5 top-[140px] w-[71px] text-[8.8px] font-bold not-italic leading-[normal] tracking-[0] text-[#ffffff]">
              -Martin lee
            </cite>
          </section>
          <footer className="absolute left-0 top-[1559px] h-[272px] w-[558px]">
            <div className="absolute left-0 top-0 h-[272px] w-[546px] bg-[#131313]" />
            <div className="[font-family:'Syne',Helvetica] absolute left-[188px] top-[37px] w-[158px] text-center text-[8.8px] font-bold leading-[normal] tracking-[0] text-[#ff9141]">
              Get in Touch With Us
            </div>
            <a
              className="[font-family:'Syne',Helvetica] absolute left-[95px] top-14 w-[350px] text-center text-[23.6px] font-bold leading-[normal] tracking-[0] text-[#ffffff] underline"
              href="mailto:info@growl.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              info@aaronn.com
            </a>
            <address className="not-italic">
              <div className="[font-family:'Syne',Helvetica] absolute left-[235px] top-[155px] w-[105px] text-[8.8px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
                Street Avenue 21, CA
              </div>
              <div className="[font-family:'Syne',Helvetica] absolute left-[235px] top-[169px] w-[75px] text-[8.8px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
                0-8-00-888-000
              </div>
              <div className="[font-family:'Syne',Helvetica] absolute left-[378px] top-[156px] w-[87px] text-[8.8px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
                +9 0283353
              </div>
            </address>
            <img
              className="absolute left-[729px] top-[-1176px] h-[9px] w-6"
              alt="Frame"
              src="/figmaAssets/frame-5-1.svg"
            />
            <img
              className="absolute left-[729px] top-[-1176px] h-px w-[422px]"
              alt="Line"
              src="/figmaAssets/line-7-1.svg"
            />
            <div className="[font-family:'Syne',Helvetica] absolute left-[165px] top-[231px] w-[198px] text-center text-[8.8px] font-bold leading-[normal] tracking-[0] text-[#ffffff]">
              © 2023. Ideapeel. All rights reserved.
            </div>
            <img
              className="absolute left-[729px] top-[-1176px] h-4 w-[89px]"
              alt="Group"
              src="/figmaAssets/group-5139764.png"
            />
          </footer>
        </div>
      </div>
    </section>
  );
};
