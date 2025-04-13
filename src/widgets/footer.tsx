import React from 'react';

type FooterProps = {
  showFullLinks?: boolean;
};

export function Footer({ showFullLinks = true }: FooterProps) {
  return (
    <footer className="mt-16 py-6 border-t border-gray-200">
      {showFullLinks ? (
        <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700">서비스 소개</a>
          <a href="#" className="hover:text-gray-700">이용약관</a>
          <a href="#" className="hover:text-gray-700">개인정보처리방침</a>
          <a href="#" className="hover:text-gray-700">고객센터</a>
        </div>
      ) : null}
      <p className="text-center text-xs text-gray-400 mt-4">© 2024 연간 빙고. All rights reserved.</p>
    </footer>
  );
}
