import React from 'react';

type HeroSectionProps = {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
};

export function HeroSection({
  title,
  description,
  buttonText,
  buttonLink
}: HeroSectionProps) {
  return (
    <div className="py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>

      {buttonText && buttonLink && (
        <a
          href={buttonLink}
          className="inline-flex items-center justify-center rounded-md px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-medium"
        >
          {buttonText}
        </a>
      )}
    </div>
  );
}
