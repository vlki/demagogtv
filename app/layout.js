import "bootstrap/dist/css/bootstrap.css";

import StyledComponentsRegistry from "./lib/registry";
import GlobalStyle from "./globals";

const ICON_V = "xQz3wAMdN2";

export const metadata = {
  metadataBase: new URL("https://demagogtv.cz"),
  title: "DemagogTV",
  description:
    "Sledujte rozhovor a zároveň, zda politik říká pravdu či ne. Propojili jsme videozáznamy debat s výroky tak, že v čase vyřčení naskočí hodnocení od Demagog.cz.",
  openGraph: {
    type: "website",
  },
  manifest: `/manifest.json?v=${ICON_V}`,
  icons: {
    icon: [
      { url: `/favicon-32x32.png?v=${ICON_V}`, sizes: "32x32", type: "image/png" },
      { url: `/favicon-16x16.png?v=${ICON_V}`, sizes: "16x16", type: "image/png" },
    ],
    shortcut: `/favicon.ico?v=${ICON_V}`,
    apple: { url: `/apple-touch-icon.png?v=${ICON_V}`, sizes: "180x180" },
    other: [
      { rel: "mask-icon", url: `/safari-pinned-tab.svg?v=${ICON_V}`, color: "#f26538" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        {/* Lato web fonts live in /public; React 19 hoists this into <head>. */}
        <link rel="stylesheet" href="/Lato2/latolatinfonts.css" />
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
