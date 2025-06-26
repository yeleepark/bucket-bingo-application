import Link from 'next/link';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
  className?: string;
}

const defaultLinks: FooterLink[] = [
  { href: "#", label: "서비스 소개" },
  { href: "#", label: "이용약관" },
  { href: "#", label: "개인정보처리방침" },
  { href: "#", label: "고객센터" }
];

export default function Footer({ 
  links = defaultLinks,
  copyright = "© 2024 연간 빙고. All rights reserved.",
  className = ""
}: FooterProps) {
  return (
    <footer className={`
      mt-16 py-6 border-t border-gray-200 dark:border-gray-700
      ${className}
    `}>
      <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500 dark:text-gray-400">
        {links.map((link) => (
          <Link 
            key={link.label}
            href={link.href} 
            className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
        {copyright}
      </p>
    </footer>
  );
} 