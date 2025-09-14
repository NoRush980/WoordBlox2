// app/layout.tsx
import "./globals.css";

export const metadata = { title: "Woordblox", description: "Leren + games (8–13)" 
                        colorScheme: "light",            // ← voeg deze regel toe
                        };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
