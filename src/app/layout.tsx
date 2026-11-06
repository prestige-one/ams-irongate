import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'AMS Irongate Contracting — Building a Timeless Legacy',description:'Engineering discipline, uncompromising safety and craftsmanship, brought to every structure we build. AMS Irongate Contracting, Dubai.',robots:{index:false,follow:false},icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preload" href="/fonts/DM-Sans-Latin-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>{children}</body></html>;}
