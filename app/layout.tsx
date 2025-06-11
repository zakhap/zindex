import './globals.css'

export const metadata = {
  title: 'Z-Index: A Book Engine by ZakCorp',
  description: 'Book recommendation engine - ZakCorp',
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