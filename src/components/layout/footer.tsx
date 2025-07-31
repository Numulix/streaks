import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-muted-foreground text-center text-sm">
          © 2025 Streaks. Built by{' '}
          <Link
            href="https://github.com/Numulix"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Numulix
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
