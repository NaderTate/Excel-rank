export const metadata = {
  title: "Excel Rank",
  description: "Improve your reputation, make more money",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
