export default function Footer() {
    return (
      <footer className="w-full py-6 mt-20 bg-black/90 text-white text-center border-t border-white/10">
        <p className="text-sm">
          © {new Date().getFullYear()} DevTrove. Built by Enis with 💙
        </p>
        <p className="text-xs text-[var(--secondarytext)] mt-1">
          Explore open-source tools, APIs, and templates.
        </p>
      </footer>
    );
  }
  