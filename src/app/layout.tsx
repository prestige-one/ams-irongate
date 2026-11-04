import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'AMS Iron Gate Contracting — Building a Timeless Legacy',description:'Engineering discipline, uncompromising safety and craftsmanship, brought to every structure we build. AMS Iron Gate Contracting, Dubai.',robots:{index:false,follow:false},icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
