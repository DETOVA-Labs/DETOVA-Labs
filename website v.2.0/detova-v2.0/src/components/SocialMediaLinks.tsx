import React from 'react'

interface SocialLink {
  name: string
  url: string
  className: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Portfolio',
    url: 'https://detovalabs.com', // Replace with actual portfolio URL
    className: 'portfolio'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/detova-labs', // Replace with actual LinkedIn URL
    className: 'linkedin'
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com/detovalabs', // Replace with actual Dribbble URL
    className: 'dribbble'
  }
]

export default function SocialMediaLinks() {
  return (
    <div className="about">
      <div className="bg_links"></div>
      <div className="logo"></div>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social ${link.className}`}
          aria-label={link.name}
        >
          <div className="icon"></div>
        </a>
      ))}
    </div>
  )
}
