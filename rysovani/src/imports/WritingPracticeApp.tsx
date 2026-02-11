import svgPaths from "./svg-7jpmgwi7a9";
import imgImageWithFallback from "figma:asset/6bff3ae02e2c9dca91a9d9b7cf8f34be110388ed.png";

function Group1() {
  return (
    <div className="absolute inset-[3.72%_1.32%_4.18%_2.28%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60.8925 29.4729">
        <g id="Group">
          <path d={svgPaths.p11892480} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p3f779080} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.pf05bf80} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.pe72a800} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p2ed44c70} fill="var(--fill-0, black)" id="Vector_5" />
          <path d={svgPaths.p25dc34e0} fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p22ff28c0} fill="var(--fill-0, black)" id="Vector_7" />
          <path d={svgPaths.p729cd80} fill="var(--fill-0, black)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[53.8%_36.24%_3.66%_19.3%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0836 13.6126">
        <g id="Group">
          <path d={svgPaths.p14fdb200} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p2178d200} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[3.72%_1.32%_3.66%_2.28%]" data-name="Group">
      <Group1 />
      <Group2 />
    </div>
  );
}

function ImageVividbooks() {
  return (
    <div className="h-[32px] opacity-90 relative shrink-0 w-[63.164px]" data-name="Image (Vividbooks)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#3a415a] h-[33.5px] left-[196px] rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-0 w-[163.148px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold','Noto_Sans:Bold',sans-serif] leading-[19.5px] left-[82.5px] text-[13px] text-center text-white top-[9px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        Otevřít učebnice ↓
      </p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-711.85px] size-0 top-[-41px]" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border border-[rgba(9,5,111,0.1)] border-solid h-[33.5px] left-0 rounded-[8px] top-0 w-[184px]" data-name="Dropdown">
      <Option />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[15px] left-[164.2px] top-[9.25px] w-[7.797px]" data-name="Container">
      <p className="absolute font-['Fenomen_Sans:Regular','Noto_Sans:Regular',sans-serif] leading-[15px] left-0 text-[#09056f] text-[10px] top-[1.5px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        ▼
      </p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[33.5px] left-0 top-0 w-[184px]" data-name="Container">
      <Dropdown />
      <Container4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[33.5px] opacity-30 relative shrink-0 w-[359.148px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button />
        <Container3 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[57.5px] relative shrink-0 w-[1070px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[32px] relative size-full">
        <ImageVividbooks />
        <Container2 />
      </div>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[201.258px] relative shadow-[0px_9px_14px_0px_rgba(0,0,0,0.1)] shrink-0 w-[420px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex h-[201.258px] items-center justify-end left-[543px] top-[42.62px] w-[471px]" data-name="Container">
      <ImageWithFallback />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[77px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[77px] left-0 text-[#09056f] text-[70px] top-[-2.5px]">Písanka online</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[78px] left-0 top-0 w-[471px]" data-name="Paragraph">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[0] left-0 not-italic text-[#09056f] text-[0px] text-[16px] top-px w-[449px] whitespace-pre-wrap">
        <span className="leading-[26px]">{`Písanka online je součástí ucelené řady písanek vázaného a nevázaného písma od Vividbooks. Pro všechny je písanka online `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid font-['Fenomen_Sans:Bold',sans-serif] leading-[26px] underline">zdarma</span>
        <span className="leading-[26px]">.</span>
      </p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[21.422px] left-[219.13px] top-0 w-[13.922px]" data-name="Text">
      <p className="absolute font-['Fenomen_Sans:Bold','Noto_Sans:Bold',sans-serif] leading-[21.429px] left-0 text-[#4d49f3] text-[15px] top-px" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        →
      </p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[21.422px] left-0 top-[96px] w-[233.047px]" data-name="Link">
      <p className="absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[21.429px] left-0 not-italic text-[#4d49f3] text-[15px] top-px">Více o Vividbooks Český jazyk</p>
      <Text />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[118px] relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Link />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[251px] items-start left-[56px] pt-[16px] top-[17.75px] w-[471px]" data-name="Container">
      <Heading />
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1070px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#fefce8] content-stretch flex flex-col h-[360px] items-start left-[32px] overflow-clip rounded-[32px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[16px] w-[1070px]" data-name="Container">
      <Container1 />
      <Container5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#4d49f3] border-2 border-[rgba(0,0,0,0)] border-solid h-[44px] left-[164.33px] rounded-[16777200px] shadow-[0px_10px_15px_0px_#e0e7ff,0px_4px_6px_0px_#e0e7ff] top-0 w-[149.664px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[21px] left-[73px] not-italic text-[14px] text-center text-white top-[11px]">Všechny hry</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white border-2 border-[#4e5871] border-solid h-[44px] left-[325.99px] rounded-[16777200px] top-0 w-[103.227px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[21px] left-[50px] not-italic text-[#4e5871] text-[14px] text-center top-[11px]">Psaní</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white border-2 border-[#4e5871] border-solid h-[44px] left-[441.22px] rounded-[16777200px] top-0 w-[149.219px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[21px] left-[73.5px] not-italic text-[#4e5871] text-[14px] text-center top-[11px]">Předpísanky</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white border-2 border-[#4e5871] border-solid h-[44px] left-[602.44px] rounded-[16777200px] top-0 w-[160.961px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[21px] left-[78px] not-italic text-[#4e5871] text-[14px] text-center top-[11px]">Hry s písmeny</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white border-2 border-[#4e5871] border-solid h-[44px] left-[775.4px] rounded-[16777200px] top-0 w-[130.273px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[21px] left-[63.5px] not-italic text-[#4e5871] text-[14px] text-center top-[11px]">Materiály</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[48px] relative shrink-0 w-[112.516px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[48px] left-[56.5px] not-italic text-[#4e5871] text-[32px] text-center top-[3px]">Psaní</p>
      </div>
    </div>
  );
}

function SectionHeading() {
  return (
    <div className="content-stretch flex h-[48px] items-start justify-center relative shrink-0 w-full" data-name="SectionHeading">
      <Heading1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[27.5px] left-0 not-italic text-[#4e5871] text-[22px] top-[2px]">Vázané písmo</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[45.5px] opacity-70 overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[22.75px] left-0 not-italic text-[#4e5871] text-[14px] top-[1.5px] w-[259px] whitespace-pre-wrap">výuka klasického psacího písma. Trénuj tvary písmen i celá slova.</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[105px] relative shrink-0 w-[282.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="PlayIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="PlayIcon">
          <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[49.023px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[20px] left-[25px] not-italic text-[15px] text-center text-white top-px">Otevřít</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#4d49f3] h-[42px] relative rounded-[14px] shadow-[0px_10px_15px_0px_#e0e7ff,0px_4px_6px_0px_#e0e7ff] shrink-0 w-[282.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center pr-[0.008px] relative size-full">
        <PlayIcon />
        <Text1 />
      </div>
    </div>
  );
}

function GameCard() {
  return (
    <div className="absolute content-stretch flex flex-col h-[195px] items-start justify-between left-0 pl-[24px] pt-[24px] top-[180px] w-[330.656px]" data-name="GameCard">
      <Container14 />
      <Button6 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[37.012px] left-[-13.01px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] top-[59.89px] w-[31.223px]" data-name="Container">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[36px] left-[0.1px] not-italic text-[#252525] text-[30px] top-[3px]">🍎</p>
    </div>
  );
}

function ConnectedScriptPreview1() {
  return (
    <div className="absolute h-[146.758px] left-0 top-[2.28px] w-[87.429px]" data-name="ConnectedScriptPreview">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[144px] left-[-0.5px] text-[#09056f] text-[144px] top-[-17.49px]">A</p>
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[37.012px] left-[54.64px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] top-[70.27px] w-[31.223px]" data-name="Container">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[36px] left-[0.1px] not-italic text-[#252525] text-[30px] top-[3px]">🐱</p>
    </div>
  );
}

function ConnectedScriptPreview2() {
  return (
    <div className="absolute h-[104.084px] left-[87.55px] top-[31.48px] w-[65.704px]" data-name="ConnectedScriptPreview">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[102px] left-[-0.34px] text-[#09056f] text-[102px] top-[-12.99px]">a</p>
      <Container17 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[149.04px] relative w-[153.616px]" data-name="Container">
      <ConnectedScriptPreview1 />
      <ConnectedScriptPreview2 />
    </div>
  );
}

function ConnectedScriptPreview() {
  return (
    <div className="absolute bg-[#fefce8] h-[180px] left-0 overflow-clip top-0 w-[330.656px]" data-name="ConnectedScriptPreview">
      <div className="absolute flex h-[154.245px] items-center justify-center left-[88.52px] top-[18.19px] w-[158.66px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "80" } as React.CSSProperties}>
        <div className="flex-none rotate-[-1.97deg]">
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[180px] left-0 top-0 w-[330.656px]" data-name="Container" />;
}

function GameCard1() {
  return (
    <div className="absolute h-[180px] left-0 overflow-clip top-0 w-[330.656px]" data-name="GameCard">
      <ConnectedScriptPreview />
      <Container18 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[#fff8b3] border-2 border-[rgba(0,0,0,0)] border-solid h-[379px] left-[184.34px] overflow-clip rounded-[32px] top-0 w-[334.656px]" data-name="Container">
      <GameCard />
      <GameCard1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[27.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[27.5px] left-0 not-italic text-[#4e5871] text-[22px] top-[2px]">Nevázané písmo</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[45.5px] opacity-70 overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[22.75px] left-0 not-italic text-[#4e5871] text-[14px] top-[1.5px] w-[266px] whitespace-pre-wrap">nácvik moderního nevázaného tiskacího písma pro snazší psaní.</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[105px] relative shrink-0 w-[282.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading3 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function PlayIcon1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="PlayIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="PlayIcon">
          <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[49.023px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[20px] left-[25px] not-italic text-[15px] text-center text-white top-px">Otevřít</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#4d49f3] h-[42px] relative rounded-[14px] shadow-[0px_10px_15px_0px_#e0e7ff,0px_4px_6px_0px_#e0e7ff] shrink-0 w-[282.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center pr-[0.008px] relative size-full">
        <PlayIcon1 />
        <Text2 />
      </div>
    </div>
  );
}

function GameCard2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[195px] items-start justify-between left-0 pl-[24px] pt-[24px] top-[180px] w-[330.656px]" data-name="GameCard">
      <Container20 />
      <Button7 />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[132.335px] relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[6.49%_67.42%_5.33%_32.58%]" data-name="Vector">
        <div className="absolute inset-[-2.83%_-3.31px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.61674 123.315">
            <path d="M3.30837 3.30837V120.006" id="Vector" stroke="var(--stroke-0, #09056F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.61674" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[5.48%_23.01%_51.52%_32.62%]" data-name="Vector">
        <div className="absolute inset-[-5.81%_-5.63%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65.3418 63.5153">
            <path d={svgPaths.pde4e180} id="Vector" stroke="var(--stroke-0, #09056F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.61674" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[48.53%_15.44%_4.31%_32.58%]" data-name="Vector">
        <div className="absolute inset-[-5.3%_-4.81%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75.4114 69.0208">
            <path d={svgPaths.p2e475200} id="Vector" stroke="var(--stroke-0, #09056F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.61674" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[132.335px] top-0" data-name="Container">
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[82.709px] relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0.41%_70.94%_11.2%_29.06%]" data-name="Vector">
        <div className="absolute inset-[-2.83%_-2.07px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.13546 77.2384">
            <path d="M2.06773 2.06773V75.1707" id="Vector" stroke="var(--stroke-0, #09056F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.13546" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.27%_28.84%_10.12%_29.18%]" data-name="Vector">
        <div className="absolute inset-[-4.42%_-5.96%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.8563 50.9617">
            <path d={svgPaths.p3912e320} id="Vector" stroke="var(--stroke-0, #09056F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.13546" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[135.92px] size-[82.709px] top-[52.66px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function PrintScriptPreview1() {
  return (
    <div className="h-[135.367px] relative shrink-0 w-[220.282px]" data-name="PrintScriptPreview">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col h-[158.203px] items-center justify-center pt-[7.995px] relative w-[303.579px]" data-name="Container">
      <PrintScriptPreview1 />
    </div>
  );
}

function PrintScriptPreview() {
  return (
    <div className="absolute bg-[#e3f4ff] h-[180px] left-0 overflow-clip top-0 w-[330.656px]" data-name="PrintScriptPreview">
      <div className="absolute flex h-[168.57px] items-center justify-center left-[8.09px] top-[10.9px] w-[308.85px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "95" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.97deg]">
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[180px] left-0 top-0 w-[330.656px]" data-name="Container" />;
}

function GameCard3() {
  return (
    <div className="absolute h-[180px] left-0 overflow-clip top-0 w-[330.656px]" data-name="GameCard">
      <PrintScriptPreview />
      <Container24 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#dcf3ff] border-2 border-[rgba(0,0,0,0)] border-solid h-[379px] left-[551px] overflow-clip rounded-[32px] top-0 w-[334.656px]" data-name="Container">
      <GameCard2 />
      <GameCard3 />
    </div>
  );
}

function MainMenu1() {
  return (
    <div className="h-[379px] relative shrink-0 w-full" data-name="MainMenu">
      <Container13 />
      <Container19 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] h-[467px] items-start relative shrink-0 w-full" data-name="Container">
      <SectionHeading />
      <MainMenu1 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[48px] relative shrink-0 w-[217.633px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[48px] left-[109.5px] not-italic text-[#4e5871] text-[32px] text-center top-[3px]">Předpísanky</p>
      </div>
    </div>
  );
}

function SectionHeading1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="SectionHeading">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pr-[0.008px] relative size-full">
          <Heading4 />
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[27.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[27.5px] left-0 not-italic text-[#4e5871] text-[22px] top-[2px]">Rozcvička</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[45.5px] opacity-70 overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[22.75px] left-0 not-italic text-[#4e5871] text-[14px] top-[1.5px] w-[228px] whitespace-pre-wrap">uvolňovací cvičení pro ruce a prsty doprovázené hravou hudbou.</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[105px] relative shrink-0 w-[282.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading5 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function PlayIcon2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="PlayIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="PlayIcon">
          <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[49.023px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[20px] left-[25px] not-italic text-[15px] text-center text-white top-px">Otevřít</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#4d49f3] h-[42px] relative rounded-[14px] shadow-[0px_10px_15px_0px_#e0e7ff,0px_4px_6px_0px_#e0e7ff] shrink-0 w-[282.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center pr-[0.008px] relative size-full">
        <PlayIcon2 />
        <Text3 />
      </div>
    </div>
  );
}

function GameCard4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[195px] items-start justify-between left-0 pl-[24px] pt-[24px] top-[180px] w-[330.656px]" data-name="GameCard">
      <Container27 />
      <Button8 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[36px] left-[260.66px] top-[31.2px] w-[30px]" data-name="Container">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[36px] left-0 not-italic text-[#252525] text-[30px] top-[3px]">🎵</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[36px] left-[40px] top-[95.2px] w-[30px]" data-name="Container">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[36px] left-0 not-italic text-[#252525] text-[30px] top-[3px]">🎶</p>
    </div>
  );
}

function Container30() {
  return <div className="absolute h-[180px] left-0 opacity-30 top-0 w-[330.656px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 330.66 180\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(0 -18.824 -18.824 0 165.33 90)\'><stop stop-color=\'rgba(0,0,0,0)\' offset=\'0.2\'/><stop stop-color=\'rgba(64,64,64,0.25)\' offset=\'0.4\'/><stop stop-color=\'rgba(128,128,128,0.5)\' offset=\'0.6\'/><stop stop-color=\'rgba(191,191,191,0.75)\' offset=\'0.8\'/><stop stop-color=\'rgba(255,255,255,1)\' offset=\'1\'/></radialGradient></defs></svg>')" }} />;
}

function Container31() {
  return (
    <div className="h-[105.267px] relative w-[105.266px]" data-name="Container">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[96px] left-[0.05px] not-italic text-[#252525] text-[96px] top-[10.5px]">👋</p>
    </div>
  );
}

function WarmUpPreview() {
  return (
    <div className="absolute bg-[#dcf3ff] h-[180px] left-0 overflow-clip top-0 w-[330.656px]" data-name="WarmUpPreview">
      <Container28 />
      <Container29 />
      <Container30 />
      <div className="absolute flex h-[115.428px] items-center justify-center left-[101.99px] top-[37.37px] w-[115.427px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[5.84deg]">
          <Container31 />
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[180px] left-0 top-0 w-[330.656px]" data-name="Container" />;
}

function GameCard5() {
  return (
    <div className="absolute h-[180px] left-0 overflow-clip top-0 w-[330.656px]" data-name="GameCard">
      <WarmUpPreview />
      <Container32 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[#dcf3ff] border-2 border-[rgba(0,0,0,0)] border-solid h-[379px] left-[184.34px] overflow-clip rounded-[32px] top-0 w-[334.656px]" data-name="Container">
      <GameCard4 />
      <GameCard5 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[27.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[27.5px] left-0 not-italic text-[#4e5871] text-[22px] top-[2px]">Grafomotorika</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[45.5px] opacity-70 overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[22.75px] left-0 not-italic text-[#4e5871] text-[14px] top-[1.5px] w-[261px] whitespace-pre-wrap">trénink uvolňovacích cviků a základních tvarů pro správný úchop.</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[105px] relative shrink-0 w-[282.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading6 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function PlayIcon3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="PlayIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="PlayIcon">
          <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[49.023px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[20px] left-[25px] not-italic text-[15px] text-center text-white top-px">Otevřít</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#4d49f3] h-[42px] relative rounded-[14px] shadow-[0px_10px_15px_0px_#e0e7ff,0px_4px_6px_0px_#e0e7ff] shrink-0 w-[282.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center pr-[0.008px] relative size-full">
        <PlayIcon3 />
        <Text4 />
      </div>
    </div>
  );
}

function GameCard6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[195px] items-start justify-between left-0 pl-[24px] pt-[24px] top-[180px] w-[330.656px]" data-name="GameCard">
      <Container34 />
      <Button9 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute h-[116px] left-[32px] top-[32px] w-[266.656px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266.656 116">
        <g id="Icon">
          <path d={svgPaths.p2bc4ac00} id="Vector" opacity="0.2" stroke="var(--stroke-0, #09056F)" strokeDasharray="11.6 17.4" strokeLinecap="round" strokeWidth="4.64" />
          <path d={svgPaths.p2bc4ac00} id="Vector_2" stroke="var(--stroke-0, #4D49F3)" strokeDasharray="0.35 1.16" strokeLinecap="round" strokeWidth="6.96" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute h-[32px] left-[16px] top-[16px] w-[24px]" data-name="Container">
      <p className="absolute font-['Fenomen_Sans:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#252525] text-[24px] top-[2px]">🐝</p>
    </div>
  );
}

function GraphomotorPreview() {
  return (
    <div className="absolute bg-[#fefce8] h-[180px] left-0 overflow-clip top-0 w-[330.656px]" data-name="GraphomotorPreview">
      <Icon2 />
      <Container35 />
    </div>
  );
}

function Container36() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[180px] left-0 top-0 w-[330.656px]" data-name="Container" />;
}

function GameCard7() {
  return (
    <div className="absolute h-[180px] left-0 overflow-clip top-0 w-[330.656px]" data-name="GameCard">
      <GraphomotorPreview />
      <Container36 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#f5f8d0] border-2 border-[rgba(0,0,0,0)] border-solid h-[379px] left-[551px] overflow-clip rounded-[32px] top-0 w-[334.656px]" data-name="Container">
      <GameCard6 />
      <GameCard7 />
    </div>
  );
}

function MainMenu2() {
  return (
    <div className="h-[379px] relative shrink-0 w-full" data-name="MainMenu">
      <Container26 />
      <Container33 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] h-[467px] items-start relative shrink-0 w-full" data-name="Container">
      <SectionHeading1 />
      <MainMenu2 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[48px] relative shrink-0 w-[244.484px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[48px] left-[122.5px] not-italic text-[#4e5871] text-[32px] text-center top-[3px]">Hry s písmeny</p>
      </div>
    </div>
  );
}

function SectionHeading2() {
  return (
    <div className="content-stretch flex h-[48px] items-start justify-center relative shrink-0 w-full" data-name="SectionHeading">
      <Heading7 />
    </div>
  );
}

function Container38() {
  return <div className="absolute h-[379px] left-[1.02px] top-0 w-[334.656px]" data-name="Container" />;
}

function Container39() {
  return <div className="absolute h-[379px] left-[367.67px] top-0 w-[334.656px]" data-name="Container" />;
}

function Container40() {
  return <div className="absolute h-[379px] left-[734.33px] top-0 w-[334.656px]" data-name="Container" />;
}

function MainMenu3() {
  return (
    <div className="h-[379px] relative shrink-0 w-full" data-name="MainMenu">
      <Container38 />
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] h-[467px] items-start relative shrink-0 w-full" data-name="Container">
      <SectionHeading2 />
      <MainMenu3 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[48px] relative shrink-0 w-[277.922px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Fenomen_Sans:Bold',sans-serif] leading-[48px] left-[139.5px] not-italic text-[#4e5871] text-[32px] text-center top-[3px]">Materiály k tisku</p>
      </div>
    </div>
  );
}

function SectionHeading3() {
  return (
    <div className="content-stretch flex h-[48px] items-start justify-center relative shrink-0 w-full" data-name="SectionHeading">
      <Heading8 />
    </div>
  );
}

function Container42() {
  return <div className="absolute h-[379px] left-[367.67px] top-0 w-[334.656px]" data-name="Container" />;
}

function MainMenu4() {
  return (
    <div className="h-[379px] relative shrink-0 w-full" data-name="MainMenu">
      <Container42 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] h-[467px] items-start relative shrink-0 w-full" data-name="Container">
      <SectionHeading3 />
      <MainMenu4 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] h-[2060px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container25 />
      <Container37 />
      <Container41 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[2152px] items-start left-0 px-[32px] top-[424px] w-[1134px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function MainMenu() {
  return (
    <div className="bg-white h-[2736px] overflow-clip relative shrink-0 w-full" data-name="MainMenu">
      <Container />
      <Container9 />
    </div>
  );
}

export default function WritingPracticeApp() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Writing Practice App">
      <MainMenu />
    </div>
  );
}