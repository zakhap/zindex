import './globals.css'

export const metadata = {
  title: 'Z-Index: A BigBook Corp Search Engine',
  description: 'Internal book recommendation database - BigBook Corp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}