import Link from 'next/link'

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/chat" 
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
            >
              Q&A
            </Link>
            <Link 
              href="/gallery" 
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
            >
              Gallery
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  )
}

